import Bit from './Bit'
import { css } from 'glamor'
import React, { PropTypes } from 'react'
import { rem } from '../util/cssTools'
import { typographyVerticalRhythm as vr } from '../util/verticalRhythm'

const style = {
  inlineTextFlow: css({
    marginRight: '1ch'
  })
}

/*
 * Default CSS rules for type hierarchy based on BBC's GEL
 * (http://www.bbc.co.uk/gel/guidelines/typography)
 */
const TYPOGRAPHY = {
  /* eslint-disable sort-keys */
  canon: 4,
  trafalgar: 3,
  doublePica: 2,
  greatPrimer: 1,
  pica: 0,
  body: null, // NO-OP
  longPrimer: -1,
  brevier: -2,
  minion: -3

  /* eslint-enable sort-keys */
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
  { as, children, className, inline, size, ...props },
  { matchType = defaultMatchTypeRunner, ...context }
) => {
  let typeClassName
  let inlineClassName
  if (!as && inline) {
    as = 'span'
  }
  if (inline) {
    inlineClassName = style.inlineTextFlow
  }
  if (TYPOGRAPHY[size]) {
    typeClassName = css(
      matchType(vr(TYPOGRAPHY[size], context), context, defaultMatchType)
    )
  }
  return (
    <Bit
      as={as}
      className={`${css(inlineClassName, typeClassName)} ${className}`}
      {...props}
    >
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

Text.defaultProps = {
  inline: true
}

Text.propTypes = {
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  children: PropTypes.node,
  className: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  inline: PropTypes.bool,
  size: PropTypes.oneOf(Object.keys(TYPOGRAPHY))
}

Text.sizes = Object.keys(TYPOGRAPHY)

export default Text
