import { Module } from 'vuex';

import { State } from '.';

export interface SnackbarState {
    error: string;
}
export interface ErrorResponse {
    error?: string;
}
export const snackbar: Module<SnackbarState, State> = {
    state: {
        error: ''
    },
    mutations: {
        openSnackbar(state, payload: ErrorResponse) {
            state.error =
                payload.error && payload.error.length > 0
                    ? payload.error
                    : 'Ismeretlen hiba';
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
