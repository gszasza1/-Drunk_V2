import { Module } from 'vuex';

import { State } from '.';

export interface SnackbarState {
    error: string;
    sidebarOpen: boolean;
}
export interface ErrorResponse {
    error?: string;
}
export const snackbar: Module<SnackbarState, State> = {
    state: {
        error: '',
        sidebarOpen: false
    },
    mutations: {
        openSidebar(state) {
            state.sidebarOpen = true;
        },
        closeSidebar(state) {
            state.sidebarOpen = false;
        },
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
        },
        async closeSidebar(state) {
            state.commit('closeSidebar');
        },
        async openSidebar(state) {
            state.commit('openSidebar');
        }
    },
    getters: {
        getSnackbarError: state => state.error,
        getSidebarOpen: state => state.sidebarOpen
    }
};
