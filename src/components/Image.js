import Bit from './Bit'
import { css } from 'glamor'
import invariant from 'fbjs/lib/invariant'
import { objectFit, pxToRem, remToPx } from '../util/cssTools'
import React, { PropTypes } from 'react'

const MISSING_DIMS = `The Image component requires a size or width/height value
in order to properly align the image to the vertical rhythm baseline. If the
image is equal in width and height, you can provide the dimensions as a grid
unit in a single size={2} attribute or as pixels using the srcSize={350}
attribute. If the image is of an unequal dimension, you can provide the
dimensions as a grid unit using width={16} and height={7} attributes or as
pixels using srcWidth={350} height={150} attributes.`
const TOO_MANY_FIT_TYPES = `You have provided multiple object-fit values (fill,
cover, contain, etc.) to an Image component. The Image component can only use a
single object-fit value at a time. Remove any unnecessary object-fit values or
set their values to 'false' i.e. fill={false}`

const style = {
  img: css({
    height: '100%',
    width: '100%'
  }),
  root: css({
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden'
  }),
  rounded: css({
    borderRadius: '50%'
  })
}

const Image = (
  {
    contain,
    cover,
    fill,
    scaleDown,

    rounded,

    alt,
    crossOrigin,
    referrerPolicy,
    sizes,
    useMap,

    src,
    srcSet,
    srcSize,
    srcHeight = srcSize,
    srcWidth = srcSize,

    size,
    height = size,
    width = size,
    ...props
  },
  context
) => {
  const rootClassNames = [style.root]
  const imgClassNames = []
  const fitTypes = { contain, cover, fill, scaleDown }
  const fitValues = Object.values(fitTypes).filter((x) => x || null)
  invariant(!(fitValues.length > 1), TOO_MANY_FIT_TYPES)
  if (fitValues.length === 1) {
    imgClassNames.push(style.img)
  }
  Object.keys(objectFit).forEach((fitType) => {
    if (fitTypes[fitType]) {
      imgClassNames.push(objectFit[fitType])
    }
  })
  if (rounded) {
    imgClassNames.push(style.rounded)
    rootClassNames.push(style.rounded)
  }
  if (fitValues.length === 0) {
    // Add whitespace around source image so that it fits w/o cropping or scaling
    height = height || pxToRem(srcHeight, context) + 1
    width = width || pxToRem(srcWidth, context) + 1
  }
  height = height || pxToRem(srcHeight, context)
  width = width || pxToRem(srcWidth, context)
  invariant(width && height, MISSING_DIMS)
  const nativeProps = {
    alt,
    crossOrigin,
    height: srcHeight || remToPx(height, context),
    referrerPolicy,
    sizes,
    src,
    srcSet,
    useMap,
    width: srcWidth || remToPx(width, context)
  }
  return (
    <Bit
      as="figure"
      className={css(...rootClassNames)}
      height={height}
      width={width}
      {...props}
    >
      <Bit
        as="img"
        className={css(...imgClassNames)}
        nativeProps={nativeProps}
      />
    </Bit>
  )
}

Image.contextTypes = {
  baseFontSize: PropTypes.number,
  lineHeightRatio: PropTypes.number
}

Image.objectFitTypes = Object.keys(objectFit)

Image.propTypes = {
  alt: PropTypes.string,
  contain: PropTypes.bool,
  cover: PropTypes.bool,
  crossOrigin: PropTypes.oneOf(['anonymous', 'use-credentials']),
  fill: PropTypes.bool,
  height: PropTypes.number,
  referrerPolicy: PropTypes.oneOf([
    'no-referrer',
    'no-referrer-when-downgrade',
    'origin',
    'origin-when-cross-origin',
    'unsafe-url'
  ]),
  rounded: PropTypes.bool,
  scaleDown: PropTypes.bool,
  size: PropTypes.number,
  sizes: PropTypes.string,
  src: PropTypes.string.isRequired,
  srcHeight: PropTypes.number,
  srcSet: PropTypes.string,
  srcSize: PropTypes.number,
  srcWidth: PropTypes.number,
  useMap: PropTypes.bool,
  width: PropTypes.number
}

export default Image
