// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import 'firebase/auth'
import {
    FirebaseApp
} from '@/library/database'


//https://stackoverflow.com/questions/57674453/validation-in-vue-js-using-vee-validate-having-error
import * as VeeValidate from 'vee-validate'
import {
    ValidationProvider
} from 'vee-validate';

import 'bulma/css/bulma.css'

import {
    library
} from '@fortawesome/fontawesome-svg-core'
import {
    faUserSecret
} from '@fortawesome/free-solid-svg-icons'
import {
    FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'
import {
    faFontAwesome
} from '@fortawesome/free-brands-svg-icons'


library.add(faFontAwesome)

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

//https://stackoverflow.com/questions/57674453/validation-in-vue-js-using-vee-validate-having-error

Vue.use(VeeValidate)

//filter naar currency output, altijd in 2 decimalen, in euros
Vue.filter('price', price => Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'EUR'
}).format(price))


Vue.component('ValidationProvider', ValidationProvider)

library.add(faUserSecret)

Vue.config.productionTip = false

let baseApp


FirebaseApp.auth().onAuthStateChanged(() => {
    /* eslint-disable no-new */
    if (!baseApp) {
        baseApp = new Vue({
            el: '#app',
            router,
            components: {
                App
            },
            template: '<App/>'
        })
    }
})


/* eslint-disable no-new */