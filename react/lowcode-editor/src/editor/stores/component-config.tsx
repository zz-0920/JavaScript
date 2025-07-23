// 导入 Zustand 状态管理库的 create 函数
import { create } from 'zustand'
// 导入低代码编辑器的基础组件
import Container from '../materials/Container'  // 容器组件
import Button from '../materials/Button'        // 按钮组件
import Page from '../materials/Page'            // 页面组件

/**
 * 组件配置接口
 * 定义每个组件的基本配置信息
 */
export interface ComponentConfig {
    name: string;                      // 组件名称，用于标识组件类型
    defaultProps: Record<string, any>; // 组件的默认属性配置
    component: any                     // React 组件的实际引用
    desc: string                       // 组件的描述信息
}

/**
 * 状态接口
 * 定义组件配置存储的状态结构
 */
export interface State {
    componentConfig: { [key: string]: ComponentConfig } // 组件配置映射表，键为组件名，值为组件配置
}

/**
 * 操作接口
 * 定义可以对组件配置进行的操作
 */
export interface Action {
    /**
     * 注册新组件
     * @param name 组件名称
     * @param componentConfig 组件配置对象
     */
    registerComponent: (name: string, componentConfig: ComponentConfig) => void;
}

/**
 * 组件配置状态存储
 * 使用 Zustand 创建的全局状态管理，用于管理所有可用组件的配置信息
 */
export const useComponentConfigStore = create<State & Action>(
    (set) => ({
        // 初始组件配置
        // 预定义了三个基础组件：Container、Button、Page
        componentConfig: {
            Container: {
                name: 'Container',     // 容器组件名称
                defaultProps: {},      // 容器组件默认属性（空对象）
                component: Container,  // 容器组件的 React 组件引用
                desc: '容器'
            },
            Button: {
                name: 'Button',        // 按钮组件名称
                defaultProps: {
                    type: "primary",
                    text: "按钮"
                },      // 按钮组件默认属性（空对象）
                component: Button,     // 按钮组件的 React 组件引用
                desc: '按钮'
            },
            Page: {
                name: 'Page',          // 页面组件名称
                defaultProps: {
                    title: "页面"
                },      // 页面组件默认属性（空对象）
                component: Page,       // 页面组件的 React 组件引用
                desc: '页面'
            }
        },

        /**
         * 动态注册新组件
         * 允许在运行时添加新的组件配置到系统中
         * @param name 要注册的组件名称
         * @param componentConfig 组件的配置对象
         */
        registerComponent: (name: string, componentConfig: ComponentConfig) => {
            set((state) => ({
                componentConfig: {
                    ...state.componentConfig,    // 展开现有的组件配置，保持不可变性
                    [name]: componentConfig      // 使用计算属性名添加新的组件配置
                }
            }))
        }
    })
)