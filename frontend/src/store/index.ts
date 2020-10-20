import Vue from 'vue';
import Vuex from 'vuex';

import { firm, FirmState } from './firm';
import { login, LoginState } from './login';
import { member, MemberState } from './member';
import { snackbar, SnackbarState } from './snackbar';
import { user, UserState } from './user';

Vue.use(Vuex);

export default new Vuex.Store<State>({
    modules: { member, snackbar, login, user, firm },
    strict: true,
    devtools: true
});

export interface State {
    member: MemberState;
    snackbar: SnackbarState;
    login: LoginState;
    user: UserState;
    firm: FirmState;
}
