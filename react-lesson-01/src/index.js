import React from 'react'
import ReactDOM from 'react-dom'
// import classNames from 'classnames'
// import styled from 'styled-components'
import App from './App'
import './style.css'
// import * as services from './services'

// React.Component.prototype.http = services

// 1. 箭头函数新建组件：直接以元素的形式作为参数，这是实现原理
// const createApp = () => {
//   return <h1>hello react!</h1>
// }

// const app = createApp()

// 2. 箭头函数新建组件：以标签的形式
// const App = (props) => {
//   return (
//     <div>
//       <h1>hello react</h1>
//       <h2>{props.title}</h2>
//     </div>
//   )
// }

// 使用styled-components设置css样式
// const Title = styled.li`
//   color: #0f0
// `

// class App extends React.Component {
//   render(){
//     const style = {color: '#f00'}
//     return (
//       <div>
//         <h1>设置css样式</h1>
//         <ol>
//           <li style={style}>使用style设置css样式</li>
//           <li className='text-red'>使用className设置css样式</li>
//           <li className={classNames('a', {'text-red': true, 'b': false})}>使用classnames动态设置css样式</li>
//           <Title>使用styled-components动态设置css样式</Title>
//         </ol>
//       </div>
//     )
//   }
// }

ReactDOM.render(<App />, document.getElementById('root'))