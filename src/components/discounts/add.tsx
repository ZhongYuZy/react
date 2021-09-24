import React, { useEffect } from 'react';
import {
  Card,
  message,
  Modal,
  Input,
  Form,
  Upload,
  DatePicker,
  TimePicker,
} from 'antd';
import { UploadOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'umi';
interface props {
  visible: boolean;
  modify: () => void; //关闭弹窗
  addok: (value: any) => void; //点击确定添加
}
const Addcoupon = (props: props) => {
  const [flag, setflag] = React.useState(false);
  let [src, setsrc] = React.useState('');
  const [form] = Form.useForm(); //
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

  let onPreview = async (file: any) => {
    //点击预览图片
    let src1 = file.url;
    if (!src1) {
      src1 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    setflag(true);
    setsrc(src1);
  };
  const handleOk = () => {
    //点击确认添加
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
          title={'添加优惠券'}
          visible={props.visible}
          onOk={handleOk}
          onCancel={onCancel}
          okText="确定"
          cancelText="取消"
        >
          <Form form={form}>
            <Form.Item label="优惠券名称" name="name">
              <Input />
            </Form.Item>

            <Form.Item label="使用门槛" name="amount">
              <Input />
            </Form.Item>

            <Form.Item label="优惠金额" name="threshold">
              <Input />
            </Form.Item>

            <Form.Item name="start_time" label="开始时间" {...config}>
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>

            <Form.Item name="end_time" label="结束时间" {...config}>
              <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
            </Form.Item>

            <Form.Item label="发放数量" name="number">
              <Input />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          title="预览图片"
          visible={flag}
          footer={null}
          onCancel={() => {
            setflag(false);
          }}
        >
          <img src={src} style={{ width: '100%' }} />
        </Modal>
      </Card>
    </div>
  );
};

export default Addcoupon;
