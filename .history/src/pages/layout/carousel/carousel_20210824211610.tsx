import React from 'react'
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';

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
    const onSearch = value => console.log(value);
    return (
        <div>
            <div>
                <div> <Search placeholder="请输入" onSearch={onSearch} style={{ width: 300 }} /></div>
            </div>
        </div>
    )
}

export default carousel
