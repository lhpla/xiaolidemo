import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home/Home.vue'
import Layout from '../views/Layout/Layout.vue'
Vue.use(VueRouter)

const routes = [{
        path: '',
        component: Layout,
        children: [{
                path: '/',
                name: 'Home',
                component: Home
            },
            {
                path: '/Page',
                name: 'Page',
                component: () =>
                    import ('../components/Page/Page.vue')
            },
            {
                path: '/Released',
                name: 'Released',
                component: () =>
                    import ('../components/Released/Released.vue')
            },
            {
              path:'/Edit',
              name:'Edit',
              component :()=>
                  import ('../components/Released/Edit.vue')
            },
            {
              path:'/Look',
              name:'Look',
              component :()=>
                  import ('../components/Released/Look.vue')
            },
            {
                path: '/total',
                name: 'total',
                component: () =>
                    import ('../components/total/total.vue')
            },
            {
                path: '/Article',
                name: 'Article',
                component: () =>
                    import ('../components/Article/Article.vue')
            },
            {
                path: '/Tabpage',
                name: 'Tabpage',
                component: () =>
                    import ('../components/Tabpage/Tabpage.vue')
            },
            {
                path: '/Excel',
                name: 'Excel',
                component: () =>
                    import ('../components/Excel/Excel.vue')
            },
            {
                path: '/Picture',
                name: 'Picture',
                component: () =>
                    import ('../components/Picture/Picture.vue')
            },
            {
                path: '/Signout',
                name: 'Signout',
                component: () =>
                    import ('../components/Signout/Signout.vue')
            },
        ]
    },
    {
        path: '/Login',
        name: 'Login',
        component: () =>
            import ('../views/Login/Login.vue')

    },
    {
        path: '/Register',
        name: 'Register',
        component: () =>
            import ('../views/Register/Register.vue')
    },
]

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router