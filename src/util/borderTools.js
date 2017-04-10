import { pick } from 'lodash'

/*
 * Offsets the element to compensate for the border width by subtracting the
 * vertical border widths from the vertical positioning values. This provides
 * the benefit of re-aligning the element's content to the grid and forcing the
 * border to lay *outside* the grid. Using relative positioning allows these
 * offsets to work better when margin collapsing is at play.
 */
function borderOffset ({ borderBottomWidth, borderTopWidth }, boxModelRules) {
  const offsets = {}
  if (borderTopWidth) {
    offsets.position = 'relative'
    offsets.top = boxModelRules.top || 0 - borderTopWidth
    offsets.marginBottom = parseInt(boxModelRules.marginBottom || 0, 10) -
      borderTopWidth
  }
  if (borderBottomWidth) {
    offsets.position = 'relative'
    offsets.marginBottom = (offsets.marginBottom ||
      boxModelRules.marginBottom ||
      0) - borderBottomWidth
  }
  return {
    ...boxModelRules,
    ...offsets
  }
}

// Adjusts margin and padding to compensate for arbitrary border width values
export function compensateForBorder (boxModelRules, context, borderProps) {
  return {
    ...borderProps,
    ...borderOffset(borderProps, boxModelRules),
    ...pick(
      boxModelRules,
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft'
    )
  }
}
