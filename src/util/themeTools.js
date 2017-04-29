import { darken, lighten } from './colorTheory'
import { reduce } from 'lodash'

export function darkenPalette (colorPalette) {
  return reduce(
    colorPalette,
    (darkenedPalette, value, name) => ({
      ...darkenedPalette,
      [`${name}-Dark`]: darken(value, 2.5),
      [`${name}-Darker`]: darken(value, 5),
      [`${name}-Darkest`]: darken(value, 7.5),
      [`${name}-PureDark`]: darken(value, 8.75)
    }),
    {}
  )
}

export function lightenPalette (colorPalette) {
  return reduce(
    colorPalette,
    (lightenedPalette, value, name) => ({
      ...lightenedPalette,
      [`${name}-Light`]: lighten(value, 2.5),
      [`${name}-Lighter`]: lighten(value, 5),
      [`${name}-Lightest`]: lighten(value, 7.5),
      [`${name}-PureLight`]: lighten(value, 8.75)
    }),
    {}
  )
}
