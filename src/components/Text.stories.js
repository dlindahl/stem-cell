import { storiesOf } from '@kadira/storybook'
import TextComponent from './Text'
import ThemeProvider from './ThemeProvider'
import { select, text, withKnobs } from '@kadira/storybook-addon-knobs'
import VerticalRhythm from './VerticalRhythm'

storiesOf('Text', module)
  .addDecorator(withKnobs)
  .addDecorator((story) => (
    <ThemeProvider>
      <VerticalRhythm baseline>
        {story()}
      </VerticalRhythm>
    </ThemeProvider>
  ))
  .add('Font Size', () => (
    <TextComponent size={select('Named Size', TextComponent.sizes, 'body')}>
      {text('Text', 'Lorem ipsum dolor sit amet.')}
    </TextComponent>
  ))
