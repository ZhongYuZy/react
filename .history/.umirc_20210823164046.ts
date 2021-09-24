import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      routes: [
        {
          path: '/',
          component: '@/pages/home',
          title: '首页',
        },
        {
          path: '/login',
          component: './src/pages/login/login',
          title: '登录',
        },
      ]
      
    },

  ],
  fastRefresh: {},
});
