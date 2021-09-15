import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import CreateNewPostDialog from '../components/CreateNewPostDialog'

test('CreateNewPostDialog returns expected values', () => {
    const mockOnClose = jest.fn()
    const mockOnSubmit = jest.fn()

    const { getByText, getAllByRole } = render(<CreateNewPostDialog
        open={true}
        onClose={mockOnClose}
        onSubmit={mockOnSubmit}
    />)

    const [titleInput, contentInput, tagsInput] = getAllByRole('textbox')

    const values = {
        title: 'title',
        content: 'content',
        tags: ['tag1', 'tag2']
    }

    fireEvent.change(titleInput, { target: { value: values.title } })
    fireEvent.change(contentInput, { target: { value: values.content } })
    
    values.tags.forEach(tag => {
        fireEvent.change(tagsInput, { target: { value: tag } })
        fireEvent.keyPress(tagsInput, { charCode: 13 })
    })
    
    fireEvent.click(getByText('Confirm').parentElement)

    expect(mockOnSubmit).toHaveBeenCalled()
    expect(mockOnSubmit.mock.calls[0][0]).toMatchObject(values)
})
