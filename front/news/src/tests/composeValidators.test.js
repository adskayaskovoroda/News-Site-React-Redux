import { composeValidators, required, maxLength32 } from "../utils/validators";

test('composeValidators validate with 1 validator', () => {
    const validator = composeValidators([required])

    expect(validator('')).not.toBeUndefined()
    expect(validator('Something')).toBeUndefined()
})

test('composeValidators validate with many validators', () => {
    const validator = composeValidators([required, maxLength32])

    expect(validator('')).not.toBeUndefined()
    expect(validator('Something')).toBeUndefined()
    expect(validator('a'.repeat(40))).not.toBeUndefined()
})
