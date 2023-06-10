<template>
  <footer class="flex z-50">
    <div class="hidden lg:flex py-5 px-6 w-full h-full bg-neutral-200 dark:bg-neutral-800">
      <div class="flex items-center justify-start w-1/3">

      </div>
      <div class="flex items-center justify-center w-1/3 gap-x-8">
        <div class="relative">
          <button type="button" @click="toggleShuffle()" :class="[isShuffle ? 'text-melody-blue' : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50']">
            <i class="fa-solid fa-shuffle h-5 w-auto"></i>
          </button>
          <span v-if="isShuffle" class="text-melody-blue">
            <i class="fa-solid fa-circle h-2 w-auto px-2 absolute block"></i>
          </span>
        </div>
        <button type="button">
          <i class="fa-solid fa-backward h-5 w-auto text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-50"></i>
        </button>
        <button type="button" @click="togglePlaying()" class="text-neutral-900 dark:text-neutral-50">
          <span v-if="isPlaying"><i class="fa-solid fa-circle-pause h-9 w-auto"></i></span>
          <span v-else><i class="fa-solid fa-circle-play h-9 w-auto"></i></span>
        </button>
        <button type="button">
          <i class="fa-solid fa-forward h-5 w-auto text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-50"></i>
        </button>
        <div class="relative">
          <button type="button" @click="toggleRepeat()" :class="[isRepeatAny ? 'text-melody-blue' : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50']">
            <span v-if="isRepeatOne">
              <i class="fa-solid fa-repeat-1 h-5 w-auto"></i>
            </span>
            <span v-else>
              <i class="fa-solid fa-repeat h-5 w-auto"></i>
            </span>
          </button>
          <span v-if="isRepeatAny" class="text-melody-blue">
            <i class="fa-solid fa-circle h-2 w-auto px-2 absolute block"></i>
          </span>
        </div>
      </div>
      <div class="flex items-center justify-end w-1/3 gap-x-8">
        <button type="button" @click="viewLyrics()">
          <i class="fa-solid fa-align-justify h-4 w-auto text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-50"></i>
        </button>
        <button type="button" @click="viewQueue()">
          <i class="fa-solid fa-list-ul h-4 w-auto text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-50"></i>
        </button>
        <button type="button" @click="viewDevice()">
          <i class="fa-solid fa-display h-4 w-auto text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-50"></i>
        </button>
        <button type="button" @click="viewFullscreen()">
          <i class="fa-solid fa-up-right-and-down-left-from-center h-4 w-auto text-neutral-600 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-50"></i>
        </button>
      </div>
    </div>
  </footer>
</template>

<script>
import { defineComponent } from "vue";

const NO_REPEAT = 0;
const REPEAT = 1;
const REPEAT_ONE = 2;
const REPEAT_CYCLE = 3;

const VOLUME_OFF = 0;
const VOLUME_LOW = 1;
const VOLUME_NORMAL = 2;
const VOLUME_HIGH = 3;

export default defineComponent({
  name: "PlayerControls",
  data() {
    return {
      shuffle: false,
      playing: false,
      repeat: NO_REPEAT,
      volume: 0.5,
      volume_store: 0.0,
    }
  },
  computed: {
    isShuffle() {
      return this.shuffle;
    },
    isPlaying() {
      return this.playing;
    },
    isRepeat() {
      return this.repeat == REPEAT;
    },
    isRepeatOne() {
      return this.repeat == REPEAT_ONE;
    },
    isRepeatAny() {
      return this.isRepeat || this.isRepeatOne;
    },
    isVolumeHigh() {
      return this.getVolume() == VOLUME_HIGH;
    },
    isVolumeNormal() {
      return this.getVolume() == VOLUME_NORMAL;
    },
    isVolumeLow() {
      return this.getVolume() == VOLUME_LOW;
    },
    isVolumeOff() {
      return this.getVolume() == VOLUME_OFF;
    },
  },
  methods: {
    toggleShuffle() {
      this.shuffle = !this.shuffle;
    },
    togglePlaying() {
      this.playing = !this.playing;
    },
    toggleRepeat() {
      this.repeat = (this.repeat + 1) % REPEAT_CYCLE;
    },
    toggleVolume() {
      if (!this.volume) {
        this.volume = this.volume_store;
      } else {
        this.volume_store = this.volume;
        this.volume = 0.0;
      }
    },
    getVolume() {
      const volume = this.volume;

      if (volume > 0.75) {
        return VOLUME_HIGH;
      } else if (volume > 0.25) {
        return VOLUME_NORMAL;
      } else if (volume > 0.0) {
        return VOLUME_LOW;
      } else {
        return VOLUME_OFF;
      }
    },
    viewQueue() {
    },
    viewLyrics() {
    },
    viewDevice() {
    },
  },
});
</script>

<script setup>
import { appWindow } from "@tauri-apps/api/window";

async function viewFullscreen() {
  await appWindow.setFullscreen(true);
  // ...
}
</script>
