import { Effect, Reducer } from 'umi'
import api from '../../../http/backstageApi'
// 定义state的数据
export interface LoginModelState {
    user: any[],
}

export interface LoginModelType {
    namespace: 'carousel'
    state: LoginModelState
    // 等同于vuex里面的action 用来发请求的
    effects: {
        upload: Effect,
    },
    // 等同于vuex里面的mutation
    reducers: {
        setUser: Reducer<LoginModelState>
    }
}

const Model: LoginModelType = {
    namespace: 'carousel',
    state: {
        user: [],
    },
    effects: {
        // *等同于async
        // payload请求传递的参数
        * upload({ payload }, { call, put }) {
            let res = yield call(api.upload, payload)
            console.log(res)
            if (res.code === 200) {
                yield put({
                    type: 'setUser',
                    payload: res.data.data
                })
            }
        },
    },
    reducers: {
        setUser(state, action) {
            return {
                ...state,
                user: action.payload,
            }
        },
    }
}

export default Model