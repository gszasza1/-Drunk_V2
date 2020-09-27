import './app.scss';
import './registerServiceWorker';
import 'vue-material/dist/vue-material.min.css';

import Vue from 'vue';
import VueMaterial from 'vue-material';
import Vuelidate from 'vuelidate';

import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Vuelidate);
Vue.config.productionTip = false;
Vue.use(VueMaterial);
// eslint-disable-next-line
const AltVue = Vue as any;
AltVue.material = {
    ...AltVue.material,
    locale: {
        ...AltVue.material.locale,
        dateFormat: 'yyyy. MM. dd.',
        firstDayOfAWeek: 1,
        days: [
            'Vasárnap',
            'Hétfő',
            'Kedd',
            'Szerda',
            'Csütörtök',
            'Péntek',
            'Szombat'
        ],
        shortDays: ['Vasá', 'Hétf', 'Kedd', 'Szer', 'Csüt', 'Pén', 'Szomb'],
        shorterDays: ['V', 'H', 'K', 'Sz', 'Cs', 'P', 'Sz'],
        months: [
            'Január',
            'Február',
            'Március',
            'Április',
            'Május',
            'Június',
            'Július',
            'Agusztus',
            'Szeptember',
            'Október',
            'November',
            'December'
        ],
        shortMonths: [
            'Jan',
            'Feb',
            'Már',
            'Ápr',
            'Máj',
            'Jún',
            'Júl',
            'Aug',
            'Szept',
            'Okt',
            'Nov',
            'Dec'
        ],
        shorterMonths: [
            'J',
            'F',
            'M',
            'Á',
            'M',
            'Jú',
            'Jú',
            'Á',
            'Sze',
            'O',
            'N',
            'D'
        ]
    }
};

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
