<template>
  <div>
    <ul class="info-list">
      <li>
        <AppIcon class="icon info-list__icon" icon="user" />
        {{ meetup.organizer }}
      </li>
      <li>
        <AppIcon class="icon info-list__icon" icon="map" />
        {{ meetup.place }}
      </li>
      <li>
        <AppIcon class="icon info-list__icon" icon="cal-lg" />
        <time :datetime="robotDate">{{ humanDate }}</time>
      </li>
    </ul>

    <div class="meetup__aside-buttons">
      <router-link
        v-if="meetup.organizing"
        :to="to"
        class="button button_primary"
        >Редактировать</router-link
      >
      <button
        v-if="meetup.organizing"
        @click="$emit('delete')"
        class="button button_danger"
      >
        Удалить
      </button>
      <button
        v-if="!meetup.organizing && !meetup.attending"
        class="button button_primary"
        @click="$emit('attend')"
      >
        Участвовать
      </button>
      <button
        v-if="!meetup.organizing && meetup.attending"
        class="button button_secondary"
        @click="$emit('cancel:attend')"
      >
        Отменить участие
      </button>
    </div>
  </div>
</template>

<script>
import { EDIT_MEETUP_ROUTE_NAME } from "@/js/constants";
import {
  getEngStringDateFromDate,
  getRusStringDateFromDate,
} from "@/js/dateFunctions";
import AppIcon from "@/components/AppIcon";

export default {
  name: "MeetupInfo",

  components: {
    AppIcon,
  },

  props: {
    meetup: {
      required: true,
    },
  },

  computed: {
    to() {
      return {
        name: EDIT_MEETUP_ROUTE_NAME,
        params: { meetupId: this.meetup.id },
      };
    },

    humanDate() {
      // const options = { year: "numeric", month: "long", day: "numeric" };
      // return this.meetup.date.toLocaleDateString("ru-RU", options);
      return getRusStringDateFromDate(this.meetup.date);
    },

    robotDate() {
      return getEngStringDateFromDate(this.meetup.date);
    },
  },
};
</script>
