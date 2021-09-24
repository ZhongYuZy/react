import React, { useEffect, useState } from 'react';
import styles from '../../styles/global.css'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import api from '../../http/backstageApi'
const login = () => {
    let [username, setUsername] = useState<string>('')
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
            <Input placeholder="请输入账号"  className={styles.ipt} />
            <Input.Password placeholder="请输入密码" prefix={< LockOutlined />} className={styles.ipt} />
            <Button type="primary" className={styles.btn} onClick={login}>登录</Button>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="输入账号"
                    rules={[{ required: true, message: 'Please input your username!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            );
};
        </div>
    )
}

export default login

