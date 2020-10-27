import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    name: 'FestivalDetail',
    props: { currentId: String },
    mounted() {
        this.$store.dispatch('setFestivalDetailRequest', this.$props.currentId);
    },
    computed: {
        festivalDetail() {
            return this.$store.getters.getFestivalDetail;
        }
    },
    methods: {
        cancel() {
            this.$emit('closeDialog');
        }
    }
})
export default class FestivalDetail extends Vue {}
