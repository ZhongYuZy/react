import React, { useEffect } from 'react';
import { Card, message, Modal, Input, Form, Upload } from 'antd';
import { UploadOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'umi';
interface props {
  visible: boolean;
  modify: () => void; //关闭弹窗
  addok: (value: any) => void; //点击确定添加
}
const Add = (props: props) => {
  const [form] = Form.useForm();
  const handleOk = () => {
    // //点击确认添加
    let value = form.getFieldsValue();

    props.addok(value);
  };

  let onCancel = () => {
    props.modify();
  };

  return (
    <div>
      <Card>
        <Modal
          title={'添加模型'}
          visible={props.visible}
          onOk={handleOk}
          onCancel={onCancel}
          okText="确定"
          cancelText="取消"
          destroyOnClose={true}
        >
          <Form form={form} preserve={false}>
            <Form.Item
              label="模型名称"
              name="name"
              rules={[{ required: true, message: '模型名称为必传项' }]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default Add;
