import { action, storiesOf } from '@kadira/storybook'
import Bit from './Bit'
import Button from './Button'
import CssReset from './CssReset'
import { number, select, text, withKnobs } from '@kadira/storybook-addon-knobs'
import React from 'react'
import TextComponent from './Text'
import VerticalRhythm from './VerticalRhythm'

storiesOf('Button', module)
  .addDecorator(withKnobs)
  .addDecorator((story, context) => (
    <CssReset>
      <VerticalRhythm baseline>
        {story()}
      </VerticalRhythm>
    </CssReset>
  ))
  .add('Basic Button', () => (
    <Bit>
      <TextComponent>Click this button</TextComponent>
      <Button
        height={number('Height', 1)}
        onClick={action('button-click')}
        paddingHorizontal={number('Horizontal Padding', 0)}
        paddingVertical={number('Vertical Padding', 0)}
        size={select('Label Text Size', TextComponent.sizes, 'body')}
      >
        {text('Label', 'Label')}
      </Button>
    </Bit>
  ))
