import { allSocketId } from '@/interfaces/socket';
import { State } from '@/store';
import io from 'socket.io-client';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    name: 'Auth',
    data(): { socket?: SocketIOClient.Socket } {
        return {
            socket: undefined
        };
    },

    mounted() {
        this.$store.subscribeAction({
            after: (action, state: State) => {
                if (action.type === 'setIsLoggedInResponse') {
                    this.$data.socket = io(
                        'localhost:3000'
                    ) as SocketIOClient.Socket;

                    this.$data.socket.open();

                    this.$data.socket.on(allSocketId.connect, () => {
                        this.$data.socket.emit(allSocketId.DEFINE_ID, {
                            accessToken: state.login.response.accessToken
                        });
                    });

                    this.$data.socket.on(allSocketId.ALCOHOL_BOUGHT, x => {
                        alert(JSON.stringify(x));
                    });
                }

                if (action.type === 'closeSidebar') {
                    this.$data.sidebarOpen = false;
                }
            }
        });
        if (
            localStorage.getItem('accessToken') &&
            localStorage.getItem('refreshToken')
        ) {
            this.$store.dispatch('stillLoggedIn');
        }
    },
    beforeDestroy() {
        if (this.$data.socket) {
            this.$data.socket.emit(allSocketId.DELETE_ID);
            this.$data.socket.close();
        }
    },
    methods: {
        sendMessage(e) {
            e.preventDefault();
        }
    }
})
export default class Auth extends Vue {}
