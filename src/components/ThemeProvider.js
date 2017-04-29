import React, { Component, PropTypes } from 'react'
import GlobalStylesheet from './GlobalStylesheet'

const boxResetBaseRules = {
  boxSizing: 'border-box',
  fontFamily: 'inherit',
  fontWeight: 'inherit',
  margin: 0,
  padding: 0
}
const boxResetRules = {
  // http://www.paulirish.com/2012/box-sizing-border-box-ftw/
  '*': boxResetBaseRules,
  '*:after': boxResetBaseRules,
  '*:before': boxResetBaseRules
}

const resetRuleScope = `html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video`

const inputRuleScoe = `input[type=button], button, input[type=submit], input[type=reset], input[type=file]`

const docResetRules = {
  /* eslint-disable sort-keys */
  html: {
    minHeight: '100%'
  },
  'html, body': {
    margin: 0,
    padding: 0
  },
  body: {
    // System font https://medium.com/designing-medium/system-shock-6b1dc6d6596f
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif'
  }
  /* eslint-enable sort-keys */
}

const resetCssRules = {
  /* eslint-disable sort-keys */
  [resetRuleScope]: {
    border: 0,
    fontSize: '100%',
    margin: 0,
    padding: 0,
    verticalAlign: 'baseline'
  },
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

export default class ThemeProvider extends Component {
  static childContextTypes = {
    matchType: PropTypes.func
  };
  static defaultProps = {
    cssReset: true,
    docReset: true
  };
  static propTypes = {
    children: PropTypes.node,
    cssReset: PropTypes.bool,
    docReset: PropTypes.bool,
    matchType: PropTypes.func
  };
  getChildContext () {
    return {
      matchType: this.props.matchType
    }
  }
  render () {
    let rules = {
      ...boxResetRules
    }
    if (this.props.cssReset) {
      rules = {
        ...rules,
        ...resetCssRules
      }
    }
    if (this.props.docReset) {
      rules = {
        ...rules,
        ...docResetRules
      }
    }
    return (
      <GlobalStylesheet rules={rules}>
        {this.props.children}
      </GlobalStylesheet>
    )
  }
}
