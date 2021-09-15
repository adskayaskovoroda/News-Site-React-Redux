import { difference } from "../utils/utils";

test('difference returns empty object', () => {
    const obj1 = {
        a: 1,
        b: 2,
    }

    const obj2 = {
        a: 1,
        b: 2
    }

    expect(difference(obj1, obj2)).toMatchObject({})
})

test.each([
    [{ a: 1 }, { a: 1, b: 2 }, { b: 2 }],
    [{ a: 1 }, {}, { a: null }],
    [{ a: 1 }, { b: 2 }, { a: null, b: 2 }]
])('difference returns different keys', (obj1, obj2, expected) => expect(difference(obj1, obj2)).toMatchObject(expected))

test('difference returns different values', () => {
    const obj1 = {
        a: 1,
        b: 2,
    }

    const obj2 = {
        a: 'a',
        b: 'b',
    }

    expect(difference(obj1, obj2)).toMatchObject({ a: 'a', b: 'b' })
})
