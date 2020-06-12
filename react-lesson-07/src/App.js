import React, { Component } from 'react'
import { Route, NavLink as Link, Redirect, Switch } from 'react-router-dom'
import {
  Home,
  Artical,
  ArticalDetail,
  Users,
  NotFound
}from './views'

export default class App extends Component {
  constructor(){
    super()
    this.state = {
      isLogin: true
    }
  }
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/home">首页</Link></li>
          <li><Link to="/artical">文章</Link></li>
          <li><Link to="/users">用户</Link></li>
        </ul>
        <Switch>
          <Route path="/home" component={Home}/>
          <Route component={Artical} path="/artical" exact/>
          <Route render={(routeProps) => {
            return this.state.isLogin ? <Users {...routeProps}/> : <div>请登录</div>
          }} path="/users" />
          <Route component={NotFound} path="/404" />
          <Route path="/artical/:id" component={ArticalDetail}></Route>
          <Redirect from="/" to="/home" exact/>
          <Redirect to="/404" />
        </Switch>
      </div>
    )
  }
}
