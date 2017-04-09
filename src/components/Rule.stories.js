import {
  boolean,
  color,
  number,
  withKnobs
} from '@kadira/storybook-addon-knobs'
import Paragraph from './Paragraph'
import React from 'react'
import Rule from './Rule'
import { storiesOf } from '@kadira/storybook'
import ThemeProvider from './ThemeProvider'
import VerticalRhythm from './VerticalRhythm'

storiesOf('Rule', module).addDecorator(withKnobs).add('Basic Settings', () => (
  <ThemeProvider>
    <VerticalRhythm baseline={boolean('Show Baseline', true)}>
      <Paragraph>Lorem ipsum</Paragraph>
      <Rule
        backgroundColor={color('Color', 'black')}
        marginBottom={number('Bottom Margin', 0)}
        marginTop={number('Top Margin', 0)}
      />
      <Paragraph>Lorem ipsum</Paragraph>
      <Paragraph>Lorem ipsum</Paragraph>
      <Paragraph>Lorem ipsum</Paragraph>
    </VerticalRhythm>
  </ThemeProvider>
))
