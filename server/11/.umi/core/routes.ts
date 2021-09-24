// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from 'C:/Users/Administrator/Desktop/umiapp/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "routes": [
      {
        "path": "/login",
        "component": require('@/pages/login/login').default,
        "title": "登录",
        "exact": true
      },
      {
        "path": "/",
        "component": require('@/pages/layout/layout').default,
        "routes": [
          {
            "path": "/",
            "component": require('@/pages/home').default,
            "title": "首页",
            "exact": true
          },
          {
            "path": "/carousel",
            "component": require('@/pages/layout/carousel/carousel').default,
            "title": "轮播图管理",
            "locale": {
              "default": "zh-CN"
            },
            "exact": true
          },
          {
            "path": "/navs",
            "component": require('@/pages/layout/navs/navs').default,
            "title": "导航管理",
            "exact": true
          },
          {
            "path": "/recom",
            "component": require('@/pages/layout/recom/recom').default,
            "title": "推荐管理",
            "exact": true
          },
          {
            "path": "/user",
            "component": require('@/pages/layout/user/user').default,
            "title": "用户管理",
            "exact": true
          },
          {
            "path": "/addgoods",
            "component": require('@/pages/layout/addgoods/addgoods').default,
            "title": "添加商品",
            "exact": true
          },
          {
            "path": "/categ",
            "component": require('@/pages/layout/categ/categ').default,
            "title": "商品分类",
            "exact": true
          },
          {
            "path": "/goodsModel",
            "component": require('@/pages/layout/goodsModel/goodsModel').default,
            "title": "商品模型",
            "exact": true
          },
          {
            "path": "/goodsSpec",
            "component": require('@/pages/layout/goodsSpec/goodsSpec').default,
            "title": "商品规格",
            "exact": true
          },
          {
            "path": "/goodsParms",
            "component": require('@/pages/layout/goodsParms/goodsParms').default,
            "title": "商品参数",
            "exact": true
          },
          {
            "path": "/spec",
            "component": require('@/pages/layout/spec/spec').default,
            "title": "规格参数",
            "exact": true
          },
          {
            "path": "/splike",
            "component": require('@/pages/layout/splike/splike').default,
            "title": "秒杀管理",
            "exact": true
          },
          {
            "path": "/coupon",
            "component": require('@/pages/layout/coupon/coupon').default,
            "title": "优惠卷管理",
            "exact": true
          },
          {
            "path": "/order",
            "component": require('@/pages/layout/order/order').default,
            "title": "订单管理",
            "exact": true
          },
          {
            "path": "/notice",
            "component": require('@/pages/layout/notice/notice').default,
            "title": "通知管理",
            "exact": true
          },
          {
            "path": "/chat",
            "component": require('@/pages/layout/chat/chat').default,
            "title": "客服消息",
            "exact": true
          }
        ]
      }
    ]
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
