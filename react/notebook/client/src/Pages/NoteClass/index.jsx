import styles from './index.module.less'
import { WapNav, Edit, LikeO, Search } from '@react-vant/icons'
import Menu from '@/components/Menu'
import { useState } from 'react'
import { useNavigate } from 'react-router'

const noteClassList = [
  { title: '美食', id: 1 },
  { title: '旅行', id: 2 },
  { title: '恋爱', id: 3 },
  { title: '学习', id: 4 },
  { title: '吵架', id: 5 },
]

// 随机颜色 - 精确匹配背景渐变
const randomColor = () => {
  // 基于背景渐变的具体颜色值
  const baseColors = [
    { h: 300, s: 45, l: 85 }, // 接近 #ffe9fe 的色调
    { h: 90, s: 40, l: 80 },  // 接近 #d2eac7 的色调
    { h: 270, s: 35, l: 82 }, // 中间过渡色
    { h: 120, s: 38, l: 78 }  // 另一个过渡色
  ]

  // 随机选择一个基础色调
  const baseColor = baseColors[Math.floor(Math.random() * baseColors.length)]

  // 在基础色调上添加小幅变化
  const hue = baseColor.h + (Math.random() - 0.5) * 30  // ±15度变化
  const saturation = baseColor.s + (Math.random() - 0.5) * 20  // ±10%变化
  const lightness = baseColor.l + (Math.random() - 0.5) * 16   // ±8%变化

  return `hsl(${Math.round(hue)}, ${Math.round(saturation)}%, ${Math.round(lightness)}%)`
}

export default function NoteClass() {
  // 添加菜单显示状态
  const [showMenu, setShowMenu] = useState(false)
  const navigate = useNavigate()

  // 处理菜单显示
  const handleMenuShow = () => {
    setShowMenu(true)
  }

  // 处理菜单隐藏
  const handleMenuHide = () => {
    setShowMenu(false)
  }

  return (
    <div className={styles['note-class-wrapper']}>
      <div className={styles['note-class']}>
        <header>
          <div onClick={handleMenuShow}>
            <WapNav />
          </div>
          <div>
            <Edit className={styles['icon']} onClick={() => {
              navigate('/notePublish')
            }}/>
            <LikeO className={styles['icon']} />
            <Search className={styles['icon']} />
          </div>
        </header>
        <section>
          {
            noteClassList.map(item => (
              <div
                key={item.id}
                className={styles['note-class-item']}
                style={{ backgroundColor: randomColor() }}
                onClick={() => {
                  navigate('/noteList', {
                    state: {
                      id: item.id,
                      title: item.title
                    }
                  })
                }}>
                <span className={styles['note-class-item-title']}>{item.title}</span>
              </div>
            ))
          }
        </section>
      </div>
      {/* 菜单组件，传递关闭函数 */}
      <Menu
        className={`${styles['menu']} ${showMenu ? styles['menu-show'] : ''}`}
        onClose={handleMenuHide}
      />
      {/* 遮罩层 */}
      {showMenu && <div className={styles['overlay']} onClick={handleMenuHide}></div>}
    </div>
  )
}
