import { storiesOf } from '@kadira/storybook'
import Paragraph from './Paragraph'
import TextComponent from './Text'
import ThemeProvider from './ThemeProvider'
import VerticalRhythm from './VerticalRhythm'
import {
  color,
  number,
  select,
  text,
  withKnobs
} from '@kadira/storybook-addon-knobs'

const Lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

storiesOf('Paragraph', module)
  .addDecorator(withKnobs)
  .addDecorator((story, context) => (
    <ThemeProvider>
      <VerticalRhythm baseline>
        {story()}
      </VerticalRhythm>
    </ThemeProvider>
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
  .add('Typographic Settings', () => (
    <Paragraph
      backgroundColor={color('Background Color', 'transparent')}
      color={color('Font Color', 'black')}
      size={select('Named Font Size', TextComponent.sizes, 'body')}
    >
      {text('Text', Lorem)}
    </Paragraph>
  ))
