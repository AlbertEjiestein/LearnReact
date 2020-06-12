import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'mobx-react'

import App from './App'
import counterStore from './store'

render(
  <Provider counter={counterStore}>
    <App />
  </Provider>,
  document.querySelector('#root')
)
