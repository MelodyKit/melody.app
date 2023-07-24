<template>
  <div class="flex items-center space-x-4 px-4">
    <button type="button">
      <i class="fa-solid fa-ellipsis w-5 h-auto text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"></i>
    </button>
    <button type="button" @click="back()">
      <i class="fa-solid fa-chevron-left w-2.5 h-auto text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"></i>
    </button>
    <button type="button" @click="forward()">
      <i class="fa-solid fa-chevron-right w-2.5 h-auto text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"></i>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NavigationControls",
  methods: {
    back() {
      this.$router.back();
    },
    forward() {
      this.$router.forward();
    },
  },
});
</script>
