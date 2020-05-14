import Vue from 'vue'
import Main from '@/views/Main.vue'
import ctsiComponents from 'biyi-admin'

Vue.prototype.$ctsiComponents = ctsiComponents
/**
 *
 * 自定义菜单组建
 *
 */
//场景用户管理
import SpaceUserManage from '@/views/selfComponent/SpaceUserManage/SpaceUserManage'; // 用户管理
import SpacePoint from '@/views/selfComponent/SpaceUserManage/SpacePoint'; // 用户管理
//权限管理
// import UserManage from '@/views/selfComponent/authorityManage/userManage'; // 用户管理
import PointManage from '@/views/selfComponent/authorityManage/pointManage'; // 点位管理
//设备管理
import DeviceListManage from '@/views/selfComponent/deviceManage/deviceListManage'; // 设备列表
//录像管理
import CloudVideoManage from '@/views/selfComponent/videoManage/cloudVideoManage'; // 云录像管理
// import LocalVideoManage from '@/views/selfComponent/videoManage/localVideoManage'; // 本地录像管理
//设备告警管理
// import DeviceAlarmManage from '@/views/selfComponent/alarmManage/deviceAlarmManage' //设备告警管理

// 不作为Main组件的子页面展示
let singleRouter = [
    {
        path: '/welcome',
        name: 'welcome',
        component: () => import('../views/welcome.vue')
    }
]

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
let otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        {
            path: 'home',
            title: {
                i18n: 'home'
            },
            name: 'home_index',
            component: () =>
                import('../views/home/homeBlackv2.vue')
        },
        {
            path: 'SpacePoint',
            title: {
                i18n: 'SpacePoint'
            },
            name: 'SpacePoint',
            component: () =>
                import('../views/selfComponent/SpaceUserManage/SpacePoint')
        },
        {
            path: 'UserAdd',
            title: {
                i18n: 'UserAdd'
            },
            name: 'UserAdd',
            component: () =>
                import('../views/selfComponent/SpaceUserManage/UserAdd')
        },
        {
            path: 'UserUpdate',
            title: {
                i18n: 'UserUpdate'
            },
            name: 'UserUpdate',
            component: () =>
                import('../views/selfComponent/SpaceUserManage/UserUpdate')
        }
    ]
}
// import('../views/home/home.vue')
// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
let appRouter = [
    {
        path: '/SpaceUserManage',
        icon: ' ivu-icon ivu-icon-md-man',
        title: {
            i18n: 'SpaceUserManage'
        },
        name:'SpaceUserManage',
        component: Main,
        children: [
            {
                path: 'SpaceUserManage',
                icon: ' ivu-icon ivu-icon-md-man',
                title: {
                    i18n: 'SpaceUserManage'
                },
                name: 'SpaceUserManage',
                component: SpaceUserManage
            }
        ]
    },
    {
        path: '/ptManage',
        icon: 'md-key',
        title: {
            i18n: 'ptManage'
        },
        name:'ptManage',
        component: Main,
        children: [
            {
                path: 'pointManage',
                icon: ' icon-shebei iconfont',
                title: {
                    i18n: 'pointManage'
                },
                name: 'pointManage',
                component: PointManage
            }
        ]
    },
    {
        path: '/deviceManage',
        icon: ' icon-shebei iconfont',
        title: {
            i18n: 'deviceManage'
        },
        name:'deviceManage',
        component: Main,
        children: [
            {
                path: 'deviceListManage',
                icon: ' icon-cunchu iconfont',
                title: {
                    i18n: 'deviceListManage'
                },
                name: 'deviceListManage',
                component: DeviceListManage
            },
        ]
    },
    {
        path: '/videoManage',
        icon: ' icon-icon-GIS_renyuanjiankong iconfont',
        title: {
            i18n: 'videoManage'
        },
        name:'videoManage',
        component: Main,
        children: [
            {
                path: 'cloudVideoManage',
                icon: ' icon-icon-GIS_renyuanjiankong iconfont',
                title: {
                    i18n: 'cloudVideoManage'
                },
                name: 'cloudVideoManage',
                component: CloudVideoManage
            }
            // {
            //     path: 'localVideoManage',
            //     icon: ' icon-icon-GIS_renyuanjiankong iconfont',
            //     title: {
            //         i18n: 'localVideoManage'
            //     },
            //     name: 'localVideoManage',
            //     component: LocalVideoManage
            // },
        ]
    },
    // {
    //     path: '/alarmManage',
    //     icon: ' icon-icon- iconfont',
    //     title: {
    //         i18n: 'alarmManage'
    //     },
    //     name:'alarmManage',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'deviceAlarmManage',
    //             icon: ' icon-shebei iconfont',
    //             title: {
    //                 i18n: 'deviceAlarmManage'
    //             },
    //             name: 'deviceAlarmManage',
    //             component: DeviceAlarmManage
    //         }
    //     ]
    // }
]

if(Vue.prototype.$ctsiComponents) {
    singleRouter.push(...Vue.prototype.$ctsiComponents.singleRouters)
    for (let item of Vue.prototype.$ctsiComponents.otherRouters) {
        otherRouter.children.push(item)
    }
    appRouter.push(...Vue.prototype.$ctsiComponents.appRouters)
}

export { singleRouter, otherRouter, appRouter }

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    otherRouter,
    ...appRouter,
    ...singleRouter
]
