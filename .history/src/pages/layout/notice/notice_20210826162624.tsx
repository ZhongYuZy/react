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
import AddRotation from '../../../components/notice/add';
import EditRotation from '../../../components/notice/edit';

// 通知管理
const Notice = () => {
  let list = useSelector((state: any) => state.inform.data);
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
    //添加轮播图
    console.log(e);
    dispatch({
      type: 'inform/getTopics',
      payload: { content: e.content },
    });
    setVisible(false);
  };
  useEffect(() => {
    dispatch({
      type: 'inform/getdata',
      payload: { current: current, pageSize: pageSize, query: value },
    });
    if (list) {
      settotal(list.total);
    }
  }, []);
  let onChange = (text: any, record: any) => {
    //开关,修改状态
    dispatch({
      type: 'inform/showBanner',
      payload: { id: record._id, isShow: text },
    });
  };
  let columns: any = [
    //表格数据
    {
      title: '#',
      dataIndex: 'active',
      key: '_id',
      align: 'center',
    },
    {
      title: '通知内容',
      dataIndex: 'content',
      align: 'center',
      key: '_id',
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
      type: 'inform/delBanner',
      payload: id,
    });
  };
  let getdata = (e: string) => {
    dispatch({
      type: 'inform/getdata',
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
    dispatch({
      type: 'inform/updateBanner',
      payload: { id: id, content: value.content },
    });
    setVisible1(false);
  };
  //关闭编辑弹框
  let modify1 = () => {
    setVisible1(false);
  };
  let onShowSizeChange = (current: number, pageSize?: number) => {
    console.log(current, pageSize);
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
          添加通知
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
          title="删除通知"
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
          defaultCurrent={3}
          defaultPageSize={5}
          pageSizeOptions={['5', '10']}
          total={total && total}
          showTotal={(total) => `总计 ${total && total} 条`}
        />
      </Card>
    </div>
  );
};

export default Notice;
