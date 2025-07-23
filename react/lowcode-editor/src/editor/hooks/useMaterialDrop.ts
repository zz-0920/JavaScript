import { useDrop } from 'react-dnd'
import { useComponentsStore } from '../stores/components'
import { useComponentConfigStore } from '../stores/component-config'
import { message } from 'antd'

interface UseMaterialDropOptions {
  id?: number | string
  accept: string[]
  onDropSuccess?: (itemType: string) => void
  fallbackProps?: Record<string, any>
}

export function useMaterialDrop(options: UseMaterialDropOptions) {
  const { id, accept, onDropSuccess, fallbackProps } = options
  const { addComponent } = useComponentsStore()
  const { componentConfig } = useComponentConfigStore()
  const [messageApi, contextHolder] = message.useMessage()

  const [{canDrop, isOver}, dropRef] = useDrop(() => ({
    accept,
    drop: (item: {type: string}, monitor) => {
      // 检查是否是直接放置到当前容器（不是嵌套放置）
      if (monitor.didDrop()) {
        return // 如果已经被子组件处理过，则不再处理
      }
      
      // 执行成功回调
      onDropSuccess?.(item.type)
      
      // 获取组件默认属性
      const props = componentConfig?.[item.type]?.defaultProps
      const desc = componentConfig?.[item.type]?.desc
      
      // 添加组件到存储
      addComponent({
        id: Date.now(),
        name: item.type,
        props: (props && Object.keys(props).length > 0) ? props : fallbackProps,
        desc: desc
      }, typeof id === 'number' ? id : undefined)
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      isOver: monitor.isOver({ shallow: true }) // 只检测直接悬停，不包括子组件
    })
  }))

  return {
    canDrop,
    isOver,
    dropRef,
    messageApi,
    contextHolder
  }
}