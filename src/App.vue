<script>
import { mapGetters } from "vuex";

export default {
  components: {},
  computed: {
    ...mapGetters(["status"]),
  },
};
</script>

<template>
  <header>
    <h1>Gotcha</h1>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style lang="scss">
@import "../src/assets/fonts.css";

h1 {
  font-size: 6rem;
  text-align: center;
  margin-bottom: 1rem;
  font-family: "Just Another Hand", cursive;
  letter-spacing: 4px;
  font-weight: 500;
}

h2 {
  font-family: "Roboto", sans-serif;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  height: 4rem;
  position: fixed;
  bottom: 0px;
  left: 0px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
  z-index: 10;
  & a {
    width: 33.33%;
    height: 4rem;
    color: white;
    display: flex;
    background-color: #40c488;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    & i {
      font-size: 2rem;
    }
  }
  & a.router-link-exact-active:hover {
    background-color: transparent;
  }
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  font-weight: normal;
  width: 90%;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

* {
  font-family: "Roboto", sans-serif;
}
</style>
