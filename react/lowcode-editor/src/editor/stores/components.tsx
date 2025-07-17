import { create } from 'zustand'
export interface State {
    components: Component[],
}
export interface Action {
    addComponent: (component: any, parentId?: number) => void,
    deleteComponent: (componentId: number) => void,
    updateComponent: (componentId: number, props: any) => void,
}
export interface Component {
    id: number,
    name: string,
    props: any,
    desc: string,
    children?: Component[],
    parentId?: number
}
export const useComponentsStore = create<State & Action>(
    (set, get) => ({
        // 组件列表
        components: [
            {
                id: 1,
                name: 'Page',
                props: {},
                desc: '页面'
            }
        ],

        // 方法
        addComponent: (component, parentId) => { // 本质上要将一个对象添加到另一个对象中
            set((state) => {
                if (parentId) {
                    // 获取到父级对象
                    const parentComponent = getComponentById(parentId, state.components);
                    if (parentComponent) parentComponent.children ? parentComponent.children.push(component) : parentComponent.children = [component];
                    component.parentId = parentId
                    return { components: [...state.components] }
                } else {
                    return { components: [...state.components, component] }
                }
            })
        },

        deleteComponent: (componentId) => { // 本质上要将一个对象从另一个对象中删除
            if (!componentId) return;
            const component = getComponentById(componentId, get().components);
            if (component?.parentId) {
                const parentComponent = getComponentById(component.parentId, get().components);
                if (parentComponent) {
                    parentComponent.children = parentComponent.children?.filter(item => item.id !== componentId)
                }
                set({ components: [...get().components] })
            } else {
                set({ components: get().components.filter(item => item.id !== componentId) })
            }
        },

        updateComponent: (componentId, props) => {
            set((state) => {
                const component = getComponentById(componentId, state.components)
                if (component) {
                    component.props = { ...component.props, ...props }
                    return {
                        components: [...state.components]
                    }
                }
                return { components: [...state.components] }
            })
        }
    }))

export function getComponentById(componentId: number | null, components: Component[]): Component | null {
    if (!componentId) return null
    for (let component of components) {
        if (component.id === componentId) {
            return component
        } else {
            if (component.children && component.children.length > 0) {
                const result = getComponentById(componentId, component.children)
                if (result) return result
            }
        }
    }
    return null
}
