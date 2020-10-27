import { DrinkBody } from '@/interfaces/frombackend';
import Component, { mixins } from 'vue-class-component';
import { validationMixin } from 'vuelidate';
import { integer, required } from 'vuelidate/lib/validators';

@Component({
    name: 'NewDrink',
    data: (): { form: DrinkBody } => ({
        form: {
            drinkName: '',
            price: 0
        }
    }),
    computed: {},
    validations: {
        form: {
            drinkName: {
                required
            },
            price: {
                required,
                integer
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
        validateDrink() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this.$store.dispatch('setNewDrinkRequest', this.$data.form);
            }
        }
    }
})
export default class NewDrink extends mixins(validationMixin) {}
