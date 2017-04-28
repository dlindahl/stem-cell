import Bit from './Bit'
import { text, withKnobs } from '@kadira/storybook-addon-knobs'
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Code from './Code'
import Paragraph from './Paragraph'
import ThemeProvider from './ThemeProvider'
import VerticalRhythm from './VerticalRhythm'

storiesOf('Code', module)
  .addDecorator(withKnobs)
  .addDecorator((story) => (
    <ThemeProvider>
      <VerticalRhythm baseline>
        {story()}
      </VerticalRhythm>
    </ThemeProvider>
  ))
  .add('Default Settings', () => (
    <Paragraph>
      <Code>
        {text('Code', 'Lorem ipsum dolor sit amet.')}
      </Code>
    </Paragraph>
  ))
  .add('Multiline Block', () => (
    <Bit>
      <Paragraph>
        This feature makes more sense when combined with a syntax highlighting
        package like highlight.js
      </Paragraph>
      <Code block>
        {text('Code', 'Lorem ipsum dolor sit amet.')}
      </Code>
      <Paragraph>Follow-up text</Paragraph>
    </Bit>
  ))
