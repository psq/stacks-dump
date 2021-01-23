export const repeat = function (str, times) {
  return Array(times + 1).join(str)
}

export const truncate = function (str, length, chr) {
  chr = chr || '…'
  return str.length >= length ? str.substr(0, length - chr.length) + chr : str
}

export function options (defaults, opts) {
  for (var p in opts) {
    if (opts[p] && opts[p].constructor && opts[p].constructor === Object) {
      defaults[p] = defaults[p] || {}
      options(defaults[p], opts[p])
    } else {
      defaults[p] = opts[p]
    }
  }

  return defaults
}

//
// For consideration of terminal "color" programs like colors.js,
// which can add ANSI escape color codes to strings,
// we destyle the ANSI color escape codes for padding calculations.
//
// see: http://en.wikipedia.org/wiki/ANSI_escape_code
//
export const strlen = function (str) {
  var code = /\u001b\[(?:\d*;){0,5}\d*m/g
  var stripped = ('' + (str != null ? str : '')).replace(code, '')
  var split = stripped.split('\n')
  return split.reduce(function (memo, s) { return (s.length > memo) ? s.length : memo }, 0)
}
