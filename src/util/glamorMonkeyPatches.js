import { StyleSheet as GlamorStyleSheet } from 'glamor/lib/sheet'

// eslint-disable-next-line max-len
// Ripped from commented out v3 code at https://github.com/threepointone/glamor/blob/518e63ca1a12476f40dcb665d32b3b4083e6dde2/src/sheet.js#L170-L186
const isBrowser = typeof window !== 'undefined'
const isDev = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
if (GlamorStyleSheet.prototype.replace) {
  console.warn(
    // eslint-disable-next-line max-len
    'ATTN: The StyleSheet#replace monkey-patch defined in StemCell::GlobalStylesheet is no longer neccesary'
  )
}
GlamorStyleSheet.prototype._replace = function _replace (index, rule) {
  // This weirdness for perf, and chrome's weird bug
  // https://stackoverflow.com/questions/20007992/chrome-suddenly-stopped-accepting-insertrule
  try {
    const sheet = this.getSheet()
    sheet.deleteRule(index) // Todo - correct index here
    sheet.insertRule(rule, index)
  } catch (e) {
    if (isDev) {
      // Might need beter dx for this
      console.warn('whoops, problem replacing rule', rule, e) // eslint-disable-line no-console
    }
  }
}
GlamorStyleSheet.prototype.replace = function replace (index, rule) {
  if (isBrowser) {
    if (this.isSpeedy && this.getSheet().insertRule) {
      this._replace(index, rule)
    } else {
      const _slot = Math.floor((index + this.maxLength) / this.maxLength) - 1
      const _index = index % this.maxLength + 1
      const tag = this.tags[_slot]
      tag.replaceChild(document.createTextNode(rule), tag.childNodes[_index])
    }
  } else {
    const rules = this.sheet.cssRules
    this.sheet.cssRules = [
      ...rules.slice(0, index),
      { cssText: rule },
      ...rules.slice(index + 1)
    ]
  }
}

export { GlamorStyleSheet as StyleSheet }
