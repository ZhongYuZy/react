import styles from './index.less';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'umi'
import * as echarts from 'echarts';
import dayjs from "dayjs"
const Index = () => {
  let index = useSelector((state: any) => state.getIndex.index)
  let order = useSelector((state: any) => state.getOrder.order)
  let commodity = useSelector((state: any) => state.addcommodity.commodity)
 
  return (
    <div style={{ background: "white" }}>
    </div>
  )
}

export default Index


