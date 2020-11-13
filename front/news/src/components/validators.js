export const required = value => value ? undefined : 'Required';

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
    ? 'Invalid email address'
    : undefined;

export const maxLength = max => value =>
  value && value.length > max
    ? `Must be ${max} characters or less`
    : undefined;

export const maxLength20 = maxLength(20);
export const maxLength50 = maxLength(50);
export const maxLength100 = maxLength(100);