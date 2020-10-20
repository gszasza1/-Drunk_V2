import Component, { mixins } from 'vue-class-component';
import { validationMixin } from 'vuelidate';
import { minLength, required } from 'vuelidate/lib/validators';

@Component({
    name: 'AddTicket',
    props: { showDialog: Boolean },
    data: (): { form: { ticketName: string; ticketPrice: number } } => ({
        form: {
            ticketName: '',
            ticketPrice: 0
        }
    }),

    computed: {},
    validations: {
        form: {
            ticketName: {
                required,
                minLength: minLength(2)
            },
            ticketPrice: {
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
        cancel() {
            this.$emit('closeDialog');
        },
        validateUser() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this.$emit('saveDialog', this.$data.form);
            }
        }
    }
})
export default class NewFestival extends mixins(validationMixin) {}
