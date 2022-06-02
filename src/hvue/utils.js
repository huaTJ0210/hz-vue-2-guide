export function def(data, key, value) {
  Object.defineProperty(data, key, {
    value: value,
    configurable: false,
    writable: true,
    enumerable: true
  })
}

export function isValidArrayIndex(key) {
  //  Number.isInteger(key)
  return typeof obj === 'number' && key % 1 === 0
}
