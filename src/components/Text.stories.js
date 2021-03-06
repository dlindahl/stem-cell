import {
  boolean,
  select,
  text,
  withKnobs
} from '@kadira/storybook-addon-knobs'
import CssReset from './CssReset'
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import TextComponent from './Text'
import VerticalRhythm from './VerticalRhythm'

storiesOf('Text', module)
  .addDecorator(withKnobs)
  .addDecorator((story) => (
    <CssReset>
      <VerticalRhythm baseline>
        {story()}
      </VerticalRhythm>
    </CssReset>
  ))
  .add('Font Size', () => (
    <TextComponent size={select('Named Size', TextComponent.sizes, 'body')}>
      {text('Text', 'Lorem ipsum dolor sit amet.')}
    </TextComponent>
  ))
  .add('Block Rendering Box', () => {
    const size = select('Named Size', TextComponent.sizes, 'body')
    const block = boolean('Block Rendering Box', true)
    return (
      <div>
        <TextComponent block={block} size={size}>
          Preamble
        </TextComponent>
        <TextComponent block={block} size={size}>
          Block: {block.toString()} Size: {size}
        </TextComponent>
        <TextComponent block={block} size={size}>
          Epilogue
        </TextComponent>
      </div>
    )
  })
  .add('Inline Rendering Box', () => {
    const size = select('Named Size', TextComponent.sizes, 'body')
    const inline = boolean('Inline Rendering Box', true)
    return (
      <div>
        <TextComponent inline={inline} size={size}>
          Preamble
        </TextComponent>
        <TextComponent inline={inline} size={size}>
          Inline: {inline.toString()} Size: {size}
        </TextComponent>
        <TextComponent inline={inline} size={size}>
          Epilogue
        </TextComponent>
      </div>
    )
  })
