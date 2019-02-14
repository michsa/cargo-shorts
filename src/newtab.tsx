import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/app'
import backgroundStore from './store'

ReactDOM.render(
  <Provider store={backgroundStore}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
