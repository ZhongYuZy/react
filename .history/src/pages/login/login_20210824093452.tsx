import React, { useEffect, useState } from 'react';
import styles from '../../styles/global.css'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'umi';


const login = () => {
    let user =useSelector((state:any) => state.login.user)
    let dispatch = useDispatch()
    const onFinish = (e:any) => {
        console.log(e);
        dispatch({
            type:'login/getUser',
            payload:e
        })
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    
    return (
        <div className={styles.box}>
            <div className={styles.one}>
                小米Lite
            </div>
            <div className={styles.wegome}>
                欢迎来到小米lite后台管理系统
            </div>

            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input placeholder="请输入账号" prefix={<UserOutlined />} className={styles.ipt} />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder="请输入密码" prefix={< LockOutlined />} className={styles.ipt} />
                </Form.Item>
                <Button type="primary" className={styles.btn} htmlType="submit">登录</Button>
            </Form>
        </div>
    )
}

export default login

