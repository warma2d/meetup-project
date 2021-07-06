import {
  GLOBAL_TOASTER_ERROR_EVENT_NAME,
  GLOBAL_TOASTER_SUCCESS_EVENT_NAME,
} from "@/js/constants";

export const ResponseHandler = {
  methods: {
    handleErrorResponse(res, messageText) {
      const errMessage = messageText ? messageText : null;

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
