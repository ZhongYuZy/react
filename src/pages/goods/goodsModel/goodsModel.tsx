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
import AddRotation from '@/components/goodsModel/add';
import EditRotation from '@/components/goodsModel/edit';
import { useHistory } from 'react-router-dom';

//   商品模型
const GoodsModel = () => {
  let list = useSelector((state: any) => state.goodsModel.data);
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
  let history = useHistory();

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
    dispatch({
      type: 'goodsModel/getTopics',
      payload: { name: e.name },
    });
    setVisible(false);
  };
  useEffect(() => {
    dispatch({
      type: 'goodsModel/getdata',
      payload: { current: current, pageSize: pageSize, query: value },
    });
    if (list) {
      settotal(list.total);
    }
  }, []);
  let columns: any = [
    //表格数据
    {
      title: '#',
      dataIndex: 'active',
      key: '_id',
      align: 'center',
    },
    {
      title: '模型名称',
      dataIndex: 'name',
      align: 'center',
      key: '_id',
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
            type="primary"
            onClick={() => {
              goto(text, record);
            }}
          >
            添加规格
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
      type: 'goodsModel/delBanner',
      payload: id,
    });
  };
  let getdata = (e: string) => {
    dispatch({
      type: 'goodsModel/getdata',
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
      type: 'goodsModel/updateBanner',
      payload: { id: id, name: value.name },
    });
    setVisible1(false);
  };
  //关闭编辑弹框
  let modify1 = () => {
    setVisible1(false);
  };
  let onShowSizeChange = (current1: number, pageSize1?: number) => {
    setcurrent(current1);
    setpageSize(Number(pageSize1));
    dispatch({
      type: 'goodsModel/getdata',
      payload: { current: current1, pageSize: pageSize1, query: value },
    });
  };
  let goto = (text: any, record: any) => {
    history.push('/goodsSpec', { val: record._id, name: record.name });
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
          添加模型
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

export default GoodsModel;
