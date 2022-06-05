<template>
  <div>
    <h2>
      {{ name }}
    </h2>
    <GotchaListItem
      v-for="item in items"
      :gotch-list-item-props="item"
      :key="item.id"
      @gotcha-list-item-clicked="gotchaListItemClickedToParent"
      @btn-got-clicked="passBtnClickToParent"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import GotchaListItem from "../molecules/GotchaListItem.vue";
export default {
  components: { GotchaListItem },
  data() {},
  props: {
    name: {
      required: true,
      type: String,
    },
    items: {
      required: true,
    },
  },
  emits: ["btnGotClicked", "gotchaListItemClicked"],
  computed: {},
  methods: {
    ...mapActions({}),
    passBtnClickToParent(value) {
      this.$emit("btnGotClicked", value);
    },
    gotchaListItemClickedToParent(value) {
      this.$emit("gotchaListItemClicked", value);
    },
  },
  watch: {},
  mounted() {},
};
</script>

<style scoped lang="scss">
h2 {
  text-align: center;
}
</style>
