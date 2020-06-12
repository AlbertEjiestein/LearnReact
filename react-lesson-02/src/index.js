import React, {Component} from 'react'
import {render} from 'react-dom'


import InputWithUserName from './components/InputWithUserName'
import  TextareaWithContent from './components/TextareaWithContent'

class App extends Component {
  render () {
    return (
      <div>
        用户名：<InputWithUserName />
        内容：<TextareaWithContent />
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))