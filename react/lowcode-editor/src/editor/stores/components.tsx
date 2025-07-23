import { create } from 'zustand'

// 状态接口定义 - 定义 store 中的状态结构
export interface State {
    components: Component[], // 组件列表数组
    curComponentID?: number | null, // 当前选中的组件ID
    curComponent?: Component | null, // 当前选中的组件对象
}

// 操作接口定义 - 定义可以执行的操作方法
export interface Action {
    addComponent: (component: any, parentId?: number) => void,    // 添加组件方法
    deleteComponent: (componentId: number) => void,              // 删除组件方法
    updateComponent: (componentId: number, props: any) => void,  // 更新组件属性方法
    setCurComponentID: (componentId: number | null) => void,       // 设置当前选中组件ID方法
}

// 组件数据结构定义
export interface Component {
    id: number,           // 组件唯一标识符
    name: string,         // 组件名称（如 'Button', 'Page' 等）
    props: any,           // 组件属性对象
    desc: string,         // 组件描述信息
    children?: Component[], // 子组件列表（可选）
    parentId?: number     // 父组件ID（可选，用于建立父子关系）
}

// 创建 Zustand store，合并状态和操作接口
export const useComponentsStore = create<State & Action>(
    (set, get) => ({
        // 初始状态：组件列表，默认包含一个根页面组件
        components: [ // 整个项目的json树
            {
                id: 1,
                name: 'Page',
                props: {},
                desc: '页面'
            }
        ],
        curComponentID: null,
        curComponent: null,
        // 添加组件方法
        addComponent: (component, parentId) => {
            set((state) => {
                // 如果指定了父组件ID，将组件添加为子组件
                if (parentId) {
                    // 根据ID查找父组件
                    const parentComponent = getComponentById(parentId, state.components);
                    if (parentComponent) {
                        // 如果父组件已有子组件，追加到子组件列表；否则创建新的子组件列表
                        parentComponent.children ?
                            parentComponent.children.push(component) :
                            parentComponent.children = [component];
                    }
                    // 设置新组件的父组件ID
                    component.parentId = parentId
                    // 返回新的状态（浅拷贝数组以触发重新渲染）
                    return { components: [...state.components] }
                } else {
                    // 如果没有指定父组件，添加到根级别组件列表
                    return { components: [...state.components, component] }
                }
            })
        },

        // 删除组件方法
        deleteComponent: (componentId) => {
            // 参数校验：如果没有提供组件ID，直接返回
            if (!componentId) return;

            // 查找要删除的组件
            const component = getComponentById(componentId, get().components);

            // 如果组件有父组件，从父组件的子组件列表中删除
            if (component?.parentId) {
                const parentComponent = getComponentById(component.parentId, get().components);
                if (parentComponent) {
                    // 过滤掉要删除的组件
                    parentComponent.children = parentComponent.children?.filter(item => item.id !== componentId)
                }
                // 更新状态（浅拷贝数组以触发重新渲染）
                set({ components: [...get().components] })
            } else {
                // 如果是根级别组件，直接从根组件列表中删除
                set({ components: get().components.filter(item => item.id !== componentId) })
            }
        },

        // 更新组件属性方法
        updateComponent: (componentId, props) => {
            set((state) => {
                // 查找要更新的组件
                const component = getComponentById(componentId, state.components)
                if (component) {
                    // 合并新属性到现有属性中（保持不可变性）
                    component.props = { ...component.props, ...props }
                    return {
                        // 返回新的状态（浅拷贝数组以触发重新渲染）
                        components: [...state.components]
                    }
                }
                // 如果没找到组件，返回原状态
                return { components: [...state.components] }
            })
        },

        setCurComponentID: (componentId) => {
            set((state) => ({
                curComponentID: componentId,
                curComponent: getComponentById(componentId, state.components)
            }))
        }
    })
)

/**
 * 根据组件ID递归查找组件
 * @param componentId 要查找的组件ID
 * @param components 组件列表
 * @returns 找到的组件对象，如果没找到返回null
 */
export function getComponentById(componentId: number | null, components: Component[]): Component | null {
    // 参数校验：如果ID为空，返回null
    if (!componentId) return null

    // 遍历组件列表
    for (let component of components) {
        // 如果找到匹配的ID，直接返回该组件
        if (component.id === componentId) {
            return component
        } else {
            // 如果当前组件有子组件，递归查找子组件
            if (component.children && component.children.length > 0) {
                const result = getComponentById(componentId, component.children)
                // 如果在子组件中找到了，返回结果
                if (result) return result
            }
        }
    }
    // 如果遍历完所有组件都没找到，返回null
    return null
}
