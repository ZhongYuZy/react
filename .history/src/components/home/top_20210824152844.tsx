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
        <div>
              {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </div>
    )
}

export default top
