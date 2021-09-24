import React, { useEffect, useState } from 'react';
import { UserOutlined } from '@ant-design/icons';
import styles from '../../global.css';
import { Menu, Dropdown, message } from 'antd';
import { useHistory } from 'react-router-dom';

const top = () => {
  // 声明
  let [name, setName] = useState<any>('');
  let history = useHistory();

  // 方法
  const onClick = () => {
    localStorage.removeItem('token');
    history.push('/login');
    message.info('退出成功');
  };
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item>退出登录</Menu.Item>
    </Menu>
  );

  let exit = () => {
    console.log('111');
  };
  // 生命周期
  useEffect(() => {
    if (localStorage.getItem('user')) {
      setName(JSON.parse(localStorage.getItem('user')!));
    }
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <div>
        <iframe
          width="200"
          height="50px"
          frameBorder="0"
          scrolling="no"
          src="https://i.tianqi.com/?c=code&id=11"
        ></iframe>
      </div>
      <div style={{ verticalAlign: '6px', margin: '0 30px', display: 'flex' }}>
        <div className={styles.photo}>
          <UserOutlined />
        </div>
        <div>
          <Dropdown overlay={menu}>
            <div onClick={(e) => e.preventDefault()}>{name.username}</div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default top;
