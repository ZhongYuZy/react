import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BankOutlined,
  IdcardOutlined,
  BarsOutlined,
  ContactsOutlined,
  UserOutlined,
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
  DatabaseOutlined

} from '@ant-design/icons'

const { Header, Sider, Content } = Layout

interface Props {
  children: React.ReactNode
}


const Layouts = (props: Props) => {
  let list = [
    {
      name: '首页',
      url: '/',
      icon: BankOutlined
    },
    {
      name: '轮播图管理',
      url: '/carousel',
      icon: IdcardOutlined
    },
    {
      name: '导航管理',
      url: '/navs',
      icon: BarsOutlined
    },
    {
      name: '推荐导航',
      url: '/recom',
      icon: ContactsOutlined
    },
    {
      name: '用户管理',
      url: '/user',
      icon: UserOutlined,
    },
    {
      name: '商品管理',
      url: '/goods',
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
        }
      ]
    },
    {
      name: '秒杀管理',
      url: '/splike',
      icon: HistoryOutlined
    },
    {
      name: '优惠券管理',
      url: '/coupon',
      icon: AccountBookOutlined
    },
    {
      name: '订单管理',
      url: '/order',
      icon: BarsOutlined
    },
    {
      name: '通知管理',
      url: '/notice',
      icon: NotificationOutlined
    },
    {
      name: '客服消息',
      url: '/chat',
      icon: MessageOutlined
    }

  ]
  let [collapsed, setCollapsed] = useState<boolean>(false)
  let toggle = () => {
    setCollapsed(!collapsed)
  }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          {
            list.map((item: any, index: number) => {
              <Menu.Item key="1" icon={<item.icon/>}>
               {item.name}
              </Menu.Item>
            })
          }

        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: '0 20px', background: '#fff' }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default Layouts
