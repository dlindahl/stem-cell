import Bit from './Bit'
import { boxModelRuleVerticalRhythm as vr } from '../util/verticalRhythm'
import React, { PropTypes } from 'react'

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
    marginBottom: vr(marginBottom, context) - size,
    marginTop: vr(marginTop, context)
  }
  return (
    <Bit
      as="hr"
      css={[style, css]}
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

Rule.defaultProps = { size: 1 }

Rule.propTypes = {
  css: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
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
