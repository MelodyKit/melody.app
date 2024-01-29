<template>
  <nav class="flex">
    <div class="hidden bg-neutral-50 dark:bg-black lg:block w-full px-4 py-2">
      <div class="divide-y divide-neutral-200 dark:divide-neutral-700">
        <div>
          <div class="pb-4">
            <div class="flex items-center px-2 pb-4 gap-x-4">
              <button type="button" @click="router.back()">
                <i class="fa-solid fa-arrow-left w-5 h-auto text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"></i>
              </button>
              <button type="button" @click="router.forward()">
                <i class="fa-solid fa-arrow-right w-5 h-auto text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50"></i>
              </button>
            </div>
            <router-link :class="['flex items-center px-2 pb-4 gap-x-4', isHome ? 'text-melody-blue' : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50']" to="/">
              <i class="fa-solid fa-rotate w-5 h-auto"></i>
              <span class="text-md">Home</span>
            </router-link>
            <router-link :class="['flex items-center px-2 pb-4 gap-x-4', isSearch ? 'text-melody-blue' : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50']" to="/search">
              <i class="fa-solid fa-magnifying-glass w-5 h-auto"></i>
              <span class="text-md">Search</span>
            </router-link>
            <router-link :class="['flex items-center px-2 pb-4 gap-x-4', isLibrary ? 'text-melody-blue' : 'text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50']" to="/me/library">
              <i class="fa-solid fa-book w-5 h-auto"></i>
              <span class="text-md">Library</span>
            </router-link>
          </div>
          <div class="pb-4">
            <button class="flex items-center px-2 pb-4 gap-x-4 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50">
              <i class="fa-solid fa-plus w-5 h-auto"></i>
              <span class="text-md">Create Playlist</span>
            </button>
            <router-link class="flex items-center px-2 pb-4 gap-x-4 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50" to="/me/tracks">
              <i class="fa-solid fa-heart w-5 h-auto"></i>
              <span class="text-md">Liked Tracks</span>
            </router-link>
          </div>
        </div>
        <!--
        <div v-if="userPlaylists && userPlaylists.length" class="pt-4">
          <router-link v-for="userPlaylist in userPlaylists" v-bind:key="userPlaylist" class="px-2 pb-4 text-md text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-50" :to="`/playlists/${userPlaylist.id}`">
            {{ userPlaylist.name }}
          </router-link>
        </div>
        -->
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const HOME = "/";
const SEARCH = "/search";
const LIBRARY = "/me/library";

const router = useRouter();
const route = useRoute();

const isHome = computed(() => route.path == HOME);
const isSearch = computed(() => route.path == SEARCH);
const isLibrary = computed(() => route.path == LIBRARY);
</script>
