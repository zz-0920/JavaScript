import { createContext, useContext, type ReactNode } from "react"
import { matchPath, useLocation, useOutlet } from "react-router-dom"

interface KeepAliveProps {
    keepPath: string[]
}

// 用来缓存组件的对象
const keepElements: Record<string, any> = {}

const KeepAliveContext = createContext({ // useContext可以识别的对象
    keepPath: [] as string[],
    keepElements,
    dropByPath(path: string) {
        keepElements[path] = null
    }
})

export function useKeepAlive() {
    const location = useLocation()
    const element = useOutlet() // 拿到在二级路由出口展示的组件 V-DOM对象
    const { keepElements, keepPath, dropByPath } = useContext(KeepAliveContext)
    const isKeep = keepPath.includes(location.pathname)
    if (isKeep) {
        keepElements[location.pathname] = element
    } else {
        dropByPath(location.pathname)
    }
    return <>
        {
            Object.keys(keepElements).map((path) => (
                <div key={path}
                    style={{ overflow: 'hidden' }}
                    hidden={!matchPath(path, location.pathname)}
                >
                    {keepElements[path]}
                </div>
            ))
        }
        {
            !isKeep && element
        }
    </>
}

export default function KeepAlive({ keepPath, children }: KeepAliveProps & { children: ReactNode }) {

    const { keepElements, dropByPath } = useContext(KeepAliveContext)

    return (
        <KeepAliveContext.Provider value={{
            keepPath,
            keepElements,
            dropByPath
        }}>
            {children}
        </KeepAliveContext.Provider>
    )
}
