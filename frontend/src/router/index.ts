import { UserType } from '@/interfaces/frombackend';
import store from '@/store';
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import Home from '../views/Home.vue';
import { authRoutesRoutes } from './auth';
import { registrationRoutes } from './registration';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: () => import('../views/About.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login/Login.vue')
    },
    ...registrationRoutes,
    ...authRoutesRoutes
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});
router.afterEach(to => {
    document.title = to.name ?? 'Drunk';
    store.dispatch('closeSidebar');
});

router.beforeEach((to, from, next) => {
    console.log(to.meta.permission);
    if (to.meta.permission !== undefined) {
        console.log('123123');
        if (
            store.state.login.params.isRequesting ||
            store.state.login.params.isRefreshing
        ) {
            console.log('33');
            store.subscribeAction({
                after: action => {
                    if (
                        action.type === 'setLoginResponse' ||
                        action.type === 'setToken'
                    ) {
                        if (
                            (+to.meta.permission &&
                                store.state.login.response.decodedToken
                                    ?.type === +to.meta.permission) === false
                        ) {
                            console.log(1);
                            next(false);
                        } else if (
                            typeof +to.meta.permission === 'undefined' &&
                            typeof to.meta.permission === 'string' &&
                            store.state.login.response.decodedToken?.type !==
                                UserType[to.meta.permission + '']
                        ) {
                            console.log(2);
                            next(false);
                        } else {
                            next();
                        }
                    }
                }
            });
        } else {
            if (
                (+to.meta.permission &&
                    store.state.login.response.decodedToken?.type ===
                        +to.meta.permission) === false
            ) {
                console.log(3);
                next(false);
            } else if (
                typeof +to.meta.permission === 'undefined' &&
                typeof to.meta.permission === 'string' &&
                store.state.login.response.decodedToken?.type !==
                    UserType[to.meta.permission + '']
            ) {
                console.log(4);
                next(false);
            } else {
                next();
            }
        }
    } else {
        next();
    }
});

router.afterEach(to => {
    document.title = to.name ?? 'Drunk';
    store.dispatch('closeSidebar');
});

export default router;
