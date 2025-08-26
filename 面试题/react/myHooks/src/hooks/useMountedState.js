// 将某一个独立的功能做成一个函数，让它在组件加载的过程中可以触发
import { useEffect, useRef, useCallback } from 'react'

export default function useMountedState() {
  const mountedRef = useRef(false) // const [mounted, setMounted] = useState(false)


  const get = useCallback(() => { // 如果子组件被 memo 了，get 也不会触发子组件的重新渲染
    return mountedRef.current  // setMounted(true)
  }, [])

  useEffect(() => {  // 组件挂在完成
    mountedRef.current = true   // 它不会带来组件的重新渲染
    return () => {
      mountedRef.current = false
    }
  }, [])

  return get
}