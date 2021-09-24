import React, { useEffect, useState } from 'react';
import { Card, Button, Modal, Input, Form, Upload, Image, Select } from 'antd';
import { UploadOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'umi';
const { Option } = Select;
interface props {
  visible1: boolean;
  modify1: () => void; //关闭弹窗
  editok: (value: any, e: any) => void; //点击确定编辑
  data: any;
}
const Edit = (props: props) => {
  let topics = useSelector((state: any) => state.recommend.topics);
  const [form] = Form.useForm(); //
  let dispatch = useDispatch();

  // 所属模型值
  let [parentId, setParentId] = useState<any>('');
  let [name, setName] = useState<any>('');
  let [goods, setGoods] = useState<any>([]);
  let [desc, setDesc] = useState<any>('');
  let [id, setId] = useState<any>('');
  // //点击确认添加
  const handleOk = () => {
    let value = form.getFieldsValue();
    if (goods.length === 0) {
      props.editok(value, props.data.goods);
    } else {
      props.editok(value, goods);
    }
  };
  //所属模型值
  const onGenderChange = (e: any, val: any) => {
    setParentId(e);
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
  useEffect(() => {
    if (props.data && props.data.active) {
      //   console.log(props.data);
      let arr: any[] = [];
      props.data.goods.map((item: any) => {
        arr.push(item._id);
      });
      id = arr;
      setId(id);
    }
  }, [props.data]);
  let onCancel = () => {
    //点击取消
    props.modify1();
  };

  return (
    <div>
      <Modal
        title={'编辑推荐导航'}
        visible={props.visible1}
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
            initialValue={
              props && props.data && props.data.name ? props.data.name : name
            }
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="导航描述"
            name="desc"
            rules={[{ required: true, message: '导航描述为必传项' }]}
            initialValue={
              props && props.data && props.data.desc ? props.data.desc : desc
            }
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="parentId"
            label="所属模型"
            rules={[{ required: true }]}
            initialValue={id}
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
    </div>
  );
};

export default Edit;
