import { DrinkBody } from '@/interfaces/frombackend';
import router from '@/router';
import Axios from 'axios';
import { Module } from 'vuex';

import { State } from '.';

export interface NewDrinkState {
    request: DrinkBody;
    response: {};
    error: string;
    params: { isRequesting: boolean; isError: boolean };
}
export const newDrinkInitialState: NewDrinkState = {
    request: { drinkName: '', price: 0 },
    response: {},
    error: '',
    params: { isRequesting: false, isError: false }
};
export const newDrink: Module<NewDrinkState, State> = {
    state: newDrinkInitialState,
    mutations: {
        setNewDrinkRequest(state, payload) {
            state.request = payload;
            state.params.isRequesting = true;
            state.params.isError = false;
        },
        setNewDrinkResponse(state) {
            state.params.isRequesting = false;
            state.params.isError = false;
        },
        setNewDrinkError(state, payload) {
            state.error = payload;
            state.params.isRequesting = false;
            state.params.isError = true;
        }
    },
    actions: {
        async setNewDrinkRequest(state, payload) {
            state.commit('setNewDrinkRequest', payload);

            Axios.post('/auth/drink', payload, {})
                .then(() => {
                    state.commit('setNewDrinkResponse');
                    router.push('/auth/drinks/list');
                })
                .catch(error => {
                    state.commit('setNewDrinkError', error);
                });
        }
    },
    getters: {
        getNewDrink: state => state.request,
        getNewDrinkRequesting: state => state.params.isRequesting,
        getNewDrinkError: state => ({
            error: state.error,
            isError: state.params.isError
        })
    }
};
