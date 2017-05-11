import {
  array,
  bool,
  func,
  node,
  number,
  object,
  oneOf,
  oneOfType,
  string
} from 'prop-types'
import Bit from './Bit'
import { boxModelRuleVerticalRhythm } from '../util/verticalRhythm'
import { css as glamor } from 'glamor'
import React, { Component } from 'react'
import { debounce } from 'lodash'
import GlobalStylesheet from './GlobalStylesheet'
import invariant from 'fbjs/lib/invariant'

/*
 * Default set of breakpoints to adjust the typography based on the size of the
 * viewport. Since the Bit component calculates box model properties based on
 * these typographic values, this allows the entire page layout to scale
 * accordingly. These breakpoints and typographic values are based off of BBC's
 * GEL Typography (http://www.bbc.co.uk/gel/guidelines/typography)
 */
const DEFAULT_BREAKPOINTS = {
  '(max-width: 319px)': {
    baseFontSize: 15,
    lineHeightRatio: 18 / 14,
    scaleRatio: 'minor third'
  },
  '(min-width: 319px) and (max-width: 599px)': {
    baseFontSize: 16,
    lineHeightRatio: 11 / 8,
    scaleRatio: 'major third'
  },
  '(min-width: 599px)': {
    baseFontSize: 18,
    lineHeightRatio: 18 / 14,
    scaleRatio: 'major third'
  }
}
const INVALID_LINE_HEIGHT = `Using a line-height of ${1 + 1 / 3} is guaranteed
to introduce compounding sub-pixel rounding errors that will cause your layout
to stray from the Vertical Rhythm. It is recommended you use a line-height of
18 / 14 (${18 / 14}) instead. The difference between the two are slight and the
calculated sizes are more likely to align with an exact pixel. See also
http://stackoverflow.com/questions/19669598/forcing-chrome-for-windows-to-respect-sub-pixel-line-heights`
const SCALE_RATIOS = [
  'minor second',
  'major second',
  'minor third',
  'major third',
  'diminished fourth',
  'perfect fifth',
  'minor sixth',
  'golden',
  'phi',
  'major sixth',
  'minor seventh',
  'major seventh',
  'octave',
  'major tenth',
  'major eleventh',
  'major twelfth',
  'double octave'
]

const styles = {
  baseline: glamor({
    /* eslint-disable max-len */
    backgroundImage: `linear-gradient(to bottom, var(--baselineColor) 1px, transparent 1px)`,
    backgroundSize: `auto var(--baseline)`,
    /* eslint-enable max-len */
    bottom: 0,
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 16777271
  }),
  root: {
    height: 'auto'
  }
}

function defaultMatchTypeRunner (rules, context, mt) {
  return mt(rules, context)
}

export default class VerticalRhythm extends Component {
  static childContextTypes = {
    baseFontSize: number,
    baseline: string,
    lineHeightRatio: number,
    matchType: func,
    scaleRatio: oneOfType([number, string])
  };
  static defaultProps = {
    baseFontSize: 16,
    baseline: false,
    baselineColor: 'rgba(255,0,255,0.25)',
    breakpoints: DEFAULT_BREAKPOINTS,
    lineHeightRatio: 1.5,
    matchType: defaultMatchTypeRunner,
    scaleRatio: 'diminished fourth'
  };
  static propTypes = {
    baseFontSize: number,
    baseline: bool,
    baselineColor: string,
    breakpoints: oneOfType([object, bool]),
    children: node,
    css: oneOfType([array, object]),
    lineHeightRatio: number,
    matchType: func,
    scaleRatio: oneOfType([number, oneOf(SCALE_RATIOS)])
  };
  static breakpoints = DEFAULT_BREAKPOINTS;
  static scaleRatios = SCALE_RATIOS;
  state = {
    baseFontSize: null,
    lineHeightRatio: null,
    scaleRatio: null
  };
  getChildContext () {
    return {
      ...this.state,
      matchType: this.props.matchType
    }
  }
  componentWillMount () {
    if (typeof window !== 'undefined' && window.matchMedia) {
      this.resizeHandler = debounce(this.handleWindowResize.bind(this), 150)
      window.addEventListener('resize', this.resizeHandler, false)
    }
    this.handleWindowResize()
    this.attachBaseline(this.props.baseline)
  }
  componentWillReceiveProps (nextProps) {
    this.handleWindowResize(nextProps)
    this.attachBaseline(nextProps.baseline)
  }
  componentWillUnmount () {
    window.removeEventListener(this.resizeHandler, false)
    this.resizeHandler = null
    this.detachBaseline()
  }
  /*
   * Render a visual representation of the vertical rhythm baseline
   * overlayed over the entirety of the page
   */
  attachBaseline (showBaseline) {
    if (typeof document === 'undefined') {
      return null
    }
    if (this.baselineEl) {
      if (showBaseline) {
        return null
      }
      return this.detachBaseline()
    }
    if (!showBaseline) {
      return null
    }
    this.baselineEl = document.createElement('div')
    this.baselineEl.setAttribute('class', styles.baseline)
    this.baselineEl.dataset.scBaseline = true
    const bodyStyles = document.body.style
    this.initialBodyHeight = bodyStyles.height
    this.initialBodyPosition = bodyStyles.position
    document.body.style.height = 'auto'
    // Document.body.style.position = 'relative' // TODO: I thought this was needed...
    document.body.appendChild(this.baselineEl)
    return this.baselineEl
  }
  detachBaseline () {
    if (typeof document === 'undefined') {
      return
    }
    document.body.removeChild(this.baselineEl)
    document.body.style.height = this.initialBodyHeight
    document.body.style.position = this.initialBodyPosition
    this.initialBodyHeight = null
    this.initialBodyPosition = null
    this.baselineEl = null
  }
  handleWindowResize (nextProps = {}) {
    const defaultState = {
      baseFontSize: nextProps.baseFontSize || this.props.baseFontSize,
      lineHeightRatio: nextProps.lineHeightRatio || this.props.lineHeightRatio,
      scaleRatio: nextProps.scaleRatio || this.props.scaleRatio
    }
    let newState = {
      ...defaultState
    }
    let breakpoints = nextProps.breakpoints
    if (typeof breakpoints === 'undefined') {
      breakpoints = this.props.breakpoints
    }
    if (breakpoints !== false) {
      // Determine which breakpoints apply to the current viewport
      newState = Object.keys(breakpoints).reduce(
        (state, mq) => {
          if (typeof window !== 'undefined' && window.matchMedia) {
            if (window.matchMedia(mq).matches) {
              return {
                ...defaultState,
                ...breakpoints[mq]
              }
            }
          }
          return state
        },
        defaultState
      )
    }
    invariant(newState.lineHeightRatio !== 1 + 1 / 3, INVALID_LINE_HEIGHT)
    return this.setState({
      ...newState,
      baseline: `${boxModelRuleVerticalRhythm(1, newState)}px`
    })
  }
  baselineEl = null;
  initialBodyHeight = null;
  initialBodyPosition = null;
  resizeHandler = null;
  render () {
    const css = [styles.root, this.props.css]
    return (
      <GlobalStylesheet
        rules={{
          ':root': {
            ...this.state,
            baselineColor: this.props.baselineColor
          },
          html: {
            fontSize: this.state.baseFontSize,
            lineHeight: this.state.baseline
          }
        }}
      >
        <Bit css={css} data-sc-vr>
          {this.props.children}
        </Bit>
      </GlobalStylesheet>
    )
  }
}
