<template>
  <VerificationForm/>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import VerificationForm from "@/components/VerificationForm.vue";

export default defineComponent({
  name: "VerificationView",
  components: {VerificationForm},
});
</script>
