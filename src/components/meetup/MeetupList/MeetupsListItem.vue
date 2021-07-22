<template>
  <router-link :to="toMeetup" class="meetups-list__item">
    <div class="meetups-list__col">
      <div class="meetups-list__cover" :style="coverStyle">
        <h5>{{ meetup.title }}</h5>
      </div>
    </div>
    <div class="meetups-list__col">
      <div class="meetups-list__description">
        <span
          v-if="meetup.attending"
          class="meetups-list__badge meetups-list__badge_success"
          >Участвую</span
        >
        <span v-if="meetup.organizing" class="meetups-list__badge"
          >Организую</span
        >
        <ul class="info-list">
          <li>
            <AppIcon class="info-list__icon" icon="user" />
            {{ meetup.organizer }}
          </li>
          <li>
            <AppIcon class="info-list__icon" icon="map" />
            {{ meetup.place }}
          </li>
          <li>
            <AppIcon class="info-list__icon" icon="cal-lg" />
            <time :datetime="enStringDate">{{ rusStringDate }}</time>
          </li>
        </ul>
      </div>
    </div>
  </router-link>
</template>

<script>
import AppIcon from "@/components/AppIcon";
import {
  getRusStringDateFromDate,
  getEngStringDateFromDate,
} from "@/js/dateFunctions";
import { getImageUrlByImageId } from "@/js/meetupFunctions";
import { MEETUP_ROUTE_NAME } from "@/js/constants";

export default {
  name: "MeetupListItem",
  components: { AppIcon },
  props: {
    meetup: {
      required: true,
      type: Object,
    },
  },

  computed: {
    coverStyle() {
      return this.meetup.imageId
        ? {
            "--bg-url": `url('${getImageUrlByImageId(this.meetup.imageId)}')`,
          }
        : {};
    },

    toMeetup() {
      return { name: MEETUP_ROUTE_NAME, params: { meetupId: this.meetup.id } };
    },

    rusStringDate() {
      return getRusStringDateFromDate(this.meetup.date);
    },

    enStringDate() {
      return getEngStringDateFromDate(this.meetup.date);
    },
  },
};
</script>
