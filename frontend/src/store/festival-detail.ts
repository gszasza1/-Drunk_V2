import Axios from 'axios';
import { Module } from 'vuex';

import { State } from '.';

export interface FestivalDetailItem {
    id: string;
    place: string;
    time: Date;
    name: string;
}

export interface FestivalDetailState {
    request: {};
    response: FestivalDetailItem[];
    error: string;
    params: { isRequesting: boolean; isError: boolean };
}
export const festivalDetailInitialState: FestivalDetailState = {
    request: {},
    response: [],
    error: '',
    params: { isRequesting: false, isError: false }
};
export const festivalDetail: Module<FestivalDetailState, State> = {
    state: festivalDetailInitialState,
    mutations: {
        setFestivalDetailRequest(state, payload) {
            state.request = payload;
            state.params.isRequesting = true;
            state.params.isError = false;
        },
        setFestivalDetailResponse(state, payload) {
            state.params.isRequesting = false;
            state.response = payload ?? [];
            state.params.isError = false;
        },
        setFestivalDetailError(state, payload) {
            state.error = payload;
            state.params.isRequesting = false;
            state.params.isError = true;
        }
    },
    actions: {
        async setFestivalDetailRequest(state, payload) {
            state.commit('setFestivalDetailRequest', payload);

            Axios.get('/auth/festival/' + payload)
                .then(response => {
                    state.commit('setFestivalDetailResponse', response.data);
                })
                .catch(error => {
                    state.commit('setFestivalDetailError', error);
                });
        }
    },
    getters: {
        getFestivalDetail: state => state.response,
        getFestivalDetailRequesting: state => state.params.isRequesting,
        getFestivalDetailError: state => ({
            error: state.error,
            isError: state.params.isError
        })
    }
};
