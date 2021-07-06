export const INDEX_ROUTE_NAME = "index";
export const MEETUPS_ROUTE_NAME = "meetups";
export const ATTENDING_MEETUPS_ROUTE_NAME = "attending-meetups";
export const ORGANIZING_MEETUPS_ROUTE_NAME = "organizing-meetups";
export const MEETUP_DESCRIPTION_ROUTE_NAME = "meetup-description";
export const MEETUP_AGENDA_ROUTE_NAME = "meetup-agenda";
export const CREATE_MEETUP_ROUTE_NAME = "create-meetup";
export const EDIT_MEETUP_ROUTE_NAME = "edit-meetup";
export const MEETUP_ROUTE_NAME = "meetup";
export const LOGIN_ROUTE_NAME = "login";
export const REGISTER_ROUTE_NAME = "register";
export const NOT_FOUND_ROUTE_NAME = "404";

export const GUEST_ROLE_NAME = "guest";
export const USER_ROLE_NAME = "user";

export const GLOBAL_TOASTER_ERROR_EVENT_NAME = "toaster:error";
export const GLOBAL_TOASTER_SUCCESS_EVENT_NAME = "toaster:ok";
export const SHOW_SPINNER_EVENT_NAME = "spinner:show";
export const HIDE_SPINNER_EVENT_NAME = "spinner:hide";

export const NAV_OPTIONS = [
  {
    name: INDEX_ROUTE_NAME,
    text: "Митапы",
    requireRole: [GUEST_ROLE_NAME, USER_ROLE_NAME],
  },

  {
    name: ATTENDING_MEETUPS_ROUTE_NAME,
    text: "Участвуемые митапы",
    requireRole: [USER_ROLE_NAME],
  },

  {
    name: ORGANIZING_MEETUPS_ROUTE_NAME,
    text: "Организуемые митапы",
    requireRole: [USER_ROLE_NAME],
  },

  {
    name: CREATE_MEETUP_ROUTE_NAME,
    text: "Создать митап",
    requireRole: [USER_ROLE_NAME],
  },

  {
    name: LOGIN_ROUTE_NAME,
    text: "Войти",
    requireRole: [GUEST_ROLE_NAME],
  },

  {
    name: REGISTER_ROUTE_NAME,
    text: "Зарегистрироваться",
    requireRole: [GUEST_ROLE_NAME],
  },
];
