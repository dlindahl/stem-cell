import Button from '../src/components/Button'
import Bit from '../src/components/Bit'
import Code from '../src/components/Code'
import CssReset from '../src/components/CssReset'
import Heading from '../src/components/Heading'
import Image from '../src/components/Image'
import ComponentizeContent from '../src/components/ComponentizeContent'
import Paragraph from '../src/components/Paragraph'
import React from 'react'
import Rule from '../src/components/Rule'
import Text from '../src/components/Text'
import VerticalRhythm from '../src/components/VerticalRhythm'

const styles = {
  container: {
    textAlign: 'center'
  }
}

const App = (props) => (
  <CssReset>
    <VerticalRhythm baseline>
      <Bit css={styles.container}>
        <Heading level={1}>
          A Visual Type Scale
        </Heading>
        <Heading level={2}>
          A Visual Type Scale
        </Heading>
        <Heading level={3}>A Visual Type Scale</Heading>
        <Heading level={4}>A Visual Type Scale</Heading>
        <Heading level={5}>A Visual Type Scale</Heading>
        <Heading level={6}>A Visual Type Scale</Heading>
        <Text inline={false} size="brevier">A Visual Type Scale</Text>
        <Text inline={false} size="minion">A Visual Type Scale</Text>
        <Text inline={false}>BODY: A Visual Type Scale</Text>

        <Rule css={[{ backgroundColor: '#aaa' }]}/>

        <Button size="minion">
          Test Button
        </Button>

        <Paragraph>
          Test Paragraph
        </Paragraph>

        <Paragraph>
          <Code>inline code</Code>
        </Paragraph>

        <ComponentizeContent>
          {'<p>markdown-generated <i>HTML</i></p>'}
        </ComponentizeContent>

        <Image height={7} src="http://placehold.it/350x150" width={16}/>
        <Image
          contain
          height={10}
          src="http://placehold.it/350x150"
          srcHeight={150}
          srcWidth={350}
          width={20}
        />
        <Image
          height={3}
          scaleDown
          src="http://placehold.it/350x150"
          srcHeight={150}
          srcWidth={350}
          width={5}
        />
        <Image
          cover
          src="http://placehold.it/350x150"
          srcHeight={150}
          srcWidth={350}
        />
      </Bit>
    </VerticalRhythm>
  </CssReset>
)

export default App
