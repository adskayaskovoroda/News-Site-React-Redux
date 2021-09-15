import React, { useState } from 'react'
import { TextField, InputAdornment, Chip, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    tagsInput: {
        '& > .MuiInputBase-root': {
            flexWrap: 'wrap',
        }
    },
    tags: {
        paddingTop: theme.spacing(1),
        gap: `${theme.spacing(0.5)}px`,
        flexWrap: 'wrap',
        height: 'auto',
        maxHeight: 'none',
    },
}))

export default function TagsTextField({ tags, addTag, deleteTag, normalizer, ...textFieldProps }) {
    const classes = useStyles()
    const [value, setValue] = useState('')

    const onKeyPress = event => {
        if (event.key === 'Enter') {
            event.preventDefault()
            if (value && !tags.find(tag => tag.label === value)) {
                addTag(value)
            }
            setValue('')
        }
    }

    return (
        <TextField
            {...textFieldProps}
            value={value}
            onChange={event => setValue(normalizer(event.target.value))}
            onKeyPress={onKeyPress}
            className={classes.tagsInput}
            InputProps={{
                startAdornment: (
                    <InputAdornment position='start' className={classes.tags}>
                        {tags.map(tag => (
                            <Chip
                                key={tag.key}
                                label={tag.label}
                                onDelete={() => deleteTag(tag.key)}
                                size='small'
                            />
                        )
                        )}
                    </InputAdornment>
                )
            }}
        />
    )
}
