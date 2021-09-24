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
  Tree,
} from 'antd';
import { UploadOutlined, LockOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'umi';
import AddRotation from '@/components/categ/add';
// import EditRotation from '@/components/categ/edit';
import { useHistory } from 'react-router-dom';
import styles from './categ.less';

const { DirectoryTree } = Tree;

// 商品分类
const categ = () => {
  let list = useSelector((state: any) => state.categ.data);
  let dispatch = useDispatch();
  const { Search } = Input;
  const [value, setvalue] = React.useState('');
  const [visible1, setVisible1] = React.useState(false); //编辑弹框
  const [form] = Form.useForm(); //
  const [isModalVisible, setIsModalVisible] = React.useState(false); //删除弹框
  const [id, setid] = React.useState(''); //删除弹框
  let [data, setdata] = useState<any>({}); //编辑传值
  let [classify, setClassify] = useState<any>([]);

  // 方法
  const onSelect = (keys: React.Key[], info: any) => {
    // console.log('Trigger Select', keys, info);
  };

  const onExpand = () => {
    // console.log('Trigger Expand');
  };

  //删除
  let del = (record: any) => {
    setIsModalVisible(true);
    setid(record._id);
  };
  //删除确定按钮
  const handleOk = () => {
    setIsModalVisible(false);
    dispatch({
      type: 'categ/delBanner',
      payload: { id: id },
    });
  };
  //输入框的值
  const onSearch = (e: any) => {
    getdata(e);
  };
  let getdata = (e: string) => {
    dispatch({
      type: 'categ/getdata',
      payload: e,
    });
  };

  //生命周期
  useEffect(() => {
    dispatch({
      type: 'categ/getdata',
      payload: '',
    });
  }, []);

  return (
    <div>
      <Card>
        <div style={{ marginBottom: '20px' }}>
          <Search
            placeholder="请输入"
            onSearch={onSearch}
            style={{ width: 300 }}
          />
        </div>
        <div style={{ width: '100%', display: 'flex' }}>
          <div style={{ width: '60%' }}>
            <DirectoryTree
              style={{ display: 'flex', justifyContent: 'space-between' }}
              multiple
              defaultExpandAll
              onSelect={onSelect}
              onExpand={onExpand}
              treeData={list && list.data}
              titleRender={(item: any) => {
                return (
                  <div className={styles.box}>
                    <span>{item.name}</span>
                    <span className={styles.operation}>
                      <span
                        onClick={() => {
                          del(item);
                        }}
                      >
                        删除
                      </span>
                    </span>
                  </div>
                );
              }}
            />
          </div>
          <div style={{ width: '40%' }}>
            <AddRotation list={list && list}></AddRotation>
          </div>
        </div>
        <Modal
          title="删除分类"
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
      </Card>
    </div>
  );
};

export default categ;
