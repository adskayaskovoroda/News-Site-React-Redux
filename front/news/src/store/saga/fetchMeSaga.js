import { call, put } from "@redux-saga/core/effects";
import { loadingStatus, setMe } from "../actions/actions";
import axios from "../axios";
import { handleDefaultErrors } from '../../utils/utils'

async function fetchMe() {
    const config = {
        url: '/me',
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

export default function* fetchMeWorker() {
    yield put(setMe({ loading: loadingStatus.LOADING }))
    const response = yield call(fetchMe)

    if (!response.ok) {
        yield put(setMe({ loading: loadingStatus.ERROR }))
        yield call(response.handler)
        return
    }

    yield put(setMe({ data: response.data, loading: loadingStatus.OK }))
}
