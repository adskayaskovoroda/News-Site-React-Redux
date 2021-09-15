import { call, put } from '@redux-saga/core/effects'
import capitalize from 'lodash.capitalize'
import axios from '../axios'
import { setMe, setSubmittingStatus, submittingStatus } from '../actions/actions'
import { firstError, setAccess } from '../../utils/utils'
import { handleDefaultErrors } from '../../utils/utils'

async function signIn(data) {
    const config = {
        method: 'post',
        url: '/auth/token/',
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
            case 400:
                return {
                    ok: false,
                    handler: function* () {
                        yield put(setSubmittingStatus({
                            status: submittingStatus.ERROR,
                            message: firstError(error.response.data)
                        }))
                    }
                }
            case 401:
                return {
                    ok: false,
                    handler: function* () {
                        yield put(setSubmittingStatus({
                            status: submittingStatus.ERROR,
                            message: capitalize(error.response.data.detail)
                        }))
                    }
                }
            default:
                return handleDefaultErrors(error.response)
        }
    }
}

export default function* signInWorker({ payload }) {
    yield put(setSubmittingStatus({ status: submittingStatus.START }))
    const response = yield call(signIn, payload)
    
    if (!response.ok) {
        yield call(response.handler)
        return
    }

    setAccess(response.data.access, response.data.refresh)
    yield put(setMe({ data: response.data.user }))
    yield put(setSubmittingStatus({ status: submittingStatus.OK }))
}
