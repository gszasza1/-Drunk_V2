import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    name: 'CurrentDrinks',
    mounted() {
        this.$store.dispatch('getCurrentDrink');
    },
    methods: {
        give(drinkId: string) {
            return this.$store.dispatch('giveDrink', drinkId);
        }
    },
    computed: {
        currentDrinks() {
            return this.$store.getters.getCurrentDrinks;
        }
    }
})
export default class CurrentDrinks extends Vue {}
