import { node, object, oneOfType, string } from 'prop-types'
import Bit from './Bit'
import Code from './Code'
import HTML from 'html-parse-stringify'
import React from 'react'
import reactify from '../util/reactify'
import Image from './Image'
import Rule from './Rule'
import Paragraph from './Paragraph'

const DEFAULT_MAPPINGS = {
  // TODO: Add stemcell components and add API endpoint for end-user mappings
  code: Code,
  hr: Rule,
  img: Image,
  p: Paragraph
}

// TODO: Move this to optional package?
const ComponentizeContent = ({ children, ...props }) => {
  if (!children) {
    return null
  }
  if (typeof children !== 'string') {
    return children
  }
  const ast = HTML.parse(`<div>${children}</div>`)
  const reparsedAst = reactify(ast, {
    mappings: DEFAULT_MAPPINGS
  })
  return (
    <Bit {...props}>
      {reparsedAst}
    </Bit>
  )
}

ComponentizeContent.propTypes = {
  children: node,
  className: oneOfType([object, string])
}

export default ComponentizeContent
