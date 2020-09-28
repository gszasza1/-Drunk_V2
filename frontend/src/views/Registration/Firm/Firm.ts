import Component from 'vue-class-component';
import { mixins } from 'vue-class-component/lib/util';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

@Component({
    name: 'Firm',
    data: () => ({
        form: {
            username: null,
            password: null,
            firmName: null
        }
    }),
    validations: {
        form: {
            username: {
                required
            },
            password: {
                required
            },
            firmName: {
                required
            }
        }
    },
    methods: {
        getValidationClass(fieldName) {
            const field = this.$v.form[fieldName];

            if (field) {
                return {
                    'md-invalid': field.$invalid && field.$dirty
                };
            }
        },
        validateUser() {
            this.$v.$touch();
            console.log('validated');
        }
    }
})
export default class Firm extends mixins(validationMixin) {}
