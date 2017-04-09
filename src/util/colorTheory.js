import Color from 'color'
import ms from 'modularscale'
import { minBy, pick } from 'lodash'

/*
 * Based on the blog post:
 *
 *   https://medium.com/@erikdkennedy/color-in-ui-design-a-practical-framework-e18cacd97f9e
 *
 * The article does not prescribe an exact algorithum for adjusting the
 * individual color values, so I reached for the modularscale module as a
 * starting point. Changing the "step" introduces more variation between
 * adjustments and choosing a different ratio scale can increase or decrease
 * the amounts between those steps.
 */

// Max Hue points in 30-degree increments
const HUES = {
  /* eslint-disable sort-keys */
  red: 0,
  yellow: 60,
  green: 120,
  cyan: 180,
  blue: 140,
  magenta: 300
  /* eslint-enable sort-keys */
}
// Hues to shift towards to decrease perceived luminance
const DARK_HUES = ['red', 'green', 'blue']
// Hues to shift towards to increase perceived luminance
const LIGHT_HUES = ['yellow', 'cyan', 'magenta']

// Return the nearest max hue point for a given hue value
function nearestHue (hue, variations) {
  const nearest = minBy(Object.keys(pick(HUES, ...variations)), (h) =>
    Math.abs(hue - HUES[h]))
  return HUES[nearest]
}

// Shift perceived luminance towards or away from a specific max hue value
function shiftLuminosity (hue, shiftAmount, huePoints) {
  const hueShift = nearestHue(hue, huePoints)
  if (hueShift > hue) {
    return hue - shiftAmount
  }
  return hue + shiftAmount
}

function lowerLuminosity (hue, raiseAmount) {
  return shiftLuminosity(hue, raiseAmount, DARK_HUES)
}

function raiseLuminosity (hue, raiseAmount) {
  return shiftLuminosity(hue, raiseAmount, LIGHT_HUES)
}

export function darken (baseColor, steps) {
  if (!baseColor) {
    return baseColor
  }
  if (baseColor.startsWith('var(--')) {
    console.warn(
      `TODO: Support CSS Variables by appending a prefix such as '--darken-n'`
    )
    return baseColor
  }
  const c = Color(baseColor)
  const delta = ms(steps) / 100
  const newSaturation = c.saturationv() + c.saturationv() * delta
  const newValue = c.value() - c.value() * delta

  return c
    .alpha(1.0)
    .hue(lowerLuminosity(c.hue(), delta))
    .saturationv(newSaturation)
    .value(newValue)
    .hsl()
    .string()
}

/*
 * Convenience method for encapsulating the logic for generating a color
 * derivative used when an element is focused by the user
 */
export function focusColor (baseColor) {
  return lighten(baseColor, 5)
}

/*
 * Convenience method for encapsulating the logic for generating a color
 * derivative used when an element is hovered over by the user
 */
export function hoverColor (baseColor) {
  return darken(baseColor, 5)
}

export function lighten (baseColor, steps) {
  if (!baseColor) {
    return baseColor
  }
  if (baseColor.startsWith('var(--')) {
    console.warn(
      `TODO: Support CSS Variables by appending a prefix such as '--lighten-n'`
    )
    return baseColor
  }
  const c = Color(baseColor)
  const delta = ms(steps) / 100
  const newSaturation = c.saturationv() - c.saturationv() * delta
  const newValue = c.value() + c.value() * delta

  return c
    .alpha(1.0)
    .hue(raiseLuminosity(c.hue(), delta))
    .saturationv(newSaturation)
    .value(newValue)
    .hsl()
    .string()
}
