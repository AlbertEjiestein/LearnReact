import React, {createRef, Component } from 'react'

export default class TodoInput extends Component {
  constructor(){
    super();
    this.state = {
      inputValue: ''
    };
    this.inputRef = createRef();
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleAddClick = this.handleAddClick.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }
  handleInputChange(e){
    this.setState({
      inputValue: e.target.value
    })
  }
  // 按键监听，判断回车提交
  handleKeyUp(e){
    if(e.keyCode == 13){
      this.handleAddClick()
    }
  }
  // 提交输入内容
  handleAddClick(){
    // 判断提交的是否为空
    if(this.state.inputValue === '') return;

    this.props.addTodo(this.state.inputValue);
    // 提交之后输入框清空并自动聚焦
    this.setState({
      inputValue: ''
    },()=>{
      this.inputRef.current.focus()
    })
  }
  render() {
    return (
      <div>
        <input type="text" 
          value={this.state.inputValue}
          onChange={this.handleInputChange}
          onKeyUp={this.handleKeyUp}
          ref={this.inputRef}
        />
        <input type="submit" onClick={this.handleAddClick} value={this.props.name}/>
      </div>
    )
  }
}
