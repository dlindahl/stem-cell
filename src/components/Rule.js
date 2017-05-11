import { array, number, object, oneOfType } from 'prop-types'
import Bit from './Bit'
import { boxModelRuleVerticalRhythm as vr } from '../util/verticalRhythm'
import React from 'react'

const Rule = (
  {
    css,
    size,
    margin,
    marginVertical = margin,
    marginHorizontal = margin,
    marginTop = marginVertical,
    marginRight = marginHorizontal,
    marginBottom = marginVertical,
    marginLeft = marginHorizontal,
    ...props
  },
  context
) => {
  // Calculate vertical rhythm offset to compensate for HR height
  if (typeof marginBottom === 'undefined') {
    marginBottom = 1
  }
  if (typeof marginTop === 'undefined') {
    marginTop = 1
  }
  const style = {
    backgroundColor: '#aaa',
    height: size,
    /*
     * We have to manually calculate the vertical rhythm for the margin props
     * because of the math involved in calculating the line width. Size is
     * defined in pixels whereas marginBottom is defined in rhythm units. That
     * means that we pass in a calculated marginBottom offset into Bit. This
     * also means that we must manually calculate the other margin props because
     * as the left or right values change per instance from the user, it would
     * cause Glamor to generate a *new* class for the margin props but reuse a
     * previous rule for the color and offset. This causes the new box model
     * rules to have a higher CSS specificity which prevents the marginBottom
     * offset rule from overriding the base box props. Hopefully that makes
     * sense weeks from now...
     */
    marginBottom: vr(marginBottom, context) - size,
    marginLeft: vr(marginLeft, context),
    marginRight: vr(marginRight, context),
    marginTop: vr(marginTop, context)
  }
  return <Bit as="hr" css={[style, css]} {...props}/>
}

Rule.contextTypes = {
  baseFontSize: number,
  lineHeightRatio: number
}

Rule.defaultProps = { size: 1 }

Rule.propTypes = {
  css: oneOfType([array, object]),
  margin: number,
  marginBottom: number,
  marginHorizontal: number,
  marginLeft: number,
  marginRight: number,
  marginTop: number,
  marginVertical: number,
  size: number
}

export default Rule
