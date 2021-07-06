import { httpClient } from "./httpClient";

export class MeetupApi {
  getMeetups() {
    return httpClient.get("/meetups");
  }

  getMeetup(id) {
    return httpClient.get("/meetups/" + id);
  }

  updateMeetup(meetup) {
    return httpClient.put("/meetups/" + meetup.id, meetup);
  }

  createMeetup(meetup) {
    return httpClient.post("/meetups/", meetup);
  }

  deleteMeetup(id) {
    return httpClient.delete("/meetups/" + id);
  }

  attendMeetup(id) {
    return httpClient.put("/meetups/" + id + "/participation");
  }

  cancelAttendMeetup(id) {
    return httpClient.delete("/meetups/" + id + "/participation");
  }
}
