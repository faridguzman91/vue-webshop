import Vue from 'vue'
import Router from 'vue-router'

import product from '@/components/product'
import products from '@/components/products'
import adminproducts from '@/components/admin/products'
import adminlogin from '@/components/admin/login'


import 'firebase/auth'
import { FirebaseApp } from '@/library/database'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', component: products },
        { path: '/product/:id', component: product },
        {
            path: '/admin',
            component: { render(c) { return c('router-view') } },
            beforeEnter(to, _from, next) {
                let auth = FirebaseApp.auth()

                if (auth.currentUser === null && to.path !== '/admin/login') {
                    next({
                        path: '/admin/login'
                    })
                } else if (auth.currentUser !== null && to.path === '/admin/login') {
                    next({
                        path: '/admin/products'
                    })
                } else {
                    next()
                }
            },
            children: [
                { path: 'login', component: adminlogin },
                { path: 'products', component: adminproducts }
            ]
        }
    ]
})