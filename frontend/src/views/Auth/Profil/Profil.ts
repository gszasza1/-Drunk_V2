import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    mounted() {
        this.$store.dispatch('getUserInformation');
    },
    computed: {
        userInformation(): {
            username: string;
            type: number;
            createdAt: Date | null;
            fullName: string;
        } {
            return this.$store.getters.getUserInformation;
        }
    }
})
export default class Home extends Vue {}
