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
      borderBottomColor,
      borderLeftColor,
      borderRightColor,
      borderTopColor
    }
  ) {
    // TODO: make this re-usable for Links or move to Text and add `interactive` attribute which can add 'pointer'
    return css({
      ':focus': {
        backgroundColor: focusColor(backgroundColor),
        borderBottomColor: focusColor(borderBottomColor),
        borderLeftColor: focusColor(borderLeftColor),
        borderRightColor: focusColor(borderRightColor),
        borderTopColor: focusColor(borderTopColor),
        color: focusColor(color)
      },
      ':hover': {
        backgroundColor: hoverColor(backgroundColor),
        borderBottomColor: focusColor(borderBottomColor),
        borderLeftColor: focusColor(borderLeftColor),
        borderRightColor: focusColor(borderRightColor),
        borderTopColor: focusColor(borderTopColor),
        color: hoverColor(color)
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

const Button = ({ backgroundColor, className, color, children, ...props }) => (
  <Text
    as="button"
    backgroundColor={backgroundColor}
    className={css(
      style.root,
      style.inlineTextFlow(props),
      style.interactivity({ backgroundColor, color }),
      className
    )}
    color={color}
    {...props}
  >
    {children}
  </Text>
)

Button.defaultProps = {
  backgroundColor: 'silver',
  color: 'black'
}

Button.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  color: PropTypes.string
}

export default Button
