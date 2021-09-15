import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import AddPostButton from '../components/AddPostButton'

test('AddPostButton calls callback after event fired', () => {
    const mockOnClick = jest.fn()

    render(<AddPostButton onClick={mockOnClick} />)

    fireEvent.click(screen.getByRole('button'))

    expect(mockOnClick).toHaveBeenCalled()
})
