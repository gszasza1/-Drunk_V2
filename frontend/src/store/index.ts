import Axios from 'axios';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        member: {
            request: { name: '', password: '' },
            response: {},
            error: '',
            params: { isRequesting: false, isError: false }
        }
    },
    mutations: {
        setMemberRequest(state, payload) {
            state.member.request = payload;
            state.member.params.isRequesting = true;

            state.member.params.isError = false;
        },
        setMemberResponse(state) {
            state.member.params.isRequesting = false;

            state.member.params.isError = false;
        },
        setMemberError(state, payload) {
            state.member.error = payload;
            state.member.params.isRequesting = false;
            state.member.params.isError = true;
        }
    },
    actions: {
        async setMemberRequest(state, payload) {
            state.commit('setMemberRequest', payload);

            Axios.post('/registration/member', payload, {})
                .then(() => {
                    state.commit('setMemberResponse');
                })
                .catch(x => {
                    console.log(x);
                    state.commit('setMemberError');
                });
        }
    },
    modules: {},
    getters: {
        getMember: state => state.member.request,
        getMemberRequesting: state => state.member.params.isRequesting,
        getMemberError: state => ({
            error: state.member.error,
            isError: state.member.params.isError
        })
    },
    strict: true,
    devtools: true
});
