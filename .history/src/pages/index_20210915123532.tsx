import styles from './index.less';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'umi'
import * as echarts from 'echarts';
import dayjs from "dayjs"

const Index = () => {
  let index = useSelector((state: any) => state.getIndex.index)
  let order = useSelector((state: any) => state.getOrder.order)
  let commodity = useSelector((state: any) => state.addcommodity.commodity)
  let [sum, setsum] = useState<any>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  let [sum1, setsum1] = useState<any>([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  let [time, settime] = useState<any>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23])
  let [arr,setarr]=useState<any>([])
  let dispatch = useDispatch()
  const start = new Date(new Date().toLocaleDateString()).getTime()
  let end = dayjs().endOf('day').valueOf()
  useEffect(() => {
    dispatch({
      type: 'getIndex/getIndex'
    })
    dispatch({
      type: 'getOrder/getOrder'
    })
    dispatch({
      type: 'addcommodity/getCategory',
      payload: {
        query: ''
      }
    })
  }, [])
  useEffect(() => {
    if (order) {
      let arr = order && order.data && order.data.filter((item: any) => {
        let a = Number(item.pay_time)
        return start <= a && a <= end
      })
      arr && arr.map((item: any) => {
        sum[dayjs(Number(item.pay_time)).hour()] += 1
        sum1[dayjs(Number(item.pay_time)).hour()] += item.price
      })
      setsum([...sum])
      setsum1([...sum1])
      one()
      two()
    }
    if(commodity){
      commodity&&commodity.data&&commodity.data.map((item:any)=>{
        arr.push({value:item.list.length,name:item.name})
      })
      setarr(arr)
      three()
    }
  }, [order,commodity])
  // 第一个图表
  let one = () => {
    let option = {
      title: {
        subtext: '今日订单'
      },
      legend: {
        data: ['订单量合计']
      },
      xAxis: {
        type: 'category',
        data: time
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: '订单量合计',
        data: sum,
        type: 'line'
      }]
    };
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom!);
    option && myChart.setOption(option);
  }
  // 第二个图表
  let two = () => {
    let option = {
      title: {
        subtext: '今日销售额'
      },
      legend: {
        data: ['销售额合计']
      },
      xAxis: {
        type: 'category',
        data: time
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        name: '销售额合计',
        data: sum1,
        type: 'line'
      }]
    };
    var chartDom = document.getElementById('main1');
    var myChart = echarts.init(chartDom!);
    option && myChart.setOption(option);
  }
  // 第三个图表
  let three = () => {
    var chartDom = document.getElementById('main2');
    var myChart = echarts.init(chartDom!);
    let option = {
      title: {
        text: '商品分类',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: list.data,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    option && myChart.setOption(option);
  }
  return (
    <div style={{ background: "white" }}>
      <div className={`${styles.top} displayF justify-contentB`}>
        <div className={`${styles.word}`}>
          <div className={`${styles.one}`}>{index && index.data && index.data.goodsCount}</div>
          <div className={`${styles.two}`}>订单总数</div>
        </div>
        <div className={`${styles.word1}`}>
          <div className={`${styles.one}`}>{index && index.data && index.data.orderCount}</div>
          <div className={`${styles.two}`}>商品总数</div>
        </div>
        <div className={`${styles.word2}`}>
          <div className={`${styles.one}`}>{index && index.data && index.data.userCount}</div>
          <div className={`${styles.two}`}>用户总数</div>
        </div>
      </div>
      <div className={`displayF justify-contentB`} style={{ marginTop: 20 }}>
        <div id="main" style={{ width: 600, height: 500 }}></div>
        <div id="main1" style={{ width: 700, height: 500 }}></div>
      </div>
      <div style={{ marginTop: 20 }}>
        <div id="main2" style={{ width: 600, height: 500 }}></div>
      </div>
    </div>
  )
}

export default Index


