import React, { useEffect, useState} from 'react';
import {Select } from 'antd';
import {
  Card,
  Button,
  Switch,
  Input,
  Form,
  Table,
  Modal,
  Pagination,
} from 'antd';
import { UploadOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'umi';
import AddCoupon from '@/components/addgoods/add';
import EditRotation from '@/components/addgoods/edit';
import dayjs from 'dayjs';

const Addgoods = () => {
  let list = useSelector((state: any) => state.addgoods.data);
  let dispatch = useDispatch();
  const { Option } = Select;
  const { Search } = Input;
  const [value, setvalue] = React.useState('');
  const [visible, setVisible] = React.useState(false); //新增弹框
  const [visible1, setVisible1] = React.useState(false); //编辑弹框
  const [form] = Form.useForm(); //
  const [current, setcurrent] = React.useState(1);
  const [pageSize, setpageSize] = React.useState(10);
  const [isModalVisible, setIsModalVisible] = React.useState(false); //删除弹框
  const [id, setid] = React.useState(''); //删除弹框
  let [total, settotal] = React.useState(0);
  let [data, setdata] = useState<any>({}); //编辑传值
  let [show, setShow] = useState<boolean>(false);
  const onSearch = (e: any) => {
    getdata(e);
  }; //输入框的值
  let modify = () => {
    //关闭添加弹框
    setVisible(false);
    setdata(null);
  };
  let addok = () => {
    //添加商品
    // console.log(e);
    setVisible(false);
  };
  useEffect(() => {
    dispatch({
      type: 'addgoods/getdata',
      payload: { current: current, pageSize: pageSize, query: value },
    });
    if (list) {
      settotal(list.total);
    }
    // console.log(list);
  }, []);
  let onChange = (text: any, record: any) => {
    //开关,修改状态
    dispatch({
      type: 'addgoods/showBanner',
      payload: { id: record._id, isShow: text },
    });
  };
  //表格数据
  let columns: any = [
    {
      title: '#',
      dataIndex: 'active',
      key: '_id',
      align: 'center',
    },
    {
      title: '图片',
      dataIndex: 'name',
      key: '_id',
      align: 'center',
    },
    {
      title: '参数名称',
      dataIndex: 'originalPrice',
      key: 'start_time',
      align: 'center',
    },
    {
      title: '参数描述',
      dataIndex: 'presentPrice',
      align: 'center',
      key: 'end_time',
    },
    {
      title: '操作',
      dataIndex: 'isShow',
      key: '_id',
      align: 'center',
      render: (text: any, record: any) => (
        <div>
          <Button
            type="primary"
            onClick={() => {
              edit(text, record);
            }}
          >
            编辑
          </Button>{' '}
          <Button
            className="mal10"
            danger
            onClick={() => {
              del(text, record);
            }}
          >
            删除
          </Button>
        </div>
      ),
    },
  ];
  let edit = (text: any, record: any) => {
    //编辑0
    setdata(record);
    setid(record._id);
    setVisible1(true);
  };
  let del = (text: any, record: any) => {
    //删除
    setIsModalVisible(true);
    setid(record._id);
  };
  const handleOk = () => {
    //删除确定按钮
    setIsModalVisible(false);
    dispatch({
      type: 'addgoods/delBanner',
      payload: id,
    });
  };
  let getdata = (e: string) => {
    dispatch({
      type: 'addgoods/getdata',
      payload: { current: current, pageSize: pageSize, query: e },
    });
  };
  let add = () => {
    //添加轮播图按钮
    setVisible(true);
    setdata(null);
  };
  let editok = (value: any) => {
    //编辑弹框确定
    // console.log(value, 999);
    dispatch({
      type: 'addgoods/updateBanner',
      payload: {
        threshold: value.threshold,
        start_time: value.start_time,
        end_time: value.end_time,
        number: value.number,
        name: value.name,
        isShow: true,
        id: id,
      },
    });
    setVisible1(false);
  };
  //   关闭新增
  let revocation = (val: any) => {
    setVisible(val);
  };
  let modify1 = () => {
    //关闭编辑弹框
    setVisible1(false);
  };
  let onShowSizeChange = (current: number, pageSize?: number) => {
    console.log(current, pageSize);
  };
    const onGenderChange = (value: string) => {
    switch (value) {
      case 'male':
        form.setFieldsValue({ note: 'Hi, man!' });
        return;
      case 'female':
        form.setFieldsValue({ note: 'Hi, lady!' });
        return;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
    }
  }
  return (
    <div style={{ height: '900px' }}>
      {visible ? (
        <AddCoupon
          revocation={revocation}
          modify={modify}
          addok={addok}
        ></AddCoupon>
      ) : (
        <Card>
          <Form.Item name="所属商品" label="Gender" rules={[{ required: true }]}>
        <Select
          placeholder="Select a option and change input text above"
          onChange={onGenderChange}
          allowClear
        >
        </Select>
      </Form.Item>
          <Button type="primary" style={{ marginLeft: 20 }} onClick={add}>
            添加参数
          </Button>

          <Table
            pagination={false}
            columns={columns}
            dataSource={list.data && list.data}
            rowKey="_id"
          />
          <Modal
            title="删除优惠券"
            visible={isModalVisible}
            okText="确定"
            cancelText="取消"
            onOk={handleOk}
            onCancel={() => {
              setIsModalVisible(false);
            }}
          >
            <p>确定删除吗？</p>
          </Modal>
          <EditRotation
            visible1={visible1}
            modify1={modify1}
            editok={editok}
            data={data && data}
          ></EditRotation>
        </Card>
      )}
    </div>
  );
};

export default Addgoods;
