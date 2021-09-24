import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';
const { Header, Sider, Content } = Layout;
import Left from '../../components/layout/left';
import Top from '../../components/layout/top';

interface Props {
  children: React.ReactNode;
}

const Layouts = (props: Props) => {
  //声明
  let [collapsed, setCollapsed] = useState<boolean>(false);

  //方法
  let toggle = () => {
    setCollapsed(!collapsed);
  };
  //生命周期

  return (
    <div style={{ height: '100%' }}>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Left></Left>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{ padding: '5px 20px' }}
          >
            <div>
              {React.createElement(
                collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: toggle,
                },
              )}
            </div>
            <div>
              <Top></Top>
            </div>
          </Header>

          <Content
            className="site-layout-background"
            style={{
              margin: '35px 30px',
              padding: '20px',
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default Layouts;
