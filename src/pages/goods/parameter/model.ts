import { Effect, Reducer } from 'umi';
import api from '@/http/backstageApi';
import { message } from 'antd';

// 定义state的数据
export interface ParameterModelState {
  topics: any[];
  data: any[];
}

export interface ParameterModelType {
  namespace: 'parameter';
  state: ParameterModelState;
  // 等同于vuex里面的action 用来发请求的
  effects: {
    getTopics: Effect;
    getdata: Effect; // 搜索框选址值
    getdata1: Effect; // 搜索框选址值
    delBanner: Effect;
    updateBanner: Effect;
  };
  // 等同于vuex里面的mutation
  reducers: {
    setTopics: Reducer<ParameterModelState>;
    setdata: Reducer<ParameterModelState>;
  };
}

const ParameterModel: ParameterModelType = {
  namespace: 'parameter',
  state: {
    topics: [],
    data: [],
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    *getTopics({ payload }, { call, put }) {
      //添加商品规格
      let res = yield call(api.addSpecParams, payload);
      console.log(res);
      if (res.code === 200) {
        message.success(res.msg);
        yield put({
          type: 'updateBanner',
          payload: { parentId: payload.parentId },
        });
      }
    },
    *getdata({ payload }, { call, put }) {
      //获取商品
      let res = yield call(api.getGoods, payload);
      console.log(res);

      if (res.code === 200) {
        res.data.map((item: any, index: number) => {
          item.active = index + 1;
        });
        yield put({
          type: 'setdata',
          payload: res,
        });
      }
    },
    *getdata1({ payload }, { call, put }) {
      yield put({
        type: 'setdata',
        payload: {},
      });
    },
    *delBanner({ payload }, { call, put }) {
      // 修改商品参数
      let res = yield call(api.updateSpecParams, payload);
      if (res.code === 200) {
        message.success(res.msg);
        yield put({
          type: 'updateBanner',
          payload: { parentId: payload.parentId },
        });
      }
    },
    //获取商品规格
    *updateBanner({ payload }, { call, put }) {
      let res = yield call(api.getSpecParams, payload);
      console.log(res);
      if (res.code === 200) {
        yield put({
          type: 'setTopics',
          payload: res,
        });
      }
    },
  },
  reducers: {
    setTopics(state: any, action: any) {
      return {
        data: state!.data,
        topics: action.payload,
      };
    },
    setdata(state, action) {
      return {
        topics: state!.topics,
        data: action.payload,
      };
    },
  },
};

export default ParameterModel;
