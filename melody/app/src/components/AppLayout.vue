<template>
  <div class="flex flex-col h-screen bg-white dark:bg-black" v-if="isAuthorized()">
    <div class="flex grow justify-between z-40">
      <SideBar/>
      <div class="flex flex-col grow">
        <div class="flex flex-col grow bg-neutral-50 dark:bg-neutral-900">
          <div class="flex justify-between items-center w-full px-4 py-2 gap-2">
            <h1 class="text-3xl">{{ title }}</h1>
            <SmallMenu/>
          </div>
          <div class="grow">
            <slot/>
          </div>
        </div>
      </div>
    </div>
    <!--- <PlayerControls/> -->
  </div>
  <LoginForm v-else/>
</template>

<script setup lang="ts">
import { isAuthorized } from "@/checks";

import LoginForm from "@/components/LoginForm.vue";
import PlayerControls from "@/components/PlayerControls.vue";
import SmallMenu from "@/components/SmallMenu.vue";
import SideBar from "@/components/SideBar.vue";

const props = defineProps({
  title: String
});
</script>
