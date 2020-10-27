import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    name: 'DrinkList',
    mounted() {
        this.$store.dispatch('setDrinkListRequest');
    },
    computed: {
        drinkList() {
            return this.$store.getters.getDrinkList;
        }
    }
})
export default class DrinkList extends Vue {}
