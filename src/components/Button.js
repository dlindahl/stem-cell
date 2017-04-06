import { css } from 'glamor'
import { focusColor, hoverColor } from '../util/colorTheory'
import Text from './Text'
import { PropTypes } from 'react'

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
  interactivity ({ color, backgroundColor }) {
    return css({
      ':focus': {
        backgroundColor: focusColor(backgroundColor),
        color: focusColor(color)
      },
      ':hover': {
        backgroundColor: hoverColor(backgroundColor),
        color: hoverColor(color)
      }
    })
  },
  root: css({
    cursor: 'pointer',
    verticalAlign: 'middle'
  })
}

const Button = ({ backgroundColor, color, children, ...props }) => (
  <Text
    as="button"
    backgroundColor={backgroundColor}
    className={css(
      style.root,
      style.inlineTextFlow(props),
      style.interactivity({ backgroundColor, color })
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
  color: PropTypes.string
}

export default Button
