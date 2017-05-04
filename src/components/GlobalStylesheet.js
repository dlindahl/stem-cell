import Bit from './Bit'
import React, { PropTypes } from 'react'
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

  return (
    <Bit css={styles.wrapper} data-sc-global>
      <Helmet>
        <style>{globalRules.join('\n')}</style>
      </Helmet>
      {children}
    </Bit>
  )
}

GlobalStylesheet.defaultProps = {
  rules: []
}

GlobalStylesheet.propTypes = {
  children: PropTypes.node,
  rules: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
}

export default GlobalStylesheet
