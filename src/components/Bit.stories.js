import { storiesOf } from '@kadira/storybook'
import Bit from './Bit'
import ThemeProvider from './ThemeProvider'
import { color, number, text, withKnobs } from '@kadira/storybook-addon-knobs'
import VerticalRhythm from './VerticalRhythm'

storiesOf('Bit', module)
  .addDecorator(withKnobs)
  .addDecorator((story) => (
    <ThemeProvider>
      <VerticalRhythm baseline>
        {story()}
      </VerticalRhythm>
    </ThemeProvider>
  ))
  .add('Background Color Properties', () => (
    <Bit backgroundColor={color('Background Color', 'transparent')}>
      {text('Text', 'Lorem ipsum dolor sit amet.')}
    </Bit>
  ))
  .add('Box Model Properties', () => (
    <Bit
      backgroundColor="green"
      borderBottomColor={color('Border Bottom Color', 'gray')}
      borderBottomWidth={number('Border Bottom Width', 0)}
      borderLeftColor={color('Border Left Color', 'gray')}
      borderLeftWidth={number('Border Left Width', 0)}
      borderRightColor={color('Border Right Color', 'gray')}
      borderRightWidth={number('Border Right Width', 0)}
      borderTopColor={color('Border Top Color', 'gray')}
      borderTopWidth={number('Border Top Width', 0)}
      height={number('Height', 0)}
      marginBottom={number('Margin Bottom', 0)}
      marginLeft={number('Margin Left', 0)}
      marginRight={number('Margin Right', 0)}
      marginTop={number('Margin Top', 0)}
      maxHeight={number('Max Height', 0)}
      maxWidth={number('Max Width', 0)}
      minHeight={number('Min Height', 0)}
      minWidth={number('Min Width', 0)}
      paddingBottom={number('Padding Bottom', 0)}
      paddingLeft={number('Padding Left', 0)}
      paddingRight={number('Padding Right', 0)}
      paddingTop={number('Padding Top', 0)}
      width={number('Width', 0)}
    >
      {text('Text', 'Lorem ipsum dolor sit amet.')}
    </Bit>
  ))
