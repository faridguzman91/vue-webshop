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
        // https://forum.vuejs.org/t/dynamic-base-in-vue-router/1026/3
        // https://stackoverflow.com/questions/50135402/explain-vue-router-component-as-a-function
        // template alternatief = oproep lege component met router view
        component: { render(c) { return c('router-view') } },
        beforeEnter(to, _from, next) {
            //check als user naar login kan
            let auth = FirebaseApp.auth()

            //override naar login pagina
            //https://firebase.google.com/docs/reference/js/firebase.auth.Auth

            if (auth.currentUser === null && to.path !== '/admin/login') {
                next({
                    path: '/admin/login'
                })
            } else if (auth.currentUser !== null && to.path === '/admin/login') {
                next({
                    path: '/admin/product'
                })
            } else {
                next()
            }
        },
        children: [
            { path: 'login', component: login }, { path: 'producten', component: product }
        ]

    }]
})

// Set the tenant ID on Auth instance.
//firebase.auth().tenantId = ‘TENANT_PROJECT_ID’;

// All future sign-in request now include tenant ID.
//firebase.auth().signInWithEmailAndPassword(email, password)
//.then(function(result) {
// result.user.tenantId should be ‘TENANT_PROJECT_ID’.
//}).catch(function(error) {
// Handle error.
//});
