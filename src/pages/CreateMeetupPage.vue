<template>
  <div>
    <MeetupCreateForm
      :meetup="meetup"
      :submitText="submitText"
      @submit="handleSubmit"
    ></MeetupCreateForm>
  </div>
</template>

<script>
import MeetupCreateForm from "@/components/meetup/MeetupCreateForm/MeetupCreateForm";
import {
  HIDE_SPINNER_EVENT_NAME,
  SHOW_SPINNER_EVENT_NAME,
  INDEX_ROUTE_NAME,
} from "@/js/constants";
import { MeetupApi } from "@/js/api/MeetupApi";
import _ from "lodash";
import { ResponseHandler } from "@/mixins/ResponseHandler";

export default {
  name: "CreateMeetupPage",

  components: {
    MeetupCreateForm,
  },

  mixins: [ResponseHandler],

  metaInfo: {
    title: null,
  },

  props: {
    meetupId: {
      type: [Number, String],
    },
  },

  data() {
    return {
      meetup: {
        id: 0,
        title: "",
        description: "",
        imageId: null,
        date: "2021-02-03",
        place: "",
        agenda: [],
      },
    };
  },

  computed: {
    title() {
      return this.isEdit
        ? "Страница редактирования митапа"
        : "Страница создания митапа";
    },

    isEdit() {
      return !!this.meetupId;
    },

    submitText() {
      return this.isEdit ? "Изменить" : "Создать";
    },

    okResponseText() {
      return this.isEdit ? "Успешно изменили" : "Успешно создали";
    },

    errResponseText() {
      return this.isEdit ? "Ошибка изменения!" : "Ошибка создания!";
    },
  },

  watch: {
    meetupId: {
      immediate: true,
      handler(meetupId) {
        if (!meetupId) return;

        this.$root.$emit(SHOW_SPINNER_EVENT_NAME);

        new MeetupApi()
          .getMeetup(meetupId)
          .then((res) => {
            this.meetup = _.cloneDeep(res.data);
          })
          .catch((res) => {
            this.handleErrorResponse(res);
          })
          .finally(() => {
            this.$root.$emit(HIDE_SPINNER_EVENT_NAME);
          });
      },
    },

    title: {
      immediate: true,
      handler(title) {
        this.$options.metaInfo.title = title;
      },
    },
  },

  methods: {
    handleSubmit(meetup) {
      this.$root.$emit(SHOW_SPINNER_EVENT_NAME);
      this.meetup = _.cloneDeep(meetup);
      this.meetup.date = new Date(this.meetup.date);

      const apiFunc = this.isEdit
        ? new MeetupApi().updateMeetup(this.meetup)
        : new MeetupApi().createMeetup(this.meetup);

      apiFunc
        .then((res) => {
          this.handleOkResponse(res, this.okResponseText);
        })
        .catch((res) => {
          this.handleErrorResponse(res, this.errResponseText);
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
