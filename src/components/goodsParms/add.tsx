import React, { useEffect, useState } from 'react';
import { Card, message, Modal, Input, Form, Upload, Select, Radio } from 'antd';
import { UploadOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'umi';
interface Props {
  visible: boolean;
  modify: () => void; //关闭弹窗
  parentId: any;
  name: any;
}
const { Option } = Select;
const Add = (props: Props) => {
  let dispatch = useDispatch();
  const [form] = Form.useForm();
  const [value, setValue] = React.useState(1);
  const [flag, setflag] = React.useState(false);
  let [src, setsrc] = React.useState('');
  const onChange = (e: any) => {
    console.log(e.target.value);
    setValue(e.target.value);
  };
  const handleOk = () => {
    // //点击确认添加
    let value = form.getFieldsValue();
    console.log(value);
    dispatch({
      type: 'goodsParms/getTopics',
      payload: {
        parentId: props.parentId,
        url: value.url.fileList[0].response.data,
        name: value.name,
        desc: value.desc,
      },
    });
    props.modify();
  };
  //所属模型值
  let [model, setModel] = useState<string>('');
  const onGenderChange = (e: any, val: any) => {
    setModel(val.children);
  };
  //点击预览图片
  let onPreview = async (file: any) => {
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
          title={'新增参数'}
          visible={props.visible}
          onOk={handleOk}
          onCancel={onCancel}
          okText="确定"
          cancelText="取消"
          destroyOnClose={true}
        >
          <Form form={form} preserve={false}>
            <Form.Item
              className="mar-l15"
              label="图片地址"
              name="url"
              rules={[{ required: true, message: '图片为必传项' }]}
            >
              <Upload
                name="logo"
                headers={{ Authorization: localStorage.getItem('token')! }}
                action="http://localhost:7001/admin/upload"
                listType="picture"
                onPreview={onPreview}
              >
                <div>点击上传图片</div>
              </Upload>
            </Form.Item>
            <Form.Item
              label="参数名称"
              name="name"
              rules={[{ required: true, message: '参数名称为必传项' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="参数描述"
              name="desc"
              rules={[{ required: true, message: '参数描述为必传项' }]}
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
