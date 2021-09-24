import React, {useEffect, useState} from 'react';
import styles from '../../styles/global.css'
import { Input } from 'antd';
import { Button } from 'antd';
import { UserOutlined,LockOutlined } from '@ant-design/icons';
import api from '../../http/backstageApi'
const login = () => {
    let [username,setUsername] =useState<string>('')
    let login = () => {
        console.log(username);
        // api.login{

        // }
    }
    return (
        <div className={styles.box}>
            <div className={styles.one}>
                小米Lite
            </div>
            <div className={styles.wegome}>
                欢迎来到小米lite后台管理系统
            </div>
            <Input placeholder="请输入账号" prefix={<UserOutlined />} className={styles.ipt} value={username} />
            <Input.Password placeholder="请输入密码" prefix={< LockOutlined />} className={styles.ipt} />
            <Button type="primary"className={styles.btn} onClick={login}>登录</Button>
        </div>
    )
}

export default login

