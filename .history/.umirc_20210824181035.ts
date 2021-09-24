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
              component: '@/pages/layout/carousel/carousel',
              title: '轮播图管理',
            },
            {
              path: '/navs',
              component: '@/pages/layout/navs/navs',
              title: '导航管理',
            },
            {
              path: '/recom',
              component: '@/pages/layout/recom/recom',
              title: '推荐管理',
            },
            {
              path: '/user',
              component: '@/pages/layout/user/user',
              title: '用户管理',
            },
            {
              path: '/goods',
              component: '@/pages/layout/goods/goods',
              title: '商品管理',
              routes:[
                {
                  path: '/addgoods',
                  component: '@/pages/addgoods/addgoods',
                  title: '添加商品',
                },
                {
                  path: '/categ',
                  component: '@/pages/categ/categ',
                  title: '商品分类',
                },
                {
                  path: '/goodsModel',
                  component: '@/pages/goodsModel/goodsModel',
                  title: '商品模型',
                },
                {
                  path: '/goodsSpec',
                  component: '@/pages/goodsSpec/goodsSpec',
                  title: '商品规格',
                },
                {
                  path: '/goodsParms',
                  component: '@/pages/goodsParms/goodsParms',
                  title: '商品参数',
                },
                {
                  path: '/spec',
                  component: '@/pages/spec/spec',
                  title: '规格参数',
                },
                
              ]
            },
            {
              path: '/splike',
              component: '@/pages/layout/splike/splike',
              title: '秒杀管理',
            },
            {
              path: '/coupon',
              component: '@/pages/layout/coupon/coupon',
              title: '优惠卷管理',
            },
            {
              path: '/order',
              component: '@/pages/layout/order/order',
              title: '订单管理',
            },
            {
              path: '/notice',
              component: '@/pages/layout/notice/notice',
              title: '通知管理',
            },
            {
              path: '/chat',
              component: '@/pages/layout/chat/chat',
              title: '客服消息',
            },
          ]
        },
      
      ]
      
    },

  ],
  fastRefresh: {},
});
