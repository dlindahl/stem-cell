import { darkenPalette, lightenPalette } from '../util/themeTools'
import { fromPairs, sortBy, toPairs } from 'lodash'

// From https://coolors.co/007acc-46be77-8c8d91-dccca3-824c71
const baseColorPalette = {
  neutralColor: '#8C8D91',
  /* eslint-disable sort-keys */
  primaryColor: '#007acc',
  secondaryColor: '#46BE77',
  tertiaryColor: '#dccca3',
  quaternaryColor: '#824c71'
  /* eslint-disable sort-keys */
}

// Sort color names for aesthetic reasons
const colorPalette = fromPairs(
  sortBy(
    toPairs({
      ...lightenPalette(baseColorPalette),
      ...baseColorPalette,
      ...darkenPalette(baseColorPalette)
    }),
    0
  )
)

const namedColors = {
  backgroundColor: 'var(--neutralColor-PureLight)',
  buttonColor: 'var(--primaryColor-Dark)',
  linkColor: 'var(--secondaryColor)'
}

module.exports = {
  ':root': {
    ...colorPalette,
    ...namedColors
  }
}
