import {
  boolean,
  color,
  number,
  object,
  select,
  withKnobs
} from '@kadira/storybook-addon-knobs'
import CssReset from './CssReset'
import Heading from './Heading'
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Text from './Text'
import VerticalRhythm from './VerticalRhythm'

storiesOf('Vertical Rhythm', module)
  .addDecorator(withKnobs)
  .add('Visual Guides', () => (
    <CssReset>
      <VerticalRhythm
        baseline={boolean('Show Lines', true)}
        baselineColor={color('Line Color', 'rgba(255,0,255,0.25)')}
      >
        Lorem ipsum dolor sit amet.
      </VerticalRhythm>
    </CssReset>
  ))
  .add('Typographic Configuration', () => (
    <CssReset>
      <VerticalRhythm
        baseFontSize={number('Font Size', 16)}
        baseline
        breakpoints={false}
        lineHeightRatio={number('Line Height', 1.5)}
        scaleRatio={select(
          'Scale Ratio',
          VerticalRhythm.scaleRatios,
          'diminished fourth'
        )}
      >
        <Heading level={1}>Canon</Heading>
        <Heading level={2}>Trafalgar</Heading>
        <Heading level={3}>Double Pica</Heading>
        <Heading level={4}>Great Primer</Heading>
        <Heading level={5}>Pica</Heading>
        <Heading level={6}>Long Primer</Heading>
        <Text size="brevier">Brevier</Text>
        <Text size="minion">Minion</Text>
        <Text>Body</Text>
      </VerticalRhythm>
    </CssReset>
  ))
  .add('Responsive Type Scaling', () => (
    <CssReset>
      <VerticalRhythm
        baseline
        breakpoints={object('Breakpoints', VerticalRhythm.breakpoints)}
      >
        <Heading level={1}>Canon</Heading>
        <Heading level={2}>Trafalgar</Heading>
        <Heading level={3}>Double Pica</Heading>
        <Heading level={4}>Great Primer</Heading>
        <Heading level={5}>Pica</Heading>
        <Heading level={6}>Long Primer</Heading>
        <Text size="brevier">Brevier</Text>
        <Text size="minion">Minion</Text>
        <Text>Body</Text>
      </VerticalRhythm>
    </CssReset>
  ))
