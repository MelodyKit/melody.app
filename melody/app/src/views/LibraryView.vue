<template>
  <AppLayout title="Library">
    <template #header>
      This is an example header thingy that is outside the route view
    </template>
    <p>Library!!!!!!!!</p>
  </AppLayout>
</template>

<script>
import { defineComponent } from "vue";
import AppLayout from "@/components/AppLayout.vue";

export default defineComponent({
  name: "LibraryView",
  components: {AppLayout},
});
</script>

