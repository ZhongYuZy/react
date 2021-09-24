import React from 'react'
import styles from '../../styles/global.css'
import {
    UserOutlined
} from '@ant-design/icons';

let username = () => {
    localStorage.getItem('user')
}
const header = () => {
    return (
        <div className={styles.portrait}>
            <div><iframe width="350" height="25" frameBorder="0" scrolling="no" src="https://i.tianqi.com/?c=code&id=40"></iframe></div>
            <div className={styles.icon}><UserOutlined /></div>
        </div>
    )
}

export default header
