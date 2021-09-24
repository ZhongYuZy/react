import { Effect, Reducer } from 'umi';
import api from '../../http/backstageApi';
import { message } from 'antd';
import moment from 'moment';

// 定义state的数据
export interface LimitModelState {
  topics: any[];
  data: any[];
}

export interface LimitModelType {
  namespace: 'limit';
  state: LimitModelState;
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
    setTopics: Reducer<LimitModelState>;
    setdata: Reducer<LimitModelState>;
  };
}

const LimitModel: LimitModelType = {
  namespace: 'limit',
  state: {
    topics: [],
    data: [],
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    // 添加秒杀
    *getTopics({ payload }, { call, put }) {
      let res = yield call(api.addSeckill, payload);
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
    // 获取秒杀**
    *getdata({ payload }, { call, put }) {
      let res = yield call(api.getSeckill, payload);
      console.log(res);
      if (res.code === 200) {
        res.data.map((item: any, index: number) => {
          item.active = index + 1;
          item.start_time = moment(item.start_time);
          item.end_time = moment(item.end_time);
        });
        yield put({
          type: 'setdata',
          payload: res,
        });
      }
    },
    // 删除秒杀
    *delBanner({ payload }, { call, put }) {
      let res = yield call(api.delSeckill, payload);
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
    // 显示秒杀
    *showBanner({ payload }, { call, put }) {
      let res = yield call(api.showSeckill, payload);

      if (res.code === 200) {
        message.success(res.msg);
      }
    },
    // 修改秒杀
    *updateBanner({ payload }, { call, put }) {
      let res = yield call(api.updateSeckill, payload);
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

export default LimitModel;
