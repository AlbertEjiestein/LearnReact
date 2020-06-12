import React, { Component } from 'react'

export default class TodoItem extends Component {
  constructor(props){
    super(props);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.state = {
      isCompletedText: '已完成作业'
    }
  }

  // 将props作为本组件的state
  static getDerivedStateFromProps(props){
    return {
      isCompletedText: props.completed ? '已完成作业' : '未完成作业'
    }
  }

  // 通过shouldComponentUpdate对props中的isCompleted进行深层比较，如果该组件props未改变，则不需要重新渲染
  shouldComponentUpdate(nextProps){
    console.log(nextProps,this.props)
    if(nextProps.completed === this.props.completed)
    {
      return false
    }
    return true
  }

  handleCheckboxChange(){
    this.props.onCompeletedChange(this.props.id)
  }

  render() {
    // console.log(this.http)
    const {
      completed,
      id
    } = this.props

    return (
      <ul>
        <input
          type="checkbox"
          checked={completed}
          onChange={this.handleCheckboxChange}
          id={id}
        />
        {/* <label htmlFor={id}>{this.props.title}{this.props.completed ? '  已完成作业': '  未完成作业'}</label> */}
        {/* 修改：将this.props.isCompleted作为本组件的state，方便调用 */}
        <label htmlFor={id}>{this.props.title}{this.state.isCompletedText}</label>
      </ul>
    )
  }
}
