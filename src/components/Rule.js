import Bit from './Bit'
import { boxModelRuleVerticalRhythm as vr } from '../util/verticalRhythm'
import { css } from 'glamor'
import React, { PropTypes } from 'react'

const Rule = (
  {
    className,
    color,
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
  const style = css({
    height: size,
    marginBottom: `calc(${vr(marginBottom, context)} - ${size}px)`,
    marginTop: vr(marginTop, context)
  })
  return (
    <Bit
      as="hr"
      backgroundColor={color}
      className={`${style} ${className || ''}`}
      marginLeft={marginRight}
      marginRight={marginRight}
      marginTop={marginTop}
      {...props}
    />
  )
}

Rule.contextTypes = {
  baseFontSize: PropTypes.number,
  lineHeightRatio: PropTypes.number
}

Rule.defaultProps = { className: '', color: '#aaa', size: 1 }

Rule.propTypes = {
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  color: PropTypes.string,
  margin: PropTypes.number,
  marginBottom: PropTypes.number,
  marginHorizontal: PropTypes.number,
  marginLeft: PropTypes.number,
  marginRight: PropTypes.number,
  marginTop: PropTypes.number,
  marginVertical: PropTypes.number,
  size: PropTypes.number
}

export default Rule
