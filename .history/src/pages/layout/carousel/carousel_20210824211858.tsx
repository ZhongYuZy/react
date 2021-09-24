import React from 'react'
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styles from '../../../styles/global.css'

const carousel = () => {
    const { Search } = Input;

    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#1890ff',
            }}
        />
    );
    const onSearch = () => {

    }
    return (
        <div>
            <div className={styles.rotation}>
                <div> <Search placeholder="请输入" onSearch={onSearch} style={{ width: 300 }} /></div>
                <Button type="primary">添加轮播图</Button>
            </div>
        </div>
    )
}

export default carousel
