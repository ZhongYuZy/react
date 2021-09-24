import { Effect, Reducer } from 'umi';
import api from '@/http/backstageApi';
import { message } from 'antd';
import dayjs from 'dayjs';
import moment from 'moment';

// 定义state的数据
export interface DiscountsModelState {
  topics: any[];
  data: any[];
}

export interface DiscountsModelType {
  namespace: 'discounts';
  state: DiscountsModelState;
  // 等同于vuex里面的action 用来发请求的
  effects: {
    getdiscountser: Effect;
    getdata: Effect;
    delBanner: Effect;
    showBanner: Effect;
    updateBanner: Effect;
  };
  // 等同于vuex里面的mutation
  reducers: {
    setTopics: Reducer<DiscountsModelState>;
    setdata: Reducer<DiscountsModelState>;
  };
}

const DiscountsModel: DiscountsModelType = {
  namespace: 'discounts',
  state: {
    topics: [],
    data: [],
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    *getdiscountser({ payload }, { call, put }) {
      //新增
      let res = yield call(api.addCoupon, payload);
      //   console.log(res);
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
      let res = yield call(api.getCoupon, payload);

      if (res.code === 200) {
        res.data.map((item: any, index: number) => {
          item.start_time = moment(item.start_time);
          item.end_time = moment(item.end_time);
        });
        yield put({
          type: 'setdata',
          payload: res,
        });
      }
      //   console.log(res);
    },
    *delBanner({ payload }, { call, put }) {
      //删除
      let res = yield call(api.delCoupon, payload);
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
    *showBanner({ payload }, { call, put }) {
      //修改状态
      let res = yield call(api.showCoupon, payload);
      // console.log(res);
      if (res.code === 200) {
        message.success(res.msg);
      }
    },
    *updateBanner({ payload }, { call, put }) {
      //编辑
      let res = yield call(api.updateCoupon, payload);
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

export default DiscountsModel;
