import {
  array,
  bool,
  func,
  node,
  number,
  object,
  oneOfType,
  string
} from 'prop-types'
import { boxModelRuleVerticalRhythm as vr } from '../util/verticalRhythm'
import { compensateForBorder } from '../util/borderTools'
import { css as glamor } from 'glamor'
import { createElement } from 'react'
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
  baseFontSize: number,
  lineHeightRatio: number,
  scaleRatio: oneOfType([number, string]),
  theme: object
}

Bit.defaultProps = {
  as: 'div',
  className: '',
  nativeProps: {}
}

Bit.propTypes = {
  as: oneOfType([string, func]),
  borderBottomLeftRadius: oneOfType([number, string]),
  borderBottomRadius: oneOfType([number, string]),
  borderBottomRightRadius: oneOfType([number, string]),
  borderBottomStyle: string,
  borderBottomWidth: number,
  borderHorizontalWidth: number,
  borderLeftStyle: string,
  borderLeftWidth: number,
  borderRadius: oneOfType([number, string]),
  borderRightStyle: string,
  borderRightWidth: number,
  borderStyle: string,
  borderTopLeftRadius: oneOfType([number, string]),
  borderTopRadius: oneOfType([number, string]),
  borderTopRightRadius: oneOfType([number, string]),
  borderTopStyle: string,
  borderTopWidth: number,
  borderVertical: number,
  borderWidth: number,
  bottom: number,
  children: node,
  className: string,
  css: oneOfType([array, object]),
  height: number,
  interactive: bool,
  left: number,
  margin: number,
  marginBottom: number,
  marginHorizontal: number,
  marginLeft: number,
  marginRight: number,
  marginTop: number,
  marginVertical: number,
  maxHeight: number,
  maxWidth: number,
  minHeight: number,
  minWidth: number,
  nativeProps: object,
  padding: number,
  paddingBottom: number,
  paddingHorizontal: number,
  paddingLeft: number,
  paddingRight: number,
  paddingTop: number,
  paddingVertical: number,
  right: number,
  top: number,
  width: number
}

export default Bit
