import { RouteConfig } from 'vue-router';

export const registrationRoutes: Array<RouteConfig> = [
    {
        path: '/registration',
        name: 'Regisztráció',
        component: () => import('../views/Registration/Registration.vue'),
        children: [
            {
                path: '',
                redirect: 'member'
            },
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
