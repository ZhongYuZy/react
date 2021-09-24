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
interface props {
  visible2: boolean;
  data: any;
  modify2: () => void; //关闭弹窗
}

const examine = (props: props) => {
  let onCancel = () => {
    props.modify2();
  };
  let [obj, setObj] = useState<any>([]);
  useEffect(() => {
    if (props.data) {
      setObj(props.data.goods);
    }
  }, [props.data]);
  return (
    <div>
      <Modal
        title={'分类下属商品'}
        visible={props.visible2}
        destroyOnClose={true}
        footer={false}
        // afterClose={afterClose}
        onCancel={onCancel}
      >
        {obj &&
          obj.map((item: any, index: any) => {
            return (
              <div key={index}>
                <div style={{ margin: '10px 0' }}>
                  商品名称：
                  {item.name}
                </div>
              </div>
            );
          })}
      </Modal>
    </div>
  );
};

export default examine;
