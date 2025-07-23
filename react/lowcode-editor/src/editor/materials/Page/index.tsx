import type { CommonComponentProps } from '../../interface'
import { useMaterialDrop } from '../../hooks/useMaterialDrop'

export default function Page({id, children}: CommonComponentProps) {
  const { canDrop, isOver, dropRef, messageApi, contextHolder } = useMaterialDrop({
    id,
    accept: ['Button', 'Container', 'Page'],
    onDropSuccess: (itemType) => {
      messageApi.success(itemType + '放置成功')
    }
  })

  // 根据 canDrop 和 isOver 状态设置样式
  const getDropZoneStyle = () => {
    if (isOver && canDrop) {
      return 'bg-green-100 border-2 border-green-400' // 可放置且悬停
    }
    if (isOver && !canDrop) {
      return 'bg-red-100 border-2 border-red-400' // 不可放置但悬停
    }
    if (canDrop) {
      return 'border-2 border-dashed border-blue-300' // 可放置
    }
    return '' // 默认状态
  }

  return (
    <>
      {contextHolder}
      <div 
        ref={dropRef as any} 
        data-component-id={id}
        className={`p-[20px] h-[100%] box-border transition-all duration-200 ${
          getDropZoneStyle()
        }`}
      >
        {children}
        {isOver && !canDrop && (
          <div className="text-red-500 text-center">
            该组件类型不能放置在此处
          </div>
        )}
      </div>
    </>
  )
}