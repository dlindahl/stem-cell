import { boolean, number, withKnobs } from '@kadira/storybook-addon-knobs'
import CssReset from './CssReset'
import Paragraph from './Paragraph'
import React from 'react'
import Rule from './Rule'
import { storiesOf } from '@kadira/storybook'
import VerticalRhythm from './VerticalRhythm'

storiesOf('Rule', module).addDecorator(withKnobs).add('Basic Settings', () => (
  <CssReset>
    <VerticalRhythm baseline={boolean('Show Baseline', true)}>
      <Paragraph>Lorem ipsum</Paragraph>
      <Rule
        marginBottom={number('Bottom Margin', 0)}
        marginTop={number('Top Margin', 0)}
      />
      <Paragraph>Lorem ipsum</Paragraph>
      <Paragraph>Lorem ipsum</Paragraph>
      <Paragraph>Lorem ipsum</Paragraph>
    </VerticalRhythm>
  </CssReset>
))
