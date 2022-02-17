<template>
    <main>
        <div class="button-group">
            <button @click="createPrizes">Создать призы</button>
            <button @click="openFileInput">Загрузить файл с клиентами</button>
            <button @click="drawNavigate" v-if="READY_FOR_DRAW">Приступить к розыгрышу</button>
            <input type="file" ref="fileInput" style="display:none;" @change="uploadFile">
        </div>
        <PrizesModal
                :state="showPrizeModal"
                v-on:close="closeModal"
        />
    </main>
</template>

<script>
    import PrizesModal from "./Modals/PrizesModal";
    import excelToJson from 'convert-excel-to-json';
    export default {
        components: {PrizesModal},
        data: () => ({
            showPrizeModal: false,
        }),
        methods: {
            createPrizes() {
                this.showPrizeModal = true;
            },
            drawNavigate() {
                this.$router.push('/draw')
            },
            closeModal() {
                this.showPrizeModal = false;
            },
            openFileInput() {
                this.$refs.fileInput.click();
            },
            shuffle(a) {
                for (let i = a.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [a[i], a[j]] = [a[j], a[i]];
                }
                return a;
            },
            uploadFile(e) {
                const file = e.target.files[0];
                console.log(file);
                if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                    alert('Загрузите корректный Excel-файл!');
                    return;
                }
                const result = excelToJson({
                    sourceFile: file.path,
                    sheets: [{
                        name: 'Лист1',
                        header: {
                            rows: 2
                        }
                    }]
                });

                const data = result['Лист1'];
                const duplicates = [];
                let clients = data.map(d => {
                    try {
                         const personal_accounts = d.B.split('\n');
                    if (personal_accounts.length > 1) {
                        for (let i = 1; i < personal_accounts.length; i++) {
                            duplicates.push({
                                client_name: d.A,
                                personal_account: personal_accounts[i]
                            })
                        }
                    }
                    return {
                        'client_name': d.A,
                        'personal_account': personal_accounts[0]
                    }
                    }
                    catch (e) {
                        console.log(d);
                    }
                });
                
                clients = [...clients, ...duplicates];
                clients = this.shuffle(clients);
                console.log(clients);

                this.$store.dispatch('SET_CLIENTS', clients);
                
            }
        },
        computed: {
            clients() {
                return this.$store.getters.CLIENTS;
            },
            prizes() {
                return this.$store.getters.PRIZES;
            },
            READY_FOR_DRAW() {
                return this.$store.getters.READY_FOR_DRAW;
            }
        },
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap');


    .button-group {
        width: 32vw;
        margin: 60px auto 0 auto;
    }

    button {
        display: block;
        width: 100%;
        border: none;
        background-color: #e3bf8a;
        color: #4e4e4e;
        padding: 12px;
        margin: 15px 0;
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