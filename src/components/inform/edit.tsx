import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, Input, Form, Upload, Image } from 'antd';
import { UploadOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'umi';
interface props {
  visible1: boolean;
  modify1: () => void; //关闭弹窗
  editok: (value: any) => void; //点击确定编辑
  data: any;
}
const Edit = (props: props) => {
  const [form] = Form.useForm(); //
  const handleOk = () => {
    //点击确认添加
    let value = form.getFieldsValue();
    props.editok(value);
  };
  let onCancel = () => {
    //点击取消
    props.modify1();
  };

  return (
    <div>
      <Modal
        title={'编辑通知'}
        visible={props.visible1}
        onOk={handleOk}
        onCancel={onCancel}
        okText="确定"
        cancelText="取消"
        destroyOnClose={true}
      >
        <Form form={form} preserve={false}>
          <Form.Item
            label="图片标题"
            name="content"
            initialValue={props.data ? props.data.content : ''}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Edit;
