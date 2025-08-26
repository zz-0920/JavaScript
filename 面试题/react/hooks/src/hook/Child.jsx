import { memo } from 'react'

const Child = memo(function ({ count }) {
  console.log('child render')
  return (
    <div>
      <h2>{ count }</h2>
    </div>
  )
})

export default Child