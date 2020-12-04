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
                path: 'profile',
                alias: '',
                name: 'Fiók',
                component: () => import('../views/Auth/Profil/Profil.vue')
            },
            {
                path: 'festivals',
                name: 'Fesztiválok',
                component: () =>
                    import('../views/Auth/Festivals/Festivals.vue'),
                children: [
                    {
                        path: 'create',
                        name: 'Új fesztivál',
                        meta: { permission: 'Firm' },
                        component: () =>
                            import(
                                '../views/Auth/Festivals/NewFestival/NewFestival.vue'
                            )
                    },
                    {
                        path: 'list',
                        name: 'Fesztivál lista',
                        component: () =>
                            import(
                                '../views/Auth/Festivals/FestivalList/FestivalList.vue'
                            )
                    }
                ]
            },
            {
                path: 'drinks',
                name: 'Italok',
                component: () => import('../views/Auth/Drinks/Drinks.vue'),
                children: [
                    {
                        path: 'create',
                        name: 'Új ital',
                        meta: { permission: 'Firm' },
                        component: () =>
                            import('../views/Auth/Drinks/NewDrink/NewDrink.vue')
                    },
                    {
                        path: 'list',
                        name: 'Ital lista',
                        component: () =>
                            import(
                                '../views/Auth/Drinks/DrinkList/DrinkList.vue'
                            )
                    },
                    {
                        path: 'current',
                        name: 'Mostani italok',
                        component: () =>
                            import(
                                '../views/Auth/Drinks/CurrentDrinks/CurrentDrinks.vue'
                            )
                    }
                ]
            }
        ]
    }
];
