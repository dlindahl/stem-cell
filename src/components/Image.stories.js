import {
  boolean,
  number,
  select,
  text,
  withKnobs
} from '@kadira/storybook-addon-knobs'
import CssReset from './CssReset'
import { storiesOf } from '@kadira/storybook'
import Image from './Image'
import React from 'react'
import VerticalRhythm from './VerticalRhythm'

storiesOf('Image', module)
  .addDecorator(withKnobs)
  .addDecorator((story, context) => (
    <CssReset>
      <VerticalRhythm baseline>
        {story()}
      </VerticalRhythm>
    </CssReset>
  ))
  .add('Basic Image', () => {
    const h = number('Source Height', 150)
    const w = number('Source Width', 350)
    const src = text('Source URL', `https://placehold.it/${w}x${h}`)
    return <Image src={src} srcHeight={h} srcWidth={w}/>
  })
  .add('Container Dimensions', () => {
    const h = number('Source Height', 150)
    const w = number('Source Width', 350)
    const src = text('Source URL', `https://placehold.it/${w}x${h}`)
    return (
      <Image
        height={number('Container Height', 7)}
        src={src}
        srcHeight={h}
        srcWidth={w}
        width={number('Container Width', 16)}
      />
    )
  })
  .add('Object Fit', () => {
    const fitType = select('Object Fit', [''].concat(Image.objectFitTypes), '')
    let fitProps = {}
    if (fitType) {
      fitProps = { [fitType]: true }
    }
    return (
      <Image
        {...fitProps}
        src="https://placehold.it/350x150"
        srcHeight={150}
        srcWidth={350}
      />
    )
  })
  .add('Dimension Equality', () => {
    const fitType = select('Object Fit', [''].concat(Image.objectFitTypes), '')
    let fitProps = {}
    if (fitType) {
      fitProps = { [fitType]: true }
    }
    const srcSize = number('Source Size', 150)
    const src = text(
      'Source URL',
      `https://placehold.it/${srcSize}x${srcSize}`
    )
    return (
      <Image
        {...fitProps}
        rounded={boolean('Rounded', false)}
        size={number('Container Size', 6)}
        src={src}
        srcSize={srcSize}
      />
    )
  })
