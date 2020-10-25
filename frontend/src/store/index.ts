import Vue from 'vue';
import Vuex from 'vuex';

import { festivalList, FestivalListState } from './festival-list';
import { firm, FirmState } from './firm';
import { login, LoginState } from './login';
import { member, MemberState } from './member';
import { newFestival, NewFestivalState } from './new-festival';
import { snackbar, SnackbarState } from './snackbar';
import { user, UserState } from './user';

Vue.use(Vuex);

export default new Vuex.Store<State>({
    modules: { member, snackbar, login, user, firm, newFestival, festivalList },
    strict: true,
    devtools: true
});

export interface State {
    member: MemberState;
    snackbar: SnackbarState;
    login: LoginState;
    user: UserState;
    firm: FirmState;
    newFestival: NewFestivalState;
    festivalList: FestivalListState;
}
