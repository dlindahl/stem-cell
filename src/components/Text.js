/* eslint-disable react/forbid-component-props */
import Bit from './Bit'
import { css } from 'glamor'
import { PropTypes } from 'react'
import { rem } from '../util/cssTools'
import { typographyVerticalRhythm as vr } from '../util/verticalRhythm'

/*
 * Default CSS rules for type hierarchy based on BBC's GEL
 * (http://www.bbc.co.uk/gel/guidelines/typography)
 */
const TYPOGRAPHY = {
  body: null, // NO-OP
  brevier: -2,
  canon: 4,
  doublePica: 2,
  greatPrimer: 1,
  longPrimer: -1,
  minion: -3,
  pica: 0,
  trafalgar: 3
}

/*
 * A play on window.matchMedia but for typography. Applies additional rules
 * based on existing rules.
 */
function defaultMatchType (rules, { baseFontSize }) {
  if (rem(rules.fontSize, baseFontSize) > 2) {
    rules = {
      ...rules,
      letterSpacing: -1
    }
  }
  if (rem(rules.fontSize, baseFontSize) < 0.75) {
    rules = {
      ...rules,
      textTransform: 'uppercase'
    }
  }
  return rules
}

function defaultMatchTypeRunner (rules, context, mt) {
  return mt(rules, context)
}

const Text = (
  { as, children, size, ...props },
  { matchType = defaultMatchTypeRunner, ...context }
) => {
  let typeClassName
  if (TYPOGRAPHY[size]) {
    typeClassName = css(
      matchType(vr(TYPOGRAPHY[size], context), context, defaultMatchType)
    )
  }
  return (
    <Bit as={as} className={typeClassName} {...props}>
      {children}
    </Bit>
  )
}

Text.contextTypes = {
  baseFontSize: PropTypes.number,
  lineHeightRatio: PropTypes.number,
  matchType: PropTypes.func,
  scaleRatio: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}

Text.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  children: PropTypes.node,
  size: PropTypes.oneOf(Object.keys(TYPOGRAPHY))
}

Text.sizes = Object.keys(TYPOGRAPHY)

export default Text
