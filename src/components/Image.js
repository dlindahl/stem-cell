import {
  array,
  bool,
  number,
  object,
  oneOf,
  oneOfType,
  string
} from 'prop-types'
import Bit from './Bit'
import invariant from 'fbjs/lib/invariant'
import { objectFit, pxToRem, remToPx } from '../util/cssTools'
import React from 'react'

const DEFAULT_MARKDOWN_HEIGHT = 150
const DEFAULT_MARKDOWN_WIDTH = 350
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

const styles = {
  img: {
    height: '100%',
    width: '100%'
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden'
  },
  rounded: {
    borderRadius: '50%'
  }
}

const Image = (
  {
    contain,
    cover,
    css,
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
  const rootCss = [styles.root]
  const imgCss = []
  const fitTypes = { contain, cover, fill, scaleDown }
  const fitValues = Object.values(fitTypes).filter((x) => x || null)
  invariant(!(fitValues.length > 1), TOO_MANY_FIT_TYPES)
  if (fitValues.length === 1) {
    imgCss.push(styles.img)
  }
  Object.keys(objectFit).forEach((fitType) => {
    if (fitTypes[fitType]) {
      imgCss.push(objectFit[fitType])
    }
  })
  if (rounded) {
    imgCss.push(styles.rounded)
    rootCss.push(styles.rounded)
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
      css={[rootCss, css]}
      height={height}
      width={width}
      {...props}
    >
      <Bit as="img" css={imgCss} nativeProps={nativeProps}/>
    </Bit>
  )
}

Image.contextTypes = {
  baseFontSize: number,
  lineHeightRatio: number
}

Image.objectFitTypes = Object.keys(objectFit)

Image.propTypes = {
  alt: string,
  contain: bool,
  cover: bool,
  crossOrigin: oneOf(['anonymous', 'use-credentials']),
  css: oneOfType([array, object]),
  fill: bool,
  height: number,
  referrerPolicy: oneOf([
    'no-referrer',
    'no-referrer-when-downgrade',
    'origin',
    'origin-when-cross-origin',
    'unsafe-url'
  ]),
  rounded: bool,
  scaleDown: bool,
  size: number,
  sizes: string,
  src: string.isRequired,
  srcHeight: number,
  srcSet: string,
  srcSize: number,
  srcWidth: number,
  useMap: bool,
  width: number
}

// Transforms attributes from markup to expected values for the component
Image.fromMarkup = function fromMarkdown (attrs = {}) {
  return {
    ...attrs,
    height: undefined,
    srcHeight: parseInt(attrs.height, 10) || DEFAULT_MARKDOWN_HEIGHT,
    srcWidth: parseInt(attrs.width, 10) || DEFAULT_MARKDOWN_WIDTH,
    width: undefined
  }
}

export default Image
