import React, { useState, useEffect } from 'react'
import styles from './Customer.less';
import { Card, Input, Button } from 'antd';
import icon from "../../static/emoji.png"
import { emoji } from "@/lib/emoji"
import io from 'socket.io-client'

const Customer = () => {
  const socket = io('http://localhost:3000')
  let [show, setshow] = useState<boolean>(false)
  let [value, setvalue] = useState<any>()
  let [messageList, setmessageList] = useState<any[]>([])
  let open = () => {
    setshow(true)
  }
  let onInput = (e: any) => {
    setvalue(e.target.value)
  }
  let off = (item: any) => {
    setshow(false)
    setvalue(value + item)
  }
  let send = () => {
    let user = JSON.parse(localStorage.getItem("user")!)
    socket.emit('event', {
      user: user.username,
      value: value,
      platform: "admin"
    })
    setvalue('')
  }
  useEffect(() => {
    socket.on('broadcast', val => {
      console.log(val)
      messageList.push(val)
      console.log(messageList)
      setmessageList([...messageList])

    })
  },[])
  useEffect(() => {
    let length = messageList.length
    if (length > 0) {
      let dom = document.getElementById(`chatItem-${length - 1}`)
      dom!.scrollIntoView()
    }
  }, [messageList])
  return (
    <div>
      <Card bordered={false} style={{ height: 600, position: 'relative' }}>
        <div className={`${styles.title}`}>
          {messageList&&messageList.map((item: any,index:number) => {
            return (
            <div key={index}  id={`chatItem-${index}`}>
              {item.platform==="admin"?
              <div className={`displayF justify-contentE`}>
                <div className={`${styles.left}`}>{item.value}</div>
              </div>
              :<div className={`displayF justify-contentS`}>
                <div className={`${styles.right}`}>{item.value}</div>
              </div>}
            </div>
            )
          })}
        </div>
        <div className={`${styles.foot}`}>
          <div className={`displayF align-itemsC`}>
            <Input placeholder="" style={{ width: 1141 }} value={value} onInput={onInput} onPressEnter={send} />
            <img src={icon} alt="" style={{ width: 20, height: 20, marginLeft: 20, marginRight: 20 }} onClick={() => open()} />
            <Button type="primary" shape="round" onClick={() => send()}>发送</Button>
          </div>
          {show ? <div className={`${styles.emij}`}>
            {emoji.map((item: any) => {
              return (
                <div key={item} className={`${styles.emoji}`} onClick={() => off(item)}>{item}</div>
              )
            })}
          </div> : ''}
        </div>
      </Card>
    </div>
  )
}

export default Customer

