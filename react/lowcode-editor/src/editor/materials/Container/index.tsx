import type { CommonComponentProps } from '../../interface'
import { useMaterialDrop } from '../../hooks/useMaterialDrop'

export default function Container({id, children }: CommonComponentProps) {
  const { canDrop, isOver, dropRef } = useMaterialDrop({
    id,
    accept: ['Button', 'Container']
  })

  // 根据拖拽状态动态设置样式
  const getContainerStyle = () => {
    let baseClass = 'border-[1px] border-[#000] min-h-[100px] p-[20px] transition-all duration-200'
    
    if (isOver && canDrop) {
      return baseClass + ' bg-green-100 border-green-400 border-2'
    }
    if (isOver && !canDrop) {
      return baseClass + ' bg-red-100 border-red-400 border-2'
    }
    if (canDrop) {
      return baseClass + ' border-dashed border-blue-300'
    }
    
    return baseClass
  }

  return (
    <div ref={dropRef as any} data-component-id={id} className={getContainerStyle()}>
      {children}
      {isOver && !canDrop && (
        <div className="text-red-500 text-sm text-center">
          该组件类型不能放置在此处
        </div>
      )}
    </div>
  )
}
