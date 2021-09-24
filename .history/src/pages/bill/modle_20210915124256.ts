import { Effect, Reducer } from 'umi'
import api from '../../http/backstageApi'
import { message } from 'antd';
// 定义state的数据
export interface GetOrderModelState {
  order: any,
}

export interface GetOrderModelType {
  namespace: 'getOrder'
  state: GetOrderModelState
  // 等同于vuex里面的action 用来发请求的
  effects: {
    getOrder: Effect
  },
  // 等同于vuex里面的mutation
  reducers: {
    setOrder: Reducer<GetOrderModelState>
  }
}

const GetOrderModel: GetOrderModelType = {
  namespace: 'getOrder',
  state: {
    order: {},
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    *getOrder({  payload  }, { call, put }) {
      let res = yield call(api.getOrder)
      if(res.code===200){
        yield put({
          type: 'setOrder',
          payload: res
        })
      }else{
        message.error(res.msg);
      }
    }
  },
  reducers: {
    setOrder(state, action) {
      return {
        ...state,
        order: action.payload,
      }
    },
  }
}

export default GetOrderModel