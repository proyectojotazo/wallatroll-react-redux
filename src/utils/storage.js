const storage = {
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get: (key) => {
    // Parseamos el token pues al extraerlo del localStorage viene separado por comillas dobles y hace que sea un token no valido
    const val = localStorage.getItem(key)
    const parsedVal = val ? val.split('"').join('') : null
    return parsedVal
  },
  remove: (key) => {
    localStorage.removeItem(key)
  }
}

export default storage