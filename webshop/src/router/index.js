import Vue from 'vue'
import Router from 'vue-router'

import product from '@/components/admin/product'
import login from '@/components/admin/login'

import 'firebase/auth'
import { FirebaseApp } from '@/library/database'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/admin',
        component: { render(c) { return c('router-view') } },
        beforeEnter(to, _from, next) {
            let auth = FirebaseApp.auth()

            if (auth.currentUser === null && to.path !== '/admin/login') {
                next({
                    path: '/admin/login'
                })
            } else if (auth.currentUser !== null && to.path === '/admin/products') {
                next({
                    path: '/admin/products'
                })
            } else {
                next()
            }
        },
        children: [
            { path: 'login', component: login },
            { path: 'product', component: product }
        ]
    }]
})