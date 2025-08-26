import React from 'react'
import {useHover} from './hooks/useHover'

export default function App() {
  const element = (hovered) => (
    <div 
      onMouseEnter={() => console.log('enter')} 
      onMouseLeave={() => console.log('leave')}
    >
      Hover me! {hovered && 'Thanks!'}
    </div>
  );

  const [hoverable, hovered] = useHover(element);
  // console.log(hoverable, hovered);
  


  return (
    <div>
      <h2>app</h2>
      {hoverable}
      <p>{`${hovered}`}</p>
    </div>
  )
}
