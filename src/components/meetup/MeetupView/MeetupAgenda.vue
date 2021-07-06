<template>
  <div class="meetup-agenda">
    <div v-for="agendaItem in meetup.agenda" :key="agendaItem.id">
      <MeetupAgendaItem :agendaItem="agendaItem"></MeetupAgendaItem>
    </div>
  </div>
</template>

<script>
import MeetupAgendaItem from "./MeetupAgendaItem.vue";

export default {
  name: "MeetupAgenda",

  components: {
    MeetupAgendaItem,
  },

  props: {
    meetup: {
      type: Object,
    },
  },
};
</script>
