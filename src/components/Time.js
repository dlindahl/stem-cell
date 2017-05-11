import ago from 's-ago'
import { bool, number, object, oneOfType, string } from 'prop-types'
import dateformat from 'dateformat'
import Text from './Text'
import React from 'react'

const Time = ({ dateTime, format, relative, ...props }) => {
  if (!dateTime) {
    return null
  }
  if (typeof dateTime !== 'object') {
    dateTime = new Date(dateTime)
  }
  let text
  if (relative) {
    text = ago(dateTime)
  } else {
    text = dateformat(dateTime, format)
  }
  return (
    <Text as="time" dateTime={dateTime.toISOString()} {...props}>
      {text}
    </Text>
  )
}

Time.defaultProps = {
  format: 'yyyy-mm-dd',
  relative: false
}

Time.propTypes = {
  dateTime: oneOfType([number, object, string]),
  format: string,
  relative: bool
}

export default Time
