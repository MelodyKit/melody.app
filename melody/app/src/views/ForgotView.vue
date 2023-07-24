<template>
  <ForgotForm/>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ForgotForm from "@/components/ForgotForm.vue";

export default defineComponent({
  name: "ForgotView",
  components: {ForgotForm},
});
</script>
