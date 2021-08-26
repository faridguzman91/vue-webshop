import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import database from '@/library/database'

Vue.use(Vuex)

export default new Vuex.store({
    plugins: [createPersistedState()],
    state: {
        products: {}
    },
    getters: {
        getProduct: state => id => {
            return state.products[id]
        }
    },
    mutations: {
        SET_PRODUCTS(state, products) {
            state.products = products
        }
    },
    actions: {
        getProducts({ commit }) {
            database.get_products().then(products => {
                let tempProducts = {}

                products.forEach(product => {
                    tempProducts[products.id] = product.data()
                })

                commit('SET_PRODUCTS', tempProducts)
            })
        }
    }
})