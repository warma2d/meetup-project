<template>
  <div>
    <MeetupCover :link="imageLink" :title="meetup.title"></MeetupCover>

    <div class="container">
      <div class="meetup">
        <div class="meetup__content">
          <ContentTabs :tabs="tabs">
            <router-view :meetup="meetup" />
          </ContentTabs>
        </div>
        <div class="meetup__aside">
          <MeetupInfo
            @delete="$emit('delete')"
            @attend="$emit('attend')"
            @cancel:attend="$emit('cancel:attend')"
            :meetup="meetup"
          ></MeetupInfo>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MeetupCover from "./MeetupCover.vue";
import MeetupInfo from "./MeetupInfo.vue";
import ContentTabs from "@/components/ContentTabs.vue";
import { getImageUrlByImageId } from "@/js/meetupFunctions";

export default {
  name: "MeetupView",

  components: {
    MeetupCover,
    MeetupInfo,
    ContentTabs,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      tabs: [
        { id: 1, to: { name: "meetup-description" }, text: "Описание" },
        { id: 2, to: { name: "meetup-agenda" }, text: "Программа" },
      ],
    };
  },

  computed: {
    imageLink() {
      return getImageUrlByImageId(this.meetup.imageId);
    },

    meetupDate() {
      return new Date(this.meetup.date);
    },
  },
};
</script>
