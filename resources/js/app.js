/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

window.Vue = require('vue')

window.moment = require('moment')

import VueSweetalert2 from 'vue-sweetalert2'

window.Vue.use(VueSweetalert2)

/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i);
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Vue.filter('truncate', function (text, stop, clamp) {
    return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
})

Vue.filter('momentDay', function (text) {
    return moment(text).format('MMM D')
})

Vue.filter('momentDayYear', function (text) {
    return moment(text).format('MMMM Do YYYY')
})

// Layout components
import NavigationBar from './components/layout/NavigationBar.vue'

// Dashboard components
import Dashboard from './components/dashboard/Dashboard.vue'
import StatCounter from './components/dashboard/StatCounter.vue'

// Landing page components
import ShortenLinkForm from './components/landing/ShortenLinkForm.vue'

// Login page components
import LoginForm from './components/auth/LoginForm.vue'

// Register page components
import RegisterForm from './components/auth/RegisterForm.vue'

const app = new Vue({
    components: {
        NavigationBar,
        Dashboard,
        StatCounter,
        ShortenLinkForm,
        LoginForm,
        RegisterForm,
    },
}).$mount('#app')
