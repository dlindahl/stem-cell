import ms from 'modularscale'

// Calculate box model values that conforms to the established Vertical Rhythm
export function boxModelRuleVerticalRhythm (
  size,
  { baseFontSize, lineHeightRatio }
) {
  if (size === undefined || size == null) {
    return size
  }
  const baseline = Math.floor(lineHeightRatio * baseFontSize)
  const retval = baseline * size
  // Compensate for rounding errors that make the return value not divisible
  const offset = retval % baseline
  return `${retval - offset}px`
}

// Calculate typographic values that conforms to the established Vertical Rhythm
export function typographyVerticalRhythm (
  size,
  { baseFontSize, lineHeightRatio, scaleRatio }
) {
  const fontSize = ms(size, scaleRatio)
  const multiplier = Math.ceil(fontSize / lineHeightRatio)
  return {
    fontSize: `${fontSize}rem`,
    lineHeight: boxModelRuleVerticalRhythm(multiplier, {
      baseFontSize,
      lineHeightRatio
    })
  }
}
