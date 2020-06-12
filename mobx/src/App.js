import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'

import { CountBtn, CountDisplay } from './components'

@inject(['counter'])
@observer
class App extends Component {
  render() {
    return (
      <>
        <CountBtn onClick={this.props.counter.increment}>+</CountBtn>
        <CountDisplay />
        <CountBtn onClick={this.props.counter.decrement}>-</CountBtn>
      </>
    )
  }
}

export default App