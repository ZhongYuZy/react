import React from 'react'
import styles from '../../styles/global.css'
import { Input } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const login = () => {
    return (
        <div className={styles.box}>
            <div className={styles.one}>
                小米Lite
            </div>
            <div className={styles.wegome}>
                欢迎来到小米lite后台管理系统
            </div>
            <Input placeholder="large size" prefix={<UserOutlined />} className={styles.ipt} />
            <Input placeholder="default size" prefix={<UserOutlined />} className={styles.ipt} />
        </div>
    )
}

export default login

