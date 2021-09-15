import axios from '../axios'
import { call, put } from '@redux-saga/core/effects'
import { setMe, setUser } from '../actions/actions'
import { handleDefaultErrors } from '../../utils/utils'

async function updateUser(id, data) {
    console.log(data)
    const form = new FormData()
    for (let key in data)
        form.append(key, data[key])

    const config = {
        method: 'patch',
        url: `/users/${id}/`,
        data: form,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withAuth: true,
    }

    try {
        const response = await axios(config)
        return {
            ok: true,
            data: response.data
        }
    } catch (error) {
        switch (error.response.status) {
            default:
                return handleDefaultErrors(error.response)
        }
    }
}

export default function* updateUserWorker({ payload: { id, diff } }) {
    const response = yield call(updateUser, id, diff)

    if (!response.ok) {
        yield call(response.handler)
        return
    }

    yield put(setMe({ data: response.data }))
    yield put(setUser({ data: response.data }))
}
