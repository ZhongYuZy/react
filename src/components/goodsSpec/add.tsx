import React, { useEffect, useState } from 'react';
import { Card, message, Modal, Input, Form, Upload, Select, Radio } from 'antd';
import { UploadOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'umi';
interface Props {
  visible: boolean;
  modify: () => void; //关闭弹窗
  obj: any;
  parentId: any;
  name: any;
}
const { Option } = Select;
const Add = (props: Props) => {
  let dispatch = useDispatch();
  const [form] = Form.useForm();
  const [value, setValue] = React.useState(1);
  const onChange = (e: any) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };
  const handleOk = () => {
    // //点击确认添加
    let value = form.getFieldsValue();
    // console.log(value);
    // console.log(model);
    let a = [];
    a = value.spec_item.split('\n');
    dispatch({
      type: 'goodsSpec/getTopics',
      payload: {
        name: value.name,
        model: model, //模型名称
        spec_item: a, //规格项
        mode: value.mode, //方式
        parentId: value.parentId,
      },
    });
    props.modify();
  };
  //所属模型值
  let [model, setModel] = useState<string>('');
  const onGenderChange = (e: any, val: any) => {
    setModel(val.children);
  };

  let onCancel = () => {
    props.modify();
  };
  //生命周期
  useEffect(() => {
    if (props.visible) {
      setModel(props.name);
      form.setFieldsValue({ parentId: props.parentId });
    }
  }, [props.visible, props.name, props.parentId]);

  return (
    <div>
      <Card>
  <Modal
          title={'新增规格'}
          visible={props.visible}
          onOk={handleOk}
          onCancel={onCancel}
          okText="确定"
          cancelText="取消"
          destroyOnClose={true}
        >
          <Form form={form} preserve={false}>
            <Form.Item
              label="规格名称"
              name="name"
              rules={[{ required: true, message: '模型名称为必传项' }]}
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
              >
                {props.obj &&
                  props.obj.map((item: any, index: number) => {
                    return (
                      <Option key={index} value={item._id}>
                        {item.name}
                      </Option>
                    );
                  })}
              </Select>
            </Form.Item>
            <Form.Item
              name="spec_item"
              label="规格项"
              rules={[{ required: true, message: '规格项为必传项' }]}
            >
              <Input.TextArea placeholder="请输入规格项，一行一个" />
            </Form.Item>
            <Form.Item
              name="mode"
              label="展示方式"
              rules={[{ required: true, message: '展示方式为必传项' }]}
            >
              <Radio.Group onChange={onChange} value={value}>
                <Radio value={'文字'}>文字</Radio>
                <Radio value={'图片'}>图片</Radio>
                <Radio value={'颜色'}>颜色</Radio>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default Add;
