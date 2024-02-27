<template>
  <Menu as="div" class="relative w-fit text-left" v-if="self">
    <MenuButton class="inline-flex w-full items-center justify-center rounded-full bg-neutral-200 dark:bg-black text-neutral-900 dark:text-neutral-50 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none gap-x-2 pr-4">
      <img class="h-10 w-auto rounded-full" :src="image || ICON_URL"/>
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
import { useRouter } from "vue-router";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

import useSWRV from "swrv";

import { ICON_URL } from "@/api/constants";

import { useTokensStore } from "@/stores/tokens";

import { constructUserImage } from "@/images";
import { selfImageKey, selfKey } from "@/keys";

const store = useTokensStore();
const client = store.stateClient;

const { data: self } = useSWRV(
  selfKey(),
  async key => await client.fetchSelf(),
);

const { data: image } = useSWRV(
  selfImageKey(),
  async key => await client.fetchSelfImage().then(constructUserImage),
);

const router = useRouter();

const logout = async () => {
  const store = useTokensStore();

  await store.revoke();

  await router.push("/");
};
</script>
