import Bit from './Bit'
import React, { PropTypes } from 'react'
import Text from './Text'

const style = {
  block: {
    display: 'block'
  },
  inline: {
    /*
     * Needed to normalize the line-height of adjacent inline elements. Without
     * this, the code tag is ~2px taller than the explicitly set line-height.
     * See also http://stackoverflow.com/questions/27638527/how-can-i-mix-vertically-centered-elements-with-different-font-sizes-and-retain
     */
    lineHeight: '1em'
  }
}

const Code = ({ block, className, ...props }) => {
  if (block || className.includes('hljs')) {
    return (
      <Bit
        {...props}
        as="code"
        className={className}
        css={style.block}
        padding={1}
      />
    )
  }
  return <Text {...props} as="code" className={className} css={style.inline}/>
}

Code.defaultProps = {
  block: false,
  className: ''
}

Code.propTypes = {
  block: PropTypes.bool,
  className: PropTypes.string
}

export default Code
