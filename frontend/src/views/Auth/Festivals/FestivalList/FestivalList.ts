import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    name: 'FestivalList',
    mounted() {
        this.$store.dispatch('setFestivalListRequest');
    },
    computed: {
        festivalList() {
            return this.$store.getters.getFestivalList;
        }
    }
})
export default class FestivalList extends Vue {}
