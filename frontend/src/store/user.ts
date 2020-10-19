import Axios from 'axios';
import { Module } from 'vuex';

import { State } from '.';

export interface UserState {
    response: {
        username: string;
        type: number;
        createdAt: Date | null;
        fullName: string;
    };
    error: string;
    params: { isRequesting: boolean; isError: boolean };
}

export const User: Module<UserState, State> = {
    state: {
        error: '',
        params: { isError: false, isRequesting: false },
        response: { type: 0, username: '', fullName: '', createdAt: null }
    },
    mutations: {
        getUserInformationRequest(state) {
            state.params = { isError: false, isRequesting: true };
        },
        getUserInformationError(state, payload) {
            state.error = payload;
            state.params.isRequesting = false;
            state.params.isError = true;
        },
        getUserInformationResponse(state, payload) {
            state.params.isRequesting = false;
            state.params.isError = false;
            state.response = payload;
        }
    },
    actions: {
        async getUserInformation(state) {
            state.commit('getUserInformationRequest');
            Axios.get('/auth/user')
                .then(x => {
                    state.commit('getUserInformationResponse', x.data);
                })
                .catch(error => {
                    state.commit('getUserInformationError', error);
                });
        }
    },
    getters: {
        getUserInformation: state => state.response
    }
};
