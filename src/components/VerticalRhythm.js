import { boxModelRuleVerticalRhythm } from '../util/verticalRhythm'
import { Component, PropTypes } from 'react'
import { css } from 'glamor'
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
  baseline: css({
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
  })
}

export default class VerticalRhythm extends Component {
  static childContextTypes = {
    baseFontSize: PropTypes.number,
    baseline: PropTypes.string,
    lineHeightRatio: PropTypes.number,
    scaleRatio: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };
  static defaultProps = {
    baseFontSize: 16,
    baseline: false,
    baselineColor: 'rgba(255,0,255,0.25)',
    breakpoints: DEFAULT_BREAKPOINTS,
    className: {},
    lineHeightRatio: 1.5,
    scaleRatio: 'diminished fourth'
  };
  static propTypes = {
    baseFontSize: PropTypes.number,
    baseline: PropTypes.bool,
    baselineColor: PropTypes.string,
    breakpoints: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    children: PropTypes.node,
    className: PropTypes.object,
    lineHeightRatio: PropTypes.number,
    scaleRatio: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(SCALE_RATIOS)
    ])
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
      ...this.state
    }
  }
  componentWillMount () {
    if (window && window.matchMedia) {
      this.resizeHandler = debounce(this.handleWindowResize.bind(this), 150)
      window.addEventListener('resize', this.resizeHandler, false)
    }
    this.handleWindowResize()
  }
  componentWillReceiveProps (nextProps) {
    this.handleWindowResize(nextProps)
  }
  componentWillUnmount () {
    window.removeEventListener(this.resizeHandler, false)
    this.resizeHandler = null
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
          if (window && window.matchMedia) {
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
      baseline: boxModelRuleVerticalRhythm(1, newState)
    })
  }
  resizeHandler = null;
  render () {
    let baseline = null
    if (this.props.baseline) {
      /*
       * Render a visual representation of the vertical rhythm baseline
       * overlayed over the entirety of the page
       */
      baseline = <div className={css(styles.baseline)} data-sc-baseline/>
    }
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
        <div className={this.props.className} data-sc-vr>
          {this.props.children}
          {baseline}
        </div>
      </GlobalStylesheet>
    )
  }
}
