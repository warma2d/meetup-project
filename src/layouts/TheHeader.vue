<template>
  <header class="header">
    <div>
      <h1>
        <router-link
          :to="toIndex"
          class="router-link-exact-active router-link-active"
          ><img src="/images/logo.svg" alt="Meetups"
        /></router-link>
      </h1>
    </div>
    <nav>
      <router-link
        v-for="item in userNavOptions"
        :key="item.text"
        :to="{ name: item.name }"
        >{{ item.text }}</router-link
      >
      <a style="cursor: pointer" @click="logout" v-if="isNotGuest">Выйти</a>
    </nav>
  </header>
</template>

<script>
import {
  NAV_OPTIONS,
  GUEST_ROLE_NAME,
  SHOW_SPINNER_EVENT_NAME,
  HIDE_SPINNER_EVENT_NAME,
  INDEX_ROUTE_NAME,
} from "@/js/constants";
import { AuthApi } from "@/js/api/AuthApi";
import { ResponseHandler } from "@/mixins/ResponseHandler";

export default {
  name: "TheHeader",

  mixins: [ResponseHandler],

  computed: {
    toIndex() {
      return { name: INDEX_ROUTE_NAME };
    },

    userNavOptions() {
      return NAV_OPTIONS.filter((option) =>
        option.requireRole.includes(this.localStorage.userRole)
      );
    },

    isNotGuest() {
      return this.localStorage.userRole !== GUEST_ROLE_NAME;
    },
  },

  methods: {
    logout() {
      this.$root.$emit(SHOW_SPINNER_EVENT_NAME);

      new AuthApi()
        .logout()
        .then((res) => {
          this.localStorage.userRole = GUEST_ROLE_NAME;
          this.handleOkResponse(res, "Вы успешно вышли!");
        })
        .catch((res) => {
          this.handleErrorResponse(res);
        })
        .finally(() => {
          this.$root.$emit(HIDE_SPINNER_EVENT_NAME);
          window.location.reload();
        });
    },
  },
};
</script>

<style scoped>
.header {
  padding: 44px 0 32px;
  background-color: var(--white);
}

.header h1,
.header h1 a {
  font-weight: 900;
  font-size: 34px;
  line-height: 30px;
  text-align: center;
  margin: 0 0 24px;
  text-transform: uppercase;
  color: var(--body-color);
  text-decoration: none;
}

nav {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 24px;
}

nav a {
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  text-decoration: none;
  padding: 0 20px;
  position: relative;
  display: inline-flex;
}

nav a + a {
  margin-top: 8px;
}

nav a:hover {
  color: var(--blue);
}

nav a:before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-2px, -50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: var(--grey);
}

@media all and (min-width: 992px) {
  nav {
    flex-direction: row;
    align-items: center;
    margin-left: 0;
  }

  nav a,
  nav a + a {
    margin-top: 0;
  }

  nav a:first-child:before {
    display: none;
  }
}

.avatar {
  border-radius: 100%;
  margin-right: 8px;
}
</style>
