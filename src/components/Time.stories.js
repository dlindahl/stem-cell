import { boolean, text, withKnobs } from '@kadira/storybook-addon-knobs'
import CssReset from './CssReset'
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import Time from './Time'
import VerticalRhythm from './VerticalRhythm'

const now = new Date()

storiesOf('Time', module)
  .addDecorator(withKnobs)
  .addDecorator((story) => (
    <CssReset>
      <VerticalRhythm baseline>
        {story()}
      </VerticalRhythm>
    </CssReset>
  ))
  .add('Default Settings', () => (
    <Time
      dateTime={text('Raw Date', now)}
      format={text('Format', '')}
      relative={boolean('Relative', false)}
    />
  ))
