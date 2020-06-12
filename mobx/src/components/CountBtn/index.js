import React, { Component } from 'react'
import { observer } from 'mobx-react'


@observer
class CountBtn extends Component {
  render() {
    return (
      <button onClick={this.props.onClick}>{this.props.children}</button>
    )
  }
}

export default CountBtn