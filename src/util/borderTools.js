import { capitalize, pick } from 'lodash'

/*
 * Offsets the element to compensate for the border width by subtracting the
 * pixel-based border widths from the rem-based margin widths. This provides the
 * benefit of re-aligning the element's content to the grid and forcing the
 * border to lay *outside* the grid.
 */
function marginOffset (borderProps, boxModelRules, side) {
  side = capitalize(side)
  const borderPropKey = `border${side}Width`
  const marginPropKey = `margin${side}`
  const rules = {}
  if (borderProps[borderPropKey]) {
    rules[marginPropKey] = boxModelRules[marginPropKey] || 'var(--baseline)'
    // eslint-disable-next-line max-len
    rules[
      marginPropKey
    ] = `calc(${rules[marginPropKey]} - ${borderProps[borderPropKey]}px)`
  }
  return rules
}

// Adjusts margin and padding to compensate for arbitrary border width values
export function compensateForBorder (boxModelRules, context, borderProps) {
  return {
    ...borderProps,
    ...marginOffset(borderProps, boxModelRules, 'top'),
    ...marginOffset(borderProps, boxModelRules, 'right'),
    ...marginOffset(borderProps, boxModelRules, 'bottom'),
    ...marginOffset(borderProps, boxModelRules, 'right'),
    ...pick(
      boxModelRules,
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft'
    )
  }
}
