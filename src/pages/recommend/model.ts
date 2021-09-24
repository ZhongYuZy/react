import { Effect, Reducer } from 'umi';
import api from '../../http/backstageApi';
import { message } from 'antd';

// 定义state的数据
export interface RecommendModelState {
  topics: any[];
  data: any[];
}

export interface RecommendModelType {
  namespace: 'recommend';
  state: RecommendModelState;
  // 等同于vuex里面的action 用来发请求的
  effects: {
    getTopics: Effect;
    getdata: Effect;
    delBanner: Effect;
    showBanner: Effect;
    updateBanner: Effect;
    commodity: Effect;
  };
  // 等同于vuex里面的mutation
  reducers: {
    setTopics: Reducer<RecommendModelState>;
    setdata: Reducer<RecommendModelState>;
  };
}

const RecommendModel: RecommendModelType = {
  namespace: 'recommend',
  state: {
    topics: [],
    data: [],
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    // 新增导航*
    *getTopics({ payload }, { call, put }) {
      let res = yield call(api.addRecommendNav, payload);
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
    // 获取商品
    *commodity({ payload }, { call, put }) {
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
    // 获取导航*
    *getdata({ payload }, { call, put }) {
      let res = yield call(api.getRecommendNav, payload);

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
    // 删除导航*
    *delBanner({ payload }, { call, put }) {
      let res = yield call(api.delRecommendNav, payload);
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
    // 显示导航*
    *showBanner({ payload }, { call, put }) {
      let res = yield call(api.showRecommendNav, payload);

      if (res.code === 200) {
        message.success(res.msg);
      }
    },
    // 修改导航*
    *updateBanner({ payload }, { call, put }) {
      let res = yield call(api.updateRecommendNav, payload);
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
  },
  reducers: {
    setTopics(state, action) {
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

export default RecommendModel;
