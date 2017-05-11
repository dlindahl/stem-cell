import {
  array,
  bool,
  func,
  node,
  number,
  object,
  oneOf,
  oneOfType,
  string
} from 'prop-types'
import Bit from './Bit'
import React from 'react'
import { rem } from '../util/cssTools'
import { typographyVerticalRhythm as vr } from '../util/verticalRhythm'

const styles = {
  inlineTextFlow: {
    marginRight: '1ch'
  }
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

const Text = (
  { as, children, css, inline, size, ...props },
  { matchType, ...context }
) => {
  let typographyCss
  let inlineCss
  if (!as && inline) {
    as = 'span'
  }
  if (inline) {
    inlineCss = styles.inlineTextFlow
  }
  if (TYPOGRAPHY[size]) {
    typographyCss = matchType(
      vr(TYPOGRAPHY[size], context),
      context,
      defaultMatchType
    )
  }
  return (
    <Bit as={as} css={[inlineCss, typographyCss, css]} {...props}>
      {children}
    </Bit>
  )
}

Text.contextTypes = {
  baseFontSize: number,
  lineHeightRatio: number,
  matchType: func,
  scaleRatio: oneOfType([number, string])
}

Text.defaultProps = {
  inline: true
}

Text.propTypes = {
  as: oneOfType([string, func]),
  children: node,
  css: oneOfType([array, object]),
  inline: bool,
  size: oneOf(Object.keys(TYPOGRAPHY))
}

Text.sizes = Object.keys(TYPOGRAPHY)

export default Text
