import firebase from 'firebase/app'
import 'firebase/firestore'
import moment from 'moment'

var firebaseConfig = {

    apiKey: "AIzaSyA3bfXzFqR5CBgmZWGUnVdMMrtZmDIs4Hg",

    authDomain: "webshop-eb36e.firebaseapp.com",

    projectId: "webshop-eb36e",

    storageBucket: "webshop-eb36e.appspot.com",

    messagingSenderId: "213010624562",

    appId: "1:213010624562:web:ee05fe3d0f0e686f750c2b",

    measurementId: "G-TGDEDH8QC2"

};

// Initialize Firebase

let app = firebase.initializeApp(firebaseConfig);
Firestorefirebase.analytics();

let firestore = App.firestore()
firestore.settings({ timestampsInSnapshots: true })

export let FirebaseApp = App

export default {
    add_product(product) {
        //check firebase db voor producten, om toe te voegen
        return firestore.collection('products').add(product)

    },
    //sla product op, update
    save_product(id, product) {
        return firestore.collection('products').doc(id).set(product)
    },
    //verwijder product, updte
    delete_product(id) {
        return firestore.collection('products').doc(id).delete()
    },
    //ophalen alle producten uit db
    get_products() {
        return firestore.collection('products').get()
    }
}
