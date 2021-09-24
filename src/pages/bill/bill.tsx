import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'umi'
import {  Table} from 'antd';
import dayjs from "dayjs"
const Order = () => {
  let order = useSelector((state: any) => state.getOrder.order)
  let dispatch = useDispatch()
  // 表格
  const columns: any = [
    {
      title: '订单日期',
      dataIndex: 'pay_time',
      key: 'pay_time',
      width: 200,
      align: "center",
      render: (pay_time: string) => (
      <div>{dayjs(Number(pay_time)).format("YYYY-MM-DD HH:mm:ss")}</div>
      ),
    },
    {
      title: '商品数量',
      dataIndex: 'count',
      key: 'count',
      width: 200,
      align: "center"
    },
    {
      title: '订单价格',
      dataIndex: 'price',
      key: 'price',
      width: 200,
      align: "center"
    },
    {
      title: '商品名称',
      dataIndex: 'goods_list',
      key: 'goods_list',
      align: "center",
      width: 200,
      render: (goods_list: any) => (
        <div>
          {goods_list.map((item: any, index: number) => {
            return (
              <div key={index}>{index + 1}.{item.goods.name}</div>
            )
          })}
        </div>
      ),
    },
    {
      title: '订单地址',
      dataIndex: 'address',
      key: 'address',
      align: "center",
      render: (address: any) => (
        <div>{address.address}</div>
      ),
    }
  ];
  useEffect(() => {
    dispatch({
      type: 'getOrder/getOrder'
    })
  }, [])
  return (
    <div>
      <Table columns={columns} dataSource={order.data} pagination={false} rowKey="_id" />
    </div>
  )
}

export default Order

