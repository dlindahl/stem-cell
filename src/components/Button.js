import Text from './Text'
import React, { PropTypes } from 'react'

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
  theme: PropTypes.object
}

Button.propTypes = {
  children: PropTypes.node,
  css: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

export default Button
