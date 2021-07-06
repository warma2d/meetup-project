<template>
  <div>
    <p class="meetup-description" v-html="meetup.description"></p>
  </div>
</template>

<script>
export default {
  name: "MeetupDescription",

  props: {
    meetup: {
      type: Object,
    },
  },
};
</script>
