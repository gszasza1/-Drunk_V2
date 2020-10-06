import Component from 'vue-class-component';
import { mixins } from 'vue-class-component/lib/util';
import { validationMixin } from 'vuelidate';
import { minLength, required } from 'vuelidate/lib/validators';

@Component({
    name: 'Member',
    data: () => ({
        form: {
            username: null,
            password: null,
            fullName: null
        }
    }),
    computed: {
        getMemberRequesting() {
            return this.$store.getters.getMemberRequesting;
        }
    },
    validations: {
        form: {
            username: {
                required,
                minLength: minLength(6)
            },
            password: {
                required,
                minLength: minLength(6)
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
            if (!this.$v.$invalid) {
                this.$store.dispatch('setMemberRequest', this.$data.form);
            }
        }
    }
})
export default class Member extends mixins(validationMixin) {}
