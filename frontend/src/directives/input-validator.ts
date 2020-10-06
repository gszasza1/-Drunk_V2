import Vue, { DirectiveOptions } from 'vue';

const validatorError = {
    minLength: 'Túl rövid',
    required: 'Kötelező mező'
};

export const ValidatorDirective: DirectiveOptions = {
    update: function(el, binding) {
        if (binding.value) {
            const validation = Object.keys(binding.value)
                .filter(x => !x.startsWith('$'))
                .filter(x => !!x && !binding.value[x]);

            const element = document.getElementById('error-' + el.id);
            if (element) {
                el.parentNode?.removeChild(element);
            }
            if (validation.length > 0 && validatorError[validation[0]]) {
                const sajt = document.createElement('span');
                sajt.className = 'md-error';
                sajt.id = 'error-' + el.id;
                sajt.textContent = validatorError[validation[0]];
                Vue.nextTick(() => {
                    el.parentNode?.insertBefore(sajt, el.nextSibling);
                });
            }
        }
    }
};
