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
} from 'antd';
import { UploadOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'umi';
import Adddiscounts from '@/components/discounts/add';
import EditRotation from '@/components/discounts/edit';
import dayjs from 'dayjs';

// 优惠券管理
const Discounts = () => {
  let list = useSelector((state: any) => state.discounts.data);
  let dispatch = useDispatch();
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
  const onSearch = (e: any) => {
    getdata(e);
  }; //输入框的值
  let modify = () => {
    //关闭添加弹框
    setVisible(false);
    setdata(null);
  };
  let addok = (e: any) => {
    //添加优惠券
    // console.log(e);
    dispatch({
      type: 'discounts/getdiscountser',
      payload: e,
    });
    setVisible(false);
  };
  useEffect(() => {
    dispatch({
      type: 'discounts/getdata',
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
      type: 'discounts/showBanner',
      payload: { id: record._id, isShow: text },
    });
  };
  let columns: any = [
    //表格数据
    {
      title: '优惠券名称',
      dataIndex: 'name',
      key: '_id',
      align: 'center',
      // render: (url: any) => (<img src={url} width="70" height="70" />)
    },
    {
      title: '开始时间',
      dataIndex: 'start_time',
      key: 'start_time',
      align: 'center',
      render: (start_time: any) => (
        <div>{dayjs(start_time).format('YYYY-MM-DD HH:mm:ss ')}</div>
      ),
    },
    {
      title: '结束时间',
      dataIndex: 'end_time',
      align: 'center',
      key: 'end_time',
      render: (end_time: any) => (
        <div>{dayjs(end_time).format('YYYY-MM-DD HH:mm:ss ')}</div>
      ),
    },
    {
      title: '优惠金额',
      dataIndex: 'threshold',
      align: 'center',
      key: '_id',
    },
    {
      title: '使用门槛',
      dataIndex: 'amount',
      key: '_id',
      align: 'center',
    },
    {
      title: '发放数量',
      dataIndex: 'number',
      key: '_id',
      align: 'center',
    },

    {
      title: '是否显示',
      dataIndex: 'isShow',
      key: '_id',
      align: 'center',
      render: (isShow: boolean, _id: any) => (
        <Switch
          defaultChecked={isShow}
          onChange={() => {
            onChange(!isShow, _id);
          }}
        />
      ),
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
      type: 'discounts/delBanner',
      payload: id,
    });
  };
  let getdata = (e: string) => {
    dispatch({
      type: 'discounts/getdata',
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
    console.log(value, 999);
    dispatch({
      type: 'discounts/updateBanner',
      payload: {
        name: value.name,
        amount: value.amount,
        threshold: value.threshold,
        start_time: value.start_time,
        end_time: value.end_time,
        number: value.number,
        id: id,
      },
    });
    setVisible1(false);
  };
  let modify1 = () => {
    //关闭编辑弹框
    setVisible1(false);
  };

  let onShowSizeChange = (current1: number, pageSize1?: number) => {
    setcurrent(current1);
    setpageSize(Number(pageSize1));
    dispatch({
      type: 'inform/getdata',
      payload: { current: current1, pageSize: pageSize1, query: value },
    });
  };
  return (
    <div>
      <Card>
        <Search
          placeholder="请输入"
          onSearch={onSearch}
          style={{ width: 300 }}
        />
        <Button type="primary" style={{ marginLeft: 20 }} onClick={add}>
          添加优惠券
        </Button>
        <Adddiscounts
          visible={visible}
          modify={modify}
          addok={addok}
        ></Adddiscounts>
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
        <Pagination
          showSizeChanger
          onChange={onShowSizeChange}
          defaultCurrent={current}
          defaultPageSize={pageSize}
          pageSizeOptions={['5', '10']}
          total={list.total && list.total}
          showTotal={(total) => `总计 ${list.total && list.total} 条`}
        />
      </Card>
    </div>
  );
};

export default Discounts;
