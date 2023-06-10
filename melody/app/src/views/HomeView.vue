<template>
  <AppLayout title="Home">
    <p>The home page!</p>
  </AppLayout>
</template>

<script>
import { defineComponent } from "vue";
import AppLayout from "@/components/AppLayout.vue";

export default defineComponent({
  name: "HomeView",
  components: {AppLayout},
});
</script>

