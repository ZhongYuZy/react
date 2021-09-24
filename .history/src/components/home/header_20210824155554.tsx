import React, { useState } from 'react'
import { Layout} from 'antd'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
  } from '@ant-design/icons'

const { Header} = Layout
const header = () => {
    
    let [collapsed, setCollapsed] = useState<boolean>(false)
    let toggle = () => {
      setCollapsed(!collapsed)
    }

    return (
        <div>
              <div className="site-layout-background" style={{ padding: '0 20px', background: '#fff' }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </div>
        </div>
    )
}

export default header
