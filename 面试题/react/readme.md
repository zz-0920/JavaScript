# HOOK
1. useState
2. useEffect
3. useContext  (父组件向子孙组件传值)
4. useReducer  (状态管理)
5. useCallback  (缓存函数，只有在依赖项变化时才会重新创建函数)
6. useMemo  (缓存组件，只有在 props 变化时才会重新渲染)
7. useRef

memo + useCallback 缓存函数，只有在依赖项变化时才会重新创建函数
memo + useMemo 缓存值，只有在值变化时才会重新渲染


# HOOK 的闭包陷阱和解决方案
1. 当 useEffect 依赖项为空数组时，会在组件挂载时执行，且只执行一次，如果useEffect中使用了状态，那么状态的值会被闭包保留，不会被更新，被更新的是全局的状态，而在useEffect再次访问的状态是闭包中的状态。 这种情况多才出现在 useEffect 中多次修改同一个变量

- 解决方案：
 1. 不让代码产生闭包，给 setState 传递函数，函数中可以访问到全局的最新的状态
 2. 使用 useReducer 来管理状态
 3. 将被修改的状态存入 useEffect 的依赖数组，当状态变化时，会重新执行 useEffect
 4. 借助 useRef，每次组件更新时，给 ref.current 赋值最新的函数，在 useEffect 中调用 ref.current 即可