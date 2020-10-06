import Vue from 'vue';
import Vuex from 'vuex';

import { login, LoginState } from './login';
import { member, MemberState } from './member';
import { snackbar, SnackbarState } from './snackbar';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: { member, snackbar, login },
    strict: true,
    devtools: true
});

export interface State {
    member: MemberState;
    snackbar: SnackbarState;
    login: LoginState;
}
