export function throttle (fn, wait, options) {
  let timeout, context, args
  let previous = 0
  if (!options) options = {}

  let later = function () {
    previous = options.leading === false ? 0 : new Date().getTime()
    timeout = null
    fn.apply(context, args)
    if (!timeout) {
      context = args = null
    }
  }

  let throttled = function () {
    let now = new Date().getTime()
    if (!previous && options.leading === false) {
      previous = now
    }
    let remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      fn.apply(context, args)
      if (!timeout) {
        context = args = null
      }
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
  }

  return throttled
}

export function debounce (fn, wait, immediate) {
  let timeout, result

  return function () {
    const context = this
    const args = arguments

    if (timeout) clearTimeout(timeout)
    if (immediate) {
      let callNow = !timeout
      timeout = setTimeout(function () {
        timeout = null
      }, wait)
      if (callNow) result = fn.apply(context, args)
    } else {
      timeout = setTimeout(function () {
        result = fn.apply(context, args)
      }, wait)
    }
    return result
  }
}
