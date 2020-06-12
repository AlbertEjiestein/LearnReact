import React, {Component} from 'react'
import WrapWithLoadData from './WrapWithLoadData'

class TextareaWithContent extends Component {
  render(){
    return <textarea value={this.props.data} onChange={() => {console.log('textarea change!')}}/>
  }
}

TextareaWithContent = WrapWithLoadData(TextareaWithContent, 'content')

export default TextareaWithContent