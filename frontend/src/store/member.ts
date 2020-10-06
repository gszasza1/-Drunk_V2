import Axios from 'axios';
import { Module } from 'vuex';

import { State } from '.';

export interface MemberState {
    request: { name: string; password: string };
    response: {};
    error: string;
    params: { isRequesting: boolean; isError: boolean };
}

export const member: Module<MemberState, State> = {
    state: {
        request: { name: '', password: '' },
        response: {},
        error: '',
        params: { isRequesting: false, isError: false }
    },
    mutations: {
        setMemberRequest(state, payload) {
            state.request = payload;
            state.params.isRequesting = true;

            state.params.isError = false;
        },
        setMemberResponse(state) {
            state.params.isRequesting = false;

            state.params.isError = false;
        },
        setMemberError(state, payload) {
            state.error = payload;
            state.params.isRequesting = false;
            state.params.isError = true;
        }
    },
    actions: {
        async setMemberRequest(state, payload) {
            state.commit('setMemberRequest', payload);

            Axios.post('/registration/member', payload, {})
                .then(() => {
                    state.commit('setMemberResponse');
                })
                .catch(error => {
                    state.commit('setMemberError', error);
                });
        }
    },
    getters: {
        getMember: state => state.request,
        getMemberRequesting: state => state.params.isRequesting,
        getMemberError: state => ({
            error: state.error,
            isError: state.params.isError
        })
    }
};
