import { call, put } from '@redux-saga/core/effects'
import axios from '../axios'
import { signIn } from '../actions/actions'
import { setSubmittingStatus, submittingStatus } from '../actions/actions'
import { firstError, handleDefaultErrors } from '../../utils/utils'

async function signUp(data) {
    const config = {
        method: 'post',
        url: '/users/',
        data,
        withAuth: false,
    }

    try {
        const response = await axios(config)
        return {
            ok: true,
            data: response.data,
        }
    } catch (error) {
        switch (error.response.status) {
            case 400:
                return {
                    ok: false,
                    handler: function* () {
                        yield put(setSubmittingStatus({
                            status: setSubmittingStatus.ERROR,
                            message: firstError(error.response.data)
                        }))
                    }
                }
            default:
                return handleDefaultErrors(error.response)
        }
    }
}

export default function* signUpWorker({ payload }) {
    yield put(setSubmittingStatus({ status: submittingStatus.START }))
    const response = yield call(signUp, payload)

    if (!response.ok) {
        yield call(response.handler)
        return
    }

    yield put(signIn(payload.email, payload.password))
}
