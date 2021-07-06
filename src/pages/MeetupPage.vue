<template>
  <div>
    <MeetupView
      v-if="localMeetup"
      :meetup="localMeetup"
      @delete="handleDelete"
      @attend="handleAttend"
      @cancel:attend="handleCancelAttend"
    ></MeetupView>
  </div>
</template>

<script>
import { MeetupApi } from "@/js/api/MeetupApi";
import MeetupView from "@/components/meetup/MeetupView/MeetupView.vue";
import { ResponseHandler } from "@/mixins/ResponseHandler";
import {
  HIDE_SPINNER_EVENT_NAME,
  INDEX_ROUTE_NAME,
  SHOW_SPINNER_EVENT_NAME,
} from "@/js/constants";

export default {
  name: "MeetupPage",

  components: {
    MeetupView,
  },

  mixins: [ResponseHandler],

  metaInfo: {
    title: "Страница митапа",
  },

  props: {
    meetupId: {
      type: [Number, String],
    },
  },

  data() {
    return {
      localMeetup: null,
    };
  },

  watch: {
    meetupId: {
      immediate: true,
      handler(meetupId) {
        this.$root.$emit(SHOW_SPINNER_EVENT_NAME);

        new MeetupApi()
          .getMeetup(meetupId)
          .then((res) => {
            this.localMeetup = res.data;
          })
          .catch((res) => {
            this.handleErrorResponse(res);
          })
          .finally(() => {
            this.$root.$emit(HIDE_SPINNER_EVENT_NAME);
          });
      },
    },
  },

  methods: {
    handleDelete() {
      this.$root.$emit(SHOW_SPINNER_EVENT_NAME);

      new MeetupApi()
        .deleteMeetup(this.meetupId)
        .then((res) => {
          this.handleOkResponse(res);
        })
        .catch((res) => {
          this.handleErrorResponse(res);
        })
        .finally(() => {
          this.$root.$emit(HIDE_SPINNER_EVENT_NAME);
          this.$router.push({ name: INDEX_ROUTE_NAME });
        });
    },

    handleAttend() {
      this.$root.$emit(SHOW_SPINNER_EVENT_NAME);

      new MeetupApi()
        .attendMeetup(this.meetupId)
        .then((res) => {
          this.handleOkResponse(res);
        })
        .catch((res) => {
          this.handleErrorResponse(res);
        })
        .finally(() => {
          this.$root.$emit(HIDE_SPINNER_EVENT_NAME);
          this.$router.push({ name: INDEX_ROUTE_NAME });
        });
    },

    handleCancelAttend() {
      this.$root.$emit(SHOW_SPINNER_EVENT_NAME);

      new MeetupApi()
        .cancelAttendMeetup(this.meetupId)
        .then((res) => {
          this.handleOkResponse(res);
        })
        .catch((res) => {
          this.handleErrorResponse(res);
        })
        .finally(() => {
          this.$root.$emit(HIDE_SPINNER_EVENT_NAME);
          this.$router.push({ name: INDEX_ROUTE_NAME });
        });
    },
  },
};
</script>

<style></style>
