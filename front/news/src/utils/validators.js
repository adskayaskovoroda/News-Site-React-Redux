export const composeValidators = (validators) => value => validators.reduce((error, validator) => error || validator(value), undefined)

export const required = value =>
    value
        ? undefined
        : 'Required'

export const email = value =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;

export const maxLength = max => value =>
    String(value).length <= max
        ? undefined
        : `Max length is ${max} symbols`

export const maxLength20 = maxLength(20)

export const maxLength32 = maxLength(32)

export const maxLength64 = maxLength(64)

export const maxLength128 = maxLength(128)
