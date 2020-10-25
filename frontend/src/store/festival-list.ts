import Axios from 'axios';
import { Module } from 'vuex';

import { State } from '.';

export interface FestivalListItem {
    id: string;
    place: string;
    time: Date;
    name: string;
}

export interface FestivalListState {
    request: {};
    response: FestivalListItem[];
    error: string;
    params: { isRequesting: boolean; isError: boolean };
}

export const festivalList: Module<FestivalListState, State> = {
    state: {
        request: {},
        response: [],
        error: '',
        params: { isRequesting: false, isError: false }
    },
    mutations: {
        setFestivalListRequest(state, payload) {
            state.request = payload;
            state.params.isRequesting = true;

            state.params.isError = false;
        },
        setFestivalListResponse(state) {
            state.params.isRequesting = false;

            state.params.isError = false;
        },
        setFestivalListError(state, payload) {
            state.error = payload;
            state.params.isRequesting = false;
            state.params.isError = true;
        }
    },
    actions: {
        async setFestivalListRequest(state, payload) {
            state.commit('setFestivalListRequest', payload);

            Axios.get('/auth/festival')
                .then(() => {
                    state.commit('setFestivalListResponse');
                })
                .catch(error => {
                    state.commit('setFestivalListError', error);
                });
        }
    },
    getters: {
        getFestivalList: state => state.response,
        getFestivalListRequesting: state => state.params.isRequesting,
        getFestivalListError: state => ({
            error: state.error,
            isError: state.params.isError
        })
    }
};
