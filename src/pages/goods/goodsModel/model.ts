import { Effect, Reducer } from 'umi';
import api from '@/http/backstageApi';
import { message } from 'antd';

// 定义state的数据
export interface GoodsModelModelState {
  topics: any[];
  data: any[];
}

export interface GoodsModelModelType {
  namespace: 'goodsModel';
  state: GoodsModelModelState;
  // 等同于vuex里面的action 用来发请求的
  effects: {
    getTopics: Effect;
    getdata: Effect;
    delBanner: Effect;
    updateBanner: Effect;
  };
  // 等同于vuex里面的mutation
  reducers: {
    setTopics: Reducer<GoodsModelModelState>;
    setdata: Reducer<GoodsModelModelState>;
  };
}

const GoodsModelModel: GoodsModelModelType = {
  namespace: 'goodsModel',
  state: {
    topics: [],
    data: [],
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    *getTopics({ payload }, { call, put }) {
      //添加
      let res = yield call(api.addModel, payload);
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
      let res = yield call(api.getModel, payload);
      //   console.log(res);

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
      let res = yield call(api.delModel, payload);
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
    *updateBanner({ payload }, { call, put }) {
      //编辑
      let res = yield call(api.updateModel, payload);
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

export default GoodsModelModel;
