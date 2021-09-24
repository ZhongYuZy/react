import { Effect, Reducer } from 'umi';
import api from '@/http/backstageApi';
import { message } from 'antd';

// 定义state的数据
export interface CategModelState {
  topics: any[];
  data: any[];
}

export interface CategModelType {
  namespace: 'categ';
  state: CategModelState;
  // 等同于vuex里面的action 用来发请求的
  effects: {
    getTopics: Effect;
    getdata: Effect;
    delBanner: Effect;
    updateBanner: Effect;
    second: Effect;
  };
  // 等同于vuex里面的mutation
  reducers: {
    setTopics: Reducer<CategModelState>;
    setdata: Reducer<CategModelState>;
  };
}

const CategModel: CategModelType = {
  namespace: 'categ',
  state: {
    topics: [],
    data: [],
  },
  effects: {
    // *等同于async
    // payload请求传递的参数
    *getTopics({ payload }, { call, put }) {
      //添加一级分类
      let res = yield call(api.addCategory, payload);
      console.log(res);
      if (res.code === 200) {
        message.success(res.msg);
        yield put({
          type: 'getdata',
          payload: '',
        });
      }
    },
    *second({ payload }, { call, put }) {
      //添加二级分类
      let res = yield call(api.addSecondCategory, payload);
      //   console.log(res);
      if (res.code === 200) {
        message.success(res.msg);
        yield put({
          type: 'getdata',
          payload: '',
        });
      }
    },
    *getdata({ payload }, { call, put }) {
      //获取
      let res = yield call(api.getCategory, payload);
      console.log(res);
      res.data.map((item: any) => {
        item.title = item.name;
        item.key = item._id;
        item.list.map((item1: any) => {
          item1.title = item1.name;
          item1.key = item1._id;
        });
        item.children = item.list;
      });
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
    //删除
    *delBanner({ payload }, { call, put }) {
      let res = yield call(api.delCategory, payload);
      if (res.code === 200) {
        console.log(res);
        message.success(res.msg);
        yield put({
          type: 'getdata',
          payload: '',
        });
      }
    },
    //商品模型
    *updateBanner({ payload }, { call, put }) {
      let res = yield call(api.getModel, payload);
      //   console.log(res);
      if (res.code === 200) {
        yield put({
          type: 'setTopics',
          payload: res,
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

export default CategModel;
