import React, { useCallback, useState } from 'react'
import { Form } from 'react-final-form'
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, makeStyles } from '@material-ui/core'
import FormTextField from './FormTextField'
import FormFileField from './FormFileField'
import TagsTextField from './TagsTextField'
import { required, maxLength64 } from '../utils/validators'

const useStyles = makeStyles(theme => ({
    content: {
        display: 'flex',
        flexDirection: 'column',
        gap: `${theme.spacing(2)}px`,
    },
    image: {
        display: 'flex',
        justifyContent: 'center',
    },
}))

export default function CreateNewPostDialog({ open, onClose, onSubmit }) {
    const classes = useStyles()
    const [tags, setTags] = useState([])

    const closeForm = () => {
        setTags(prev => [])
        onClose()
    }
    const submitForm = values => {
        onSubmit({ ...values, tags: tags.map(tag => tag.label) })
        closeForm()
    }

    const addTag = useCallback(tag => setTags(prev => [...prev, { key: Date.now(), label: tag }]), [])
    const deleteTag = useCallback(key => setTags(prev => prev.filter(tag => tag.key !== key)), [])
    const normalizer = useCallback(value => value.slice(0, 20).replace(',', '').trim(), [])

    return (
        <Dialog open={open} fullWidth>
            <Form onSubmit={submitForm}>
                {({ handleSubmit, valid, pristine }) => (
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>New Post</DialogTitle>
                        <DialogContent className={classes.content}>
                            <FormTextField
                                name='title'
                                validators={[required, maxLength64]}
                                label='*Title'
                            />
                            <div className={classes.image}>
                                <FormFileField name='image' />
                            </div>
                            <FormTextField
                                name='content'
                                validators={[required]}
                                label='*Content'
                                multiline
                            />
                            <TagsTextField
                                size='small'
                                label='Tags'
                                placeholder='Type and press Enter'
                                tags={tags}
                                addTag={addTag}
                                deleteTag={deleteTag}
                                normalizer={normalizer}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                type='submit'
                                color='primary'
                                disabled={pristine || !valid}
                            >
                                Confirm
                            </Button>
                            <Button onClick={closeForm} color='default'>Cancel</Button>
                        </DialogActions>
                    </form>
                )}
            </Form>
        </Dialog>
    )
}
