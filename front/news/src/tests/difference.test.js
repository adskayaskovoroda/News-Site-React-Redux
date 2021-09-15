import { difference } from "../utils/utils";

test.each([
    [{ a: 1 }, { a: 1 }, {}]
    [{ a: 1 }, { a: 1, b: 2 }, { b: 2 }],
    [{ a: 1 }, {}, { a: null }],
    [{ a: 1 }, { b: 2 }, { a: null, b: 2 }]
    [{ a: 1 }, { a: 'a' }, { a: 'a' }]
])('difference returns expected object', (obj1, obj2, expected) => expect(difference(obj1, obj2)).toMatchObject(expected))
