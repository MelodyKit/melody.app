<template>
  <AppLayout title="User">
  </AppLayout>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import AppLayout from "@/components/AppLayout.vue";

export default defineComponent({
  name: "UserView",
  components: {AppLayout},
});
</script>
