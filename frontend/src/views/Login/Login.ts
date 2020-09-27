import Component from 'vue-class-component';
import { mixins } from 'vue-class-component/lib/util';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';

// Vue.component('drunk-login', {
//     mixins: [validationMixin],
//     data: () => ({
//         form: {
//             username: null,
//             password: null
//         }
//     }),
//     validations: {
//         form: {
//             username: {
//                 required
//             },
//             password: {
//                 required
//             }
//         }
//     },
//     methods: {
//         getValidationClass(fieldName) {
//             const field = this.$v.form[fieldName];

//             if (field) {
//                 return {
//                     'md-invalid': field.$invalid && field.$dirty
//                 };
//             }
//         },
//         validateUser() {
//             this.$v.$touch();
//             console.log('validated');
//         }
//     }
// });
@Component({
    name: 'Login',
    data: () => ({
        form: {
            username: null,
            password: null
        }
    }),
    validations: {
        form: {
            username: {
                required
            },
            password: {
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
export default class Login extends mixins(validationMixin) {}