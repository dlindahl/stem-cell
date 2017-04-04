import { css } from 'glamor'
import Heading from './components/Heading'
import Text from './components/Text'
import ThemeProvider from './components/ThemeProvider'
import VerticalRhythm from './components/VerticalRhythm'

const spin = css.keyframes('spin', {
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' }
})

const style = {
  container: css({
    textAlign: 'center'
  }),
  header: css({
    backgroundColor: '#222',
    color: 'white',
    height: 150,
    padding: 20
  }),
  intro: css({
    fontSize: 'large'
  }),
  logo: css({
    animation: `${spin} infinite 20s linear`,
    height: 80
  })
}

const App = (props) => (
  <ThemeProvider>
    <VerticalRhythm baseline>
      <div className={style.container}>
        <Heading borderColor="red" borderTopWidth={15} level={1} paddingTop={0}>
          A Visual Type Scale
        </Heading>
        <Heading
          borderBottomWidth={15}
          borderColor="purple"
          level={1}
          marginBottom={1}
        >
          A Visual Type Scale
        </Heading>
        <Heading level={2}>
          A Visual Type Scale
        </Heading>
        <Heading level={3}>A Visual Type Scale</Heading>
        <Heading level={4}>A Visual Type Scale</Heading>
        <Heading level={5}>A Visual Type Scale</Heading>
        <Heading level={6}>A Visual Type Scale</Heading>
        <Text size="brevier">A Visual Type Scale</Text>
        <Text size="minion">A Visual Type Scale</Text>
        <Text>BODY: A Visual Type Scale</Text>
      </div>
    </VerticalRhythm>
  </ThemeProvider>
)

export default App
