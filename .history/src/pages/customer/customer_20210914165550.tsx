import React from 'react';
import io from 'socket.io-client'
const socket = io('http://localhost:3000')
// 客服消息
const customer = () => {
  return <div>客服消息</div>;
};

export default customer;
