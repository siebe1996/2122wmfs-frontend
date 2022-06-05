<template>
  <h1>404, Oops!</h1>
  <div>
    <h2>I don't know what you're looking for...</h2>
    <p><i>I bet</i> that you <b>look good</b> on the <b>dancefloor</b></p>
    <p><i>I don't know</i> if you're looking for <b>romance</b> or</p>
    <p><i>I don't know</i> what you're <b>looking</b> for</p>
    <router-link :to="{ name: 'home' }">Go to the home page</router-link>
  </div>
  <GotchaNavigation />
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import GotchaNavigation from "../components/organismes/GotchaNavigation.vue";

export default {
  components: { GotchaNavigation },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
  },
  created() {},
};
</script>

<style scoped lang="scss">
h1 {
  font-size: 3rem;
}

a {
  display: block;
  width: 100%;
  height: 4rem;
  text-decoration: none;
  background-color: #40c488;
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
