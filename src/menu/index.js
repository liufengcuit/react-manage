const menu = [
    {
        name: "首页",
        icon: "pie-chart",
        index: '/dashboard',
        key: 'sub1',
        sub: []
    },
    {
        name: "基本组件",
        icon: "desktop",
        key: 'sub2',
        sub: [
            {
                name: '表格',
                key: 'sub2_1',
                index: "/dashboard/basic/table"
            }
        ]
    },
    {
        name: "系统设置",
        icon: "setting",
        key: 'sub3',
        sub: [
            {
                name: '密码管理',
                key: 'sub3_1',
                index: "/dashboard/setting/user_manage"
            }
        ]
    }
]

export default menu;