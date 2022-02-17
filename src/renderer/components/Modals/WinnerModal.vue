<template>
        <transition name="modal-fade">
            <div>
                <div id="prizes-modal" class="modal" ref="prizes-modal">
                    <div class="modal-content animated fadeInDown" id="cityModalContent">
                        <div class="modal-body">
                            <h4><span class="gold">Победитель - </span>{{ currentWinner.client_name }}</h4>
                            <h5>{{ currentWinner.personal_account }}</h5>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
</template>

<script>
    export default {
        data: () => ({

        }),
        props: {
            state: {
                type: Boolean,
                default: false,
            },
            currentWinner: {
                type: Object,
                default: () => ({
                    client_name: 'Ошибка',
                    personal_account: 'Перезапустите!'
                })
            }
        },
        computed: {
        },
        methods: {
            addOtherPrize() {
                this.prizes.push({
                    name: '',
                    winner: {}
                })
            },
            async savePrizes() {
                await this.$store.dispatch('SET_PRIZES', this.prizes);
                this.$emit('close');
            },
            deletePrize(key) {
                this.prizes.splice(key, 1);
            }
        },
        mounted() {
            window.addEventListener('click', (event) => {
                const modal = document.getElementById('prizes-modal');
                console.log('close');
                if (event.target == modal && this.state) {
                    console.log('close');
                    this.$emit('close')
                }
            });
        }
    }
</script>


<style scoped>
    .modal {
        position: fixed;
        z-index: 999;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(0, 0, 0, 0.56);
        justify-content: center;
        align-items: center;
        display: flex;
    }


    .modal-content {
        margin: 0 auto;
        position: relative;
    }


    .modal-body {
        border-radius: 20px;
        padding: 50px 40px;
        background: #4b4b4b;
        width: 700px;
        margin: 0 auto;
        position: relative;
    }

    

    @keyframes slideUp {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }
    h4, h5 {
        color: #fff;
        text-transform: uppercase;
        text-align: center;
        cursor: default;
    }

    h4 {
        font-size: 1.6em;
        margin-bottom: 15px;
    }

    h5 {
        font-weight: 700;
        font-size: 2em;
    }
    
    span {
        color: #e4cca7;
    }

    .modal-fade-enter,
    .modal-fade-leave-active {
        opacity: 0;
    }

    .modal-fade-enter-active{
        transition: opacity .5s ease-in;
    }

</style>
