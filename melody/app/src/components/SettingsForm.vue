<template>
  <SwitchGroup>
    <div class="flex items-center px-4 py-2 gap-2">
      <SwitchLabel>Setting</SwitchLabel>
      <Switch
        v-model="enabled"
        :class="enabled ? 'bg-melody-blue' : 'bg-neutral-200 dark:bg-neutral-800'"
        class="relative inline-flex h-6 w-12 items-center rounded-full transition-colors focus:outline-none"
      >
        <span
          :class="enabled ? 'translate-x-7' : 'translate-x-1'"
          class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
        />
      </Switch>
    </div>
  </SwitchGroup>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { Switch, SwitchGroup, SwitchLabel } from "@headlessui/vue";

const enabled = ref(false);
</script>
