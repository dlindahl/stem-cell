import { Children, cloneElement, Component, PropTypes } from 'react'
import { css } from 'glamor'

const resetRules = {
  boxSizing: 'border-box',
  fontFamily: 'sans-serif',
  fontWeight: 'normal',
  margin: 0,
  padding: 0
}
const resetCss = css({
  '&:after': resetRules,
  '&:before': resetRules,
  ...resetRules
})

export default class ThemeProvider extends Component {
  static childContextTypes = {
    matchType: PropTypes.func
  };
  static propTypes = {
    children: PropTypes.node,
    matchType: PropTypes.func
  };
  getChildContext () {
    return {
      matchType: this.props.matchType
    }
  }
  render () {
    return cloneElement(Children.only(this.props.children), {
      className: resetCss
    })
  }
}
