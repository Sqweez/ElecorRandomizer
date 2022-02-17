<template>
    <div v-if="state">
        <transition name="modal">
            <div>
                <div id="prizes-modal" class="modal" ref="prizes-modal">
                    <div class="modal-content animated fadeInDown" id="cityModalContent">
                        <div class="modal-body">
                            <a href="#" class="close-button" @click.prevent="$emit('close')">X</a>
                            <h4>Разыгрываемые призы:</h4>
                            <div class="prize-list">
                                <div v-for="(i, key) of prizes" :key="key">
                                    <span class="number">{{ key + 1 }}.</span>
                                    <input
                                        type="text"
                                        aria-label="приз"
                                        placeholder="Введите название приза"
                                        v-model="prizes[key].name">
                                    <a href="#" @click.prevent="deletePrize(key)">X</a>
                                </div>
                            </div>
                            <button @click="addOtherPrize">
                                Добавить еще
                            </button>
                            <button @click="savePrizes">
                                Сохранить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        data: () => ({
            prizes: [
                {
                    name: '',
                    winner: {},
                },
            ],
        }),
        props: {
            state: {
                type: Boolean,
                default: false,
            },
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
        watch: {
            state() {
                if (this.state) {
                    this.prizes = JSON.parse(JSON.stringify(this.$store.getters.PRIZES))
                    console.log(this.$store.getters.PRIZES);
                }
            }
        },
        mounted() {
            window.addEventListener('click', (event) => {
                const modal = document.getElementById('prizes-modal');
                if (event.target === modal && this.state) {
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
        background-color: #fff;
        width: 700px;
        padding: 5% 0;
        margin: 0 auto;
        position: relative;
    }

    .heading {
        margin-top: 15px;
        margin-left: 30px;
        background: #363636;
        width: 98%;
    }

    h4 {
        font-size: 2em;
        padding: 7px 15px;
    }

    .city-list {
        padding: 15px;
        margin-top: 25px;
        margin-left: 30px;
    }

    ul {
        list-style: none;
    }

    u li {
        font-family: EuroStileRegObl, sans-serif;
        text-transform: uppercase;
        font-size: 20px;
        margin-bottom: 10px;
    }

    a {
        color: #000000;
        position: relative;
        text-decoration: none;
    }


    @keyframes slideUp {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    .close-button {
        position: absolute;
        right: -12px;
        top: -10px;
        background-color: #e3bf8a;
        color: #fff;
        text-align: center;
        padding: 6px 20px;
        font-size: 20px;
        font-family: Montserrat, sans-serif;
    }

    .close-button:hover {
        background-color: #80653c;
    }

    .prize-list {
        margin: 15px;
    }

    .prize-list input {
        display: block;
        width: 60%;
        padding: 10px 15px;
        border: none;
        color: #ffffff;
        background-color: #363636;
        outline: none;
        font-size: 20px;
        margin-left: 30px;
    }

    .prize-list > div {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin-bottom: 10px;
        position: relative;
    }

    .prize-list a {
        margin-left: 10px;
        background: red;
        color: white;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 100%;
        font-size: 20px;
        font-weight: 700;
    }

    .prize-list span {
        font-size: 20px;
        position: absolute;
        top: 10px;
        left: 0;
    }

    .prize-list input::placeholder {
        color: #ffffff;
    }

    button {
        display: block;
        width: 50%;
        border: none;
        background-color: #e3bf8a;
        color: #4e4e4e;
        padding: 12px;
        margin: 20px auto;
        text-transform: initial !important;
        font-size: 26px;
        border-radius: 30px;
        outline: none;
        transition: .2s all ease;
        cursor: pointer;
        z-index: 99;
    }

    button:hover {
        background-color: #80653c;
        color: #ffffff;
    }

</style>
