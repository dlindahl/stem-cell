import { Component, PropTypes } from 'react'
import { createMarkupForStyles } from 'glamor/lib/CSSPropertyOperations'
import { StyleSheet } from '../util/glamorMonkeyPatches'

function serialize (scope, rules) {
  if (scope === ':root') {
    rules = Object.keys(rules).reduce(
      (vars, key) => ({
        ...vars,
        [`--${key}`]: rules[key]
      }),
      {}
    )
  }
  return `${scope} { ${createMarkupForStyles(rules)} }`
}

export default class GlobalStylesheet extends Component {
  static defaultProps = {
    html: {},
    vars: {}
  };
  static propTypes = {
    children: PropTypes.node,
    html: PropTypes.object,
    vars: PropTypes.object
  };
  state = {
    cssVarRules: null,
    htmlRules: null
  };
  componentWillMount () {
    this.stylesheet = new StyleSheet()
    this.stylesheet.inject()
    const cssVarRules = serialize(':root', this.props.vars)
    const htmlRules = serialize('html', this.props.html)
    this.setState({
      cssVarRules: this.stylesheet.insert(cssVarRules),
      htmlRules: this.stylesheet.insert(htmlRules)
    })
  }
  componentWillReceiveProps (nextProps) {
    this.stylesheet.replace(
      this.state.cssVarRules,
      serialize(':root', nextProps.vars)
    )
    this.stylesheet.replace(
      this.state.htmlRules,
      serialize('html', nextProps.html)
    )
  }
  componentWillUnmount () {
    this.stylesheet.replace(this.state.cssVarRules, '')
    this.stylesheet.replace(this.state.htmlRules, '')
  }
  stylesheet = null;
  render () {
    return this.props.children
  }
}
