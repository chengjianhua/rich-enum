import RichEnum from '../'

describe('lib should be tested', () => {
  describe('# constructor', () => {
    it('should return a enumeration object', () => {
      const enumeration = new RichEnum({
        TYPE_A: {
          value: 0,
          text: 'Type A',
        },
        TYPE_B: {
          value: 1,
          text: 'Type B',
        },
      })

      expect(enumeration.value.TYPE_A).toBe(0)
      expect(enumeration.value.TYPE_B).toBe(1)

      expect(enumeration.text[enumeration.value.TYPE_A]).toBe('Type A')
      expect(enumeration.text[enumeration.value.TYPE_B]).toBe('Type B')

      expect(enumeration.collection).toEqual([
        {key: 'TYPE_A', value: 0, text: 'Type A'},
        {key: 'TYPE_B', value: 1, text: 'Type B'},
      ])
    })

    it('should support the shorthand for define the value and text of enumeration object', () => {
      const enumeration = new RichEnum({
        TYPE_A: [0, 'Type A'],
        TYPE_B: [1, 'Type B'],
      })

      expect(enumeration.value.TYPE_A).toBe(0)
      expect(enumeration.value.TYPE_B).toBe(1)

      expect(enumeration.text[enumeration.value.TYPE_A]).toBe('Type A')
      expect(enumeration.text[enumeration.value.TYPE_B]).toBe('Type B')

      expect(enumeration.collection).toEqual([
        {key: 'TYPE_A', value: 0, text: 'Type A'},
        {key: 'TYPE_B', value: 1, text: 'Type B'},
      ])
    })

    it('should define the detail as the property whose key is user defined while constructing', () => {
      const enumeration = new RichEnum({
        TYPE_A: [0, 'Type A'],
      })

      expect(enumeration.TYPE_A).toEqual({
        key: 'TYPE_A',
        value: 0,
        text: 'Type A',
      })
    })

    it('should throw exception if value is empty', () => {
      expect(() => {
        // eslint-disable-next-line
        new RichEnum({
          TYPE_A: [],
        })
      }).toThrowErrorMatchingSnapshot()

      expect(() => {
        // eslint-disable-next-line
        new RichEnum({
          TYPE_A: {},
        })
      }).toThrowErrorMatchingSnapshot()
    })

    it('should freeze the instance object', () => {
      const enumeration = new RichEnum({})

      expect(() => {
        enumeration._map = null
      }).toThrowErrorMatchingSnapshot()
      expect(() => {
        enumeration._map.a = null
      }).toThrowErrorMatchingSnapshot()
      expect(() => {
        enumeration.a = null
      }).toThrowErrorMatchingSnapshot()
      expect(Object.isFrozen(enumeration)).toBeTruthy()
    })
  })

  describe('# instance extend', () => {
    it('should return a new RichEnum if extend the original one', () => {
      const enumeration = new RichEnum({
        TYPE_A: [0, 'Type A'],
        TYPE_B: [1, 'Type B'],
      })

      const anotherEnumeration = enumeration.extend({
        TYPE_A: {
          extra: 'Extra Information',
        },
        TYPE_C: {
          value: 2,
        },
      })

      expect(anotherEnumeration).toHaveProperty('TYPE_A', {
        key: 'TYPE_A',
        value: 0,
        text: 'Type A',
        extra: 'Extra Information',
      })

      expect(anotherEnumeration).toHaveProperty('TYPE_C', {
        key: 'TYPE_C',
        value: 2,
      })
    })
  })

  describe('# static extend()', () => {
    it('should return an new RichEnum for static extend', () => {
      const enumeration = new RichEnum({
        TYPE_A: [0, 'Type A'],
        TYPE_B: [1, 'Type B'],
      })

      const anotherEnumeration = RichEnum.extend(enumeration, {
        TYPE_A: {
          extra: 'Extra Information',
        },
        TYPE_C: {
          value: 2,
        },
      })

      expect(anotherEnumeration).toHaveProperty('TYPE_A', {
        key: 'TYPE_A',
        value: 0,
        text: 'Type A',
        extra: 'Extra Information',
      })

      expect(anotherEnumeration).toHaveProperty('TYPE_C', {
        key: 'TYPE_C',
        value: 2,
      })
    })
  })

  describe('# static is', () => {
    it('should check if a object is an RichEnum', () => {
      expect(RichEnum.is({})).toBe(false)
      expect(RichEnum.is(null)).toBe(false)
      expect(RichEnum.is()).toBe(false)
    })
  })

  describe('# iterator', () => {
    const enumeration = new RichEnum({
      TYPE_A: [0, 'Type A'],
      TYPE_B: [1, 'Type B'],
    })

    const result = []

    for (const item of enumeration) {
      result.push(item)
    }

    expect(result).toEqual([
      {key: 'TYPE_A', text: 'Type A', value: 0},
      {key: 'TYPE_B', text: 'Type B', value: 1},
    ])
  })
})
