import React, { Component } from 'react'
import { connect } from 'react-redux'

import { CountBtn, CountDisplay } from './components'
import { increment, decrement } from './actions/counter'

class App extends Component {
  render() {
    return (
      <>
        <CountBtn onClick={this.props.increment}>+</CountBtn>
        <CountDisplay />
        <CountBtn onClick={this.props.decrement}>-</CountBtn>
      </>
    )
  }
}

export default connect(null, { increment, decrement })(App)