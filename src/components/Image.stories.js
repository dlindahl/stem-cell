import { storiesOf } from '@kadira/storybook'
import Image from './Image'
import ThemeProvider from './ThemeProvider'
import VerticalRhythm from './VerticalRhythm'
import {
  boolean,
  color,
  number,
  select,
  text,
  withKnobs
} from '@kadira/storybook-addon-knobs'

storiesOf('Image', module)
  .addDecorator(withKnobs)
  .addDecorator((story, context) => (
    <ThemeProvider>
      <VerticalRhythm baseline>
        {story()}
      </VerticalRhythm>
    </ThemeProvider>
  ))
  .add('Basic Image', () => {
    const h = number('Source Height', 150)
    const w = number('Source Width', 350)
    const src = text('Source URL', `https://placehold.it/${w}x${h}`)
    return (
      <Image
        backgroundColor={color('Background Color', 'transparent')}
        src={src}
        srcHeight={h}
        srcWidth={w}
      />
    )
  })
  .add('Container Dimensions', () => {
    const h = number('Source Height', 150)
    const w = number('Source Width', 350)
    const src = text('Source URL', `https://placehold.it/${w}x${h}`)
    return (
      <Image
        backgroundColor={color('Background Color', 'transparent')}
        height={number('Container Height', 7)}
        src={src}
        srcHeight={h}
        srcWidth={w}
        width={number('Container Width', 16)}
      />
    )
  })
  .add('Object Fit', () => {
    const fitType = select('Object Fit', [''].concat(Image.objectFitTypes), '')
    let fitProps = {}
    if (fitType) {
      fitProps = { [fitType]: true }
    }
    return (
      <Image
        {...fitProps}
        backgroundColor={color('Background Color', 'red')}
        src="https://placehold.it/350x150"
        srcHeight={150}
        srcWidth={350}
      />
    )
  })
  .add('Dimension Equality', () => {
    const fitType = select('Object Fit', [''].concat(Image.objectFitTypes), '')
    let fitProps = {}
    if (fitType) {
      fitProps = { [fitType]: true }
    }
    const srcSize = number('Source Size', 150)
    const src = text(
      'Source URL',
      `https://placehold.it/${srcSize}x${srcSize}`
    )
    return (
      <Image
        {...fitProps}
        backgroundColor={color('Background Color', 'red')}
        rounded={boolean('Rounded', false)}
        size={number('Container Size', 6)}
        src={src}
        srcSize={srcSize}
      />
    )
  })
