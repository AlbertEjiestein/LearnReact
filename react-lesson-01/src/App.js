import React, { Component } from 'react'
import {
  TodoList,
  TodoInput
} from './components'
import {getTodos} from './services'

export default class App extends Component {
  constructor(){
    super();
    this.state = {
      todos: [],
      isLoading: false
    };
    this.addTodo = this.addTodo.bind(this);
    this.onCompeletedChange = this.onCompeletedChange.bind(this);
  }

  // 发起ajax请求
  componentDidMount(){
    this.setState({
      isLoading: true
    })
    getTodos().then(resp => {
      this.setState({
        todos: resp.data
      })
    }).catch(err => {
      console.log(err)
    }).finally(() => {
      this.setState({
        isLoading: false
      })
    })
  }

  // 添加到todo列表中
  addTodo(todoTitle){
    this.setState({
      todos: this.state.todos.concat({
        id: Math.random(),
        title: todoTitle,
        completed: false
      })
    })
  }

  // 复选框选中取消功能，因为复选框的数据是App组件传递下去的，
  // 其props属性为只读，所以要想改变isCompleted只能在App组件
  onCompeletedChange(id){
    this.setState((prevState) => {
      return {
        todos: prevState.todos.map(todo => {
          if(id === todo.id){
            todo.completed = !todo.completed;
          }
          return todo
        })
      }
    })
  }

  render() {
    return (
      <>
        <TodoInput
          addTodo={this.addTodo}
          name="添加"
        />
        {
          this.state.isLoading
          ?
          <div>loading...</div>
          :
          <TodoList
            todos={this.state.todos}
            onCompeletedChange={this.onCompeletedChange}
          />
        }
      </>
    )
  }
}
