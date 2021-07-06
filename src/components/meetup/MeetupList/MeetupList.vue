<template>
  <div>
    <div class="meetups-list fade-list">
      <meetup-list-item
        v-for="meetup in meetups"
        :meetup="meetup"
        :key="meetup.id"
      />
    </div>
  </div>
</template>

<script>
import MeetupListItem from "./MeetupsListItem.vue";

export default {
  name: "MeetupList",

  components: {
    MeetupListItem,
  },

  props: {
    meetups: {
      type: Array,
    },
  },
};
</script>
