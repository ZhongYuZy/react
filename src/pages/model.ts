import { Effect, Reducer } from 'umi'
import api from '../http/backstageApi'
import { message } from 'antd';
// 定义state的数据
export interface GetIndexModelState {
  index: any[],
}

export interface GetIndexModelType {
  namespace: 'getIndex'
  state: GetIndexModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    getIndex: Effect
  },
  // 等同于vuex里面的mutation
  reducers: {
    setIndex: Reducer<GetIndexModelState>
  }
}

const GetIndexModel: GetIndexModelType = {
  namespace: 'getIndex',
  state: {
    index: [],
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    *getIndex({  payload  }, { call, put }) {
      let res = yield call(api.getIndex)
      if(res.code===200){
        yield put({
          type: 'setIndex',
          payload: res
        })
      }else{
        message.error(res.msg);
      }
    }
  },
  reducers: {
    setIndex(state, action) {
      return {
        ...state,
        index: action.payload,
      }
    },
  }
}

export default GetIndexModel