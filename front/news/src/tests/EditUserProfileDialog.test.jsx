import React from 'react'
import { render } from '@testing-library/react'
import EditUserProfileDialog from '../components/EditUserProfileDialog'

test.each(
    [
        [true, 2],
        [false, 1]
    ]
)('EditUserProfileDialog renders different fields on credentialsEdit value being different', (credentialsEdit, expectedFieldsAmount) => {
    const { getAllByRole } = render(<EditUserProfileDialog
        open={true}
        onClose={jest.fn()}
        initialValues={{}}
        onSubmit={jest.fn()}
        credentialsEdit={credentialsEdit}
    />)

    expect(getAllByRole('textbox').length).toBe(expectedFieldsAmount)
})
