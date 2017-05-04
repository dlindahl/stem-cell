import {
  createMarkupForStyles,
  processStyleName
} from 'glamor/lib/CSSPropertyOperations'

// Pre-defined object-fit rules
export const objectFit = 'contain cover fill scaleDown'.split(' ').reduce((
  rules,
  type
) => ({
  ...rules,
  [type]: {
    objectFit: processStyleName(type)
  }
}), {})

// Convert `value` to a px-based Number
export function px (value, baseFontSize) {
  if (typeof value === 'number') {
    return value
  }
  if (value.endsWith('rem')) {
    return parseFloat(value, 10) * baseFontSize
  }
  if (value.endsWith('px')) {
    return parseFloat(value, 10)
  }
  throw new Error(`Do not know how to convert ${value} into pixels.`)
}

export function pxToRem (value, { baseFontSize, lineHeightRatio }) {
  return Math.floor(parseInt(value, 10) / baseFontSize / lineHeightRatio)
}

// Convert `value` to a rem-based Number
export function rem (value, baseFontSize) {
  if (typeof value === 'string') {
    if (value.endsWith('rem')) {
      return parseFloat(value, 10)
    }
    if (value.endsWith('px')) {
      return parseFloat(value, 10) / baseFontSize
    }
  }
  if (typeof value === 'number') {
    return value / baseFontSize
  }
  throw new Error(`Do not know how to convert ${value} into rems.`)
}

export function remToPx (value, { baseFontSize }) {
  return Math.floor(parseInt(value, 10) * baseFontSize)
}

export function serializeCssVars (scope, rules) {
  if (!scope) {
    return ''
  }
  if (scope === ':root') {
    rules = toCssVar(rules)
  }
  return `${scope} { ${createMarkupForStyles(rules)} }`
}

export function toCssVar (obj) {
  return Object.keys(obj).reduce(
    (vars, key) => ({
      ...vars,
      [`--${key}`]: obj[key]
    }),
    {}
  )
}
