import { storiesOf, action, linkTo } from '@kadira/storybook'
import Button from './Button'
import Welcome from './Welcome'

const foo = {
  a: 456,
  z: 123
}

window.f = foo

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
))

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>
  ))
