import { Effect, Reducer } from 'umi';
import api from '@/http/backstageApi';
import { message } from 'antd';

// 定义state的数据
export interface GoodsSpecModelState {
  topics: any[];
  data: any[];
}

export interface GoodsSpecModelType {
  namespace: 'goodsSpec';
  state: GoodsSpecModelState;
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
    setTopics: Reducer<GoodsSpecModelState>;
    setdata: Reducer<GoodsSpecModelState>;
  };
}

const GoodsSpecModel: GoodsSpecModelType = {
  namespace: 'goodsSpec',
  state: {
    topics: [],
    data: [],
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    *getTopics({ payload }, { call, put }) {
      //添加
      let res = yield call(api.addSpec, payload);
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
      let res = yield call(api.getSpec, payload);
      //   console.log(res);

      if (res.code === 200) {
        res.data.map((item: any, index: number) => {
          item.active = index + 1;
          item.spec_item = item.spec_item.join(',');
        });
        yield put({
          type: 'setdata',
          payload: res,
        });
      }
    },
    *getdata1({ payload }, { call, put }) {
      //获取
      yield put({
        type: 'setdata',
        payload: {},
      });
    },
    *delBanner({ payload }, { call, put }) {
      //删除
      let res = yield call(api.delSpec, payload);
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
      let res = yield call(api.getModel, payload);
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

export default GoodsSpecModel;
