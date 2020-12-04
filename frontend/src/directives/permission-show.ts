import { UserType } from '@/interfaces/frombackend';
import store from '@/store';
import Vue, { DirectiveOptions } from 'vue';
import { DirectiveBinding } from 'vue/types/options';

const removeDirective = function(el: HTMLElement, binding: DirectiveBinding) {
    if (binding.value !== undefined || binding.value !== null) {
        if (
            isNaN(+binding.value) === false &&
            store.getters.userType !== undefined &&
            store.getters.userType !== +binding.value
        ) {
            Vue.nextTick(() => {
                el.remove();
            });
        } else if (
            typeof binding.value === 'string' &&
            store.getters.userType !== undefined &&
            store.getters.userType !== UserType[binding.value + '']
        ) {
            Vue.nextTick(() => {
                el.remove();
            });
        }
    } else {
        Vue.nextTick(() => {
            el.remove();
        });
    }
};
export const PermissionShowDirective: DirectiveOptions = {
    update: removeDirective,
    inserted: removeDirective,
    componentUpdated: removeDirective,
    bind: (el, binding) => {
        store.subscribeAction({
            after: action => {
                if (action.type === 'setIsLoggedInResponse') {
                    removeDirective(el, binding);
                }
            }
        });
    }
};
