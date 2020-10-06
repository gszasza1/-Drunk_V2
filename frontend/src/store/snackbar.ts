import { Module } from 'vuex';

import { State } from '.';

export interface SnackbarState {
    error: string;
}

export const snackbar: Module<SnackbarState, State> = {
    state: {
        error: ''
    },
    mutations: {
        openSnackbar(state, payload) {
            state.error = payload.error;
        }
    },
    actions: {
        async openSnackbar(state, payload) {
            state.commit('openSnackbar', payload);
        }
    },
    getters: {
        getSnackbarError: state => state.error
    }
};
