import Axios from 'axios';
import { Module } from 'vuex';

import { State } from '.';

export interface DrinkListItem {
    id: string;
    drinkName: string;
    price: number;
    provider: string;
}

export interface DrinkListState {
    request: {};
    response: DrinkListItem[];
    error: string;
    params: { isRequesting: boolean; isError: boolean };
}
export const drinkListInitialState: DrinkListState = {
    request: {},
    response: [],
    error: '',
    params: { isRequesting: false, isError: false }
};
export const drinkList: Module<DrinkListState, State> = {
    state: drinkListInitialState,
    mutations: {
        setDrinkListRequest(state, payload) {
            state.request = payload;
            state.params.isRequesting = true;
            state.params.isError = false;
        },
        setDrinkListResponse(state, payload) {
            state.params.isRequesting = false;
            state.response = payload ?? [];
            state.params.isError = false;
        },
        setDrinkListError(state, payload) {
            state.error = payload;
            state.params.isRequesting = false;
            state.params.isError = true;
        }
    },
    actions: {
        async setDrinkListRequest(state, payload) {
            state.commit('setDrinkListRequest', payload);

            Axios.get('/auth/drink')
                .then(response => {
                    state.commit('setDrinkListResponse', response.data);
                })
                .catch(error => {
                    state.commit('setDrinkListError', error);
                });
        },
        async buyDrink(state, payload) {
            Axios.post('/auth/drink/buydrink', { number: 1, drinkId: payload })
                .then(response => {
                    console.log('liba');
                    // state.commit('setDrinkListResponse', response.data);
                })
                .catch(error => {
                    //   state.commit('setDrinkListError', error);
                });
        }
    },
    getters: {
        getDrinkList: state => state.response,
        getDrinkListRequesting: state => state.params.isRequesting,
        getDrinkListError: state => ({
            error: state.error,
            isError: state.params.isError
        })
    }
};
