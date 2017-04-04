import ms from 'modularscale'

// Calculate box model values that conforms to the established Vertical Rhythm
export function boxModelRuleVerticalRhythm (
  size,
  { baseFontSize, lineHeightRatio }
) {
  if (!size) {
    return null
  }
  return `${lineHeightRatio * size}rem`
}

// Calculate typographic values that conforms to the established Vertical Rhythm
export function typographyVerticalRhythm (
  size,
  { baseFontSize, lineHeightRatio, scaleRatio }
) {
  const fontSize = ms(size, scaleRatio)
  const multiplier = Math.ceil(fontSize / lineHeightRatio)
  // eslint-disable-next-line max-len
  const lineHeight = `${lineHeightRatio * multiplier}rem`
  return {
    fontSize: `${fontSize}rem`,
    lineHeight
  }
}
