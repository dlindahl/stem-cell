import React, { Component, PropTypes } from 'react'
import GlobalStylesheet from './GlobalStylesheet'

const boxResetBaseRules = {
  boxSizing: 'border-box',
  fontFamily: 'sans-serif',
  fontWeight: 'normal',
  margin: 0,
  padding: 0
}
const boxResetRules = {
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

const resetCssRules = {
  /* eslint-disable sort-keys */
  body: {
    height: '100%'
  },
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
    cssReset: true
  };
  static propTypes = {
    children: PropTypes.node,
    cssReset: PropTypes.bool,
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
        ...resetCssRules
      }
    }
    return (
      <GlobalStylesheet rules={rules}>
        {this.props.children}
      </GlobalStylesheet>
    )
  }
}
