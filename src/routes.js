/**
 * Created by lingfohn on 16-12-28.
 */

import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Main from './components/Main.vue'
import Table from './components/core/demo/Table.vue'
import Form from './components/core/demo/Form.vue'
import Page3 from './components/core/demo/Page3.vue'
import Page4 from './components/core/demo/Page4.vue'
import Page5 from './components/core/demo/Page5.vue'
import Page6 from './components/core/demo/Page6.vue'
import Tree from './components/core/demo/Tree.vue'
import echarts from './components/core/demo/echarts.vue'
import Menu from './components/core/Menu.vue'
import Roles from './components/sys/Roles.vue'
import MonStatus from './components/mon/status.vue'

export default [
    {
        path: '/login',
        component: Login,
        hidden: true//不显示在导航中
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        hidden:true,
        children: [
            { path: '/main', component: Main, name: '主页面' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form',hidden:false},
            { path: '/page3', component: Page3, name: '页面3' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '导航二',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '页面4' },
            { path: '/page5', component: Page5, name: '页面5' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '/core',
        component: Home,
        name: '系统管理',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/core/menu', component: Menu, name: '菜单' },
            { path: '/core/docvue', component: Page3, name: '菜单' },
            { path: '/core/docConv', component: Page3, name: '菜单' },
            { path: '/cmdb/hosts', component: Page3, name: '菜单' },
            { path: '/cmdb/claster', component: Page3, name: '菜单' },
            { path: '/sys/roles', component: Roles, name: '菜单' },

        ]
    },
    {
        path: '/core/demo',
        component: Home,
        name: '前端DEMO',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/core/demo/table', component: Table, name: 'Table' },
            { path: '/core/demo/form', component: Form, name: 'form' },
            { path: '/core/demo/echarts', component: echarts, name: 'Echarts' },
            { path: '/core/demo/tree', component: Tree, name: 'Echarts' },

        ]
    },
    {
        path: '/mon',
        component: Home,
        children: [
            { path: '/mon/status', component: MonStatus, name: 'Table' },

        ]
    }

]