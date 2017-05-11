import { boxModelRuleVerticalRhythm as vr } from '../util/verticalRhythm'
import { compensateForBorder } from '../util/borderTools'
import { css as glamor } from 'glamor'
import { createElement, PropTypes } from 'react'
import { flattenDeep } from 'lodash'

// Generate CSS classnames from CSS props
function applyStyles (css) {
  return flattenDeep(css)
    .reduce(
      (classNames, declarations) => {
        if (!declarations) {
          return classNames
        }
        classNames.push(glamor(declarations))
        return classNames
      },
      []
    )
    .join(' ')
}

const Bit = (allProps, context) => {
  let { css, ...stylelessProps } = allProps
  const {
    as = 'div',

    bottom,
    left,
    right,
    top,

    size,
    minHeight,
    height = size,
    maxHeight,

    minWidth,
    width = size,
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

    nativeProps,
    ...props
  } = stylelessProps
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
  const boxModelStyles = {
    ...boxModelRules,
    ...borderWidthRules,
    borderBottomLeftRadius,
    borderBottomRightRadius,
    borderTopLeftRadius,
    borderTopRightRadius
  }
  if (!Array.isArray(css)) {
    css = [css]
  }
  css.unshift(boxModelStyles)
  return createElement(
    as,
    {
      className: `${applyStyles(css)} ${className}`,
      ...props,
      ...nativeProps
    },
    children
  )
}

Bit.contextTypes = {
  baseFontSize: PropTypes.number,
  lineHeightRatio: PropTypes.number,
  scaleRatio: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  theme: PropTypes.object
}

Bit.defaultProps = {
  as: 'div',
  className: '',
  nativeProps: {}
}

Bit.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
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
  borderHorizontalWidth: PropTypes.number,
  borderLeftStyle: PropTypes.string,
  borderLeftWidth: PropTypes.number,
  borderRadius: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  borderRightStyle: PropTypes.string,
  borderRightWidth: PropTypes.number,
  borderStyle: PropTypes.string,
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
  className: PropTypes.string,
  css: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  height: PropTypes.number,
  interactive: PropTypes.bool,
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
