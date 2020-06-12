import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class BackHome extends Component {
  goHome = () => {
    // this.props.history.push('/home')
    this.props.history.push({
      pathname: '/home',
      state: {
        id: this.props.match.params.id
      }
    })
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <button onClick={this.goHome}>返回首页</button>
      </div>
    )
  }
}

// 作用：把不是通过路由切换过来的组件中，将react-router 的 history、location、match 三个对象传入props对象上
// 默认情况下必须是经过路由匹配渲染的组件才存在this.props，才拥有路由参数，才能使用编程式导航的写法，执行this.props.history.push('/detail')跳转到对应路由的页面
// 然而不是所有组件都直接与路由相连（通过路由跳转到此组件）的，当这些组件需要路由参数时，使用withRouter就可以给此组件传入路由参数，此时就可以使用this.props

export default withRouter(BackHome)