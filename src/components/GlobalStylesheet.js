import { array, node, object, oneOfType } from 'prop-types'
import Bit from './Bit'
import React from 'react'
import { Helmet } from 'react-helmet'
import { flatten, toPairs } from 'lodash'
import { serializeCssVars } from '../util/cssTools'

const styles = {
  wrapper: {
    height: '100%'
  }
}

const GlobalStylesheet = ({ children, rules, ...props }) => {
  if (!Array.isArray(rules)) {
    rules = [rules]
  }
  const globalRules = flatten(
    rules.reduce(
      (combinedRules, ruleSubet) => [
        ...combinedRules,
        toPairs(ruleSubet).reduce(
          (ruleSet, [scope, rule]) => [
            ...ruleSet,
            serializeCssVars(scope, rule)
          ],
          []
        )
      ],
      []
    )
  )
  const styleSheet = (
    <Helmet>
      <style>{globalRules.join('\n')}</style>
    </Helmet>
  )

  if (!children) {
    return styleSheet
  }

  return (
    <Bit css={styles.wrapper} data-sc-global>
      {styleSheet}
      {children}
    </Bit>
  )
}

GlobalStylesheet.defaultProps = {
  rules: []
}

GlobalStylesheet.propTypes = {
  children: node,
  rules: oneOfType([array, object])
}

export default GlobalStylesheet
