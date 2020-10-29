import { UserType } from '@/interfaces/frombackend';
import Axios from 'axios';
import jwtDecode from 'jwt-decode';
import { Module } from 'vuex';

import { State } from '.';
import router from '../router';

export interface LoginState {
    response: {
        accessToken?: string;
        refreshToken?: string;
        decodedToken?: {
            exp: number;
            iat: number;
            type: UserType;
            username: string;
        };
    };
    error: string;
    params: { isRequesting: boolean; isError: boolean; isRefreshing: boolean };
    refreshingCall?: Promise<boolean>;
}

export const login: Module<LoginState, State> = {
    state: {
        response: {},
        error: '',
        params: { isRequesting: false, isError: false, isRefreshing: false }
    },
    mutations: {
        setLoginRequest(state) {
            state.params.isRequesting = true;
            state.params.isError = false;
        },
        setLoginResponse(
            state,
            payload: { accessToken: string; refreshToken: string }
        ) {
            state.params.isRequesting = false;
            state.response = {
                ...payload,
                decodedToken: jwtDecode(payload.accessToken)
            };
            state.params.isError = false;

            localStorage.setItem('accessToken', payload.accessToken);
            localStorage.setItem('refreshToken', payload.refreshToken);
            router.push('/auth');
        },
        setLoginError(state, payload: any) {
            state.error = payload;
            state.params.isRequesting = false;
            state.params.isError = true;
        },
        setIsLoggedInRequest(state) {
            state.params.isRequesting = true;
            state.params.isError = false;
        },
        setIsLoggedInResponse(state) {
            state.response = {
                accessToken: localStorage.getItem('accessToken') ?? undefined,
                refreshToken: localStorage.getItem('refreshToken') ?? undefined,
                decodedToken: localStorage.getItem('accessToken')
                    ? jwtDecode(localStorage.getItem('accessToken') as string)
                    : undefined
            };
            state.params.isRequesting = false;
            state.params.isError = false;
        },
        setIsLoggedInError(state) {
            state.params.isRequesting = false;
            state.params.isError = true;
            router.push('/');
        },
        setRefreshState(state, payload) {
            state.params.isRefreshing = payload;
        },
        setRefreshCall(state, payload) {
            state.refreshingCall = payload;
        },
        setToken(state, payload) {
            state.response = {
                ...payload,
                decodedToken: jwtDecode(payload.accessToken)
            };
            state.params.isError = false;
            Axios.defaults.headers = {
                ...Axios.defaults.headers,
                authorization: payload.accessToken
            };
            localStorage.setItem('accessToken', payload.accessToken);
            localStorage.setItem('refreshToken', payload.refreshToken);
        }
    },
    actions: {
        async setIsLoggedInResponse(state, payload) {
            console.log('');
        },
        async setLoginRequest(state, payload) {
            state.commit('setLoginRequest');
            return Axios.post('/login', payload, {})
                .then(response => {
                    state.commit('setLoginResponse', response.data);
                })
                .catch(error => {
                    state.commit('setLoginError', error);
                });
        },
        async stillLoggedIn(state, payload) {
            state.commit('setIsLoggedInRequest');
            try {
                const data = await Axios.post('/auth', payload, {});
                state.commit('setIsLoggedInResponse', data);
                state.dispatch('setIsLoggedInResponse');
            } catch (error) {
                state.commit('setIsLoggedInError', error);
            }
        }
    },
    getters: {
        getLoginRequesting: state => state.params.isRequesting,
        getLoginError: state => ({
            error: state.error,
            isError: state.params.isError
        }),
        isLoggedin: state => !!state.response.decodedToken,
        userType: state => state.response.decodedToken?.type
    }
};
