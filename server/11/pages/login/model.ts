import api from '@/http/backstageApi';
import { Effect, Reducer } from 'umi';
import { message } from 'antd';

// 定义state的数据
export interface LoginModelState {
  topics: any[];
}

export interface LoginModelType {
  namespace: 'login';
  state: LoginModelState;
  effects: {
    getTopics: Effect;
  };
  reducers: {
    setTopics: Reducer<LoginModelState>;
  };
}

const LoginModel: LoginModelType = {
  namespace: 'login',
  state: {
    topics: [],
  },
  effects: {
    *getTopics({ payload }, { call, put }) {
      let res = yield call(api.login, payload);
      //   console.log(res);
      if (res.code === 200) {
        yield put({
          type: 'setTopics',
          payload: res.data,
        });
        message.success('登录成功');
        window.location.pathname = '/';
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.data));
      }
    },
  },
  reducers: {
    setTopics(state, action) {
      return {
        ...state,
        topics: action.payload,
      };
    },
  },
};

export default LoginModel;
