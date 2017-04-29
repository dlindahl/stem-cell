import { compensateForBorder } from '../util/borderTools'
import { css } from 'glamor'
import { createElement, PropTypes } from 'react'
import { boxModelRuleVerticalRhythm as vr } from '../util/verticalRhythm'

const Bit = (
  {
    as = 'div',

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
    borderRadius,
    borderBottomRadius = borderRadius,
    borderTopRadius = borderRadius,
    borderBottomLeftRadius = borderBottomRadius,
    borderBottomRightRadius = borderBottomRadius,
    borderTopLeftRadius = borderTopRadius,
    borderTopRightRadius = borderTopRadius,

    padding,
    paddingVertical = padding,
    paddingHorizontal = padding,
    paddingTop = paddingVertical,
    paddingBottom = paddingVertical,
    paddingLeft = paddingHorizontal,
    paddingRight = paddingHorizontal,

    backgroundColor,
    color,

    nativeProps,
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
    borderBottomStyle,
    borderBottomWidth,
    borderLeftStyle,
    borderLeftWidth,
    borderRightStyle,
    borderRightWidth,
    borderTopStyle,
    borderTopWidth
  })
  /*
   * Merge all the styles and convert to string so that the `as` property can
   * interop with other 3rd party components
   */
  const boxModelClassName = css({
    ...boxModelRules,
    ...borderWidthRules,
    backgroundColor,
    borderBottomColor,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderLeftColor,
    borderRightColor,
    borderTopColor,
    borderTopLeftRadius,
    borderTopRightRadius,
    color
  })
  // TODO: Add stemcell version of cx for easy addition of various classes (or look if glamor has its own)
  return createElement(
    as,
    {
      className: `${boxModelClassName} ${className || ''}`,
      ...props,
      ...nativeProps
    },
    children
  )
}

Bit.contextTypes = {
  baseFontSize: PropTypes.number,
  lineHeightRatio: PropTypes.number,
  scaleRatio: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

Bit.defaultProps = {
  as: 'div',
  nativeProps: {}
}

Bit.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  backgroundColor: PropTypes.string,
  borderBottomColor: PropTypes.string,
  borderBottomLeftRadius: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  borderBottomRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  borderBottomRightRadius: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  borderBottomStyle: PropTypes.string,
  borderBottomWidth: PropTypes.number,
  borderColor: PropTypes.string,
  borderHorizontalWidth: PropTypes.number,
  borderLeftColor: PropTypes.string,
  borderLeftStyle: PropTypes.string,
  borderLeftWidth: PropTypes.number,
  borderRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  borderRightColor: PropTypes.string,
  borderRightStyle: PropTypes.string,
  borderRightWidth: PropTypes.number,
  borderStyle: PropTypes.string,
  borderTopColor: PropTypes.string,
  borderTopLeftRadius: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  borderTopRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  borderTopRightRadius: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  borderTopStyle: PropTypes.string,
  borderTopWidth: PropTypes.number,
  borderVertical: PropTypes.number,
  borderWidth: PropTypes.number,
  bottom: PropTypes.number,
  children: PropTypes.node,
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  color: PropTypes.string,
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
  nativeProps: PropTypes.object,
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
