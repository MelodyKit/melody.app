<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
      <div class="w-full bg-neutral-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-neutral-800 dark:border-neutral-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <router-link to="/"><img class="w-auto h-10" :src="`${baseUrl}/static/images/gradient.svg`" alt="MelodyKit"/></router-link>
          <h1 class="text-xl text-neutral-900 md:text-2xl dark:text-neutral-50">
            Enter your email to reset your password
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="forgot">
            <div>
              <label for="email" class="block mb-2 text-neutral-900 dark:text-neutral-50">Email</label>
              <input type="email" name="email" v-model="forgotData.email" class="bg-neutral-50 border border-neutral-300 text-neutral-900 sm:text-sm font-mono rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-50" placeholder="email@example.com" required>
            </div>
            <button type="submit" class="w-full text-neutral-900 dark:text-neutral-50 bg-gradient-to-b from-melody-purple to-melody-blue rounded-lg px-5 py-2.5 text-center">Send</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";
import { useRouter } from "vue-router";

import { BASE_URL } from "@/constants";
import { ForgotData } from "@/models/data/forgot";
import { useTokensStore } from "@/stores/tokens";

const baseUrl = computed(() => BASE_URL);

const forgotData = reactive(
  new ForgotData({
    email: null
  })
);

const router = useRouter();

const forgot = async () => {
  const store = useTokensStore();

  await store.forgot(forgotData);

  await router.push("/reset");
}
</script>
