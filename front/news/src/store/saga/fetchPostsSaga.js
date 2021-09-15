import axios from '../axios'
import { call, put, select } from '@redux-saga/core/effects'
import { setPosts, loadingStatus } from '../actions/actions'
import { handleDefaultErrors} from '../../utils/utils'

async function fetchPosts(params, access) {
    const config = {
        method: 'get',
        url: '/posts',
        params,
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

export default function* fetchPostsWorker({ payload }) {
    yield put(setPosts({ loading: loadingStatus.LOADING }))
    const access = yield select(state => state.access)
    const response = yield call(fetchPosts, payload, access)

    if (!response.ok) {
        yield put(setPosts({ loading: loadingStatus.ERROR }))
        yield call(response.handler)
        return
    }

    yield put(setPosts({
        data: response.data.map(post => ({
            ...post,
            tags: post.tags.length
                ? post.tags[0].split(',').filter(value => value !== '')
                : []
        })),
        loading: loadingStatus.OK
    }))
}
