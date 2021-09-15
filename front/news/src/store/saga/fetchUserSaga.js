import { call, put } from '@redux-saga/core/effects'
import axios from '../axios'
import { loadingStatus, setUser } from '../actions/actions'
import { handleDefaultErrors } from '../../utils/utils'

async function fetchUser(id) {
    const config = {
        method: 'get',
        url: `/users/${id}`,
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

export default function* fetchUserWorker({ payload: { id } }) {
    yield put(setUser({ loading: loadingStatus.LOADING }))
    const response = yield call(fetchUser, id)

    if (!response.ok) {
        yield put(setUser({ loading: loadingStatus.ERROR }))
        yield call(response.handler)
        return
    }

    yield put(setUser({ data: response.data, loading: loadingStatus.OK }))
}
