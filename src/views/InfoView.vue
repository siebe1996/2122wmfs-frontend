<template>
  <div class="container">
    <GotchaList
      name="Active games"
      :items="gotchaActive"
      @gotcha-list-item-clicked="goToDetailPage"
      @btn-got-clicked="joinGame"
    />
    <GotchaList
      name="Previuous games"
      :items="gotchaPrev"
      @gotcha-list-item-clicked="goToDetailPage"
    />
  </div>
  <GotchaNavigation />
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";
import { mapActions } from "vuex";
import GotchaList from "../components/organismes/GotchaList.vue";
import GotchaNavigation from "../components/organismes/GotchaNavigation.vue";

export default {
  data() {
    return {};
  },
  components: { GotchaNavigation, GotchaList },
  computed: {
    ...mapGetters({
      infoGamesActive: "info/getInfoGamesActive",
      infoGamesPrev: "info/getInfoGamesPrevious",
    }),
    ...mapState({
      test: (state) => state.info.gotchaListArr[0],
    }),
    gotchaActive() {
      return [
        ...this.infoGamesActive["active_joinable"].map((i) => ({
          name: i.title,
          id: i.id,
          hasBtn: true,
          btnName: "join",
          clickable: true,
        })),
        ...this.infoGamesActive["active_not_joinable"].map((i) => ({
          name: i.title,
          id: i.id,
          hasBtn: false,
          btnName: "join",
          clickable: true,
        })),
        ...this.infoGamesActive["started_games"].map((i) => ({
          name: i.title,
          id: i.id,
          hasBtn: false,
          btnName: "join",
          clickable: true,
        })),
      ];
    },
    gotchaPrev() {
      return {
        ...this.infoGamesPrev.map((i) => ({
          name: i.title,
          id: i.id,
          hasBtn: false,
          btnName: "join",
          clickable: true,
        })),
      };
    },
  },
  methods: {
    ...mapActions({
      fetchInfoGames: "info/fetchInfoGames",
      postGameUser: "info/postGameUser",
    }),
    joinGame(value) {
      this.postGameUser(value);
      this.fetchInfoGames();
    },
    goToDetailPage(value) {
      this.$router.push(`/detail/${value}`);
    },
  },
  watch: {},
  updated() {},
  created() {},
  mounted() {},
};
</script>

<style scoped lang="scss">
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

.container {
  margin-bottom: 5rem;
}
</style>
