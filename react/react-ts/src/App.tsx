import React from 'react'

interface PersonProps {
  name: string
  content?: React.ReactNode // jsx类型
}

function Person(props: PersonProps) {
  return (
    <>
      <h2>我是{props.name}</h2>
      {props.content}
    </>
  )
}

const Animal: React.FC<PersonProps> = (props) => {
  return (
    <div>
      <h2>我是{props.name}</h2>
    </div>
  )
}

function App() {
  return (
    <div>
      <h2>Hello TS-React</h2>
      <Person name={'zz'} content={<button>提交</button>} />
      <Animal name={'tiger'} />
    </div>
  )
}

export default App;