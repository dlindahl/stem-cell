import {
  boolean,
  select,
  text,
  withKnobs
} from '@kadira/storybook-addon-knobs'
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import TextComponent from './Text'
import ThemeProvider from './ThemeProvider'
import VerticalRhythm from './VerticalRhythm'

storiesOf('Text', module)
  .addDecorator(withKnobs)
  .addDecorator((story) => (
    <ThemeProvider>
      <VerticalRhythm baseline>
        {story()}
      </VerticalRhythm>
    </ThemeProvider>
  ))
  .add('Font Size', () => (
    <TextComponent size={select('Named Size', TextComponent.sizes, 'body')}>
      {text('Text', 'Lorem ipsum dolor sit amet.')}
    </TextComponent>
  ))
  .add('Rendering Box', () => {
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
