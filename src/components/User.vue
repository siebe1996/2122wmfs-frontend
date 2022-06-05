<template>
  <p>Authenticated: {{ authenticated + "" }}</p>
  <p>User: {{ user }}</p>
  <p>Is admin: {{ isAdmin }}</p>
  <button :disabled="!authenticated" @click="logout">logout</button>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "GotchaUser",
  computed: {
    ...mapGetters({
      user: "auth/user",
      authenticated: "auth/authenticated",
      isAdmin: "auth/isAdmin",
    }),
  },
  methods: {
    ...mapActions({
      logout: "auth/logout",
    }),
  },
};
</script>

<style scoped></style>
