<template>
  <div>
    <div>
      <form @submit.prevent="sendMessage">
        <div class="form-field">
          <select id="receiver" v-model="formInput.user">
            <option hidden>Select a user to send a message</option>
            <option v-for="user in users" :value="user.id" :key="user.id">
              {{ user.email }}
            </option>
          </select>
        </div>
        <div class="form-field">
          <label for="message">Message</label>
          <input
            type="text"
            id="message"
            name="message"
            v-model="formInput.content"
            placeholder="Type your message here..."
          />
        </div>
        <GotchaButton :button-props="btnName" type="submit" />
      </form>
    </div>
    <GotchaNavigation />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import GotchaNavigation from "../components/organismes/GotchaNavigation.vue";
import GotchaButton from "../components/atoms/GotchaButton.vue";
import router from "../router";

export default {
  components: { GotchaButton, GotchaNavigation },
  data() {
    return {
      formInput: {
        user: undefined,
        content: undefined,
      },
      btnName: "send",
    };
  },
  computed: {
    ...mapGetters({
      users: "message/getUsers",
      userLoggedIn: "auth/user",
    }),
  },
  methods: {
    ...mapActions({
      fetchUsers: "message/fetchAllUsers",
      postMessage: "message/postMessage",
    }),
    sendMessage() {
      this.postMessage(this.formInput);
      router.push("/messages");
    },
  },
  created() {},
  mounted() {
    /*console.log(this.userLoggedIn.id);
    window.Echo.private(`chat-message.${this.userLoggedIn.id}`).listen("ChatMessage", (res) => {
      console.log("test" + res);
    });*/
  },
};
</script>

<style scoped lang="scss">
select,
input {
  width: 100%;
  height: 4rem;
  border-radius: 10px;
}

select {
  border: 1px solid #40c488;
  margin-bottom: 2rem;
  -webkit-appearance: none;
  -moz-appearance: none;
}

input {
  width: 98%;
  height: 4rem;
  border-radius: 10px;
  border: 1px solid #40c488;
  padding-left: 10px;
  margin-bottom: 2rem;
}

label {
  display: none;
}
</style>
