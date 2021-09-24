import React, { useEffect, useState } from 'react';
import {
  Card,
  Button,
  Modal,
  Input,
  Form,
  Upload,
  Image,
  DatePicker,
} from 'antd';
import { UploadOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'umi';
interface props {
  visible1: boolean;
  modify1: () => void; //关闭弹窗
  editok: (value: any) => void; //点击确定编辑
  data: any;
}
const EditRotation = (props: props) => {
  const [flag, setflag] = React.useState(false);
  let [src, setsrc] = React.useState('');
  const [name, setname] = React.useState('');
  const [amount, setamount] = React.useState('');
  const [threshold, setthreshold] = React.useState('');
  const [start_time, setstart_time] = React.useState('');
  const [end_time, setend_time] = React.useState('');
  const [number, setnumber] = React.useState('');
  const [form] = Form.useForm(); //
  let [data, setdata] = React.useState('');
  let [url, seturl] = useState(''); //预览图
  // console.log(url);
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
    if (value.start_time === undefined && value.end_time === undefined) {
      value.start_time = props.data.start_time;
      value.end_time = props.data.end_time;
      props.editok(value);
    } else if (value.start_time === undefined) {
      value.start_time = props.data.start_time;
      props.editok(value);
    } else if (value.end_time === undefined) {
      value.end_time = props.data.end_time;
      props.editok(value);
    } else {
      props.editok(value);
    }
  };
  useEffect(() => {
    if (props.data) {
      seturl(props.data.url);
    }
  }, [props.data]);
  let onCancel = () => {
    //点击取消
    props.modify1();
  };
  let onchange = (info: any) => {
    if (info.file.status === 'done') {
      // console.log(info);
      seturl(info.file.response.data);
    }
  };
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

  return (
    <div>
      <Modal
        title={'编辑优惠券'}
        visible={props.visible1}
        onOk={handleOk}
        onCancel={onCancel}
        okText="确定"
        cancelText="取消"
        destroyOnClose={true}
      >
        <Form form={form} preserve={false}>
          <Form.Item
            label="优惠券名称"
            name="name"
            initialValue={props.data ? props.data.name : name}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="使用门槛"
            name="amount"
            initialValue={props.data ? props.data.amount : amount}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="优惠金额"
            name="threshold"
            initialValue={props.data ? props.data.threshold : threshold}
          >
            <Input />
          </Form.Item>

          <Form.Item name="start_time" label="开始时间">
            <DatePicker
              showTime
              defaultValue={
                props.data && props.data ? props.data.start_time : ''
              }
            />
          </Form.Item>

          <Form.Item name="end_time" label="结束时间">
            <DatePicker
              showTime
              defaultValue={props.data && props.data ? props.data.end_time : ''}
            />
          </Form.Item>

          <Form.Item
            label="发放数量"
            name="number"
            initialValue={props.data ? props.data.number : number}
          >
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
    </div>
  );
};

export default EditRotation;
