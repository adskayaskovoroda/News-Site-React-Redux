import axios from '../axios'
import { call, put, select } from '@redux-saga/core/effects'
import { fetchPosts } from '../actions/actions'
import { handleDefaultErrors } from '../../utils/utils'

async function createPost(data) {
    const form = new FormData()
    for (let key in data)
        form.append(key, data[key])
    
    const config = {
        method: 'post',
        url: '/posts/',
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

export default function* createPostWorker({ payload }) {
    const response = yield call(createPost, payload)

    if (!response.ok) {
        yield call(response.handler)
        return
    }

    const currentUserId = yield select(state => state.user.data.id)
    yield put(fetchPosts(currentUserId, 'api_user_id'))
}
