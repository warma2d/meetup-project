import Vue from "vue";
import VueRouter from "vue-router";
const HomePage = () => import("@/pages/HomePage");
const NotFoundPage = () => import("@/pages/NotFoundPage");
const MeetupPage = () => import("@/pages/MeetupPage");
const MeetupDescription = () =>
  import("@/components/meetup/MeetupView/MeetupDescription");
const MeetupAgenda = () =>
  import("@/components/meetup/MeetupView/MeetupAgenda");
const CreateMeetupPage = () => import("@/pages/CreateMeetupPage");
const LoginPage = () => import("@/pages/LoginPage");
import {
  INDEX_ROUTE_NAME,
  MEETUPS_ROUTE_NAME,
  MEETUP_DESCRIPTION_ROUTE_NAME,
  MEETUP_AGENDA_ROUTE_NAME,
  CREATE_MEETUP_ROUTE_NAME,
  EDIT_MEETUP_ROUTE_NAME,
  NOT_FOUND_ROUTE_NAME,
  LOGIN_ROUTE_NAME,
  REGISTER_ROUTE_NAME,
  ORGANIZING_MEETUPS_ROUTE_NAME,
  ATTENDING_MEETUPS_ROUTE_NAME,
} from "@/js/constants";
import RegisterPage from "@/pages/RegisterPage";
import {
  FILTER_BY_TYPE_ALL_MEETUPS,
  FILTER_BY_TYPE_ATTENDING_MEETUPS,
  FILTER_BY_TYPE_ORGANIZING_MEETUPS,
} from "@/components/meetup/MeetupList/filterPanelConstants";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: INDEX_ROUTE_NAME,
    component: HomePage,
  },

  {
    path: "/meetups",
    name: MEETUPS_ROUTE_NAME,
    component: HomePage,
    props: {
      meetupTypeFilter: FILTER_BY_TYPE_ALL_MEETUPS,
    },
  },

  {
    path: "/meetups/organizing",
    name: ORGANIZING_MEETUPS_ROUTE_NAME,
    component: HomePage,
    props: {
      meetupTypeFilter: FILTER_BY_TYPE_ORGANIZING_MEETUPS,
    },
  },

  {
    path: "/meetups/attending",
    name: ATTENDING_MEETUPS_ROUTE_NAME,
    component: HomePage,
    props: {
      meetupTypeFilter: FILTER_BY_TYPE_ATTENDING_MEETUPS,
    },
  },

  {
    path: "/meetups/:meetupId(\\d+)",
    redirect: (to) => ({ name: "meetup-description", params: to.params }),
    meta: {
      saveScrollPosition: true,
    },
    name: "meetup",
    props: true,
    component: MeetupPage,
    children: [
      {
        path: "description",
        name: MEETUP_DESCRIPTION_ROUTE_NAME,
        props: true,
        component: MeetupDescription,
      },
      {
        path: "agenda",
        name: MEETUP_AGENDA_ROUTE_NAME,
        props: true,
        component: MeetupAgenda,
      },
    ],
  },

  {
    path: "/meetup/edit/:meetupId(\\d+)",
    name: EDIT_MEETUP_ROUTE_NAME,
    props: true,
    component: CreateMeetupPage,
  },

  {
    path: "/meetup/create",
    name: CREATE_MEETUP_ROUTE_NAME,
    component: CreateMeetupPage,
  },

  {
    path: "/login",
    name: LOGIN_ROUTE_NAME,
    component: LoginPage,
  },

  {
    path: "/register",
    name: REGISTER_ROUTE_NAME,
    component: RegisterPage,
  },

  {
    path: "*",
    name: NOT_FOUND_ROUTE_NAME,
    component: NotFoundPage,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }

    if (to.hash) {
      return {
        selector: to.hash,
      };
    }

    if (
      to.matched.some((route) => route.meta.saveScrollPosition) &&
      from.matched.some((route) => route.meta.saveScrollPosition)
    ) {
      return false;
    }

    return { x: 0, y: 0 };
  },
});

export default router;
