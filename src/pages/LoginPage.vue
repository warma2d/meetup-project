<template>
  <form @submit.prevent="auth" class="form">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input
          v-model.trim="email"
          type="email"
          placeholder="demo@email"
          class="form-control"
        />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input
          v-model="password"
          type="password"
          placeholder="password"
          class="form-control"
        />
      </div>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block">
        Войти
      </button>
    </div>
    <div class="form__append">
      Нет аккаунта?
      <router-link :to="toRegister" class="link">Зарегистрируйтесь</router-link>
    </div>
  </form>
</template>

<script>
import { AuthApi } from "@/js/api/AuthApi";
import {
  GLOBAL_TOASTER_ERROR_EVENT_NAME,
  HIDE_SPINNER_EVENT_NAME,
  SHOW_SPINNER_EVENT_NAME,
  INDEX_ROUTE_NAME,
  USER_ROLE_NAME,
  REGISTER_ROUTE_NAME,
} from "@/js/constants";
import { ResponseHandler } from "@/mixins/ResponseHandler";

export default {
  name: "LoginPage",

  mixins: [ResponseHandler],

  metaInfo: {
    title: "Страница авторизации",
  },

  data() {
    return {
      email: "demo@email",
      password: "password",
    };
  },

  computed: {
    toRegister() {
      return { name: REGISTER_ROUTE_NAME };
    },
  },

  methods: {
    auth() {
      if (!this.email) {
        this.$root.$emit(
          GLOBAL_TOASTER_ERROR_EVENT_NAME,
          "Требуется ввести Email"
        );
        return;
      }

      if (!this.password) {
        this.$root.$emit(
          GLOBAL_TOASTER_ERROR_EVENT_NAME,
          "Требуется ввести пароль"
        );
        return;
      }

      this.$root.$emit(SHOW_SPINNER_EVENT_NAME);

      new AuthApi()
        .login({
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          this.localStorage.userRole = USER_ROLE_NAME;
          this.handleOkResponse(res, "Вы успешно авторизовались!");
          this.$router.push({ name: INDEX_ROUTE_NAME });
        })
        .catch((res) => {
          this.handleErrorResponse(res);
        })
        .finally(() => {
          this.$root.$emit(HIDE_SPINNER_EVENT_NAME);
        });
    },
  },
};
</script>

<style></style>
