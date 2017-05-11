import { bool, func, node, oneOf, oneOfType, string } from 'prop-types'
import React from 'react'
import Text from './Text'

const LEVELS = [
  'canon', // H1
  'trafalgar', // H2
  'doublePica', // H3
  'greatPrimer', // H4
  'pica', // H5
  'longPrimer' // H6
]

const Heading = ({ as, children, inline, level, ...props }, { theme }) => {
  let headingLevel = level
  if (typeof level === 'number') {
    as = as || `h${level}`
    headingLevel = LEVELS[level - 1]
  } else if (typeof level === 'string' && LEVELS.includes(level)) {
    as = as || `h${LEVELS.indexOf(level) + 1}`
  }
  return <Text as={as} size={headingLevel} {...props}>{children}</Text>
}

Heading.levels = LEVELS

Heading.defaultProps = {
  level: 1
}

Heading.propTypes = {
  as: oneOfType([string, func]),
  children: node,
  level: oneOfType([
    oneOf(LEVELS),
    oneOf([...Array(6).keys()].map((x) => x + 1))
  ]).isRequired
}

export default Heading
