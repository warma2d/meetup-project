<template>
  <div class="image-uploader">
    <label
      @click="clearImage"
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': isLoading }"
      :style="coverStyle"
    >
      <span>{{ title }}</span>
      <input
        @change="handleInput"
        ref="imageInput"
        type="file"
        accept="image/*"
        class="form-control-file"
      />
    </label>
  </div>
</template>

<script>
import { getImageUrlByImageId } from "@/js/meetupFunctions";
import { ImageApi } from "@/js/api/ImageApi";
import { ResponseHandler } from "@/mixins/ResponseHandler";
import {
  GLOBAL_TOASTER_ERROR_EVENT_NAME,
  MAX_ALLOW_UPLOAD_IMAGE_BYTES,
} from "@/js/constants";

export default {
  name: "ImageUploader",

  mixins: [ResponseHandler],

  computed: {
    isLoadImage() {
      return this.imageId === null;
    },

    coverStyle() {
      return this.imageId
        ? {
            "--bg-image": "url(" + getImageUrlByImageId(this.imageId) + ")",
          }
        : undefined;
    },

    title() {
      if (this.isLoading) {
        return "Загрузка...";
      } else if (this.isLoadImage) {
        return "Загрузить изображение";
      } else {
        return "Удалить изображение";
      }
    },
  },

  data() {
    return {
      isLoading: false,
    };
  },

  methods: {
    clearImage(event) {
      if (this.imageId) {
        this.$emit("change", null);
        this.$refs.imageInput.value = "";
        event.preventDefault();
      }
    },

    handleInput(event) {
      if (event.target.files[0] !== undefined) {
        this.isLoading = true;
        let file = event.target.files[0];

        if (file.size > MAX_ALLOW_UPLOAD_IMAGE_BYTES) {
          this.$root.$emit(
            GLOBAL_TOASTER_ERROR_EVENT_NAME,
            "Ошибка! Максимальный размер файла: " +
              MAX_ALLOW_UPLOAD_IMAGE_BYTES +
              " байт"
          );
          this.isLoading = false;
          return;
        }

        new ImageApi()
          .uploadImage(file)
          .then((res) => {
            if (res.data.id !== undefined) {
              this.$emit("change", res.data.id);
            } else {
              this.$emit("change", null);
            }
            this.isLoading = false;
          })
          .catch((res) => {
            this.handleErrorResponse(res);
            this.isLoading = false;
          });
      } else {
        this.$emit("change", null);
      }
    },
  },

  props: {
    imageId: {
      type: Number,
      default: null,
    },
  },

  model: {
    prop: "imageId",
    event: "change",
  },
};
</script>

<style scoped>
.image-uploader .form-control-file {
  opacity: 0;
  height: 0;
}

.image-uploader .image-uploader__preview {
  --bg-image: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    var(--bg-image);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader .image-uploader__preview > span {
  color: var(--white);
  font-family: "Nunito", sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader .image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader .image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
