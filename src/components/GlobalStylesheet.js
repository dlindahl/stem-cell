import { Component, PropTypes } from 'react'
import { createMarkupForStyles } from 'glamor/lib/CSSPropertyOperations'
import { StyleSheet } from '../util/glamorMonkeyPatches'
import { toPairs } from 'lodash'

function serialize (scope, rules) {
  if (!scope) {
    return ''
  }
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
    rules: []
  };
  static propTypes = {
    children: PropTypes.node,
    rules: PropTypes.object
  };
  state = {
    globalRules: []
  };
  componentWillMount () {
    this.stylesheet = new StyleSheet()
    this.stylesheet.inject()
    const globalRules = toPairs(this.props.rules)
      .reduce((rules, [scope, rule]) => [...rules, serialize(scope, rule)], [])
      .map((rule) => this.stylesheet.insert(rule))
    this.setState({ globalRules })
  }
  componentWillReceiveProps (nextProps) {
    const nextRules = toPairs(nextProps.rules)
    const globalRules = Array.from(
      Array(Math.max(this.state.globalRules.length, nextRules.length))
    )
      .reduce(
        (rules, _, i) => {
          const [scope, rule] = nextRules[i]
          return [...rules, serialize(scope, rule)]
        },
        []
      )
      .map((rule, i) => {
        const sheetIdx = this.state.globalRules[i]
        if (sheetIdx === undefined) {
          return this.stylesheet.insert(rule)
        }
        this.stylesheet.replace(sheetIdx, rule)
        return sheetIdx
      })
    this.setState({ globalRules })
  }
  componentWillUnmount () {
    this.state.globalRules.forEach((sheetIdx) => {
      this.stylesheet.replace(sheetIdx, '')
    })
  }
  stylesheet = null;
  render () {
    return this.props.children
  }
}
