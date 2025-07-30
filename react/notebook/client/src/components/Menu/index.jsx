import styles from './index.module.less'
import { Revoke, FriendsO, BarChartO, createFromIconfontCN } from '@react-vant/icons'
import logo from '@/assets/logo.png'

const IconFont = createFromIconfontCN(
    '//at.alicdn.com/t/c/font_4985759_1pwsih2v7fz.js'
)

export default function Menu({ className, onClose }) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {}

    return (
        <div className={`${styles['menu-wrapper']} ${className}`}>
            <div className={styles['menu-back']} onClick={onClose}>
                <Revoke />
            </div>
            <section className={styles['menu-content']}>
                <div className={styles['menu-avatar']}>
                    <img src={logo} alt="" />
                </div>
                <p className={styles['menu-avatar-name']}>
                    你好，<span>{userInfo?.nickname || '用户'}</span>
                </p>
                <ul className={styles['menu-list']}>
                    <li className={styles['menu-list-item']}>
                        <FriendsO />
                        <span>个人中心</span>
                    </li>
                    <li className={styles['menu-list-item']}>
                        <BarChartO />
                        <span>笔记统计</span>
                    </li>
                    <li className={styles['menu-list-item']}>
                        <IconFont name='icon-yejianmoshi1' />
                        <span>夜间模式</span>
                    </li>
                    <li className={styles['menu-list-item']}>
                        <IconFont name='icon-tuichudenglu' />
                        <span>退出登录</span>
                    </li>
                </ul>
            </section>
        </div>
    )
}
