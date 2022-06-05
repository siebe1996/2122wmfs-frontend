<template>
  <div class="container">
    <GotchaButton :button-props="btnProps" @click="sendAMessage" />
    <div>
      <GotchaList
        name="Messages"
        :items="messagesRestructured"
        @btn-got-clicked="deleteSomething"
      />
    </div>
    <GotchaNavigation />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapState } from "vuex";
import { mapActions } from "vuex";
import GotchaList from "../components/organismes/GotchaList.vue";
import GotchaNavigation from "../components/organismes/GotchaNavigation.vue";
import GotchaButton from "../components/atoms/GotchaButton.vue";
import router from "../router";

export default {
  data() {
    return {
      btnProps: "send message",
      deleteId: "",
    };
  },
  components: { GotchaButton, GotchaNavigation, GotchaList },
  computed: {
    ...mapGetters({
      messages: "message/getMessages",
    }),
    ...mapState({}),
    messagesRestructured() {
      return {
        ...this.messages.map((i) => ({
          name: i.content,
          id: i.id,
          hasBtn: true,
          btnName: "delete",
          clickable: false,
        })),
      };
    },
  },
  methods: {
    ...mapActions({
      fetchMessages: "message/fetchMessages",
      deleteMessage: "message/deleteMessage",
      fetchUsers: "message/fetchAllUsers",
    }),
    async deleteSomething(value) {
      console.log("message delte" + value);
      this.deleteId = value;
      await this.deleteMessage(this.deleteId);
      await this.fetchMessages();
    },
    sendAMessage() {
      router.push("/messages/send");
    },
  },
  watch: {},
  updated() {},
  created() {},
};
</script>

<style scoped lang="scss">
.container {
  margin-bottom: 5rem;
}
</style>
