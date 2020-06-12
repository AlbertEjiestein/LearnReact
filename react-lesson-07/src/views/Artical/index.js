import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Artical extends Component {
  render() {
    return (
      <div>
        {/* 两种显示传参方法：
          1. 动态路由 /path/:param => params
          2. query ?name=yaj
          隐式传参：
            使用state */}
        <Link to="/artical/1?name=yaj">文章一</Link>
        {/* <Link to="/artical/2">文章二</Link> */}
        <Link to={{
          pathname: '/artical/2', 
          state: {
            from: 'artical'
          }
        }}>文章二</Link>
      </div>
    )
  }
}
