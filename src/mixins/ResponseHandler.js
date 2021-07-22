import {
  GLOBAL_TOASTER_ERROR_EVENT_NAME,
  GLOBAL_TOASTER_SUCCESS_EVENT_NAME,
  HTTP_UNAUTHORIZED_CODE,
  GUEST_ROLE_NAME,
} from "@/js/constants";

export const ResponseHandler = {
  methods: {
    handleErrorResponse(res, messageText) {
      const errMessage = messageText ? messageText : null;

      if (res.response === undefined) {
        this.$root.$emit(GLOBAL_TOASTER_ERROR_EVENT_NAME, errMessage);
        return;
      }

      if (Array.isArray(res.response.data.message)) {
        for (let message of res.response.data.message) {
          this.$root.$emit(GLOBAL_TOASTER_ERROR_EVENT_NAME, message);
        }
      } else if (typeof res.response.data.message === "string") {
        this.$root.$emit(
          GLOBAL_TOASTER_ERROR_EVENT_NAME,
          res.response.data.message
        );
      } else {
        this.$root.$emit(GLOBAL_TOASTER_ERROR_EVENT_NAME, errMessage);
      }

      if (res.response.status === HTTP_UNAUTHORIZED_CODE) {
        this.localStorage.userRole = GUEST_ROLE_NAME;
      }
    },

    handleOkResponse(res, messageText) {
      const firstResponseDigit = Number(res.status.toString()[0]);
      const successMessage = messageText ? messageText : "успешно!";

      if (firstResponseDigit === 2) {
        this.$root.$emit(GLOBAL_TOASTER_SUCCESS_EVENT_NAME, successMessage);
      } else {
        this.$root.$emit(GLOBAL_TOASTER_ERROR_EVENT_NAME, "Ошибка!");
      }
    },
  },
};
