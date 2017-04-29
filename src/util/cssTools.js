import { css } from 'glamor'
import { processStyleName } from 'glamor/lib/CSSPropertyOperations'

const CSSVarDeclaration = /var\(--([^)]+)\)/

// Pre-defined object-fit rules
export const objectFit = 'contain cover fill scaleDown'.split(' ').reduce((
  rules,
  type
) => ({
  ...rules,
  [type]: css({
    objectFit: processStyleName(type)
  })
}), {})

// Returns the value of a given CSS Variable
export function getCSSVariableValue (varName, theme) {
  if (typeof document === 'undefined') {
    const div = document.createElement('div')
    div.style.color = varName
    const color = window.getComputedStyle(div).color
    if (!color) {
      throw new Error(
        `Could not get the value of the CSS variable "${varName}" from the DOM. Ensure that the variable has been properly defined and you are not introducing a typo into your reference.`
      )
    }
    return color
  }
  const colorKey = varName.replace(CSSVarDeclaration, '$1')
  let color = theme[':root'][colorKey] || ''
  if (!color) {
    throw new Error(
      `Could not get the value of the CSS variable "${varName}" from the current Stemcell theme`
    )
  }
  if (color.startsWith('var(--')) {
    color = getCSSVariableValue(color, theme)
  }
  return color
}

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
