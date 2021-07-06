<template>
  <div>
    <TheHeader></TheHeader>

    <main class="main">
      <div class="container">
        <slot></slot>
      </div>
    </main>

    <TheFooter></TheFooter>
  </div>
</template>

<script>
import TheHeader from "./TheHeader";
import TheFooter from "./TheFooter";

export default {
  name: "BaseLayout",

  components: {
    TheHeader,
    TheFooter,
  },
};
</script>

<style scoped>
main {
  flex: 1 0 auto;
}
</style>
