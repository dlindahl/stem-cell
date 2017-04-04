export function px (value, baseFontSize) {
  if (typeof value === 'number') {
    return value
  }
  if (value.endsWith('rem')) {
    return parseFloat(value, 10) * baseFontSize
  }
  throw new Error(`Do not know how to convert ${value} into pixels.`)
}

export function rem (value, baseFontSize) {
  if (typeof value === 'string') {
    if (value.endsWith('rem')) {
      return parseFloat(value, 10)
    }
    if (value.endsWith('px')) {
      return parseFloat(value, 10) / baseFontSize
    }
  }
  throw new Error(`Do not know how to convert ${value} into rems.`)
}
