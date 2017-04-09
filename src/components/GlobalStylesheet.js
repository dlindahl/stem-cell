import { css } from 'glamor'
import React, { PropTypes } from 'react'
import { createMarkupForStyles } from 'glamor/lib/CSSPropertyOperations'
import { Helmet } from 'react-helmet'
import { toPairs } from 'lodash'

const style = {
  wrapper: css({
    height: '100%'
  })
}

function serialize (scope, rules) {
  if (!scope) {
    return ''
  }
  if (scope === ':root') {
    rules = Object.keys(rules).reduce(
      (vars, key) => ({
        ...vars,
        [`--${key}`]: rules[key]
      }),
      {}
    )
  }
  return `${scope} { ${createMarkupForStyles(rules)} }`
}

const GlobalStylesheet = ({ children, rules, ...props }) => {
  const globalRules = toPairs(rules).reduce(
    (ruleSet, [scope, rule]) => [...ruleSet, serialize(scope, rule)],
    []
  )
  return (
    <div className={style.wrapper} data-sc-global>
      <Helmet>
        <style>{globalRules.join('\n')}</style>
      </Helmet>
      {children}
    </div>
  )
}

GlobalStylesheet.defaultProps = {
  rules: []
}

GlobalStylesheet.propTypes = {
  children: PropTypes.node,
  rules: PropTypes.object
}

export default GlobalStylesheet
