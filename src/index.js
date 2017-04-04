import App from './App'
import ReactDOM from 'react-dom'
import { css } from 'glamor'

css.global('html, body', {
  margin: 0,
  padding: 0
})

ReactDOM.render(<App/>, document.getElementById('root'))
