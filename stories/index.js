import { configure } from '@kadira/storybook'
import { css } from 'glamor'

css.global('html, body', {
  margin: 0,
  padding: 0
})

const req = require.context('../src/components/', true, /.stories.js$/)

function loadStories () {
  req.keys().forEach((filename) => req(filename))
}

configure(loadStories, module)
