import { Component, PropTypes } from 'react'
import { css } from 'glamor'
import { debounce, pick } from 'lodash'
import GlobalStylesheet from './GlobalStylesheet'

/*
 * Default set of breakpoints to adjust the typography based on the size of the
 * viewport. Since the Bit component calculates box model properties based on
 * these typographic values, this allows the entire page layout to scale
 * accordingly. These breakpoints and typographic values are based off of BBC's
 * GEL Typography (http://www.bbc.co.uk/gel/guidelines/typography)
 */
const DEFAULT_BREAKPOINTS = {
  '(max-width: 319px)': {
    fontSize: 15,
    lineHeight: 1 + 1 / 3,
    scaleRatio: 'minor third'
  },
  '(min-width: 319px) and (max-width: 599px)': {
    fontSize: 16,
    lineHeight: 11 / 8,
    scaleRatio: 'major third'
  },
  '(min-width: 599px)': {
    fontSize: 18,
    lineHeight: 1 + 1 / 3,
    scaleRatio: 'major third'
  }
}

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
    backgroundSize: `auto var(--lineHeight)`,
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
    lineHeightRatio: PropTypes.number,
    scaleRatio: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
  };
  static defaultProps = {
    baseline: false,
    breakpoints: DEFAULT_BREAKPOINTS,
    className: {},
    color: 'rgba(255,0,255,0.25)',
    fontSize: 16,
    lineHeight: 1.5,
    scaleRatio: 'diminished fourth'
  };
  static propTypes = {
    baseline: PropTypes.bool,
    breakpoints: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    children: PropTypes.node,
    className: PropTypes.object,
    color: PropTypes.string,
    fontSize: PropTypes.number,
    lineHeight: PropTypes.number,
    scaleRatio: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.oneOf(SCALE_RATIOS)
    ])
  };
  static breakpoints = DEFAULT_BREAKPOINTS;
  static scaleRatios = SCALE_RATIOS;
  state = {
    fontSize: null,
    lineHeight: null,
    scaleRatio: null
  };
  getChildContext () {
    return {
      baseFontSize: this.state.fontSize,
      lineHeightRatio: this.state.lineHeight,
      scaleRatio: this.state.scaleRatio
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
      fontSize: nextProps.fontSize || this.props.fontSize,
      lineHeight: nextProps.lineHeight || this.props.lineHeight,
      scaleRatio: nextProps.scaleRatio || this.props.scaleRatio
    }
    let breakpoints = nextProps.breakpoints
    if (typeof breakpoints === 'undefined') {
      breakpoints = this.props.breakpoints
    }
    if (breakpoints === false) {
      return this.setState(defaultState)
    }
    // Determine which breakpoints apply to the current viewport
    const newState = Object.keys(breakpoints).reduce(
      (state, mq) => {
        if (window && window.matchMedia) {
          if (window.matchMedia(mq).matches) {
            return {
              ...defaultState,
              ...pick(breakpoints[mq], 'fontSize', 'lineHeight', 'scaleRatio')
            }
          }
        }
        return state
      },
      defaultState
    )
    return this.setState(newState)
  }
  resizeHandler = null;
  render () {
    let baseline = null
    if (this.props.baseline) {
      /* Render a visual representation of the vertical rhythm baseline
       * overlayed over the entirety of the page
       */
      baseline = <div className={css(styles.baseline)} data-sc-baseline/>
    }
    const cssVars = {
      baseline: `${this.state.lineHeight * this.state.fontSize}px`,
      baselineColor: this.props.color,
      lineHeight: `${this.state.lineHeight}rem`
    }
    return (
      <GlobalStylesheet
        html={pick(this.state, 'fontSize', 'lineHeight')}
        vars={cssVars}
      >
        <div className={this.props.className} data-sc-vr>
          {this.props.children}
          {baseline}
        </div>
      </GlobalStylesheet>
    )
  }
}
