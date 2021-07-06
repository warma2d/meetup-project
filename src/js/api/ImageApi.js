import { httpClient } from "./httpClient";

export class ImageApi {
  uploadImage(imageFile) {
    let formData = new FormData();
    formData.append("file", imageFile);
    return httpClient.post("/images/upload", formData);
  }
}
