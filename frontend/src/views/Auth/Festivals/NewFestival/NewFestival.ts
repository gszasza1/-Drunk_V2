import { Festival } from '@/interfaces/frombackend';
import moment from 'moment';
import Component, { mixins } from 'vue-class-component';
import { validationMixin } from 'vuelidate';
import { minLength, required } from 'vuelidate/lib/validators';

import AddTicket from './AddTicket/AddTicket.vue';

@Component({
    name: 'NewFestival',
    data: (): { form: Festival; showDialog: boolean } => ({
        form: {
            festivalName: '',
            place: '',
            time: undefined,
            ticket: []
        },
        showDialog: false
    }),
    components: {
        AddTicket: AddTicket
    },
    computed: {},
    validations: {
        form: {
            festivalName: {
                required,
                minLength: minLength(2)
            },
            place: {
                required,
                minLength: minLength(2)
            },
            time: {
                required,
                tooLate: x => !moment(x).isSameOrAfter(new Date())
            },
            ticket: {
                empty: (x: []) => x.length === 0
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
        closeDialog() {
            this.$data.showDialog = false;
        },
        saveDialog(event, value) {
            this.$data.showDialog = false;
            this.$data.form.ticket.push(value);
        },
        validateUser() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                //   this.$store.dispatch('setMemberRequest', this.$data.form);
            }
        }
    }
})
export default class NewFestival extends mixins(validationMixin) {}
