import { PropTypes } from 'react'
import Text from './Text'

const LEVELS = [
  'canon', // H1
  'trafalgar', // H2
  'doublePica', // H3
  'greatPrimer', // H4
  'pica', // H5
  'longPrimer' // H6
]

const Heading = ({ children, level, ...props }, { theme }) => {
  let headingLevel = level
  if (typeof level === 'number') {
    headingLevel = LEVELS[level - 1]
  }
  return <Text size={headingLevel} {...props}>{children}</Text>
}

Heading.levels = LEVELS

Heading.defaultProps = {
  level: 1
}

Heading.propTypes = {
  children: PropTypes.node,
  level: PropTypes.oneOfType([
    PropTypes.oneOf(LEVELS),
    PropTypes.oneOf([...Array(6).keys()].map((x) => x + 1))
  ]).isRequired
}

export default Heading
