import Vue from 'vue';
import Vuex from 'vuex';

import { drinkList, DrinkListState } from './drink-list';
import { festivalDetail, FestivalDetailState } from './festival-detail';
import { festivalList, FestivalListState } from './festival-list';
import { firm, FirmState } from './firm';
import { login, LoginState } from './login';
import { member, MemberState } from './member';
import { newDrink, NewDrinkState } from './new-drink';
import { newFestival, NewFestivalState } from './new-festival';
import { snackbar, SnackbarState } from './snackbar';
import { user, UserState } from './user';

Vue.use(Vuex);

export default new Vuex.Store<State>({
    modules: {
        member,
        snackbar,
        login,
        user,
        firm,
        newFestival,
        festivalList,
        festivalDetail,
        drinkList,
        newDrink
    },
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
    festivalDetail: FestivalDetailState;
    drinkList: DrinkListState;
    newDrink: NewDrinkState;
}
