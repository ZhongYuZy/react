import { Effect, Reducer } from 'umi';
import api from '@/http/backstageApi';
import { message } from 'antd';

// 定义state的数据
export interface goodsParmsModelState {
  topics: any[];
  data: any[];
  obj: any[];
}

export interface GoodsParmsModelType {
  namespace: 'goodsParms';
  state: goodsParmsModelState;
  // 等同于vuex里面的action 用来发请求的
  effects: {
    getTopics: Effect;
    getdata: Effect;
    delBanner: Effect;
    updateBanner: Effect;
    specification: Effect;
    classify: Effect;
    specification1: Effect;
  };
  // 等同于vuex里面的mutation
  reducers: {
    setTopics: Reducer<goodsParmsModelState>;
    setdata: Reducer<goodsParmsModelState>;
    setobj: Reducer<goodsParmsModelState>;
  };
}

const GoodsParmsModel:GoodsParmsModelType = {
  namespace: 'goodsParms',
  state: {
    topics: [],
    data: [],
    obj: [],
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    *getTopics({ payload }, { call, put }) {
      //添加
      let res = yield call(api.addGoods, payload);
      console.log(res);
      if (res.code === 200) {
        message.success(res.msg);
        yield put({
          type: 'getdata',
          payload: {
            current: 1,
            pageSize: 5,
            query: '',
          },
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
    *delBanner({ payload }, { call, put }) {
      //删除
      let res = yield call(api.delGoods, payload);
      if (res.code === 200) {
        message.success(res.msg);
        yield put({
          type: 'getdata',
          payload: {
            current: 1,
            pageSize: 5,
            query: '',
          },
        });
      }
    },
    // 商品模型
    *updateBanner({ payload }, { call, put }) {
      let res = yield call(api.getModel, payload);
      //   console.log(res);
      if (res.code === 200) {
        res.data.map((item: any, index: number) => {
          item.active = index + 1;
        });
        yield put({
          type: 'setobj',
          payload: res,
        });
      }
    },
    // 获取分类
    *classify({ payload }, { call, put }) {
      let res = yield call(api.getCategory, payload);
      console.log(res);
      if (res.code === 200) {
        res.data.map((item: any, index: number) => {
          item.active = index + 1;
          item.value = item._id;
          item.label = item.name;
          item.list.map((item1: any) => {
            item1.value = item1._id;
            item1.label = item1.name;
          });
          item.children = item.list;
        });
        yield put({
          type: 'setdata',
          payload: res,
        });
      }
    },
    // 获取商品规格
    *specification({ payload }, { call, put }) {
      let res = yield call(api.getSpec, payload);
      //   console.log(res);
      if (res.code === 200) {
        res.data.map((item: any, index: number) => {
          item.active = index + 1;
          item.checkList = [];
        });
        yield put({
          type: 'setTopics',
          payload: res,
        });
      }
    },
    *specification1({ payload }, { call, put }) {
      let res = yield call(api.getSpec, payload);
      //   console.log(res);
      if (res.code === 200) {
        res.data.map((item: any, index: number) => {
          item.active = index + 1;
          item.checkList = [];
        });
        yield put({
          type: 'setTopics',
          payload: {},
        });
      }
    },
  },
  reducers: {
    setTopics(state, action) {
      return {
        data: state!.data,
        topics: action.payload,
        obj: state!.obj,
      };
    },
    setdata(state, action) {
      return {
        topics: state!.topics,
        obj: state!.obj,
        data: action.payload,
      };
    },
    setobj(state, action) {
      return {
        topics: state!.topics,
        obj: action.payload,
        data: state!.data,
      };
    },
  },
};

export default GoodsParmsModel;
