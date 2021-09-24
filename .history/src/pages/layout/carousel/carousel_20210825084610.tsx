import React from 'react'
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styles from '../../../styles/global.css'
import { Table } from 'antd';

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
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
        },
    ];
    const data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
        },
    ];

    return (
        <div>
            <div className={styles.rotation}>
                <div> <Search placeholder="请输入" onSearch={onSearch} style={{ width: 300 }} /></div>
                <Button type="primary" className={styles.bt}>添加轮播图</Button>
            </div>
            <div>
                <div>
                    <h4>Middle size table</h4>
                    <Table columns={columns} dataSource={data} size="middle" />
                    <h4>Small size table</h4>
                    <Table columns={columns} dataSource={data} size="small" />
                </div>,
            </div>
        </div>
    )
}

export default carousel
