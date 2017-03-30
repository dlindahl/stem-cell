import App from './App'
import ReactDOM from 'react-dom'
import { css } from 'glamor'

css.global('body', {
  fontFamily: 'sans-serif',
  margin: 0,
  padding: 0
})

ReactDOM.render(<App />, document.getElementById('root'))
