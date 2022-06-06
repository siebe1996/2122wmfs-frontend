<template>
  <div>
    <div>
      <form @submit.prevent="searchUsers">
        <div class="form-field">
          <label for="fname">Password</label>
          <input
            type="text"
            id="fname"
            name="fname"
            v-model="formInput.name"
            placeholder="Player name..."
          />
        </div>
        <div class="form-field">
          <select id="aliveStatus" v-model="formInput.aliveState">
            <option
              v-for="status in aliveStatus"
              :key="status.id"
              :value="status.id"
            >
              {{ status.name }}
            </option>
          </select>
        </div>
        <GotchaButton :button-props="btnName" type="submit" />
      </form>
    </div>
    <GotchaList
      id="players"
      :items="usersRestuctured"
      name="Players"
      @btn-got-clicked="killPlayer"
    />
    <GotchaNavigation />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import GotchaNavigation from "../components/organismes/GotchaNavigation.vue";
import GotchaList from "../components/organismes/GotchaList.vue";
import GotchaButton from "../components/atoms/GotchaButton.vue";

export default {
  components: { GotchaButton, GotchaList, GotchaNavigation },
  data() {
    return {
      gameId: this.$route.params.id,
      formInput: {
        aliveState: undefined,
        name: undefined,
      },
      btnName: "search",
      aliveStatus: [
        {
          id: 0,
          name: "all",
        },
        {
          id: 1,
          name: "death",
        },
        {
          id: 2,
          name: "alive",
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      users: "admin/getUsers",
    }),
    usersRestuctured() {
      return {
        ...this.users.map((i) => ({
          name: i.first_name,
          id: i.id,
          hasBtn: Boolean(i.games_with_pivot[0].pivot.alive),
          btnName: "kill",
          clickable: false,
        })),
      };
    },
  },
  methods: {
    ...mapActions({
      fetchUsers: "admin/fetchUsers",
      patchAliveStateUser: "admin/patchAliveStateUser",
    }),
    killPlayer(userId) {
      let params = "gameId=" + this.gameId + "&userId=" + userId;
      this.patchAliveStateUser(params);
      this.searchUsers();
    },
    searchUsers() {
      let params = "gameId=" + this.gameId;
      if (this.formInput.aliveState) {
        let status = this.formInput.aliveState - 1;
        console.log(status);
        params += "&aliveState=" + status;
      }
      if (this.formInput.name) {
        params += "&name=" + this.formInput.name;
      }
      this.fetchUsers(params);
    },
  },
  created() {
    let gamePara = "gameId=" + this.gameId;
    this.fetchUsers(gamePara);
  },
};
</script>

<style scoped lang="scss">
select,
input {
  width: 100%;
  height: 3rem;
  border-radius: 10px;
  margin-bottom: 1rem;
}

select {
  border: 1px solid #40c488;
  margin-bottom: 2rem;
  -webkit-appearance: none;
  -moz-appearance: none;
  padding-left: 10px;
}

#players {
  margin-bottom: 5rem;
}
label {
  display: none;
}
</style>
