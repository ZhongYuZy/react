import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import { useHistory } from 'react-router-dom';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
const { Header, Sider, Content } = Layout;
import {
  BankOutlined,
  IdcardOutlined,
  BarsOutlined,
  ContactsOutlined,
  TableOutlined,
  HistoryOutlined,
  AccountBookOutlined,
  NotificationOutlined,
  MessageOutlined,
  FileAddOutlined,
  MenuOutlined,
  FileOutlined,
  ApartmentOutlined,
  AppstoreOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

const left = () => {
  //声明
  const { SubMenu } = Menu;
  let list = [
    {
      name: '首页',
      url: '/',
      icon: BankOutlined,
    },
    {
      name: '轮播图管理',
      url: '/slideshow',
      icon: IdcardOutlined,
    },
    {
      name: '导航管理',
      url: '/navigation',
      icon: BarsOutlined,
    },
    {
      name: '推荐导航',
      url: '/recommend',
      icon: ContactsOutlined,
    },
    {
      name: '用户管理',
      url: '/user',
      icon: UserOutlined,
    },
    {
      name: '商品管理',
      url: '',
      icon: TableOutlined,
      list1: [
        {
          name: '添加商品',
          url: '/addgoods',
          icon: FileAddOutlined,
        },
        {
          name: '商品分类',
          url: '/categ',
          icon: DatabaseOutlined,
        },
        {
          name: '商品模型',
          url: '/goodsModel',
          icon: MenuOutlined,
        },
        {
          name: '商品规格',
          url: '/goodsSpec',
          icon: FileOutlined,
        },
        {
          name: '商品参数',
          url: '/goodsParms',
          icon: ApartmentOutlined,
        },
        {
          name: '规格参数',
          url: '/spec',
          icon: AppstoreOutlined,
        },
      ],
    },
    {
      name: '秒杀管理',
      url: '/limit',
      icon: HistoryOutlined,
    },
    {
      name: '优惠券管理',
      url: '/discounts',
      icon: AccountBookOutlined,
    },
    {
      name: '订单管理',
      url: '/bill',
      icon: BarsOutlined,
    },
    {
      name: '通知管理',
      url: '/inform',
      icon: NotificationOutlined,
    },
    {
      name: '客服消息',
      url: '/customer',
      icon: MessageOutlined,
    },
  ];
  let [route, setRoute] = useState<any>();
  let history = useHistory();
  const location = useLocation().pathname; //当前路由
  //方法

  let onSelect = (e: any) => {
    // console.log(e.key);
    history.push(e.key);
  };

  return (
    <div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location]}
        selectedKeys={[history.location.pathname]}
        onSelect={onSelect}
      >
        {list.map((item: any, index: number) => {
          if (index === 5) {
            return (
              <SubMenu key={item.url} title={item.name} icon={<item.icon />}>
                {item.list1 &&
                  item.list1.map((item1: any, index: number) => {
                    return (
                      <Menu.Item key={item1.url} icon={<item1.icon />}>
                        {item1.name}
                      </Menu.Item>
                    );
                  })}
              </SubMenu>
            );
          } else {
            return (
              <Menu.Item key={item.url} icon={<item.icon />}>
                {item.name}
              </Menu.Item>
            );
          }
        })}
      </Menu>
    </div>
  );
};

export default left;
