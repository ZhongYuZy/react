import React, { useEffect, useState } from 'react';
import { Card, message, Modal, Input, Form, Upload, Select } from 'antd';
import { UploadOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'umi';
const { Option } = Select;
interface props {
  visible: boolean;
  modify: () => void; //关闭弹窗
  addok: (value: any, e: any) => void; //点击确定添加
}
const Add = (props: props) => {
  let topics = useSelector((state: any) => state.recommend.topics);
  let dispatch = useDispatch();
  const [form] = Form.useForm(); //
  // 所属模型值
  let [parentId, setParentId] = useState<any>('');
  let [name, setName] = useState<any>('');
  let [goods, setGoods] = useState<any>([]);

  //点击确认添加
  const handleOk = () => {
    let value = form.getFieldsValue();
    // console.log(value);

    props.addok(value, goods);
  };
  // 点击取消
  let onCancel = () => {
    props.modify();
  };
  //所属模型值
  const onGenderChange = (e: any, val: any) => {
    setParentId(e);
    // console.log(e);

    if (val) {
      setName(val.children);
    }
    if (topics.data) {
      let arr: any[] = [];
      topics.data.map((item: any) => {
        e.map((i: any) => {
          if (item._id === i) {
            arr.push(item);
          }
        });
      });
      setGoods(arr);
      //   console.log(arr);
    }
  };
  //生命周期
  useEffect(() => {
    dispatch({
      type: 'recommend/commodity',
      payload: { current: 1, pageSize: 999, query: '' },
    });
  }, []);

  return (
    <div>
      <Card>
        <Modal
          title={'添加推荐导航'}
          visible={props.visible}
          onOk={handleOk}
          onCancel={onCancel}
          okText="确定"
          cancelText="取消"
          destroyOnClose={true}
        >
          <Form form={form} preserve={false}>
            <Form.Item
              label="导航名称"
              name="name"
              rules={[{ required: true, message: '导航名称为必传项' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="导航描述"
              name="desc"
              rules={[{ required: true, message: '导航描述为必传项' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="parentId"
              label="所属模型"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="请选择所属模型"
                onChange={onGenderChange}
                allowClear
                mode="multiple"
              >
                {topics &&
                  topics.data &&
                  topics.data.map((item: any, index: number) => {
                    return (
                      <Option key={index} value={item._id}>
                        {item.name}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default Add;
