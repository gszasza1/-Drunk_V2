import './app.scss';
import './registerServiceWorker';
import 'vue-material/dist/vue-material.min.css';

import Axios from 'axios';
import Vue from 'vue';
import VueMaterial from 'vue-material';
import Vuelidate from 'vuelidate';

import App from './App.vue';
import { ValidatorDirective } from './directives';
import { dateformat } from './filters/date-format';
import { LocalConfig } from './lib-config/material';
import router from './router';
import store from './store';

Vue.use(Vuelidate);
Vue.config.productionTip = false;
Vue.use(VueMaterial);
Vue.directive('validation', ValidatorDirective);
Vue.filter('dateformat', dateformat);
Axios.defaults.baseURL = 'http://localhost:3000/api';
Axios.defaults.headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
    'Content-Type': 'application/json'
};
Axios.defaults.validateStatus = function(status) {
    return status >= 200 && status < 300;
};
Axios.defaults.headers = {};

function refreshToken() {
    if (store.state.login.params.isRefreshing) {
        return store.state.login.refreshingCall;
    }
    store.commit('setRefreshState', true);
    const refreshingCall = Axios.post('/login/refresh', {
        refreshToken: localStorage.getItem('refreshToken')
    }).then(({ data }) => {
        store.commit('setToken', data);
        store.commit('setRefreshState', false);
        store.commit('setRefreshCall', undefined);
        return Promise.resolve(true);
    });
    store.commit('setRefreshCall', refreshingCall);
    return refreshingCall;
}
Axios.interceptors.request.use(value => {
    value.headers = {
        ...Axios.defaults.headers,
        authorization: localStorage.getItem('accessToken')
    };
    return value;
});
Axios.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;
        const status = error.response ? error.response.status : null;

        if (status === 400) {
            store.dispatch('openSnackbar', error.response.data);
        }
        if (status === 401 && refreshToken) {
            return refreshToken()!.then(_ => {
                return Axios.request(error.config);
            });
        }

        if (status === 500) {
            store.dispatch('openSnackbar', 'Szerver token');
        }
        return Promise.reject(error);
    }
);

// eslint-disable-next-line
const AltVue = Vue as any;
AltVue.material = {
    ...AltVue.material,
    ...LocalConfig(AltVue.material.locale)
};

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
