import React, { useState } from 'react'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
  } from '@ant-design/icons'

const top = () => {
    let [collapsed, setCollapsed] = useState<boolean>(false)
    let toggle = () => {
        setCollapsed(!collapsed)
      }
    return (
        <div className="site-layout-background" style={{ padding: '0 20px', background: '#fff' }}>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </div>
    )
}

export default top
