import Vue from 'vue';
import Vuex from 'vuex';

import { currentDrinks, currentDrinksInitialState, CurrentDrinksState } from './current-drinks';
import { drinkList, drinkListInitialState, DrinkListState } from './drink-list';
import { festivalDetail, festivalDetailInitialState, FestivalDetailState } from './festival-detail';
import { festivalList, festivalListInitialState, FestivalListState } from './festival-list';
import { firm, firmInitialState, FirmState } from './firm';
import { login, loginInitialState, LoginState } from './login';
import { member, memberInitialState, MemberState } from './member';
import { newDrink, newDrinkInitialState, NewDrinkState } from './new-drink';
import { newFestival, newFestivalInitialState, NewFestivalState } from './new-festival';
import { snackbar, snackbarInitialState, SnackbarState } from './snackbar';
import { user, userInitialState, UserState } from './user';

Vue.use(Vuex);

export const initialState: State = {
    member: memberInitialState,
    snackbar: snackbarInitialState,
    login: loginInitialState,
    user: userInitialState,
    firm: firmInitialState,
    newFestival: newFestivalInitialState,
    festivalList: festivalListInitialState,
    festivalDetail: festivalDetailInitialState,
    drinkList: drinkListInitialState,
    newDrink: newDrinkInitialState,
    currentDrinks: currentDrinksInitialState
};

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
        newDrink,
        currentDrinks
    },
    mutations: {
        reset(state) {
            console.log('sajt');
            Object.keys(initialState).forEach(key => {
                Object.assign(state[key], initialState[key]);
            });
        }
    },
    actions: {
        reset(state) {
            state.commit('reset');
        }
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
    currentDrinks: CurrentDrinksState;
}
