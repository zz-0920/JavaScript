import { Component, PureComponent } from 'react'

class Dong extends PureComponent {  // memo
  constructor() {
    super()
    this.state = {
      a: {
        b: 1
      }
    }
  }

  componentDidMount() {  // 生命周期
    setTimeout(() => {
      // this.state.a.b = 2
      this.setState({
        a: {
          b: 2
        }
      })
    }, 2000)
  }

  render() {
    console.log('render')
    return (
      <div>
        我是Dong组件，{this.state.a.b}
      </div>
    )
  }
}

export default Dong