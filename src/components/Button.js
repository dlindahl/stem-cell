import { array, node, object, oneOfType } from 'prop-types'
import Text from './Text'
import React from 'react'

const styles = {
  baselineRealignment: {
    verticalAlign: 'bottom'
  },
  inlineTextFlow ({ size }) {
    switch (size) {
      case 'pica':
      case 'body':
      case 'longPrimer':
      case 'brevier':
      case 'minion':
        return styles.baselineRealignment
      default:
        return {}
    }
  },
  root: {
    cursor: 'pointer',
    textDecoration: 'none',
    verticalAlign: 'middle'
  }
}

const Button = ({ css, children, ...props }, { theme }) => (
  <Text
    as="button"
    css={[styles.root, styles.inlineTextFlow(props), css]}
    {...props}
  >
    {children}
  </Text>
)

Button.contextTypes = {
  theme: object
}

Button.propTypes = {
  children: node,
  css: oneOfType([array, object])
}

export default Button
