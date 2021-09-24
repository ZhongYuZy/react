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
  const [flag, setflag] = React.useState(false);
  let [src, setsrc] = React.useState('');
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
          title={'添加通知'}
          visible={props.visible}
          onOk={handleOk}
          onCancel={onCancel}
          okText="确定"
          cancelText="取消"
          destroyOnClose={true}
        >
          <Form form={form} preserve={false}>
            <Form.Item
              label="通知内容"
              name="content"
              rules={[{ required: true, message: '通知内容为必传项' }]}
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
