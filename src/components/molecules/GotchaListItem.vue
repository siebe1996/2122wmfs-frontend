<template>
  <div class="listItem">
    <button
      class="itemButton"
      v-if="gotchListItemProps.clickable"
      @click="this.$emit('gotchaListItemClicked', gotchListItemProps.id)"
    >
      {{ gotchListItemProps.name }}
    </button>
    <p v-if="!gotchListItemProps.clickable">{{ gotchListItemProps.name }}</p>
    <GotchaButton
      v-if="gotchListItemProps.hasBtn === true"
      :button-props="gotchListItemProps.btnName"
      @click="this.$emit('btnGotClicked', gotchListItemProps.id)"
    />
  </div>
</template>

<script>
import GotchaButton from "../atoms/GotchaButton.vue";
export default {
  components: { GotchaButton },
  data() {
    return {
      btnProps: {
        name: "join game",
      },
    };
  },
  props: {
    gotchListItemProps: {
      required: true,
      type: Object,
    },
  },
  emits: ["btnGotClicked", "gotchaListItemClicked"],
  methods: {
    btnClicked() {
      this.$emit("btnGotClicked");
    },
  },
};
</script>

<style scoped lang="scss">
.listItem {
  border: 1px solid #36a170;
  border-radius: 10px;
  padding: 0.5rem;
  margin-bottom: 1.5rem;
  & .itemButton {
    width: 100%;
    margin-bottom: 1rem;
    border: none;
    border-radius: 10px;
    height: 2.5rem;
    text-transform: uppercase;
    font-weight: 500;
    box-shadow: 0 0 1px rgba(0, 0, 0, 0.07), 0 1px 2px rgba(0, 0, 0, 0.07),
      0 2px 4px rgba(0, 0, 0, 0.07), 0 4px 8px rgba(0, 0, 0, 0.07),
      0 8px 16px rgba(0, 0, 0, 0.07), 0 16px 32px rgba(0, 0, 0, 0.07);
    background-color: #abe7cc;
  }
}
</style>
