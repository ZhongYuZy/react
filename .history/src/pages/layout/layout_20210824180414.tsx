import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import Left from '../../components/home/left'
import styles from '../../styles/global.css'
import Top from '../../components/home/header'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from '@ant-design/icons'


const { Header, Sider, Content } = Layout

interface Props {
  children: React.ReactNode
}


const Layouts = (props: Props) => {


  let [collapsed, setCollapsed] = useState<boolean>(false)
  let toggle = () => {
    setCollapsed(!collapsed)
  }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Left></Left>
      </Sider>
      <Layout className="site-layout">

        <Header className="site-layout-background" style={{ padding: '0 20px', background: '#fff' }}>
          <div  className={styles.top}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })}
            <div>
              <Top></Top>
            </div>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background:'#fff',
          }}
        >
          {props.children}
        </Content>
      </Layout>
    </Layout>
  )
}

export default Layouts
