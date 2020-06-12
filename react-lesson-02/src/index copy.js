import React, {Component} from 'react'
import {render} from 'react-dom'

const context = React.createContext(0);

const {
  Provider,
  Consumer : CountConsumer
} = context;

class CountProvider extends Component {
  constructor(){
    super()
    this.state = {
      count: 0
    }
    this.onDecrement = this.onDecrement.bind(this);
    this.onIncrement = this.onIncrement.bind(this);
  }

  onDecrement(){
    this.setState({
      count: this.state.count - 1
    })
  }

  onIncrement(){
    this.setState({
      count: this.state.count + 1
    })
  }

  render(){
    return (
      <Provider value={{
        count: this.state.count,
        onDecrement: this.onDecrement,
        onIncrement: this.onIncrement
      }}>
        {this.props.children}
      </Provider>
    )
  }
}

class CountBtn extends Component {
  render(){
    return (
      <CountConsumer>
        {
          ({onDecrement,onIncrement}) => {
            return this.props.type === "decrement"
            ?
            <button onClick={onDecrement}>{this.props.children}</button>
            :
            <button onClick={onIncrement}>{this.props.children}</button>
          }
        }
      </CountConsumer>
    )
  }
}

class Counter extends Component {
  render(){
    return (
      <CountConsumer>
        {
          ({count}) => {
            return <span>{count}</span>
          }
        }
      </CountConsumer>
    )
  }
}

class App extends Component {
  render(){
    return (
      <>
        <CountBtn type="decrement">-</CountBtn>
        <Counter />
        <CountBtn type="increment">+</CountBtn>
      </>
    )
  }
}

render(<CountProvider>
  <App />
</CountProvider>,
document.getElementById('root')
)