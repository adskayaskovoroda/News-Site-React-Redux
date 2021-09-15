import React from 'react'
import { TextField, MenuItem } from '@material-ui/core'
import { Field } from 'react-final-form'
import { composeValidators } from '../utils/validators'

export default function FormTextField({
    name,
    validators,
    selectItems,
    ...textFieldProps
}) {
    return (
        <Field name={name} validate={validators && composeValidators(validators)}>
            {({ input, meta }) => (
                <TextField
                    {...input}
                    {...textFieldProps}
                    select={Boolean(selectItems)}
                    error={meta.touched && Boolean(meta.error)}
                    helperText={(meta.touched && meta.error) || undefined}
                >
                    {selectItems && selectItems.map((el, i) => <MenuItem value={el.value} key={i}>{el.text}</MenuItem>)}
                </TextField>
            )}
        </Field>
    )
}
