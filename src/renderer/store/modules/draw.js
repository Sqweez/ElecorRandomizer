const drawModule = {
    state: {
        prizes: [
        ],
        clients: [],
    },
    getters: {
        PRIZES: state => state.prizes,
        CLIENTS: state => state.clients,
        READY_FOR_DRAW: state => state.clients.length && state.prizes.length
    },
    mutations: {
        SET_PRIZES(state, payload) {
            state.prizes = payload;
        },
        SET_CLIENTS(state, payload) {
            state.clients = payload;
        },
        SET_WINNER(state, payload) {
            const {index, winner} = payload;
            state.prizes[index].winner = winner;
        },
        CLEAR_DRAW(state) {
            state.prizes = state.prizes.map(p => {
                p.winner = {};
                return p;
            })
        }
    },
    actions: {
        async SET_PRIZES({commit}, payload) {
            commit('SET_PRIZES', payload)
        },
        async SET_CLIENTS({commit}, payload) {
            commit('SET_CLIENTS', payload)
        },
        async SET_WINNER({commit}, payload) {
            commit('SET_WINNER', payload);
        },
        async CLEAR_DRAW({commit}) {
            commit('CLEAR_DRAW');
        }
    }
}

export default drawModule;