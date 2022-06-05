<template>
  <router-link :to="navButtonProps.route">
    <i :class="[navButtonProps.class]"></i>
  </router-link>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    navButtonProps: {
      required: true,
      type: Object,
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
