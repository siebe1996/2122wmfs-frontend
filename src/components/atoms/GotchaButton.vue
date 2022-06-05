<template>
  <button>{{ buttonProps }}</button>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    buttonProps: {
      required: true,
      type: String,
    },
  },
  methods: {
    ...mapActions({}),
  },
};
</script>

<style scoped>
button {
  background-color: #40c488;
  width: 100%;
  height: 4rem;
  border-radius: 10px;
  border: none;
  font-family: "Roboto", sans-serif;
  font-size: 1.5rem;
  color: white;
  text-transform: uppercase;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);
  margin-bottom: 1.5rem;
}
</style>
