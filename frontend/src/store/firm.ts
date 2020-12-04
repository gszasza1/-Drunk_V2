import Axios from 'axios';
import { Module } from 'vuex';

import { State } from '.';

export interface FirmState {
    request: { name: string; password: string };
    response: {};
    error: string;
    params: { isRequesting: boolean; isError: boolean };
}
export const firmInitialState: FirmState = {
    request: { name: '', password: '' },
    response: {},
    error: '',
    params: { isRequesting: false, isError: false }
};
export const firm: Module<FirmState, State> = {
    state: firmInitialState,
    mutations: {
        setFirmRequest(state, payload) {
            state.request = payload;
            state.params.isRequesting = true;

            state.params.isError = false;
        },
        setFirmResponse(state) {
            state.params.isRequesting = false;

            state.params.isError = false;
        },
        setFirmError(state, payload) {
            state.error = payload;
            state.params.isRequesting = false;
            state.params.isError = true;
        }
    },
    actions: {
        async setFirmRequest(state, payload) {
            state.commit('setFirmRequest', payload);

            Axios.post('/registration/firm', payload, {})
                .then(() => {
                    state.commit('setFirmResponse');
                })
                .catch(error => {
                    state.commit('setFirmError', error);
                });
        }
    },
    getters: {
        getFirm: state => state.request,
        getFirmRequesting: state => state.params.isRequesting,
        getFirmError: state => ({
            error: state.error,
            isError: state.params.isError
        })
    }
};
