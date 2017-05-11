import CssReset from './CssReset'
import { text, withKnobs } from '@kadira/storybook-addon-knobs'
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import ComponentizeContent from './ComponentizeContent'
import VerticalRhythm from './VerticalRhythm'

storiesOf('ComponentizeContent', module)
  .addDecorator(withKnobs)
  .addDecorator((story) => (
    <CssReset>
      <VerticalRhythm baseline>
        {story()}
      </VerticalRhythm>
    </CssReset>
  ))
  .add('Default Settings', () => (
    <ComponentizeContent>
      {text(
        'Markup',
        '<p>Lorem <i>ipsum</i> <!-- comment --> dolor sit amet.</p>'
      )}
    </ComponentizeContent>
  ))
  .add('Image Markup', () => (
    <ComponentizeContent>
      {text('Markup', '<img src="http://placehold.it/400x300"/>')}
    </ComponentizeContent>
  ))
