import GlobalStylesheet from './GlobalStylesheet'
import React from 'react'

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

const inputRuleScope = `input[type=button], button, input[type=submit], input[type=reset], input[type=file]`

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
  [inputRuleScope]: {
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

const CssReset = (props) => (
  <GlobalStylesheet
    rules={[boxResetRules, resetCssRules, docResetRules]}
    {...props}
  />
)

export default CssReset
