import React, { Component } from 'react'

import WrapWithLoadData from './WrapWithLoadData'

class InputWithUserName extends Component {
  render () {
    return <input value={this.props.data} onChange={() => {console.log('input change!')}}/>
  }
}

InputWithUserName = WrapWithLoadData(InputWithUserName, 'username')
export default InputWithUserName