<template>
  <AppLayout title="Search">
    <template #header>
      <input type="text" class="rounded-full px-4 py-1 dark:bg-neutral-800 placeholder-neutral-500" placeholder="Search"/>
    </template>
    <p>Welcome to da search page!!!</p>
  </AppLayout>
</template>

<script>
import { defineComponent } from "vue";
import AppLayout from "@/components/AppLayout.vue";

export default defineComponent({
  name: "SearchView",
  components: {AppLayout},
});
</script>

