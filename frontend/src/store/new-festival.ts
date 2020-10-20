import { Festival } from '@/interfaces/frombackend';
import Axios from 'axios';
import { Module } from 'vuex';

import { State } from '.';

export interface NewFestivalState {
    request: Festival;
    response: {};
    error: string;
    params: { isRequesting: boolean; isError: boolean };
}

export const newFestival: Module<NewFestivalState, State> = {
    state: {
        request: { festivalName: '', place: '', time: undefined, ticket: [] },
        response: {},
        error: '',
        params: { isRequesting: false, isError: false }
    },
    mutations: {
        setNewFestivalRequest(state, payload) {
            state.request = payload;
            state.params.isRequesting = true;

            state.params.isError = false;
        },
        setNewFestivalResponse(state) {
            state.params.isRequesting = false;

            state.params.isError = false;
        },
        setNewFestivalError(state, payload) {
            state.error = payload;
            state.params.isRequesting = false;
            state.params.isError = true;
        }
    },
    actions: {
        async setNewFestivalRequest(state, payload) {
            state.commit('setNewFestivalRequest', payload);

            Axios.post('/auth/festival/create', payload, {})
                .then(() => {
                    state.commit('setNewFestivalResponse');
                })
                .catch(error => {
                    state.commit('setNewFestivalError', error);
                });
        }
    },
    getters: {
        getNewFestival: state => state.request,
        getNewFestivalRequesting: state => state.params.isRequesting,
        getNewFestivalError: state => ({
            error: state.error,
            isError: state.params.isError
        })
    }
};
