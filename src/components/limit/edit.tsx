import React, { useEffect, useState } from 'react';
import {
  Card,
  Button,
  Modal,
  Input,
  Form,
  Upload,
  Image,
  Select,
  DatePicker,
} from 'antd';
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
  const [form] = Form.useForm(); //
  let dispatch = useDispatch();

  // 所属模型值
  let [parentId, setParentId] = useState<any>('');
  let [name, setName] = useState<any>('');
  let [goods, setGoods] = useState<any>([]);
  //   商品价格
  let [price, setPrice] = useState<any>('');
  //   显示原来价格
  let [show, setShow] = useState<boolean>(false);
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
      arr = topics.data.filter((item: any) => {
        return item._id === e;
      });
      setGoods(arr);
      setPrice(arr[0].presentPrice);
      //   console.log(arr);
    }
  };
  let onCancel = () => {
    //点击取消
    props.modify1();
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
  //生命周期
  useEffect(() => {
    console.log(props.data);
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

  return (
    <div>
      <Modal
        title={'编辑秒杀'}
        visible={props.visible1}
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
            initialValue={id}
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
          <Form.Item
            name="start_time"
            label="开始时间"
            initialValue={props.data ? props.data.start_time : ''}
          >
            <DatePicker showTime />
          </Form.Item>

          <Form.Item
            name="end_time"
            label="结束时间"
            initialValue={props.data ? props.data.end_time : ''}
          >
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            label="秒杀价格"
            name="price"
            rules={[{ required: true, message: '导航名称为必传项' }]}
            initialValue={props.data ? props.data.price : ''}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="秒杀数量"
            name="goods_number"
            rules={[{ required: true, message: '导航描述为必传项' }]}
            initialValue={props.data ? props.data.goods_number : ''}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Edit;
