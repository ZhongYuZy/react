import React, { useEffect, useState } from 'react';
import { Card, message, Modal, Input, Form, Upload, Select, Radio } from 'antd';
import { UploadOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'umi';

interface props {
  list: any;
}

const { Option } = Select;
const Add = (props: props) => {
  let dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleOk = () => {
    //点击确认添加
    let value = form.getFieldsValue();
    console.log(value);

    if (!value.short_name) {
      value.short_name = '';
    }
    if (value.parentId) {
      //   // 添加二级
      dispatch({
        type: 'categ/second',
        payload: {
          name: value.name,
          parentId: value.parentId,
          isShow: true,
        },
      });
      form.resetFields();
    } else {
      // 添加一级
      dispatch({
        type: 'categ/getTopics',
        payload: {
          name: value.name,
          short_name: value.short_name,
          isShow: true,
        },
      });
      form.resetFields();
    }
  };
  //所属模型值
  let [model, setModel] = useState<string>('');
  const onGenderChange = (e: any, val: any) => {
    setModel(val.children);
  };

  //生命周期

  return (
    <div>
      <Card style={{ height: '500px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px',
          }}
        >
          <div style={{ fontWeight: 'bolder', fontSize: '20px' }}>新增分类</div>
          <div style={{ color: 'blue' }} onClick={handleOk}>
            确认
          </div>
        </div>
        <Form form={form} preserve={false}>
          <Form.Item
            label="分类名称"
            name="name"
            rules={[{ required: true, message: '模型名称为必传项' }]}
          >
            <Input placeholder="请输入分类名称" />
          </Form.Item>
          <Form.Item name="parentId" label="所属模型">
            <Select
              placeholder="请选择上级分类"
              onChange={onGenderChange}
              allowClear
            >
              {props.list &&
                props.list.data &&
                props.list.data.map((item: any, index: number) => {
                  return (
                    <Option key={index} value={item._id}>
                      {item.name}
                    </Option>
                  );
                })}
            </Select>
          </Form.Item>
          <Form.Item label="分类别名" name="short_name">
            <Input placeholder="请输入分类别名" />
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Add;
