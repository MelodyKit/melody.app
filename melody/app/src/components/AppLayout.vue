<template>
  <div class="flex flex-col h-screen bg-black" v-if="isAuthorized()">
    <header data-tauri-drag-region class="flex items-center justify-between">
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
      <WindowControls v-if="isApp()"/>
    </header>
    <div class="flex grow justify-between z-40">
      <SideBar/>
      <div class="flex flex-col grow">
        <div class="flex flex-col grow rounded-tl-lg dark:bg-neutral-900">
          <div class="flex justify-between items-center w-full px-4 py-2 gap-2">
            <h1 class="font-bold text-3xl">{{ title }}</h1>
            <div class="flex grow">
              <slot name="header"/>
            </div>
            <SmallMenu/>
          </div>
          <div class="grow" :class="{'p-4': decoration}">
            <slot/>
          </div>
        </div>
      </div>
    </div>
    <PlayerControls/>
  </div>
  <LoginForm v-else/>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppLayout",
  props: {
    title: String,
    decoration: {
      type: Boolean,
      default: true
    }
  },
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

<script setup>
import LoginForm from "../components/LoginForm.vue";
import { isAuthorized, isApp } from "@/util.js";
import PlayerControls from "@/components/PlayerControls.vue";
import SmallMenu from "@/components/SmallMenu.vue";
import SideBar from "@/components/SideBar.vue";
import WindowControls from "@/components/WindowControls.vue";
</script>
