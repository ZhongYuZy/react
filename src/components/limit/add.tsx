import React, { useEffect, useState } from 'react';
import {
  Card,
  message,
  Modal,
  Input,
  Upload,
  Select,
  Form,
  DatePicker,
  TimePicker,
  Button,
} from 'antd';
import { UploadOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'umi';
const { Option } = Select;
interface props {
  visible: boolean;
  modify: () => void; //关闭弹窗
  addok: (value: any, e: any) => void; //点击确定添加
}
const Add = (props: props) => {
  const { RangePicker } = DatePicker;
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const config = {
    rules: [
      {
        type: 'object' as const,
        required: true,
        message: 'Please select time!',
      },
    ],
  };
  const onFinish = (fieldsValue: any) => {
    // Should format date value before submit.
    const rangeValue = fieldsValue['range-picker'];
    const rangeTimeValue = fieldsValue['range-time-picker'];
    const values = {
      ...fieldsValue,
      'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
      'date-time-picker': fieldsValue['date-time-picker'].format(
        'YYYY-MM-DD HH:mm:ss',
      ),
      'month-picker': fieldsValue['month-picker'].format('YYYY-MM'),
      'range-picker': [
        rangeValue[0].format('YYYY-MM-DD'),
        rangeValue[1].format('YYYY-MM-DD'),
      ],
      'range-time-picker': [
        rangeTimeValue[0].format('YYYY-MM-DD HH:mm:ss'),
        rangeTimeValue[1].format('YYYY-MM-DD HH:mm:ss'),
      ],
      'time-picker': fieldsValue['time-picker'].format('HH:mm:ss'),
    };
    console.log('Received values of form: ', values);
  };
  let topics = useSelector((state: any) => state.recommend.topics);
  let dispatch = useDispatch();
  const [form] = Form.useForm(); //
  // 所属模型值
  let [parentId, setParentId] = useState<any>('');
  let [name, setName] = useState<any>('');
  let [goods, setGoods] = useState<any>([]);
  let [price, setPrice] = useState<any>('');
  let [show, setShow] = useState<boolean>(false);

  //点击确认添加
  const handleOk = () => {
    let value = form.getFieldsValue();
    props.addok(value, goods);
    // console.log(value);
    // console.log(goods);
  };
  // 点击取消
  let onCancel = () => {
    props.modify();
  };
  //所属模型值
  const onGenderChange = (e: any, val: any) => {
    setParentId(e);
    if (val) {
      setName(val.children);
    }
    if (topics.data) {
      let arr: any[] = [];
      arr = topics.data.filter((item: any) => {
        return item._id === e;
      });
      setGoods(arr);
      setPrice(arr[0].presentPrice);
    }
  };
  useEffect(() => {
    if (price) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [price]);

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
          title={'添加秒杀'}
          visible={props.visible}
          onOk={handleOk}
          onCancel={onCancel}
          okText="确定"
          cancelText="取消"
          destroyOnClose={true}
        >
          {show ? (
            <div style={{ margin: '20px 10px' }}>原价商品价格为{price}</div>
          ) : (
            <div></div>
          )}
          <Form form={form} preserve={false}>
            <Form.Item
              name="parentId"
              label="秒杀商品"
              rules={[{ required: true }]}
            >
              <Select
                placeholder="请选择所属商品"
                onChange={onGenderChange}
                allowClear
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
            <Form.Item name="start_time" label="开始时间" {...config}>
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>

            <Form.Item name="end_time" label="结束时间" {...config}>
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>
            <Form.Item
              label="秒杀价格"
              name="price"
              rules={[{ required: true, message: '导航名称为必传项' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="秒杀数量"
              name="goods_number"
              rules={[{ required: true, message: '导航描述为必传项' }]}
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
