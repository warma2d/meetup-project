<template>
  <div>
    <FilterPanel
      @meetupType:updated="meetupTimeFilter = $event"
      @searchWord:updated="searchWord = $event"
      @view:updated="view = $event"
    ></FilterPanel>

    <MeetupList
      v-if="filteredMeetups && view === 'list'"
      :meetups="filteredMeetups"
    ></MeetupList>

    <MeetupCalendar
      v-if="filteredMeetups && view === 'calendar'"
      :meetups="filteredMeetups"
    ></MeetupCalendar>
  </div>
</template>

<script>
import MeetupList from "@/components/meetup/MeetupList/MeetupList.vue";
import FilterPanel from "@/components/meetup/MeetupList/FilterPanel";
import MeetupCalendar from "@/components/meetup/MeetupCalendar/MeetupCalendar";
import {
  HIDE_SPINNER_EVENT_NAME,
  SHOW_SPINNER_EVENT_NAME,
} from "@/js/constants";
import { MeetupApi } from "@/js/api/MeetupApi";
import { ResponseHandler } from "@/mixins/ResponseHandler";
import {
  FILTER_BY_TIME_ALL_MEETUPS,
  FILTER_BY_TIME_FUTURE_MEETUPS,
  FILTER_BY_TIME_PAST_MEETUPS,
  FILTER_BY_TYPE_ALL_MEETUPS,
  FILTER_BY_TYPE_ORGANIZING_MEETUPS,
  FILTER_BY_TYPE_ATTENDING_MEETUPS,
} from "@/components/meetup/MeetupList/filterPanelConstants";

export default {
  name: "HomePage",

  components: {
    MeetupCalendar,
    MeetupList,
    FilterPanel,
  },

  mixins: [ResponseHandler],

  metaInfo: {
    title: "Главная страница",
  },

  props: {
    meetupTypeFilter: {
      type: String,
      default: FILTER_BY_TYPE_ALL_MEETUPS,
    },
  },

  data() {
    return {
      meetups: [],
      meetupTimeFilter: FILTER_BY_TIME_ALL_MEETUPS,
      searchWord: null,
      view: null,
      filteredMeetups: [],
    };
  },

  methods: {
    filterMeetups() {
      let filteredMeetups = this.filterMeetupsByType(this.meetups);
      filteredMeetups = this.filterMeetupsByTime(filteredMeetups);
      this.filteredMeetups = this.filterMeetupsBySearchWord(filteredMeetups);
    },

    filterMeetupsByType(meetups) {
      return meetups.filter((meetup) => {
        if (this.meetupTypeFilter === FILTER_BY_TYPE_ORGANIZING_MEETUPS) {
          return meetup.organizing === true;
        } else if (this.meetupTypeFilter === FILTER_BY_TYPE_ATTENDING_MEETUPS) {
          return meetup.attending === true;
        } else if (this.meetupTypeFilter === FILTER_BY_TYPE_ALL_MEETUPS) {
          return true;
        }
      });
    },

    filterMeetupsByTime(meetups) {
      const nowDate = new Date().getTime();

      return meetups.filter((meetup) => {
        if (this.meetupTimeFilter === FILTER_BY_TIME_FUTURE_MEETUPS) {
          return meetup.date > nowDate;
        } else if (this.meetupTimeFilter === FILTER_BY_TIME_PAST_MEETUPS) {
          return meetup.date < nowDate;
        } else if (this.meetupTimeFilter === FILTER_BY_TIME_ALL_MEETUPS) {
          return true;
        }
      });
    },

    filterMeetupsBySearchWord(meetups) {
      if (this.searchWord === "" || this.searchWord === null) {
        return meetups;
      }

      return meetups.filter((meetup) => {
        return (
          meetup.organizer.indexOf(this.searchWord) !== -1 ||
          meetup.place.indexOf(this.searchWord) !== -1
        );
      });
    },
  },

  beforeCreate() {
    this.$root.$emit(SHOW_SPINNER_EVENT_NAME);

    new MeetupApi()
      .getMeetups()
      .then((res) => {
        this.meetups = res.data;
      })
      .catch((res) => {
        this.handleErrorResponse(res);
      })
      .finally(() => {
        this.$root.$emit(HIDE_SPINNER_EVENT_NAME);
      });
  },

  watch: {
    meetups: {
      immediate: true,
      handler() {
        this.filterMeetups();
      },
    },

    meetupTypeFilter: {
      handler() {
        this.filterMeetups();
      },
    },

    meetupTimeFilter: {
      handler() {
        this.filterMeetups();
      },
    },

    searchWord: {
      handler() {
        this.filterMeetups();
      },
    },
  },
};
</script>

<style></style>
