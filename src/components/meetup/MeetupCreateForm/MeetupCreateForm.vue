<template>
  <form @submit.prevent="handleSubmit" class="form meetup-form">
    <div class="meetup-form__content">
      <fieldset class="form-section">
        <div class="form-group">
          <label>Название</label>
          <AppInput v-model="localMeetup.title"></AppInput>
        </div>
        <div class="form-group">
          <label>Дата</label>
          <DateInput v-model="localMeetup.date"></DateInput>
        </div>
        <div class="form-group">
          <label>Место</label>
          <AppInput v-model="localMeetup.place"></AppInput>
        </div>
        <div class="form-group">
          <label>Описание</label>
          <AppInput
            :multiline="true"
            v-model="localMeetup.description"
          ></AppInput>
        </div>
        <div class="form-group">
          <label>Изображение</label>
          <ImageUploader
            @change="localMeetup.imageId = $event"
            v-model="localMeetup.imageId"
          />
        </div>
      </fieldset>

      <h3 class="form__section-title">Программа</h3>
      <MeetupAgendaItemForm
        v-for="(item, index) in localMeetup.agenda"
        :key="index"
        :agendaItem="item"
        class="mb-3"
        @remove="removeItem(index)"
        @update:agendaItem="updateItem($event, index)"
      />

      <div class="form-section_append">
        <button @click="addAgendaItem" type="button">
          + Добавить этап программы
        </button>
      </div>
    </div>

    <div class="meetup-form__aside">
      <div class="meetup-form__aside_stick">
        <button
          @click="handleCancel"
          class="button button_secondary button_block"
          type="button"
        >
          Отмена
        </button>
        <button class="button button_primary button_block" type="submit">
          {{ submitText }}
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import MeetupAgendaItemForm from "./MeetupAgendaItemForm.vue";
import ImageUploader from "@/components/ImageUploader";
import _ from "lodash";
import {
  HIDE_SPINNER_EVENT_NAME,
  SHOW_SPINNER_EVENT_NAME,
  INDEX_ROUTE_NAME,
} from "@/js/constants";
import DateInput from "@/components/DateInput";
import AppInput from "@/components/AppInput";

let lastId = -1;
function createAgendaItem() {
  return {
    id: lastId--,
    startsAt: "00:00",
    endsAt: "00:00",
    type: "other",
    title: null,
    description: null,
    speaker: null,
    language: null,
  };
}

export default {
  name: "MeetupCreateForm",

  components: {
    AppInput,
    DateInput,
    ImageUploader,
    MeetupAgendaItemForm,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },

    submitText: {
      type: String,
    },
  },

  data() {
    return {
      localMeetup: {
        title: null,
        date: null,
        place: null,
        description: null,
        imageId: null,
        agenda: [],
      },
    };
  },

  watch: {
    meetup: {
      immediate: true,
      handler(meetup) {
        this.$root.$emit(SHOW_SPINNER_EVENT_NAME);
        this.localMeetup = _.cloneDeep(meetup);
        this.$root.$emit(HIDE_SPINNER_EVENT_NAME);
      },
    },
  },

  methods: {
    handleCancel() {
      this.$router.push({ name: INDEX_ROUTE_NAME });
    },

    handleSubmit() {
      this.$emit("submit", _.cloneDeep(this.localMeetup));
    },

    addAgendaItem() {
      let newItem = createAgendaItem();
      let lastItem = null;
      let lastItemKey = -1;

      if (this.localMeetup.agenda.length > 0) {
        lastItemKey = this.localMeetup.agenda.length - 1;
        lastItem = this.localMeetup.agenda[lastItemKey];
      }

      if (lastItem) {
        newItem.startsAt = lastItem.endsAt;
      }

      this.localMeetup.agenda.splice(++lastItemKey, 0, newItem);
    },

    removeItem(index) {
      this.localMeetup.agenda.splice(index, 1);
    },

    updateItem(item, index) {
      this.$set(this.localMeetup.agenda, index, item);
    },
  },
};
</script>

<style scoped>
.meetup-form__aside {
  margin: 48px 0;
}

.meetup-form__aside_stick > .button {
  margin: 0 0 12px 0;
}

@media all and (min-width: 992px) {
  .meetup-form {
    display: flex;
    flex-direction: row;
  }

  .meetup-form__content {
    flex: 1 0 calc(100% - 320px);
  }

  .meetup-form__aside {
    flex: 1 0 320px;
    max-width: 320px;
    width: 100%;
    padding-left: 137px;
    margin: 0;
  }

  .meetup-form__aside_stick {
    position: sticky;
    top: 32px;
  }
}
</style>
