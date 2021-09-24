import React, { useEffect, useState } from 'react';
import styles from '../../styles/global.css'
import {
    UserOutlined
} from '@ant-design/icons';

const header = () => {
    let [name, setname] = useState<any>('')
    // 生命周期
    useEffect(() => {
        if (localStorage.getItem('user'))
            setname(JSON.parse(localStorage.getItem('user')!))
    }, []);
    return (
        <div className={styles.portrait}>
            <div><iframe width="350" height="25" frameBorder="0" scrolling="no" src="https://i.tianqi.com/?c=code&id=40"></iframe></div>
            <div className={styles.icon}><UserOutlined /></div>
            <div className={styles.name}>{name.username}</div>
        </div>
    )
}

export default header
