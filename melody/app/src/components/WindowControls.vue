<template>
  <div data-tauri-drag-region class="flex justify-end select-none">
    <div @click="control(MINIMIZE)" class="px-4 py-1 bg-white dark:bg-black hover:bg-neutral-200 dark:hover:bg-neutral-800">
      <i class="fa-solid fa-minus"></i>
    </div>
    <div @click="control(RESTORE)" class="px-4 py-1 bg-white dark:bg-black hover:bg-neutral-200 dark:hover:bg-neutral-800">
      <i class="fa-solid fa-window-restore"></i>
    </div>
    <div @click="control(CLOSE)" class="px-4 py-1 bg-white dark:bg-black hover:bg-red-600">
      <i class="fa-solid fa-xmark"></i>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "WindowControls"
});
</script>

<script setup>
import { appWindow } from "@tauri-apps/api/window";

const MINIMIZE = 0;
const RESTORE = 1;
const CLOSE = 2;

async function control(mode) {
  switch (mode) {
    case MINIMIZE:
      await appWindow.minimize();
      break;

    case RESTORE:
      await appWindow.toggleMaximize();
      break;

    case CLOSE:
      await appWindow.close();
      break;
  }
}
</script>
