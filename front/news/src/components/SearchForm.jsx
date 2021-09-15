import React from 'react'
import { Form } from 'react-final-form'
import { InputAdornment, IconButton, makeStyles } from '@material-ui/core'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SearchIcon from '@material-ui/icons/Search';
import FormTextField from './FormTextField'

const SEARCH_INPUT_PROPS = {
    startAdornment: (
        <InputAdornment position='start'>
            <ArrowForwardIosIcon />
        </InputAdornment>
    ),
}

const FILTER_TYPES = [
    { value: 'all', text: 'All' },
    { value: 'author', text: 'Author' },
    { value: 'tags', text: 'Tags' },
]

const INITIAL_VALUES = {
    search: '',
    filter: 'all',
}

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        gap: `${theme.spacing(1)}px`,
    },
    search: {
        width: '200px',
    },
}))

export default function SearchForm({ onSubmit }) {
    const classes = useStyles()

    return (
        <Form onSubmit={onSubmit} initialValues={INITIAL_VALUES}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className={classes.root}>
                    <FormTextField
                        name='search'
                        size='small'
                        InputProps={SEARCH_INPUT_PROPS}
                    />
                    <FormTextField
                        name='filter'
                        label='Filter'
                        size='small'
                        selectItems={FILTER_TYPES}
                    />
                    <IconButton
                        color='inherit'
                        type='submit'
                    >
                        <SearchIcon />
                    </IconButton>
                </form>
            )}
        </Form>
    )
}