// LocalStorage
export const setLocalStorage = (name, content = '') => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

export const getLocalStorage = (name, parse = false) => {
  if (!name) return
  let value = window.localStorage.getItem(name)
  if (parse) {
    try {
      value = JSON.parse(value)
    } catch (e) {
      value = null
    }
  }
  return value
}

export const removeLocalStorage = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

// SessionStorage
export const setSessionStorage = (name, content = '') => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.sessionStorage.setItem(name, content)
}

export const getSessionStorage = (name, parse = false) => {
  if (!name) return
  let value = window.sessionStorage.getItem(name)
  if (parse) {
    try {
      value = JSON.parse(value)
    } catch (e) {
      value = null
    }
  }
  return value
}

export const removeSessionStorage = name => {
  if (!name) return
  window.sessionStorage.removeItem(name)
}

export const clearSessionStorage = () => {
  sessionStorage.clear()
}
