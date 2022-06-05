<template>
  <select @change="onChange($event.target.value)">
    <option hidden>Select a game to play</option>
    <option
      v-for="currentGame in currentGames"
      :key="currentGame.id"
      :value="currentGame.id"
    >
      {{ currentGame.title }}
    </option>
  </select>
  <div class="content">
    <div class="target">
      <h2><i class="fa-solid fa-user"></i>Target:</h2>
      <p>{{ target }}</p>
    </div>
    <div class="weapon">
      <h2><i class="fa-solid fa-gun"></i>Weapon:</h2>
      <p>{{ weapon }}</p>
    </div>
    <GotchaButton
      :button-props="buttonArr[0]"
      @click="addParamsToPatchAlive(this.gameId)"
    />
    <GotchaButton
      :button-props="buttonArr[1]"
      @click="fetchTarget(this.gameId)"
    />
  </div>
  <GotchaNavigation />
</template>

<script>
import GotchaNavigation from "../components/organismes/GotchaNavigation.vue";
import { mapGetters } from "vuex";
import { mapState } from "vuex";
import { mapActions } from "vuex";
import GotchaButton from "../components/atoms/GotchaButton.vue";

export default {
  data() {
    return {
      test2: "",
      buttonArr: ["i got killed", "get new target"],
      gameId: "",
      hasGame: false,
    };
  },
  components: { GotchaButton, GotchaNavigation },
  computed: {
    ...mapGetters({
      currentGames: "home/getCurrentGames",
      targetWeapon: "home/getTargetWeapon",
      target: "getTarget",
      weapon: "home/getWeapon",
    }),
    ...mapState({}),
  },
  methods: {
    ...mapActions({
      fetchCurrentGames: "home/fetchCurrentGames",
      fetchTargetWeapon: "home/fetchTargetWeapon",
      fetchTarget: "home/fetchTarget",
      patchAliveState: "home/patchAliveState",
    }),
    async onChange(value) {
      this.gameId = value;
      console.log("gameId = " + this.gameId);
      await this.fetchTargetWeapon(value);
      if (this.target !== undefined) {
        this.hasGame = true;
      }
    },
    addParamsToPatchAlive(value) {
      let params = "gameId=" + value;
      this.patchAliveState(params);
    },
  },
  watch: {},
  updated() {},
  created() {},
  mounted() {},
};
</script>

<style scoped lang="scss">
select {
  width: 100%;
  height: 5rem;
  padding-left: 1rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  font-size: 1.2rem;
  border: 1px solid #36a170;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.07), 0 1px 2px rgba(0, 0, 0, 0.07),
    0 2px 4px rgba(0, 0, 0, 0.07), 0 4px 8px rgba(0, 0, 0, 0.07),
    0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07);
  border-radius: 10px;
}

.content {
  z-index: 1;
}

.target,
.weapon {
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
}

p,
h2 {
  display: inline;
  font-size: 1.2rem;
  margin: 0;
}

h2 {
  font-weight: 500;
  & i {
    margin-right: 1rem;
  }
}

p {
  margin-left: 1rem;
  font-weight: 600;
  color: #36a170;
}
</style>
