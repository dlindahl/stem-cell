import Bit from './Bit'
import CssReset from './CssReset'
import {
  boolean,
  select,
  text,
  withKnobs
} from '@kadira/storybook-addon-knobs'
import List from './List'
import ListItem from './ListItem'
import Paragraph from './Paragraph'
import React from 'react'
import { storiesOf } from '@kadira/storybook'
import VerticalRhythm from './VerticalRhythm'

storiesOf('List', module)
  .addDecorator(withKnobs)
  .addDecorator((story, context) => (
    <CssReset>
      <VerticalRhythm baseline>
        <Bit marginHorizontal={1}>
          <Paragraph>Lorem ipsum dolor sit amet</Paragraph>
          {story()}
          <Paragraph>Lorem ipsum dolor sit amet</Paragraph>
        </Bit>
      </VerticalRhythm>
    </CssReset>
  ))
  .add('Default', () => (
    <List
      ordered={boolean('Ordered List', true)}
      type={select('List Style Type', [
        'decimal',
        'disc',
        'circle',
        'cjk-ideographic',
        'georgian',
        'kannada',
        'none',
        'initial',
        'square',
        ''
      ])}
    >
      <ListItem>{text('Text #1', 'Item #1')}</ListItem>
      <ListItem>{text('Text #2', 'Item #2')}</ListItem>
      <ListItem>{text('Text #3', 'Item #3')}</ListItem>
    </List>
  ))
