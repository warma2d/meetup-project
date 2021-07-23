<template>
  <div>
    <AppSpinner ref="appSpinner"></AppSpinner>

    <div class="wrapper bg-grey">
      <BaseLayout>
        <AppToaster ref="appToaster"></AppToaster>
        <routerView></routerView>
      </BaseLayout>
    </div>
  </div>
</template>

<script>
import BaseLayout from "@/layouts/BaseLayout";
import AppToaster from "@/components/AppToaster";
import {
  GLOBAL_TOASTER_ERROR_EVENT_NAME,
  GLOBAL_TOASTER_SUCCESS_EVENT_NAME,
  SHOW_SPINNER_EVENT_NAME,
  HIDE_SPINNER_EVENT_NAME,
  HTTP_UNAUTHORIZED_CODE,
  HTTP_SUCCESS_STATUS,
  GUEST_ROLE_NAME,
  USER_ROLE_NAME,
} from "@/js/constants";
import AppSpinner from "@/components/AppSpinner/AppSpinner";
import { AuthApi } from "@/js/api/AuthApi";

export default {
  name: "App",
  components: { AppSpinner, AppToaster, BaseLayout },

  metaInfo: {
    title: "Default name",
    titleTemplate: "%s | Meetup service",
  },

  data() {
    return {
      isShowContent: false,
    };
  },

  beforeCreate() {
    this.$root.$on(GLOBAL_TOASTER_ERROR_EVENT_NAME, (errorEventPayload) => {
      let message =
        "Произошла непредвиденная ошибка, пожалуйста, повторите запрос позднее!";

      if (typeof errorEventPayload === "string") {
        message = errorEventPayload;
      }

      console.log(errorEventPayload);

      this.$refs.appToaster.error(message);
    });

    this.$root.$on(GLOBAL_TOASTER_SUCCESS_EVENT_NAME, (message) => {
      this.$refs.appToaster.success(message);
    });

    this.$root.$on(SHOW_SPINNER_EVENT_NAME, () => {
      this.isShowContent = false;
      this.$refs.appSpinner.show();
    });

    this.$root.$on(HIDE_SPINNER_EVENT_NAME, () => {
      this.$refs.appSpinner.hide();
      this.isShowContent = true;
    });

    new AuthApi()
      .getUser()
      .then((res) => {
        if (res.status === HTTP_SUCCESS_STATUS) {
          this.localStorage.userRole = USER_ROLE_NAME;
        } else {
          this.localStorage.userRole = GUEST_ROLE_NAME;
        }
      })
      .catch((res) => {
        if (res.response.status === HTTP_UNAUTHORIZED_CODE) {
          this.localStorage.userRole = GUEST_ROLE_NAME;
        }
      });
  },
};
</script>

<style scoped></style>
