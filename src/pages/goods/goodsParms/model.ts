import { Effect, Reducer } from 'umi';
import api from '@/http/backstageApi';
import { message } from 'antd';

// 定义state的数据
export interface GoodsParmsModelState {
  topics: any[];
  data: any[];
}

export interface GoodsParmsModelType {
  namespace: 'goodsParms';
  state: GoodsParmsModelState;
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
    setTopics: Reducer<GoodsParmsModelState>;
    setdata: Reducer<GoodsParmsModelState>;
  };
}

const GoodsParmsModel: GoodsParmsModelType = {
  namespace: 'goodsParms',
  state: {
    topics: [],
    data: [],
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    *getTopics({ payload }, { call, put }) {
      //添加
      //   console.log(payload);
      let res = yield call(api.addParams, payload);
      console.log(res);
      if (res.code === 200) {
        message.success(res.msg);
        yield put({
          type: 'getdata',
          payload: { parentId: payload.parentId },
        });
      }
    },
    *getdata({ payload }, { call, put }) {
      //获取
      let res = yield call(api.getParams, payload);
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
    // 编辑
    *getdata1({ payload }, { call, put }) {
      console.log(payload);

      let res = yield call(api.updateParams, payload);
      console.log(res);

      if (res.code === 200) {
        message.success(res.msg);
        yield put({
          type: 'getdata',
          payload: { parentId: payload.parentId },
        });
      }
    },
    *delBanner({ payload }, { call, put }) {
      //删除
      let res = yield call(api.delParams, payload);
      if (res.code === 200) {
        message.success(res.msg);
        yield put({
          type: 'getdata',
          payload: { parentId: payload.parentId },
        });
      }
    },
    //获取商品模型数据
    *updateBanner({ payload }, { call, put }) {
      let res = yield call(api.getGoods, payload);
      if (res.code === 200) {
        res.data.map((item: any, index: number) => {
          item.active = index + 1;
        });
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

export default GoodsParmsModel;
