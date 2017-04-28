import Bit from './Bit'
import { css } from 'glamor'
import React, { PropTypes } from 'react'
import Text from './Text'

const style = {
  block: css({
    display: 'block'
  }),
  inline: css({
    /*
     * Needed to normalize the line-height of adjacent inline elements. Without
     * this, the code tag is ~2px taller than the explicitly set line-height.
     * See also http://stackoverflow.com/questions/27638527/how-can-i-mix-vertically-centered-elements-with-different-font-sizes-and-retain
     */
    lineHeight: '1em'
  })
}

const Code = ({ block, className, ...props }) => {
  if (block || (className && className.includes('hljs'))) {
    return (
      <Bit
        {...props}
        as="code"
        className={`${css(style.block)} ${className}`}
        padding={1}
      />
    )
  }
  return (
    <Text
      {...props}
      as="code"
      className={`${css(style.inline)} ${className}`}
    />
  )
}

Code.defaultProps = {
  block: false
}

Code.propTypes = {
  block: PropTypes.bool,
  className: PropTypes.string
}

export default Code
