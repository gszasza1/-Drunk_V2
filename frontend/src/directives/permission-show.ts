import { UserType } from '@/interfaces/frombackend';
import store from '@/store';
import Vue, { DirectiveOptions } from 'vue';

export const PermissionShowDirective: DirectiveOptions = {
    update: function(el, binding) {
        if (binding.value !== undefined || binding.value !== null) {
            if (
                (+binding.value &&
                    store.state.login.response.decodedToken?.type ===
                        +binding.value) === false
            ) {
                el.remove();
            } else if (
                isNaN(+binding.value) &&
                store.state.login.response.decodedToken?.type !==
                    UserType[UserType[binding.value]]
            ) {
                el.remove();
            }
        } else {
            el.remove();
        }
    }
};
