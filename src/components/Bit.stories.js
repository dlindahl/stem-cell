import Bit from './Bit'
import CssReset from './CssReset'
import { number, text, withKnobs } from '@kadira/storybook-addon-knobs'
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import VerticalRhythm from './VerticalRhythm'

storiesOf('Bit', module)
  .addDecorator(withKnobs)
  .addDecorator((story) => (
    <CssReset>
      <VerticalRhythm baseline>
        {story()}
      </VerticalRhythm>
    </CssReset>
  ))
  .add('Box Model Properties', () => (
    <Bit
      borderBottomWidth={number('Border Bottom Width', 0)}
      borderLeftWidth={number('Border Left Width', 0)}
      borderRightWidth={number('Border Right Width', 0)}
      borderTopWidth={number('Border Top Width', 0)}
      height={number('Height', 1)}
      marginBottom={number('Margin Bottom', 0)}
      marginLeft={number('Margin Left', 0)}
      marginRight={number('Margin Right', 0)}
      marginTop={number('Margin Top', 0)}
      maxHeight={number('Max Height', 10)}
      maxWidth={number('Max Width', 10)}
      minHeight={number('Min Height', 1)}
      minWidth={number('Min Width', 1)}
      paddingBottom={number('Padding Bottom', 0)}
      paddingLeft={number('Padding Left', 0)}
      paddingRight={number('Padding Right', 0)}
      paddingTop={number('Padding Top', 0)}
      width={number('Width', 10)}
    >
      {text('Text', 'Lorem ipsum dolor sit amet.')}
    </Bit>
  ))
