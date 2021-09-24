import React from 'react'
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styles from '../../../styles/global.css'
import { Table } from 'antd';
import { useState } from 'react';
import { Modal } from 'antd';


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
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    const columns = [
        {
            title: '#',
            dataIndex: 'name',
        },
        {
            title: '图片',
            dataIndex: 'name',
        },
        {
            title: '路径',
            dataIndex: 'age',
        },
        {
            title: '标题',
            dataIndex: 'address',
        },
        {
            title: '链接',
            dataIndex: 'address',
        },
        {
            title: '是否显示',
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
                <Button type="primary" className={styles.bt}  onClick={showModal}>添加轮播图</Button>
            </div>
            <div>
                <div>
                    <Table columns={columns} dataSource={data} size="middle" />
                </div>,
            </div>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </div>
    )
}

export default carousel
