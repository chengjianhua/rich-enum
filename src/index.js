import invariant from 'invariant'
import assign from 'object-assign'

/* istanbul ignore next */
const RICH_ENUM_SYMBOL = Symbol('RichEnum')

export default class RichEnum {
  [RICH_ENUM_SYMBOL] = true

  _map

  value

  text

  array

  constructor(map) {
    const enumValues = {}
    const enumTexts = {}
    const enumArray = []
    const objectMap = {}

    for (const key in map) {
      /* istanbul ignore else */
      if (Object.prototype.hasOwnProperty.call(map, key)) {
        const initProperties = map[key]
        const properties = {key}

        if (Array.isArray(initProperties)) {
          const [value, text] = initProperties

          properties.text = text
          properties.value = value
        } else {
          // invariant
          assign(properties, initProperties)
        }

        invariant(
          properties.value !== undefined && properties.value !== null,
          `The value of \`${key}\` is required, it must be defined in the first item in array or property in an object`,
        )

        enumValues[key] = properties.value
        enumTexts[properties.value] = properties.text
        enumArray.push(properties)

        this[key] = properties
        objectMap[key] = properties
      }
    }

    this.value = enumValues
    this.text = enumTexts
    this.array = enumArray
    this._map = objectMap

    deepFreeze(this)
  }

  extend(map) {
    return extendEnum(this, map)
  }

  [Symbol.iterator]() {
    return this.array[Symbol.iterator]()
  }

  static extend(richEnum, map) {
    return extendEnum(richEnum, map)
  }

  static is(obj) {
    return Boolean(obj && obj[RICH_ENUM_SYMBOL])
  }
}

function extendEnum(richEnum, map) {
  const {_map: currentMap} = richEnum
  const extendedMap = {}

  for (const key in map) {
    /* istanbul ignore else */
    if (Object.prototype.hasOwnProperty.call(map, key)) {
      extendedMap[key] = assign({}, currentMap[key], map[key])
    }
  }

  return new RichEnum(extendedMap)
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
function deepFreeze(obj) {
  const propNames = Object.getOwnPropertyNames(obj)

  propNames.forEach(name => {
    const prop = obj[name]

    if (typeof prop === 'object' && prop !== null) deepFreeze(prop)
  })

  return Object.freeze(obj)
}
