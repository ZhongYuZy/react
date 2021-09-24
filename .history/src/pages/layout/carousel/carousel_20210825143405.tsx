import React from 'react'
import { Input, Space } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import styles from '../../../styles/global.css'
import { Table } from 'antd';
import { useState } from 'react';
import { Modal } from 'antd';
import { Form, Checkbox } from 'antd';
import { Upload, message, Image } from 'antd';
import { useSelector, useDispatch } from 'umi';


const carousel = () => {
    let [url,seturl] = useState<string>('')
    const [form] = Form.useForm();
    let num = useSelector((state: any) => state.login.user)
    let dispatch = useDispatch()
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
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);

    const showModal = () => {
        setVisible(true);
    };
    let onchange = (info: any) => {//图片预览 上传图片成功
        if (info.file.status === 'done') {
            console.log(info);
            seturl(info.file.response.data)
        }
    }
    const handleOk = () => {
        let values = form.getFieldsValue()
        console.log(values);
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        setVisible(false);
    };
    const onFinish = (values: any) => {
        console.log('Success:', values);
    };
    const props = {
        name: 'file',
        headers: {
            authorization: 'authorization-text',
        },
        onChange(info: any) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
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
                <Button type="primary" className={styles.bt} onClick={showModal}>添加轮播图</Button>
            </div>
            <div>
                <div>
                    <Table columns={columns} dataSource={data} size="middle" />
                </div>,
            </div>
            <Modal
                title="添加轮播图"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 5 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="图片上传"
                        name="图片上传"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Upload onChange={onchange} showUploadList={false} name="logo" headers={{ Authorization: localStorage.getItem('token')! }} action="http://localhost:7001/admin/upload" listType="picture">
                            <div className={styles.pian}>点击上传图片</div>
                        </Upload>
                        <div>
                            <Image
                                width="200"
                                src={url}
                            />
                        </div>
                    </Form.Item>
                </Form>
                <Form.Item label="图片标题" name='values'>
                    <Input />
                </Form.Item>
                <Form.Item label="图片链接" name='values'>
                    <Input />
                </Form.Item>
            </Modal>

        </div>
    )
}

export default carousel
