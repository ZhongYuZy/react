import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      routes: [
        {
          path: '/login',
          component: '@/pages/login/login',
          title: '登录',
        },
        {
          path: '/',
          component: '@/pages/home',
          title: '首页',
        },
      
      ]
      
    },

  ],
  fastRefresh: {},
});
