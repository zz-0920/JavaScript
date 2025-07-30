import styles from './index.module.less'
import { useState, useEffect } from 'react'

export default function Pull({ children, onRefresh }) {
    const [startY, setStartY] = useState(0)
    const [moveY, setMoveY] = useState(0)
    const [isPull, setIsPull] = useState(false)
    const [distance, setDistance] = useState(0)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [canPull, setCanPull] = useState(false)
    const [refreshSuccess, setRefreshSuccess] = useState(false) // 新增：刷新成功状态

    // 处理刷新逻辑
    // 处理刷新逻辑
    const handleRefresh = async () => {
        if (isRefreshing) return
        
        setIsRefreshing(true)
        setIsPull(true)
        setRefreshSuccess(false) // 重置刷新成功状态
        
        try {
            // 执行刷新回调
            if (onRefresh && typeof onRefresh === 'function') {
                await onRefresh()
            }
            setRefreshSuccess(true) // 设置刷新成功状态
        } catch (error) {
            console.error('刷新失败:', error)
            setRefreshSuccess(false) // 刷新失败时不显示成功
        } finally {
            // 先显示刷新成功文字一段时间
            setTimeout(() => {
                setRefreshSuccess(false) // 先隐藏刷新成功文字
                // 然后再重置其他状态
                setTimeout(() => {
                    setIsRefreshing(false)
                    setIsPull(false)
                    setDistance(0)
                    setMoveY(0)
                }, 100) // 很短的延迟，确保文字先消失
            }, 800) // 刷新成功文字显示800ms
        }
    }

    // 重置状态
    const resetPull = () => {
        setDistance(0)
        setMoveY(0)
        setCanPull(false)
        setRefreshSuccess(false) // 重置刷新成功状态
        if (!isRefreshing) {
            setIsPull(false)
        }
    }

    // 获取显示文字的函数
    const getDisplayText = () => {
        if (refreshSuccess && !isRefreshing) {
            return '刷新成功'
        }
        if (isRefreshing) {
            return '正在刷新...'
        }
        if (distance > 50) {
            return '释放刷新'
        }
        return '下拉刷新'
    }

    return (
        <div className={styles['pull-wrapper']} 
        onTouchStart={(e) => {
            if (isRefreshing) return
            
            const touch = e.targetTouches[0]
            setStartY(touch.clientY)
            setCanPull(window.scrollY === 0)
        }} 
        onTouchMove={(e) => {
            if (isRefreshing || !canPull) return
            
            const touch = e.targetTouches[0]
            const currentY = touch.clientY
            const deltaY = currentY - startY
            
            if (deltaY > 0) {
                const maxDistance = 150
                let newDistance
                
                if (deltaY <= maxDistance) {
                    newDistance = deltaY * 0.5
                } else {
                    newDistance = maxDistance * 0.5
                }
                
                setDistance(newDistance)
                setMoveY(currentY)
            }
        }}
        onTouchEnd={(e) => {
            if (isRefreshing) return
            
            if (distance > 50) {
                handleRefresh()
            } else {
                resetPull()
            }
        }}
        style={{
            transform: `translateY(${isPull ? (isRefreshing ? 60 : 0) : Math.min(Math.max(0, distance), 75)}px)`,
            transition: isPull || distance === 0 ? 'transform 0.3s ease' : 'none',
            overscrollBehavior: 'contain'
        }}>
            <div className={styles['pull-header']} style={{
                height: '60px',
                opacity: distance > 0 || refreshSuccess ? 1 : 0,
                transition: 'opacity 0.2s ease'
            }}>
                <p className={styles['pull-header-title']}>
                    {getDisplayText()}
                </p>
                {isRefreshing && (
                    <div className={styles['loading-spinner']}>
                        ⟳
                    </div>
                )}
            </div>
            {children}
        </div>
    )
}
