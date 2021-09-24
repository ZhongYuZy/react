import React, { useEffect, useState } from 'react';
import {
  Card,
  Button,
  Switch,
  Input,
  Form,
  Table,
  Modal,
  Pagination,
  Select,
  Tooltip,
  message,
} from 'antd';
import { UploadOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'umi';
import { SearchOutlined } from '@ant-design/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import E from 'wangeditor';

const { Option } = Select;

// 规格参数
const Parameter = () => {
  //声明
  let location: any = useLocation();
  //获取商品
  let obj = useSelector((state: any) => state.parameter.data);
  //商品规格
  let topics = useSelector((state: any) => state.parameter.topics);
  let dispatch = useDispatch();
  const [form] = Form.useForm(); //
  let history = useHistory();

  let [discount, setDiscount] = useState<any>();
  // 所属模型值
  let [parentId, setParentId] = useState<any>('');
  let [name, setName] = useState<any>('');

  //方法

  let add = () => {
    let value = form.getFieldsValue();
    // console.log(value);

    dispatch({
      type: 'parameter/getTopics',
      payload: { parentId: value.parentId, specParams: value.detail },
    });
    window.location.pathname = '/spec';
  };
  //所属模型值
  const onGenderChange = (e: any, val: any) => {
    console.log(e, val);
    setParentId(e);
    if (val) {
      setName(val.children);
    }
    dispatch({
      type: 'parameter/updateBanner',
      payload: { parentId: e },
    });
  };
  let [editor, seteditor] = useState<any>();
  useEffect(() => {
    if (!editor) {
      const editor1 = new E(document.getElementById('text'));
      editor1.create();
      seteditor(editor1);
      editor1.config.onchange = function (newHtml: any) {
        discount = newHtml;
        form.setFieldsValue({ detail: discount });
      };
    }
  }, []);
  //生命周期
  useEffect(() => {
    dispatch({
      type: 'parameter/getdata',
      payload: { current: 1, pageSize: 999, query: '' },
    });
  }, []);
  let [contene, setContene] = useState<any>();

  useEffect(() => {
    if (topics.data) {
      setContene(topics.data);
    } else {
      setContene(null);
    }
  }, [topics]);

  return (
    <div>
      <Card>
        <div>
          <div style={{ width: '500px', position: 'relative', zIndex: 999 }}>
            <Form form={form}>
              <Form.Item
                name="parentId"
                label="所属商品"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="请选择所属商品"
                  onChange={onGenderChange}
                  allowClear
                >
                  {obj &&
                    obj.data &&
                    obj.data.map((item: any, index: number) => {
                      return (
                        <Option key={index} value={item._id}>
                          {item.name}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </Form>
          </div>
          <Form form={form} preserve={false}>
            <Form.Item name="detail" rules={[{ required: true }]}>
              <div
                style={{ margin: '10px 0', position: 'relative', zIndex: 1 }}
                id="text"
              >
                <p dangerouslySetInnerHTML={{ __html: contene }}></p>
              </div>
            </Form.Item>
          </Form>

          <div>
            <Button type="primary" onClick={add}>
              确认
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Parameter;
