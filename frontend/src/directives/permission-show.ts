import { UserType } from '@/interfaces/frombackend';
import store from '@/store';
import { DirectiveOptions } from 'vue';

export const PermissionShowDirective: DirectiveOptions = {
    update: function(el, binding) {
        if (binding.value !== undefined || binding.value !== null) {
            if (
                isNaN(+binding.value) === false &&
                store.getters.userType !== undefined &&
                store.getters.userType !== +binding.value
            ) {
                el.remove();
            } else if (
                typeof binding.value === 'string' &&
                store.getters.userType !== undefined &&
                store.getters.userType !== UserType[binding.value + '']
            ) {
                el.remove();
            }
        } else {
            el.remove();
        }
    }
};
