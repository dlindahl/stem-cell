import { compensateForBorder } from '../util/borderTools'
import { css } from 'glamor'
import { PropTypes } from 'react'
import { boxModelRuleVerticalRhythm as vr } from '../util/verticalRhythm'

const styles = {
  root: css({
    overflow: 'hidden'
  })
}

const Bit = (
  {
    bottom,
    left,
    right,
    top,

    minHeight,
    height,
    maxHeight,

    minWidth,
    width,
    maxWidth,

    className,
    children,

    margin,
    marginVertical = margin,
    marginHorizontal = margin,
    marginTop = marginVertical,
    marginBottom = marginVertical,
    marginLeft = marginHorizontal,
    marginRight = marginHorizontal,

    borderColor,
    borderTopColor = borderColor,
    borderRightColor = borderColor,
    borderBottomColor = borderColor,
    borderLeftColor = borderColor,
    borderWidth = 0,
    borderTopWidth = borderWidth,
    borderBottomWidth = borderWidth,
    borderLeftWidth = borderWidth,
    borderRightWidth = borderWidth,
    borderStyle = 'solid',
    borderTopStyle = borderStyle,
    borderRightStyle = borderStyle,
    borderBottomStyle = borderStyle,
    borderLeftStyle = borderStyle,

    padding,
    paddingVertical = padding,
    paddingHorizontal = padding,
    paddingTop = paddingVertical,
    paddingBottom = paddingVertical,
    paddingLeft = paddingHorizontal,
    paddingRight = paddingHorizontal,

    backgroundColor,

    ...props
  },
  context
) => {
  const rhythmProps = {
    bottom,
    height,
    left,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    maxHeight,
    maxWidth,
    minHeight,
    minWidth,
    paddingBottom,
    paddingLeft,
    paddingRight,
    paddingTop,
    right,
    top,
    width
  }
  const boxModelRules = Object.keys(rhythmProps).reduce(
    (rules, propName) => ({
      ...rules,
      [propName]: vr(rhythmProps[propName], context)
    }),
    {}
  )
  const borderWidthRules = compensateForBorder(boxModelRules, context, {
    borderBottomColor,
    borderBottomStyle,
    borderBottomWidth,
    borderLeftColor,
    borderLeftStyle,
    borderLeftWidth,
    borderRightColor,
    borderRightStyle,
    borderRightWidth,
    borderTopColor,
    borderTopStyle,
    borderTopWidth
  })
  const boxModelClassName = css(
    {
      ...boxModelRules,
      ...borderWidthRules
    },
    styles.root,
    {
      backgroundColor
    },
    className
  )
  return (
    <div className={boxModelClassName} {...props}>
      {children}
    </div>
  )
}

Bit.contextTypes = {
  baseFontSize: PropTypes.number,
  lineHeightRatio: PropTypes.number,
  scaleRatio: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

Bit.propTypes = {
  backgroundColor: PropTypes.string,
  borderBottomColor: PropTypes.string,
  borderBottomStyle: PropTypes.string,
  borderBottomWidth: PropTypes.number,
  borderColor: PropTypes.string,
  borderHorizontalWidth: PropTypes.number,
  borderLeftColor: PropTypes.string,
  borderLeftStyle: PropTypes.string,
  borderLeftWidth: PropTypes.number,
  borderRightColor: PropTypes.string,
  borderRightStyle: PropTypes.string,
  borderRightWidth: PropTypes.number,
  borderStyle: PropTypes.string,
  borderTopColor: PropTypes.string,
  borderTopStyle: PropTypes.string,
  borderTopWidth: PropTypes.number,
  borderVertical: PropTypes.number,
  borderWidth: PropTypes.number,
  bottom: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.object,
  height: PropTypes.number,
  left: PropTypes.number,
  margin: PropTypes.number,
  marginBottom: PropTypes.number,
  marginHorizontal: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  marginVertical: PropTypes.number,
  maxHeight: PropTypes.number,
  maxWidth: PropTypes.number,
  minHeight: PropTypes.number,
  minWidth: PropTypes.number,
  padding: PropTypes.number,
  paddingBottom: PropTypes.number,
  paddingHorizontal: PropTypes.number,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingVertical: PropTypes.number,
  right: PropTypes.number,
  top: PropTypes.number,
  width: PropTypes.number
}

export default Bit
