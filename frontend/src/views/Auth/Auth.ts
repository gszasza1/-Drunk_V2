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
                console.log(action.type);
                if (action.type === 'setIsLoggedInResponse') {
                    this.$data.socket = io(
                        'localhost:3000'
                    ) as SocketIOClient.Socket;
                    this.$data.socket.open();
                    this.$data.socket.on('connect', () => {
                        this.$data.socket.emit('DEFINE_ID', {
                            accessToken: state.login.response.accessToken
                        });
                    });
                    this.$data.socket.on('ALCOHOL_BOUGHT', x => {
                        console.log('emited', x);
                    });
                }
                if (action.type === 'socket/buyDrink') {
                    (this.$data.socket as SocketIOClient.Socket).emit(
                        'BUY_DRINK',
                        {
                            drinkId: action.payload
                        }
                    );
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

    methods: {
        sendMessage(e) {
            e.preventDefault();
        }
    }
})
export default class Auth extends Vue {}
