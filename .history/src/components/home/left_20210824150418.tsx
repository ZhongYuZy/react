import React, { useState } from 'react'
import { Layout, Menu } from 'antd'
import {
    BankOutlined,
    IdcardOutlined,
    BarsOutlined,
    ContactsOutlined,
    UserOutlined,
    TableOutlined,
    HistoryOutlined,
    AccountBookOutlined,
    NotificationOutlined,
    MessageOutlined,
    FileAddOutlined,
    MenuOutlined,
    FileOutlined,
    ApartmentOutlined,
    AppstoreOutlined,
    DatabaseOutlined
} from '@ant-design/icons';
import { useLocation } from 'react-router-dom'







// interface Props {
//     children: React.ReactNode
// }

const left = () => {
    const { SubMenu } = Menu;
    const location = useLocation().pathname; //当前路由
    let [collapsed, setCollapsed] = useState<boolean>(false)
    let list = [
        {
            name: '首页',
            url: '/',
            icon: BankOutlined
        },
        {
            name: '轮播图管理',
            url: '/carousel',
            icon: IdcardOutlined
        },
        {
            name: '导航管理',
            url: '/navs',
            icon: BarsOutlined
        },
        {
            name: '推荐导航',
            url: '/recom',
            icon: ContactsOutlined
        },
        {
            name: '用户管理',
            url: '/user',
            icon: UserOutlined,
        },
        {
            name: '商品管理',
            url: '/goods',
            icon: TableOutlined,
            list1: [
                {
                    name: '添加商品',
                    url: '/addgoods',
                    icon: FileAddOutlined,
                },
                {
                    name: '商品分类',
                    url: '/categ',
                    icon: DatabaseOutlined,
                },
                {
                    name: '商品模型',
                    url: '/goodsModel',
                    icon: MenuOutlined,
                },
                {
                    name: '商品规格',
                    url: '/goodsSpec',
                    icon: FileOutlined,
                },
                {
                    name: '商品参数',
                    url: '/goodsParms',
                    icon: ApartmentOutlined,
                },
                {
                    name: '规格参数',
                    url: '/spec',
                    icon: AppstoreOutlined,
                }
            ]
        },
        {
            name: '秒杀管理',
            url: '/splike',
            icon: HistoryOutlined
        },
        {
            name: '优惠券管理',
            url: '/coupon',
            icon: AccountBookOutlined
        },
        {
            name: '订单管理',
            url: '/order',
            icon: BarsOutlined
        },
        {
            name: '通知管理',
            url: '/notice',
            icon: NotificationOutlined
        },
        {
            name: '客服消息',
            url: '/chat',
            icon: MessageOutlined
        }

    ]
    let onSelect = () => {
        //
    }

    return (
        <div>
            <Menu theme="dark"
                mode="inline"
                defaultSelectedKeys={[location]}
                defaultOpenKeys={['sub1']}
                onSelect={onSelect}
            >
                {list.map((item: any, index: number) => {
                    if (index === 5) {
                        return <SubMenu key="sub2" title={item.name} icon={<item.icon />}>
                            {item.children && item.children.map((item1: any, index: number) => {
                                return <Menu.Item key={item1.url} icon={<item1.icon />} >{item1.name}
                                </Menu.Item>
                            })}
                        </SubMenu>
                    } else {
                        return <Menu.Item key={item.url} icon={<item.icon />}>{item.name}

                        </Menu.Item>
                    }
                })}

            </Menu>
        </div>
    )
}

export default left