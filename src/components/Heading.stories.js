import CssReset from './CssReset'
import { number, select, text, withKnobs } from '@kadira/storybook-addon-knobs'
import Heading from './Heading'
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import VerticalRhythm from './VerticalRhythm'

storiesOf('Heading', module)
  .addDecorator(withKnobs)
  .addDecorator((story, context) => (
    <CssReset>
      <VerticalRhythm baseline>
        {story()}
      </VerticalRhythm>
    </CssReset>
  ))
  .add('Typographic Hierarchy', () => (
    <div>
      <Heading level={1}>Canon</Heading>
      <Heading level={2}>Trafalgar</Heading>
      <Heading level={3}>Double Pica</Heading>
      <Heading level={4}>Great Primer</Heading>
      <Heading level={5}>Pica</Heading>
      <Heading level={6}>Long Primer</Heading>
    </div>
  ))
  .add('Numerical Levels', () => (
    <Heading level={number('Level', 1)}>{text('Text', 'Text Here')}</Heading>
  ))
  .add('Named Levels', () => (
    <Heading level={select('Level', Heading.levels, 'canon')}>
      {text('Text', 'Text Here')}
    </Heading>
  ))
  .add('Borders', () => (
    <Heading
      borderWidth={number('Border Width', 10)}
      level={text('Level', 'canon')}
      padding={number('Padding', 1)}
    >
      {text('Text', 'Text Here')}
    </Heading>
  ))
