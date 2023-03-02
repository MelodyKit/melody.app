<template>
  <Menu as="div" :class="['absolute inline-block text-left top-4', isApp ? 'right-40' : 'right-4']">
    <MenuButton class="inline-flex w-full items-center justify-center rounded-full bg-neutral-200 dark:bg-black text-neutral-900 dark:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none gap-x-2 pr-4">
      <img class="h-10 w-auto rounded-full" :src="`https://melodykit.app/static/images/user.${user.id}.png`"/>
      <span>{{ user.name }}</span>
    </MenuButton>
    <MenuItems class="absolute py-1 px-1 mt-2 w-52 divide-y divide-neutral-100 dark:divide-neutral-700 rounded-md bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50 focus:outline-none right-0">
      <div>
        <MenuItem v-slot="{ active }">
          <a href="/me" :class="[active ? 'bg-neutral-100 dark:bg-neutral-700' : '', 'block rounded-sm px-4 py-2']">Profile</a>
        </MenuItem>
        <MenuItem v-slot="{ active }">
          <a href="/settings" :class="[active ? 'bg-neutral-100 dark:bg-neutral-700' : '', 'block rounded-sm px-4 py-2']">Settings</a>
        </MenuItem>
      </div>
      <div>
        <MenuItem v-slot="{ active }">
          <a href="/logout" :class="[active ? 'bg-neutral-100 dark:bg-neutral-700' : '', 'block rounded-sm px-4 py-2']">Log out</a>
        </MenuItem>
      </div>
    </MenuItems>
  </Menu>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SmallMenu",
  computed: {
    user() {
      return this.$store.getters.stateUser;
    },
    isApp() {
      return Boolean(window.__TAURI_METADATA__);
    },
  },
});
</script>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
</script>