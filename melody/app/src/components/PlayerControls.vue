<template>
  <footer class="flex z-50">
    <div class="hidden lg:flex py-5 px-6 w-full h-full bg-neutral-200 dark:bg-neutral-800">
      <div class="flex items-center justify-start w-1/3"></div>
      <div class="flex items-center justify-center w-1/3 gap-x-8">
        <div class="relative">
          <button
            type="button"
            @click="currentPlayerSettings.toggleShuffle()"
            :class="[
              currentPlayerSettings.isShuffle()
                ? 'text-melody-blue'
                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50',
            ]"
          >
            <i class="fa-solid fa-shuffle h-5 w-auto"></i>
          </button>
          <span v-if="currentPlayerSettings.isShuffle()" class="text-melody-blue">
            <i class="fa-solid fa-circle h-2 w-auto px-2 absolute block"></i>
          </span>
        </div>
        <button type="button">
          <i
            class="fa-solid fa-backward h-5 w-auto text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-50"
          ></i>
        </button>
        <button
          type="button"
          @click="currentPlayerSettings.togglePlaying()"
          class="text-neutral-900 dark:text-neutral-50"
        >
          <span v-if="currentPlayerSettings.isPlaying()"
            ><i class="fa-solid fa-circle-pause h-9 w-auto"></i
          ></span>
          <span v-else><i class="fa-solid fa-circle-play h-9 w-auto"></i></span>
        </button>
        <button type="button">
          <i
            class="fa-solid fa-forward h-5 w-auto text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-50"
          ></i>
        </button>
        <div class="relative">
          <button
            type="button"
            @click="currentPlayerSettings.cycleRepeat()"
            :class="[
              currentPlayerSettings.isRepeat()
                ? 'text-melody-blue'
                : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50',
            ]"
          >
            <span v-if="currentPlayerSettings.isRepeatOne()">
              <i class="fa-solid fa-repeat-1 h-5 w-auto"></i>
            </span>
            <span v-else>
              <i class="fa-solid fa-repeat h-5 w-auto"></i>
            </span>
          </button>
          <span v-if="currentPlayerSettings.isRepeat()" class="text-melody-blue">
            <i class="fa-solid fa-circle h-2 w-auto px-2 absolute block"></i>
          </span>
        </div>
      </div>
      <div class="flex items-center justify-end w-1/3 gap-x-8">
        <button type="button" @click="viewLyrics()">
          <i
            class="fa-solid fa-align-justify h-4 w-auto text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-50"
          ></i>
        </button>
        <button type="button" @click="viewQueue()">
          <i
            class="fa-solid fa-list-ul h-4 w-auto text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-50"
          ></i>
        </button>
        <button type="button" @click="viewDevice()">
          <i
            class="fa-solid fa-display h-4 w-auto text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-50"
          ></i>
        </button>
        <button type="button" @click="viewFullscreen()">
          <i
            class="fa-solid fa-up-right-and-down-left-from-center h-4 w-auto text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-50"
          ></i>
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { PlayerSettings } from "@/api/models/playerSettings";

const currentPlayerSettings = PlayerSettings.default();

// TODO

const viewQueue = () => {};
const viewLyrics = () => {};
const viewDevice = () => {};
const viewFullscreen = () => {};
</script>
