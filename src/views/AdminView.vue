<template>
  <div>
    <GotchaList
      :items="gotchaStarted"
      name="Started Games"
      @gotcha-list-item-clicked="goToAdminDetail"
    />
    <GotchaNavigation />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import GotchaNavigation from "../components/organismes/GotchaNavigation.vue";
import GotchaList from "../components/organismes/GotchaList.vue";

export default {
  components: { GotchaList, GotchaNavigation },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      infoGamesActive: "info/getInfoGamesActive",
    }),
    gotchaStarted() {
      return {
        ...this.infoGamesActive["started_games"].map((i) => ({
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
    ...mapActions({}),
    goToAdminDetail(value) {
      this.$router.push(`/admin/detail/${value}`);
    },
  },
};
</script>

<style scoped></style>
