function createElement(type, props, ...children) {
    return {
        type,
        props: {
            ...props,
            children: children.map(child => {
                const isTextNode = typeof child === 'string' || typeof child === "number"
                return isTextNode ? createTextNode(child) : child
            })
        }
    }
}
function createTextNode(text) {
    return {
        type: 'TEXT_ELEMENT',
        props: {
            nodeValue: text,
            children: []
        }
    }
}

let nextUnitOfWork = null
let wipRoot = null  // 工作中的根节点
let currentRoot = null  // 历史根节点
let deletions = null

function render(element, container) {
    wipRoot = {
        dom: container,
        props: {
            children: [element]
        },
        alternate: currentRoot
    }
    deletions = []
    nextUnitOfWork = wipRoot
}

function workLoop(deadline) {
    let shouldYield = false
    while (nextUnitOfWork && !shouldYield) {
        nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
        shouldYield = deadline.timeRemaining() < 1
    }
    if (!nextUnitOfWork && wipRoot) {
        commitRoot()  // 整个 vdom 树全部转换完毕，可以渲染页面了
    }
    requestIdleCallback(workLoop)  // 递归处理耗时任务
}
requestIdleCallback(workLoop)  // 时间分片


function performUnitOfWork(fiber) {
    const isFunctionComponent = fiber.type instanceof Function
    if (isFunctionComponent) {
        updateFunctionComponent(fiber)
    } else {
        updateHostComponent(fiber)
    }

    if (fiber.child) {
        return fiber.child
    }
    let nextFiber = fiber
    while (nextFiber) {
        if (nextFiber.sibling) {
            return nextFiber.sibling
        }
        nextFiber = nextFiber.return
    }
}

function commitRoot() {
    deletions.forEach(commitWork)
    commitWork(wipRoot.child)
    currentRoot = wipRoot
    wipRoot = null
    deletions = []
}
function commitWork(fiber) {
    if (!fiber) {
        return
    }

    let domParentFiber = fiber.return
    while (!domParentFiber.dom) {
        domParentFiber = domParentFiber.return
    }
    const domParent = domParentFiber.dom

    if (fiber.effectTag === "PLACEMENT" && fiber.dom != null) {
        domParent.appendChild(fiber.dom)
    } else if (fiber.effectTag === "UPDATE" && fiber.dom != null) {
        updateDom(fiber.dom, fiber.alternate.props, fiber.props)
    } else if (fiber.effectTag === "DELETION") {
        commitDeletion(fiber, domParent)
    }

    commitWork(fiber.child)
    commitWork(fiber.sibling)
}
function commitDeletion(fiber, domParent) {
    if (fiber.dom) {
        domParent.removeChild(fiber.dom)
    } else {
        commitDeletion(fiber.child, domParent)
    }
}




// 函数组件的更新
let wipFiber = null
let stateHookIndex = null

function updateFunctionComponent(fiber) {
    wipFiber = fiber
    stateHookIndex = 0
    wipFiber.stateHooks = []
    wipFiber.effectHooks = []

    const children = [fiber.type(fiber.props)]
    reconcileChildren(fiber, children)  // 将函数组件中的 jsx 集成到 fiber中
}

function updateHostComponent(fiber) {
    if (!fiber.dom) {
        fiber.dom = createDom(fiber)
    }
    reconcileChildren(fiber, fiber.props.children)
}

function createDom(fiber) {
    const dom = fiber.type === 'TEXT_ELEMENT' ?
        document.createTextNode('') :
        document.createElement(fiber.type)

    updateDom(dom, {}, fiber.props)

    return dom
}

const isEvent = key => key.startsWith('on')
const isProperty = key => key !== 'children' && !isEvent(key)
const isNew = (prevProps, newProps) => (key) => prevProps[key] !== newProps[key]
const isGone = (prevProps, newProps) => (key) => !(key in newProps)

function updateDom(dom, prevProps, newProps) {
    // 移除旧的事件
    Object.keys(prevProps)
        .filter(isEvent)
        .filter(
            key => !(key in newProps) || isNew(prevProps, newProps)(key)
        )
        .forEach(name => {
            const eventType = name.toLowerCase().substring(2)
            dom.removeEventListener(eventType, prevProps[name])
        })

    // 移除旧的属性
    Object.keys(prevProps)
        .filter(isProperty)
        .filter(isGone(prevProps, newProps))
        .forEach(name => {
            dom[name] = ''
        })

    // 添加新的属性
    Object.keys(newProps)
        .filter(isProperty)
        .filter(isNew(prevProps, newProps))
        .forEach(name => {
            dom[name] = newProps[name]
        })

    // 添加新的事件
    Object.keys(newProps)
        .filter(isEvent)
        .filter(isNew(prevProps, newProps))
        .forEach(name => {
            const eventType = name.toLowerCase().substring(2)
            dom.addEventListener(eventType, newProps[name])
        })
}

// diff 算法
function reconcileChildren(wipFiber, elements) {
    let index = 0
    let oldFiber = wipFiber.alternate?.child
    let prevSibling = null

    while (index < elements.length || oldFiber != null) {
        const element = elements[index]
        let newFiber = null

        const sameType = element?.type == oldFiber?.type

        if (sameType) {
            newFiber = {
                type: oldFiber.type,
                props: element.props,
                dom: oldFiber.dom,
                return: wipFiber,
                alternate: oldFiber,
                effectTag: "UPDATE",
            }
        }
        if (element && !sameType) {
            newFiber = {
                type: element.type,
                props: element.props,
                dom: null,
                return: wipFiber,
                alternate: null,
                effectTag: "PLACEMENT",
            }
        }
        if (oldFiber && !sameType) {
            oldFiber.effectTag = "DELETION"
            deletions.push(oldFiber)
        }

        if (oldFiber) {
            oldFiber = oldFiber.sibling
        }

        if (index === 0) {
            wipFiber.child = newFiber
        } else if (element) {
            prevSibling.sibling = newFiber
        }

        prevSibling = newFiber
        index++
    }
}



const MiniReact = {
    createElement,
    render
}
window.MiniReact = MiniReact