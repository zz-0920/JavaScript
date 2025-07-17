import type { PropsWithChildren } from "react"

export default function Page({children} : PropsWithChildren) {

  return (
    <div className="p-[20px] h-[100%] border-box">
        {children}
    </div>
  )
}
