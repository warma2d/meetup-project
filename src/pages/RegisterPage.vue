<template>
  <form @submit.prevent="auth" class="form">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input v-model.trim="email" type="email" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Имя</label>
      <div class="input-group">
        <input v-model.trim="fio" type="text" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input v-model="password" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повтор пароля</label>
      <div class="input-group">
        <input v-model="repeat_password" type="password" class="form-control" />
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox"
        ><input v-model="isAgree" type="checkbox" /> Я согласен с условиями
        <span></span
      ></label>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary">
        Зарегистрироваться
      </button>
    </div>
    <div class="form__append">
      Уже есть аккаунт?
      <router-link :to="toLogin" class="link">Войдите</router-link>
    </div>
  </form>
</template>

<script>
import {
  GLOBAL_TOASTER_ERROR_EVENT_NAME,
  HIDE_SPINNER_EVENT_NAME,
  SHOW_SPINNER_EVENT_NAME,
  LOGIN_ROUTE_NAME,
} from "@/js/constants";
import { AuthApi } from "@/js/api/AuthApi";
import { ResponseHandler } from "@/mixins/ResponseHandler";

export default {
  name: "RegisterPage",

  mixins: [ResponseHandler],

  metaInfo: {
    title: "Страница регистрации",
  },

  data() {
    return {
      email: null,
      fio: null,
      password: null,
      repeat_password: null,
      isAgree: false,
    };
  },

  computed: {
    toLogin() {
      return { name: LOGIN_ROUTE_NAME };
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

      if (!this.fio) {
        this.$root.$emit(
          GLOBAL_TOASTER_ERROR_EVENT_NAME,
          "Требуется ввести полное имя"
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

      if (this.password !== this.repeat_password) {
        this.$root.$emit(
          GLOBAL_TOASTER_ERROR_EVENT_NAME,
          "Пароли не совпадают"
        );
        return;
      }

      if (!this.isAgree) {
        this.$root.$emit(
          GLOBAL_TOASTER_ERROR_EVENT_NAME,
          "Требуется согласиться с условиями"
        );
        return;
      }

      this.$root.$emit(SHOW_SPINNER_EVENT_NAME);

      new AuthApi()
        .register({
          fullname: this.fio,
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          this.handleOkResponse(res, "Вы успешно зарегистрировались!");
          this.$router.push({ name: LOGIN_ROUTE_NAME });
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
