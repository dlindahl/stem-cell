import { bool, string } from 'prop-types'
import React from 'react'
import Text from './Text'

const OrderedTagType = {
  [false]: 'ul',
  [true]: 'ol'
}

const List = ({ ordered, type, ...props }) => {
  if (!type) {
    if (ordered) {
      type = 'decimal'
    } else {
      type = 'disc'
    }
  }
  return (
    <Text
      as={OrderedTagType[Boolean(ordered)]}
      block
      css={[{ listStyleType: type }]}
      marginVertical={1}
      {...props}
    />
  )
}

List.propTypes = {
  ordered: bool,
  type: string
}

export default List
