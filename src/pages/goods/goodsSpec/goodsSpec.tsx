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
import AddRotation from '@/components/goodsSpec/add';
// import EditRotation from '@/components/goodsSpec/edit';
import { useHistory, useLocation } from 'react-router-dom';
import { ReloadOutlined, PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

// 商品规格
const GoodsSpec = () => {
  //声明
  let location: any = useLocation();
  let list = useSelector((state: any) => state.goodsSpec.data);
  let obj = useSelector((state: any) => state.goodsSpec.topics);
  let dispatch = useDispatch();
  const [value, setvalue] = React.useState('');
  const [visible, setVisible] = React.useState(false); //新增弹框
  const [visible1, setVisible1] = React.useState(false); //编辑弹框
  const [form] = Form.useForm(); //
  const [current, setcurrent] = React.useState(1);
  const [pageSize, setpageSize] = React.useState(10);
  const [isModalVisible, setIsModalVisible] = React.useState(false); //删除弹框

  let [total, setTotal] = React.useState(0);
  let [data, setdata] = useState<any>(''); //编辑传值
  let [id, setid] = useState<any>([]); //删除弹框
  let history = useHistory();
  // 所属模型值
  let [parentId, setParentId] = useState<any>('');
  let [name, setName] = useState<any>('');
  //表格数据
  let columns: any = [
    {
      title: '#',
      dataIndex: 'active',
      key: '_id',
      align: 'center',
    },
    {
      title: '规格名称',
      dataIndex: 'name',
      align: 'center',
      key: '_id',
    },
    {
      title: '所属模型',
      dataIndex: 'model',
      align: 'center',
      key: '_id',
    },
    {
      title: '展示方式',
      dataIndex: 'mode',
      align: 'center',
      key: '_id',
    },
    {
      title: '规格项',
      dataIndex: 'spec_item',
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
  //添加模型显示
  let [show, setShow] = useState<boolean>(false);

  //方法

  //关闭添加弹框
  let modify = () => {
    setVisible(false);
  };

  //删除
  let del = (text: any, record: any) => {
    // console.log(record);
    setIsModalVisible(true);
    setid(record);
  };
  //删除确定按钮
  const handleOk = () => {
    setIsModalVisible(false);
    dispatch({
      type: 'goodsSpec/delBanner',
      payload: { parentId: id.parentId, attrId: id._id },
    });
  };

  //添加轮播图按钮
  let add = () => {
    setVisible(true);
  };

  //底部分页
  let onShowSizeChange = (current1: number, pageSize1?: number) => {
    setcurrent(current1);
    setpageSize(Number(pageSize1));
    dispatch({
      type: 'goodsSpec/getdata',
      payload: { current: current1, pageSize: pageSize1, query: value },
    });
  };
  //所属模型值
  const onGenderChange = (e: any, val: any) => {
    setParentId(e);
    if (val) {
      setName(val.children);
    }
  };
  //重置按钮
  let replacement = () => {
    form.resetFields();
    dispatch({
      type: 'goodsSpec/getdata1',
    });
    setShow(false);
  };
  //查询按钮
  let inquire = () => {
    // console.log(parentId);
    if (parentId) {
      dispatch({
        type: 'goodsSpec/getdata',
        payload: { parentId: parentId },
      });
    } else {
      message.error('请选择所属模型');
    }
  };
  let query = (e: any) => {
    dispatch({
      type: 'goodsSpec/getdata',
      payload: { parentId: e },
    });
  };

  //生命周期
  useEffect(() => {
    dispatch({
      type: 'goodsSpec/updateBanner',
      payload: { current: current, pageSize: pageSize, query: value },
    });
  }, []);
  useEffect(() => {
    if (list.total === 0) {
      message.warning('暂无数据');
    }
    if (list.code === 200) {
      setShow(true);
      setTotal(list.total);
    }
    // console.log(list);
  }, [list]);
  useEffect(() => {
    if (location.state) {
      form.setFieldsValue({ parentId: location.state.val });
      setParentId(location.state.val);
      query(location.state.val);
    }
    // console.log(location);
  }, [location]);

  return (
    <div>
      <Card>
        <div style={{ display: 'flex' }}>
          <div style={{ width: '400px' }}>
            <Form form={form}>
              <Form.Item
                name="parentId"
                label="所属模型"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="请选择所属模型"
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
          <div style={{ marginLeft: '10px' }}>
            <Button onClick={inquire} type="primary" icon={<SearchOutlined />}>
              查询
            </Button>
          </div>
          <div style={{ marginLeft: '10px' }}>
            <Button
              onClick={replacement}
              htmlType="reset" //重置方法
              icon={<ReloadOutlined />}
            >
              重置
            </Button>
          </div>
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{ marginLeft: 20 }}
          onClick={add}
          disabled={!show}
        >
          添加模型
        </Button>
        <AddRotation
          visible={visible}
          modify={modify}
          obj={obj.data}
          parentId={parentId}
          name={name}
        ></AddRotation>
        <Table
          pagination={false}
          columns={columns}
          dataSource={list.data && list.data}
          rowKey="_id"
        />
        <Modal
          title="删除模型"
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
        {list && list.data && list.data.length > 0 ? (
          <Pagination
            showSizeChanger
            onChange={onShowSizeChange}
            defaultCurrent={current}
            defaultPageSize={pageSize}
            pageSizeOptions={['5', '10']}
            total={list.total && list.total}
            showTotal={(total) => `总计 ${list.total && list.total} 条`}
          />
        ) : (
          ''
        )}
      </Card>
    </div>
  );
};

export default GoodsSpec;
