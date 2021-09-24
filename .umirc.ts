import { defineConfig } from 'umi';
import slideshow from './src/pages/slideshow/slideshow';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/login',
      component: '@/pages/login/login',
    },
    {
      path: '/',
      component: '@/pages/layout/layout',
      routes: [
        {
          path: '/',
          component: '@/pages/index',
          title: '首页',
        },
        {
          path: '/slideshow',
          component: '@/pages/slideshow/slideshow',
          title: '轮播图管理',
        },
        {
          path: '/navigation',
          component: '@/pages/navigation/navigation',
          title: '导航管理',
        },
        {
          path: '/recommend',
          component: '@/pages/recommend/recommend',
          title: '推荐导航',
        },
        {
          path: '/user',
          component: '@/pages/user/user',
          title: '用户管理',
        },
        {
          path: '/addgoods',
          component: '@/pages/goods/addgoods/addgoods',
          title: '添加商品',
        },
        {
          path: '/categ',
          component: '@/pages/goods/categ/categ',
          title: '商品分类',
        },
        {
          path: '/goodsModel',
          component: '@/pages/goods/goodsModel/goodsModel',
          title: '商品模型',
        },
        {
          path: '/goodsSpec',
          component: '@/pages/goods/goodsSpec/goodsSpec',
          title: '商品规格',
        },
        {
          path: '/goodsParms',
          component: '@/pages/goods/goodsParms/goodsParms',
          title: '商品参数',
        },
        {
          path: '/spec',
          component: '@/pages/goods/parameter/parameter',
          title: '规格参数',
        },
        {
          path: '/limit',
          component: '@/pages/limit/limit',
          title: '秒杀管理',
        },
        {
          path: '/discounts',
          component: '@/pages/discounts/discounts',
          title: '优惠券管理',
        },
        {
          path: '/bill',
          component: '@/pages/bill/bill',
          title: '订单管理',
        },
        {
          path: '/inform',
          component: '@/pages/inform/inform',
          title: '通知管理',
        },
        {
          path: '/customer',
          component: '@/pages/customer/customer',
          title: '客服消息',
        },
      ],
    },
  ],
  fastRefresh: {},
});