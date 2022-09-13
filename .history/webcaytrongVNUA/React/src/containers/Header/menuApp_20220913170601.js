export const adminMenu = [
    { //quản lý người dùng
      name: 'menu.admin.manage-user',
      menus: [
        {
            name: 'menu.admin.crud', link: '/system/user-manage'
        },
        {
            name: 'menu.admin.crud-redux', link: '/system/user-redux'
        },
        {
            name: 'menu.admin.manage-doctor', link:'/system/user-doctor'
        },
        {
            name: 'menu.admin.manage-admin', link: '/system/user-admin'
        },
      ]
    },
    {
        //quản lý phòng khám
        name: 'menu.admin.specialty',
        menus:[
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },
        ]
    },
    {// quản lý cẩm nang, tin tức
        name: 'menu'

    }
];