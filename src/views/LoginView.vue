<template>
  <div class="c-login">
    <form @submit.prevent="login(auth)">
      <div class="c-login__input">
        <i class="fa fa-user icon"></i>
        <input
          id="email"
          v-model="auth.email"
          name="email"
          type="email"
          placeholder="Email"
        />
      </div>
      <div class="c-login__input">
        <i class="fa fa-key icon"></i>
        <input
          id="password"
          v-model="auth.password"
          name="password"
          type="password"
          placeholder="Password"
        />
      </div>
      <div class="c-login__submit">
        <GotchaButton
          :disabled="processing"
          :button-props="processing ? 'Please wait' : 'Login'"
          type="submit"
        />
      </div>
    </form>
    <div style="white-space: pre-wrap">{{ status }}</div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import GotchaButton from "../components/atoms/GotchaButton.vue";

export default {
  name: "GotchaLogin",
  components: { GotchaButton },
  data() {
    return {
      auth: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    ...mapGetters({
      processing: "login/getProcessing",
      status: "login/status",
    }),
  },
  methods: {
    ...mapActions({
      login: "login/login",
    }),
  },
};
</script>

<style scoped lang="scss">
.c-login {
  &__input {
    width: 100%;
    margin-bottom: 2rem;
    & i {
      position: absolute;
    }
    & .icon {
      padding: 10px 10px 10px 0;
      color: #36a170;
      min-width: 30px;
      text-align: center;
    }
    & input {
      width: 100%;
      padding: 10px;
      text-align: center;
      box-sizing: border-box;
      border: none;
      border-bottom: 2px solid #36a170;
    }
  }
  &__submit {
    margin: 3rem auto;
  }
}
</style>
