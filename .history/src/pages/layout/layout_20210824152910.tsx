import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import Left from '../../components/home/left'
import Top from '../../components/home/top'


const { Header, Sider, Content } = Layout

interface Props {
  children: React.ReactNode
}


const Layouts = (props: Props) => {

  
 
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Left></Left>
      </Sider>
      <Layout className="site-layout">
      <Top></Top>
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
