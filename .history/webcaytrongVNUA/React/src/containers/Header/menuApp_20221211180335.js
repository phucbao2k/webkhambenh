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
                name: 'menu.admin.manage-doctor', link: '/system/manage-doctor'
            },
            // {
            //     name: 'menu.admin.manage-admin', link: '/system/user-admin'
            // },
            {
                name: 'menu.doctor.manage-schedule', link: '/admin/manage-schedule'
            },
            {
                name: 'menu.doctor.manage-patient', link: '/admin/manage-patients'
            }
        ]
    },
    {
        //quản lý phòng khám
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic', link: '/system/manage-clinic'
            },
        ]
    },
    {
        //quản lý chuyên khoa
        name: 'menu.admin.specialty',
        menus: [
            {
                name: 'menu.admin.manage-specialty', link: '/system/manage-specialty'
            },
        ]
    },
    {// quản lý cẩm nang, tin tức
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook', link: '/system/manage-handbook'
            },
        ]

    },
    {// về trang chủ
        name: 'menu.admin.home',
        menus: [
            {
                name: 'menu.admin.home', link: '/home'
            },
        ]

    },
   
];
export const doctorMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
            {
                name: 'menu.doctor.manage-schedule', link: '/doctor/doctor-manage-schedule'
            },
            {
                name: 'menu.doctor.manage-patient', link: '/doctor/manage-patient'
            }
        ]
    },
     {// về trang chủ
        name: 'menu.admin.home',
        menus: [
            {
                name: 'menu.admin.home', link: '/home'
            },
        ]

    }
];
export const patientMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [
           
            {
                name: 'menu.doctor.manage-patient', link: '/patient/manage_patient'
            }
        ]
    },
    {// về trang chủ
        name: 'menu.admin.home',
        menus: [
            {
                name: 'menu.admin.home', link: '/home'
            },
        ]

    }
];
export const bookingManagerMenu = [
    {
        name: 'menu.admin.manage-user',
        menus: [

            {
                name: 'menu.doctor.manage-patient', link: '/booking-manager/manage_booking'
            }
        ]
    },
    {// về trang chủ
        name: 'menu.admin.home',
        menus: [
            {
                name: 'menu.admin.home', link: '/home'
            },
        ]

    }
];