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
import AddRotation from '@/components/limit/add';
import EditRotation from '@/components/limit/edit';
import dayjs from 'dayjs';

// 秒杀
const Limit = () => {
  let list = useSelector((state: any) => state.limit.data);
  let dispatch = useDispatch();
  const { Search } = Input;
  const [value, setvalue] = React.useState('');
  const [visible, setVisible] = React.useState(false); //新增弹框
  const [visible1, setVisible1] = React.useState(false); //编辑弹框
  const [visible2, setVisible2] = React.useState(false); //查看 弹框
  const [form] = Form.useForm(); //
  const [current, setcurrent] = React.useState(1);
  const [pageSize, setpageSize] = React.useState(5);
  const [isModalVisible, setIsModalVisible] = React.useState(false); //删除弹框
  const [id, setid] = React.useState(''); //删除弹框
  let [total, settotal] = React.useState(0);
  let [data, setdata] = useState<any>({}); //编辑传值
  let [goods, setGoods] = useState<any>('');
  const onSearch = (e: any) => {
    getdata(e);
  }; //输入框的值
  let modify = () => {
    //关闭添加弹框
    setVisible(false);
    setdata(null);
  };
  let addok = (e: any, val: any) => {
    dispatch({
      type: 'limit/getTopics',
      payload: {
        start_time: e.start_time,
        end_time: e.end_time,
        goods_number: e.goods_number,
        price: e.price,
        goods: val,
        isShow: true,
      },
    });
    setVisible(false);
  };
  useEffect(() => {
    dispatch({
      type: 'limit/getdata',
      payload: { current: current, pageSize: pageSize, query: value },
    });
    if (list) {
      settotal(list.total);
    }
  }, []);
  let onChange = (text: any, record: any) => {
    // 开关, 修改状态;
    dispatch({
      type: 'limit/showBanner',
      payload: { id: record._id, isShow: text },
    });
  };
  let columns: any = [
    //表格数据
    {
      title: '秒杀商品',
      dataIndex: 'goods',
      key: '_id',
      align: 'center',
      render: (goods: any) => <div>{goods[0].name}</div>,
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
      title: '秒杀价格',
      dataIndex: 'price',
      key: '_id',
      align: 'center',
    },
    {
      title: '秒杀数量',
      dataIndex: 'goods_number',
      key: '_id',
      align: 'center',
    },
    {
      title: '是否禁用',
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
          {/* <Button
            type="primary"
            onClick={() => {
              edit(text, record);
            }}
          >
            编辑
          </Button>{' '} */}
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

  //编辑
  let edit = (text: any, record: any) => {
    setdata(record);
    setid(record._id);
    setVisible1(true);
  };
  //删除
  let del = (text: any, record: any) => {
    setIsModalVisible(true);
    setid(record._id);
    setGoods(record.goods[0]._id);

    // console.log(text);
    console.log(record);
  };
  //删除确定按钮
  const handleOk = () => {
    setIsModalVisible(false);
    dispatch({
      type: 'limit/delBanner',
      payload: { id: id, goodsId: goods },
    });
  };
  let getdata = (e: string) => {
    dispatch({
      type: 'limit/getdata',
      payload: { current: current, pageSize: pageSize, query: e },
    });
  };
  let add = () => {
    //添加轮播图按钮
    setVisible(true);
    setdata(null);
  };
  let editok = (value: any, e: any) => {
    //编辑弹框确定
    console.log(value);
    console.log(e);

    dispatch({
      type: 'limit/updateBanner',
      payload: {
        start_time: value.start_time,
        end_time: value.end_time,
        goods_number: value.goods_number,
        goods: e,
        isShow: true,
      },
    });
    setVisible1(false);
  };
  let modify1 = () => {
    //关闭编辑弹框
    setVisible1(false);
  };
  let modify2 = () => {
    //关闭编辑弹框
    setVisible2(false);
  };
  let onShowSizeChange = (current1: number, pageSize1?: number) => {
    setcurrent(current1);
    setpageSize(Number(pageSize1));
    dispatch({
      type: 'limit/getdata',
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
          添加秒杀
        </Button>
        <AddRotation
          visible={visible}
          modify={modify}
          addok={addok}
        ></AddRotation>
        <Table
          pagination={false}
          columns={columns}
          dataSource={list.data && list.data}
          rowKey="_id"
        />
        <Modal
          title="删除导航"
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

export default Limit;
