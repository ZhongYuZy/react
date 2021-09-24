import login from "../pages/login/login"

export interface Meta {
    title: string;
    icon?: string;
}
export interface RouterItem {
    path: string;
    component: any;
    // 精准匹配 只有路径完全相同的时候才匹配
    exact: boolean;
    meta?: Meta;
}

export const commonRoutes: RouterItem[] = [
    {
        path: '/login',
        component: login,
        exact: true,
        meta: {
            title: '登录'
        }
    }
];