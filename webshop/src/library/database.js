import Firebase from 'firebase/app'
import 'firebase/firestore'
import moment from 'moment'

const config = {

    apiKey: "AIzaSyA3bfXzFqR5CBgmZWGUnVdMMrtZmDIs4Hg",

    authDomain: "webshop-eb36e.firebaseapp.com",

    projectId: "webshop-eb36e",

    storageBucket: "webshop-eb36e.appspot.com",

    messagingSenderId: "213010624562",

    appId: "1:213010624562:web:ee05fe3d0f0e686f750c2b",

    measurementId: "G-TGDEDH8QC2"
}

let App = Firebase.initializeApp(config)
let Firestore = App.firestore()
Firestore.settings({ timestampsInSnapshots: true })

export let FirebaseApp = App

export default {
    add_product(product) {
        return Firestore.collection('products').add(product)
    },
    save_product(id, product) {
        return Firestore.collection('products').doc(id).set(product)
    },
    delete_product(id) {
        return Firestore.collection('products').doc(id).delete()
    },
    get_products() {
        return Firestore.collection('products').get()
    }
}