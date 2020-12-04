import Axios from 'axios';
import { Module } from 'vuex';

import { State } from '.';

export interface CurrentDrinksItem {
    id: string;
    drinkName: string;
    number: number;
}

export interface CurrentDrinksState {
    request: {};
    response: CurrentDrinksItem[];
    error: string;
    params: { isRequesting: boolean; isError: boolean };
}
export const currentDrinksInitialState: CurrentDrinksState = {
    request: {},
    response: [],
    error: '',
    params: { isRequesting: false, isError: false }
};
export const currentDrinks: Module<CurrentDrinksState, State> = {
    state: currentDrinksInitialState,
    mutations: {
        setCurrentDrinksRequest(state, payload) {
            state.request = payload;
            state.params.isRequesting = true;
            state.params.isError = false;
        },
        setCurrentDrinksResponse(state, payload) {
            state.params.isRequesting = false;
            state.response = payload ?? [];
            state.params.isError = false;
        },
        setCurrentDrinksError(state, payload) {
            state.error = payload;
            state.params.isRequesting = false;
            state.params.isError = true;
        },
        addDrinks(state: CurrentDrinksState, payload: CurrentDrinksItem) {
            state.response = state.response.find(x => x.id === payload.id)
                ? state.response.map(x =>
                      x.id === payload.id
                          ? { ...x, number: x.number + payload.number }
                          : x
                  )
                : [...state.response, payload];
        }
    },
    actions: {
        async addDrinks(state, payload) {
            state.commit('addDrinks', payload);
        },
        async setCurrentDrinksRequest(state, payload) {
            state.commit('setCurrentDrinksRequest', payload);

            Axios.get('/auth/drink')
                .then(response => {
                    state.commit('setCurrentDrinksResponse', response.data);
                })
                .catch(error => {
                    state.commit('setCurrentDrinksError', error);
                });
        },
        async giveDrink(state, payload) {
            Axios.post('/auth/drink/givedrink', {
                number: 1,
                drinkId: payload
            })
                .then(response => {
                    state.commit('setCurrentDrinksResponse', response.data);
                })
                .catch(error => {
                    state.commit('setCurrentDrinksError', error);
                });
        }
    },
    getters: {
        getCurrentDrinks: state => state.response,
        getCurrentDrinksRequesting: state => state.params.isRequesting,
        getCurrentDrinksError: state => ({
            error: state.error,
            isError: state.params.isError
        })
    }
};
