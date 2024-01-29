<template>
  <Menu v-if="isLoaded()" as="div" :class="['relative w-fit text-left']">
    <MenuButton class="inline-flex w-full items-center justify-center rounded-full bg-neutral-200 dark:bg-black text-neutral-900 dark:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none gap-x-2 pr-4">
      <img class="h-10 w-auto rounded-full" :src="`${apiUrl}/users/${self.id}/image`"/>
      <span>{{ self.name }}</span>
    </MenuButton>
    <MenuItems class="absolute py-1 px-1 mt-2 w-52 divide-y divide-neutral-100 dark:divide-neutral-700 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 focus:outline-none right-2">
      <div>
        <MenuItem v-slot="{ active }">
          <router-link to="/me" :class="[active ? 'bg-neutral-100 dark:bg-neutral-700' : '', 'block rounded-sm px-4 py-2']">Profile</router-link>
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <router-link to="/me/settings" :class="[active ? 'bg-neutral-100 dark:bg-neutral-700' : '', 'block rounded-sm px-4 py-2']">Settings</router-link>
        </MenuItem>
      </div>
      <div>
        <MenuItem v-slot="{ active }">
          <button type="button" @click="logout()" :class="[active ? 'bg-neutral-100 dark:bg-neutral-700' : '', 'block rounded-sm px-4 py-2 w-full text-left']">Log out</button>
        </MenuItem>
      </div>
    </MenuItems>
  </Menu>
</template>

<script setup lang="ts">
import { computed } from "vue";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

import { isLoaded } from "@/checks";
import { API_URL } from "@/constants";
import { useSelfStore } from "@/stores/self";
import { useTokensStore } from "@/stores/tokens";

const apiUrl = computed(() => API_URL);

const self = computed(() => {
  const store = useSelfStore();

  return store.stateSelf;
});

const logout = async () => {
  const tokensStore = useTokensStore();

  await tokensStore.logout();

  const selfStore = useSelfStore();

  selfStore.removeAll();
};

const setup = async () => {
  const store = useSelfStore();

  if (!store.loaded) {
    await store.fetchAll();
  }
}

setup();
</script>
