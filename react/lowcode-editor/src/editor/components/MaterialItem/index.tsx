
import { useDrag } from 'react-dnd'

export interface MaterialItemProps {
    name: string
}

export default function MaterialItem(props: MaterialItemProps) {
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: props.name,
            item: () => ({ 
                type: props.name // 同时提供 type 属性
            }),
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
        })
    )

    return (
        <div 
            ref={drag as any} 
            className={`border-dashed border-[1px] border-[#000] py-[8px] px-[10px] inline-block bg-white m-[10px] cursor-move hover:bg-[#ccc] ${
                isDragging ? 'opacity-50 scale-95' : ''
            }`}
        >
            {isDragging ? '放置中' : props.name}
        </div>
    )
}