import axios from '../axios'
import { call, put } from '@redux-saga/core/effects'
import { setMe, setSubmittingStatus, submittingStatus } from '../actions/actions'
import { setAccess, handleDefaultErrors } from '../../utils/utils'

async function oauth(data) {
    const config = {
        method: 'post',
        url: '/auth/google/',
        data,
        withAuth: false,
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

export default function* oauthWorker({ payload }) {
    yield put(setSubmittingStatus({ status: submittingStatus.START }))
    const response = yield call(oauth, payload)

    if (!response.ok) {
        yield call(response.handler)
        return
    }

    setAccess(response.data.access, response.data.refresh)
    yield put(setMe({ data: response.data.user }))
    yield put(setSubmittingStatus({ status: submittingStatus.OK }))
}
