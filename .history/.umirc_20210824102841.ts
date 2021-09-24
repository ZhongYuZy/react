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
          component: '@/pages/layout/layout',
          routes: [
            {
              path: '/',
              component: '@/pages/home',
              title: '首页',
            },
            {
              path: '/carousel',
              component: '@/pages/layout/carousel',
              title: '轮播图管理',
            },
            {
              path: '/navs',
              component: '@/pages/layout/navs',
              title: '导航管理',
            },
            {
              path: '/recom',
              component: '@/pages/layout/recom',
              title: '推荐管理',
            },
            {
              path: '/user',
              component: '@/pages/layout/user',
              title: '用户管理',
            },
            {
              path: '/goods',
              component: '@/pages/layout/goods/goods',
              title: '商品管理',
              routes:[
                {
                  path: '/addgoods',
                  component: '@/pages/layout/goods/addgoods',
                  title: '添加商品',
                },
                {
                  path: '/categ',
                  component: '@/pages/layout/goods/categ',
                  title: '商品分类',
                },
                {
                  path: '/goodsModel',
                  component: '@/pages/layout/goods/goodsModel',
                  title: '商品模型',
                },
                {
                  path: '/goodsSpec',
                  component: '@/pages/layout/goods/goodsSpec',
                  title: '商品规格',
                },
              ]
            },
            
          ]
        },
      
      ]
      
    },

  ],
  fastRefresh: {},
});
