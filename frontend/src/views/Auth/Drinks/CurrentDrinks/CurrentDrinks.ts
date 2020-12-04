import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    name: 'CurrentDrinks',
    mounted() {
        this.$store.dispatch('setCurrentDrinksRequest');
    },
    methods: {
        buy(drinkId: string) {
            return this.$store.dispatch('buyDrink', drinkId);
        }
    },
    computed: {
        currentDrinks() {
            return this.$store.getters.getCurrentDrinks;
        }
    }
})
export default class CurrentDrinks extends Vue {}
