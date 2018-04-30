import invariant from 'invariant'
import assign from 'object-assign'

/* istanbul ignore next */
const RICH_ENUM_SYMBOL = Symbol('RichEnum')

export default class RichEnum {
  [RICH_ENUM_SYMBOL] = true

  constructor(map) {
    const enumValues = {}
    const enumArray = []
    const objectMap = {}
    const infoMap = {}

    forOwn(map, (initProperties, key) => {
      const properties = {}

      if (Array.isArray(initProperties)) {
        const [value, text] = initProperties

        properties.text = text
        properties.value = value
      } else {
        // invariant
        assign(properties, initProperties)
      }

      properties.key = key

      const propertiesWithoutValue = {...properties}

      delete propertiesWithoutValue.value

      forOwn(propertiesWithoutValue, (property, propertyKey) => {
        if (!infoMap[propertyKey]) infoMap[propertyKey] = {}

        infoMap[propertyKey][properties.value] = property
      })

      invariant(
        properties.value !== undefined && properties.value !== null,
        `The value of \`${key}\` is required, it must be defined in the first item in array or property in an object`,
      )

      enumValues[key] = properties.value
      objectMap[key] = properties
      enumArray.push(properties)
    })

    Object.assign(this, infoMap, objectMap, {
      value: enumValues,
      collection: enumArray,
      _map: objectMap,
    })

    deepFreeze(this)
  }

  extend(map) {
    return extendEnum(this, map)
  }

  [Symbol.iterator]() {
    return this.collection[Symbol.iterator]()
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

  forOwn(map, (properties, key) => {
    extendedMap[key] = assign({}, currentMap[key], map[key])
  })

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

function forOwn(object, fn) {
  for (const key in object) {
    /* istanbul ignore else */
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      fn(object[key], key)
    }
  }
}
