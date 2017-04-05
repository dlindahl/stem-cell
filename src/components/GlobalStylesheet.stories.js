import GlobalStylesheet from './GlobalStylesheet'
import { object, text, withKnobs } from '@kadira/storybook-addon-knobs'
import { storiesOf } from '@kadira/storybook'

storiesOf('GlobalStylesheet', module)
  .addDecorator(withKnobs)
  .add('Define global CSS rules', () => (
    <GlobalStylesheet
      rules={{
        ':root': object('CSS Variables', {
          pad: '20px',
          textColor: 'red',
          whitespace: 20
        }),
        html: object('HTML CSS Rules', { fontSize: 16 })
      }}
    >
      <div
        style={object('Text Styles', {
          color: 'var(--textColor)',
          margin: 'calc(var(--whitespace) * 1px)',
          padding: 'var(--pad)'
        })}
      >
        {text('Text', 'Lorem ipsum dolor sit amet.')}
      </div>
    </GlobalStylesheet>
  ))
