<template>
  <div class="container">
    <div>
      <h2 v-if="winner">Winner: {{ winner }}</h2>
      <GotchaList name="Most Killed" :items="mostKilledRestructured" />
      <GotchaList name="Alive" :items="alivePlayersRestuctured" />
      <p>
        Aantal spelers in leven: <i>{{ alivePlayers.length }}</i>
      </p>
      <canvas id="myChart" style="width: 100%; max-width: 600px"></canvas>
    </div>
    <GotchaNavigation />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import GotchaList from "../components/organismes/GotchaList.vue";
import GotchaNavigation from "../components/organismes/GotchaNavigation.vue";
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
} from "chart.js";
Chart.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale
);

export default {
  components: { GotchaList, GotchaNavigation },
  data() {
    return {
      gameId: this.$route.params.id,
    };
  },
  computed: {
    ...mapGetters({
      game: "detail/getGame",
      alivePlayers: "detail/getAlivePlayers",
      winner: "detail/getWinner",
      mostKilled: "detail/getMostKilled",
    }),
    mostKilledRestructured() {
      return {
        ...this.mostKilled.map((i) => ({
          name: i.first_name,
          id: i.id,
          hasBtn: false,
          btnName: "",
          clickable: false,
        })),
      };
    },
    alivePlayersRestuctured() {
      return {
        ...this.alivePlayers.map((i) => ({
          name: i.first_name,
          id: i.id,
          hasBtn: false,
          btnName: "",
          clickable: false,
        })),
      };
    },
    whenKilled() {
      let times = [];
      for (let i = 0; i < this.game.users_with_pivot.length; i++) {
        if (this.game.users_with_pivot[i].pivot.when_killed !== null) {
          let time = new Date(
            this.game.users_with_pivot[i].pivot.when_killed
          ).getTime();
          times.push(time);
        }
      }
      return times;
    },
  },
  methods: {
    ...mapActions({
      fetchGame: "detail/fetchGame",
    }),
    chart() {
      console.log("chart wordt opgeroepen");
      let yValues = this.whenKilled.sort();
      let xValues = [];
      for (var i = 1; i <= yValues.length; i++) {
        xValues.push(i);
      }
      new Chart("myChart", {
        type: "line",
        data: {
          labels: xValues,
          datasets: [
            {
              fill: false,
              label: "time/kill",
              lineTension: 0,
              backgroundColor: "rgba(0,0,255,1.0)",
              borderColor: "rgba(0,0,255,0.1)",
              data: yValues,
              spanGaps: true,
            },
          ],
        },
        options: {
          legend: { display: false },
          scales: {
            y: {
              stacked: true,
              ticks: {
                callback: function (value) {
                  return new Date(value);
                },
              },
            },
          },
        },
      });
    },
  },
  mounted() {
    this.chart();
  },
  created() {
    this.fetchGame(this.gameId);
  },
};
</script>

<style scoped lang="scss">
p {
  & i {
    font-weight: 600;
  }
}

.container {
  margin-bottom: 5rem;
}
</style>
