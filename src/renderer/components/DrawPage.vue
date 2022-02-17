<template>
  <main>
    <div class="d-flex" v-show="!winnerModal">
      <div class="table" id="table">
        <div
            class="cell"
            v-for="(i, key) of clients"
            :class="(randomIndex === key || winnersIndexes.find(s => s === key)) ? 'cell--active' : ''"
            :key="key">
          <p>{{ i.personal_account }}</p>
        </div>
      </div>
      <div class="leaderboard">
        <table class="leaderboard-table">
          <thead>
          <tr>
            <th>Приз</th>
            <th>Победитель</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(prize, key) of prizes" :key="key">
            <td>{{ prize.name }}</td>
            <td>{{ prize.winner.client_name }}</td>
          </tr>
          </tbody>
        </table>
        <div class="button-group">
          <button @click="getRandom">старт</button>
          <button @click="stopDraw">стоп</button>
          <button @click="clearDraw">очистить</button>
          <button @click="$router.push('/')">главное меню</button>
        </div>
      </div>
    </div>
    <WinnerModal
        v-show="winnerModal"
        :state="winnerModal"
        :currentWinner="currentWinner"
        @close="closeModal"
    />
  </main>
</template>

<script>
import {Random} from "random-js";
import WinnerModal from "./Modals/WinnerModal";

export default {
  components: {WinnerModal},
  data: () => ({
    randomIndex: null,
    interval: null,
    winnerModal: false,
    winnersIndexes: [],
    currentWinner: {},
    currentPrize: 0,
  }),
  mounted() {
    this.currentPrize = this.prizes.length - 1;
  },
  methods: {
    getRandom() {
      if (this.currentPrize < 0) {
        alert('Розыгрыш закончен!');
        return;
      }
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        const random = new Random();
        this.randomIndex = random.integer(0, this.clients.length - 1);
      }, 150)
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    clearInterval() {
      clearInterval(this.interval);
    },
    async clearDraw() {
      this.randomIndex = null;
      this.interval = null;
      this.winnersIndexes = [];
      this.currentWinner = {};
      this.currentPrize = this.prizes.length - 1;
      await this.$store.dispatch('CLEAR_DRAW');
    },
    stopDraw() {
      if (this.currentPrize < 0) {
        alert('Розыгрыш закончен!');
        return;
      }
      this.clearInterval();
      const find = this.winnersIndexes.find(f => f === this.randomIndex);
      if (find) {
        alert('Данный клиент уже выиграл другой приз, розыгрыш будет запущен заново!');
        this.getRandom();
        return;
      }
      this.winnersIndexes.push(this.randomIndex);
      this.currentWinner = this.clients[this.randomIndex];
      this.$store.dispatch('SET_WINNER', {
        index: this.currentPrize,
        winner: this.currentWinner
      })
      this.winnerModal = true;
      this.currentPrize--;
    },
    closeModal() {
      this.winnerModal = false;
      this.currentWinner = {};
    }
  },
  computed: {
    prizes() {
      return this.$store.getters.PRIZES;
    },
    clients() {
      return this.$store.getters.CLIENTS;
    },
    screenWidth() {
      return window.screen.width;
    }
  }
}
</script>

<style scoped>
.table {
  display: flex;
  width: 70%;
  margin-top: 50px;
  height: fit-content;
  flex-wrap: wrap;
  flex-shrink: 0;
}

/*@media (max-width: 1600px) {
    .table {
        grid-template-columns: repeat(17, 1fr);
    }
}

@media (max-width: 1440px) {
    .table {
        grid-template-columns: repeat(15, 1fr);

    }
}


@media (max-width: 1366px) {
    .table {
        grid-template-columns: repeat(13, 1fr);

    }
}*/


.cell {
  width: 60px;
  height: 30px;
  background-color: #505050;
  opacity: 1;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  cursor: pointer;
  text-transform: uppercase;
  margin: 3px;
}

.cell p {
  display: block;
  font-size: 14px;
  font-weight: 700;
}

.cell:hover p {
  display: block;
}

.cell:hover {
  background-color: #333333;
}

.cell--active {
  background-color: #4CAF50;
}

.d-flex {
  display: flex;
  padding: 30px;
  height: auto;
}

.leaderboard {
  margin-left: 50px;
  margin-top: 30px;
}

.leaderboard-table thead {
  font-size: 18px;
  color: #e3bf8a;
}

.leaderboard-table td, .leaderboard-table th {
  text-align: left;
}

.leaderboard-table td:first-child, .leaderboard-table th:first-child {
  width: 160px;
}

.leaderboard-table td:nth-child(2), .leaderboard-table th:nth-child(2) {
  width: 250px;
}

.leaderboard-table tr td {
  color: #ffffff;
  padding: 10px;
}

.leaderboard-table tr > td:first-child {
  background-color: #434343;
  border-left-color: #e3bf8a;
  border-left-width: 6px;
  border-left-style: solid;
}

.leaderboard-table tr > td:nth-child(2) {
  background-color: #505050;
}

.button-group {
  margin-top: 60px;
}

.button-group button {
  display: block;
  width: 100%;
  border: none;
  background-color: #e3bf8a;
  color: #4e4e4e;
  padding: 12px;
  margin: 15px 0;
  text-transform: capitalize;
  font-size: 26px;
  border-radius: 30px;
  outline: none;
  transition: .2s all ease;
  cursor: pointer;
  z-index: 99;
}

.button-group button:hover {
  background-color: #80653c;
  color: #ffffff;
}
</style>
