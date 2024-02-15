<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
      <div class="w-full bg-neutral-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-neutral-800 dark:border-neutral-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <img class="w-auto h-10" :src="`${baseUrl}/static/images/gradient.svg`" alt="MelodyKit"/>
          <h1 class="text-xl text-neutral-900 md:text-2xl dark:text-neutral-50">
            Log in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="login">
            <div>
              <label for="email" class="block mb-2 text-neutral-900 dark:text-neutral-50">Email</label>
              <input type="email" name="email" v-model="userForm.email" class="bg-neutral-50 border border-neutral-300 text-neutral-900 sm:text-sm font-mono rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-50 focus:outline-none" placeholder="email@example.com" required>
            </div>
            <div>
              <label for="password" class="block mb-2 text-neutral-900 dark:text-neutral-50">Password</label>
              <input type="password" name="password" v-model="userForm.password" class="bg-neutral-50 border border-neutral-300 text-neutral-900 sm:text-sm font-mono rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-50 focus:outline-none" placeholder="••••••••" required>
            </div>
            <div>
              <label for="code" class="block mb-2 text-neutral-900 dark:text-neutral-50">Code</label>
              <input type="text" name="code" v-model="userForm.code" class="bg-neutral-50 border border-neutral-300 text-neutral-900 sm:text-sm font-mono rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-50 focus:outline-none" inputmode="numeric" autocomplete="one-time-code">
            </div>
            <div class="flex items-center justify-between">
              <router-link class="text-neutral-600 hover:underline dark:text-neutral-500" to="/forgot">Forgot password?</router-link>
            </div>
            <button type="submit" class="w-full text-neutral-900 dark:text-neutral-50 bg-gradient-to-b from-melody-purple to-melody-blue rounded-lg px-5 py-2.5 text-center">Log in</button>
            <p class="text-neutral-600 dark:text-neutral-500">
              Don't have an account? <router-link class="text-transparent bg-clip-text bg-gradient-to-b from-melody-purple to-melody-blue" to="/register">Register</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive } from "vue";

import { BASE_URL } from "@/constants";
import { userDataFromForm, type UserForm } from "@/models/data/user";
import { useTokensStore } from "@/stores/tokens";

const userForm: UserForm = reactive({email: null, password: null, code: null});

const baseUrl = computed(() => BASE_URL);

const login = async () => {
  const tokensStore = useTokensStore();

  const userData = userDataFromForm(userForm);

  await tokensStore.login(userData);
}
</script>
