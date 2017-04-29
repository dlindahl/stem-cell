import React, { Component, PropTypes } from 'react'
import GlobalStylesheet from './GlobalStylesheet'
import defaultTheme from '../themes/default'

const boxResetBaseRules = {
  border: 0,
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  fontSize: '100%',
  fontWeight: 'inherit',
  margin: 0,
  padding: 0,
  verticalAlign: 'baseline'
}
const boxResetRules = {
  // http://www.paulirish.com/2012/box-sizing-border-box-ftw/
  '*': boxResetBaseRules,
  '*:after': boxResetBaseRules,
  '*:before': boxResetBaseRules
}

const inputRuleScoe = `input[type=button], button, input[type=submit], input[type=reset], input[type=file]`

const docResetRules = {
  /* eslint-disable sort-keys */
  html: {
    minHeight: '100%'
  },
  body: {
    // System font https://medium.com/designing-medium/system-shock-6b1dc6d6596f
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
  }
  /* eslint-enable sort-keys */
}

const resetCssRules = {
  /* eslint-disable sort-keys */
  [inputRuleScoe]: {
    margin: 0,
    padding: 0,
    font: 'inherit'
  },
  code: {
    fontFamily: 'monospace'
  },
  'ol, ul': {
    listStyle: 'none'
  },
  table: {
    borderCollapse: 'collapse',
    borderSpacing: 0
  }
  /* eslint-enable sort-keys */
}

const themeRules = {
  // A: {
  //   Color: 'var(--linkColor)'
  // },
  html: {
    backgroundColor: 'var(--backgroundColor)',
    color: 'var(--textColor)'
  }
}

export default class ThemeProvider extends Component {
  static childContextTypes = {
    matchType: PropTypes.func,
    theme: PropTypes.object
  };
  static defaultProps = {
    cssReset: true,
    docReset: true,
    theme: defaultTheme
  };
  static propTypes = {
    children: PropTypes.node,
    cssReset: PropTypes.bool,
    docReset: PropTypes.bool,
    matchType: PropTypes.func,
    theme: PropTypes.object
  };
  getChildContext () {
    return {
      matchType: this.props.matchType,
      theme: this.props.theme
    }
  }
  render () {
    let rules = [boxResetRules, this.props.theme, themeRules]
    if (this.props.cssReset) {
      rules = rules.concat(resetCssRules)
    }
    if (this.props.docReset) {
      rules = rules.concat(docResetRules)
    }
    return (
      <GlobalStylesheet rules={rules}>
        {this.props.children}
      </GlobalStylesheet>
    )
  }
}
