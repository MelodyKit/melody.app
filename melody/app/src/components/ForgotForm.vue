<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
      <div
        class="w-full bg-neutral-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-neutral-800 dark:border-neutral-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <router-link to="/"
            ><img class="w-auto h-10" :src="GRADIENT_URL" alt="MelodyKit"
          /></router-link>
          <h1 class="text-xl text-neutral-900 md:text-2xl dark:text-neutral-50">
            Enter your email to reset your password
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="forgot">
            <div>
              <label for="email" class="block mb-2 text-neutral-900 dark:text-neutral-50"
                >Email</label
              >
              <input
                type="email"
                name="email"
                v-model="forgotForm.email"
                class="bg-neutral-50 border border-neutral-300 text-neutral-900 sm:text-sm font-mono rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-50 focus:outline-none"
                placeholder="email@example.com"
                required
              />
            </div>
            <div>
              <label for="code" class="block mb-2 text-neutral-900 dark:text-neutral-50"
                >Code</label
              >
              <input
                type="text"
                name="code"
                v-model="forgotForm.code"
                class="bg-neutral-50 border border-neutral-300 text-neutral-900 sm:text-sm font-mono rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-50 focus:outline-none"
                inputmode="numeric"
                autocomplete="one-time-code"
              />
            </div>
            <button
              type="submit"
              class="w-full text-neutral-900 dark:text-neutral-50 bg-gradient-to-b from-melody-purple to-melody-blue rounded-lg px-5 py-2.5 text-center"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";

import { GRADIENT_URL } from "@/api/constants";
import { useTokensStore } from "@/stores/tokens";
import { type ForgotForm, forgotFormIntoData } from "@/forms/forgot";

const forgotForm: ForgotForm = reactive({ email: null, code: null });

const router = useRouter();

const forgot = async () => {
  const client = useTokensStore().stateClient;

  const forgotData = forgotFormIntoData(forgotForm);

  await client.forgot(forgotData);

  await router.push("/reset");
};
</script>
