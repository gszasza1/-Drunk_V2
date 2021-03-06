import Vue from 'vue';
import Component from 'vue-class-component';

import FestivalDetail from './FestivalDetails/FestivalDetail.vue';

@Component({
    name: 'FestivalList',
    data: (): { showDialog: boolean; currentId: string } => ({
        currentId: '',
        showDialog: false
    }),
    mounted() {
        this.$store.dispatch('setFestivalListRequest');
    },
    components: {
        FestivalDetail: FestivalDetail
    },
    methods: {
        closeDialog() {
            this.$data.showDialog = false;
        },
        openDialog(id: string) {
            this.$data.currentId = id;
            this.$data.showDialog = true;
        },
        participate(id: string) {
            this.$store.dispatch('participateInFestival', id);
        },
        notParcipate(id: string) {
            this.$store.dispatch('notParticipateInFestival', id);
        }
    },
    computed: {
        festivalList() {
            return this.$store.getters.getFestivalList;
        }
    }
})
export default class FestivalList extends Vue {}
