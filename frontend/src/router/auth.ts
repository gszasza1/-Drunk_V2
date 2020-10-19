import { RouteConfig } from 'vue-router';

export const authRoutesRoutes: Array<RouteConfig> = [
    {
        path: '/auth',
        name: 'Authorizált',
        component: () => import('../views/Auth/Auth.vue'),
        beforeEnter: (to, from, next) => {
            if (localStorage.getItem('accessToken')) {
                next();
            } else {
                next({ path: '' });
            }
        },
        children: [
            {
                path: 'member',
                name: 'Személyi regisztráció',
                component: () =>
                    import('../views/Registration/Member/Member.vue')
            },
            {
                path: 'firm',
                name: 'Céges regisztráció',
                component: () => import('../views/Registration/Firm/Firm.vue')
            }
        ]
    }
];
