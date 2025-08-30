import { useRef, useState } from 'react'
import styles from './index.module.scss'
import classnames from 'classnames'

interface FileNameItemProps {
  value: string,
  active: boolean,
  onClick: () => void,
  onEditComplete: (name: string) => void,
}

export default function FileNameItem(props: FileNameItemProps) {
  const { value, active = false, onClick, onEditComplete } = props  
  const [editing, setEditing] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState(value)

  return (
    <div 
      className={classnames(styles['tab-item'], active ? styles.active : null)}
      onClick={onClick}
      >
      {
        editing ? (
          <input 
          ref={inputRef}
          type="text" 
          value={name} 
          onChange={e => setName(e.target.value)}
          className={styles['tabs-item-input']}
          onBlur={() => {
            setEditing(false)
            onEditComplete(name)
          }}
          />
        ) : (
          <span
          onClick={onClick}
          onDoubleClick={e => {
            e.stopPropagation()
            setEditing(true)
            setTimeout(() => {
              inputRef.current?.focus()
              inputRef.current?.select()
            }, 0)
          }}
          >{name}</span>
        )
      }
    </div>
  )
}
