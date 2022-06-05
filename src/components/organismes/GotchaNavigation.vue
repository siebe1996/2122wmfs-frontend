<template>
  <nav>
    <GotchaNavButton
      v-for="item in navArray"
      :key="item.name"
      :nav-button-props="item"
    ></GotchaNavButton>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import GotchaNavButton from "../atoms/GotchaNavButton.vue";
export default {
  components: { GotchaNavButton },
  data() {
    return {};
  },
  props: {
    gotchNavigationProps: {},
  },
  computed: {
    ...mapGetters({
      admin: "auth/isAdmin",
    }),
    navArray() {
      if (this.admin) {
        return [
          {
            name: "home",
            route: "/",
            class: "fa-solid fa-house",
          },
          {
            name: "info",
            route: "/info",
            class: "fa-solid fa-info",
          },
          {
            name: "messages",
            route: "/messages",
            class: "fa-solid fa-envelope",
          },
          {
            name: "admin",
            route: "/admin",
            class: "fa-solid fa-screwdriver",
          },
          {
            name: "logout",
            route: "/logout",
            class: "fa-solid fa-arrow-right-from-bracket",
          },
        ];
      } else {
        return [
          {
            name: "home",
            route: "/",
            class: "fa-solid fa-house",
          },
          {
            name: "info",
            route: "/info",
            class: "fa-solid fa-info",
          },
          {
            name: "messages",
            route: "/messages",
            class: "fa-solid fa-envelope",
          },
          {
            name: "logout",
            route: "/logout",
            class: "fa-solid fa-arrow-right-from-bracket",
          },
        ];
      }
    },
  },
  methods: {
    ...mapActions({
      btnClicked: "navBtnClicked",
    }),
  },
};
</script>

<style scoped></style>
