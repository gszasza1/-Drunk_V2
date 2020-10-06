import Axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Module } from 'vuex';

import { State } from '.';

export interface LoginState {
    request: { username: string; password: string };
    response: {};
    error: string;
    params: { isRequesting: boolean; isError: boolean };
}

export const login: Module<LoginState, State> = {
    state: {
        request: { username: '', password: '' },
        response: {},
        error: '',
        params: { isRequesting: false, isError: false }
    },
    mutations: {
        setLoginRequest(state, payload) {
            state.request = payload;
            state.params.isRequesting = true;

            state.params.isError = false;
        },
        setLoginResponse(state, payload) {
            state.params.isRequesting = false;
            state.response = {
                ...payload,
                decodedToken: jwtDecode(payload.accessToken)
            };
            state.params.isError = false;
            Axios.defaults.headers = {
                ...Axios.defaults.headers,
                Authentication: payload.accessToken
            };
        },
        setLoginError(state, payload) {
            state.error = payload;
            state.params.isRequesting = false;
            state.params.isError = true;
        }
    },
    actions: {
        async setLoginRequest(state, payload) {
            state.commit('setLoginRequest', payload);

            return Axios.post('/login', payload, {})
                .then(response => {
                    state.commit('setLoginResponse', response.data);
                })
                .catch(error => {
                    state.commit('setLoginError', error);
                });
        }
    },
    getters: {
        getLogin: state => state.request,
        getLoginRequesting: state => state.params.isRequesting,
        getLoginError: state => ({
            error: state.error,
            isError: state.params.isError
        })
    }
};
