import { Component } from 'react'
import { css } from 'glamor'
import logo from './logo.svg'

const spin = css.keyframes('spin', {
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' }
})

const style = {
  container: css({
    textAlign: 'center'
  }),
  header: css({
    backgroundColor: '#222',
    color: 'white',
    height: 150,
    padding: 20
  }),
  intro: css({
    fontSize: 'large'
  }),
  logo: css({
    animation: `${spin} infinite 20s linear`,
    height: 80
  })
}

class App extends Component {
  render () {
    return (
      <div className={style.container}>
        <div className={style.header}>
          <img src={logo} className={style.logo} alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className={style.intro}>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}

export default App
