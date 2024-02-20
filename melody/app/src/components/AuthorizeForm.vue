<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
      <div class="w-full bg-neutral-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-neutral-800 dark:border-neutral-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <img class="w-auto h-10" :src="`${baseUrl}/static/images/gradient.svg`" alt="MelodyKit"/>
          <h1 class="text-xl text-neutral-900 md:text-2xl dark:text-neutral-50">
            Authorize an external application
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="authorize">
            <button type="submit" class="w-full text-neutral-900 dark:text-neutral-50 bg-gradient-to-b from-melody-purple to-melody-blue rounded-lg px-5 py-2.5 text-center">Authorize</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import axios from "axios";

import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { BASE_URL } from "@/constants";
import { useTokensStore } from "@/stores/tokens";
import { authorizationHeader } from "@/authorization";

const baseUrl = computed(() => BASE_URL);

const router = useRouter();
const route = useRoute();

const authorize = async () => {
  const tokens = useTokensStore().stateTokens;

  const redirectUri = route.query.redirect_uri;

  console.log(redirectUri instanceof String);

  if (typeof redirectUri != "string") {
    throw new Error("invalid redirect URI");
  }

  const {data} = await axios.postForm(
    "/authorize", route.query, {headers: authorizationHeader(tokens)}
  );

  const parameters = new URLSearchParams(data);

  location.href = `${redirectUri}?${parameters}`;
}
</script>
