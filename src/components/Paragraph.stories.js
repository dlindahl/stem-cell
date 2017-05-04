import CssReset from './CssReset'
import { number, select, text, withKnobs } from '@kadira/storybook-addon-knobs'
import Paragraph from './Paragraph'
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import TextComponent from './Text'
import VerticalRhythm from './VerticalRhythm'

const Lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

storiesOf('Paragraph', module)
  .addDecorator(withKnobs)
  .addDecorator((story, context) => (
    <CssReset>
      <VerticalRhythm baseline>
        {story()}
      </VerticalRhythm>
    </CssReset>
  ))
  .add('Default', () => <Paragraph>{text('Text', Lorem)}</Paragraph>)
  .add('Dimensional Settings', () => (
    <Paragraph
      height={number('Height', 0)}
      marginHorizontal={number('Horizontal Margin', 0)}
      marginVertical={number('Vertical Margin', 0)}
      paddingHorizontal={number('Horizontal Padding', 0)}
      paddingVertical={number('Vertical Padding', 0)}
      size={select('Named Font Size', TextComponent.sizes, 'body')}
      width={number('Width', 0)}
    >
      {text('Text', Lorem)}
    </Paragraph>
  ))
