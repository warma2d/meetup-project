<template>
  <div v-if="isShowSpinner" class="spinnerDiv">
    <img :src="spinnerSrc" />
    <div class="loadingText">Загрузка...</div>
  </div>
</template>

<script>
export default {
  name: "AppSpinner",

  data() {
    return {
      isShowSpinner: false,
    };
  },

  computed: {
    spinnerSrc() {
      return require("./loading.gif");
    },
  },

  methods: {
    show() {
      this.isShowSpinner = true;
    },

    hide() {
      this.isShowSpinner = false;
    },
  },
};
</script>

<style scoped>
.spinnerDiv {
  width: 100%;
  height: 100%;
  background-color: white;
  text-align: center;
  position: fixed;
  z-index: 9999;
}

.spinnerDiv img {
}

.loadingText {
  font-size: 30px;
  color: black;
  position: relative;
  top: -200px;
}
</style>
