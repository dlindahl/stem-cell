import { css } from 'glamor'
import { focusColor, hoverColor } from '../util/colorTheory'
import Text from './Text'
import React, { PropTypes } from 'react'

const style = {
  baselineRealignment: css({
    verticalAlign: 'bottom'
  }),
  inlineTextFlow ({ size }) {
    switch (size) {
      case 'pica':
      case 'body':
      case 'longPrimer':
      case 'brevier':
      case 'minion':
        return style.baselineRealignment
      default:
        return {}
    }
  },
  interactivity (
    {
      color,
      backgroundColor,
      borderColor = color,
      borderBottomColor = borderColor,
      borderLeftColor = borderColor,
      borderRightColor = borderColor,
      borderTopColor = borderColor,
      theme
    }
  ) {
    // TODO: make this re-usable for Links or move to Text and add `interactive` attribute which can add 'pointer'
    return css({
      ':focus': {
        backgroundColor: focusColor(backgroundColor, theme),
        borderBottomColor: focusColor(borderBottomColor, theme),
        borderLeftColor: focusColor(borderLeftColor, theme),
        borderRightColor: focusColor(borderRightColor, theme),
        borderTopColor: focusColor(borderTopColor, theme),
        color: focusColor(color, theme)
      },
      ':hover': {
        backgroundColor: hoverColor(backgroundColor, theme),
        borderBottomColor: focusColor(borderBottomColor, theme),
        borderLeftColor: focusColor(borderLeftColor, theme),
        borderRightColor: focusColor(borderRightColor, theme),
        borderTopColor: focusColor(borderTopColor, theme),
        color: hoverColor(color, theme)
      }
    })
  },
  root: css({
    ':hover': {
      textDecoration: 'none'
    },
    cursor: 'pointer',
    verticalAlign: 'middle'
  })
}

const Button = (
  { backgroundColor, className, color, children, ...props },
  { theme }
) => (
  <Text
    as="button"
    backgroundColor={backgroundColor}
    className={css(
      style.root,
      style.inlineTextFlow(props),
      style.interactivity({ backgroundColor, color, theme }),
      className
    )}
    color={color}
    {...props}
  >
    {children}
  </Text>
)

Button.contextTypes = {
  theme: PropTypes.object
}

Button.defaultProps = {
  backgroundColor: 'var(--buttonColor)',
  color: 'var(--linkColor)'
}

Button.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  color: PropTypes.string
}

export default Button
