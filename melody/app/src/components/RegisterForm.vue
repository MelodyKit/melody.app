<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-neutral-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-neutral-800 dark:border-neutral-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <router-link to="/"><img class="w-auto h-10" src="https://melodykit.app/static/images/gradient.svg" alt="MelodyKit"/></router-link>
          <h1 class="text-xl text-neutral-900 md:text-2xl dark:text-neutral-50">
            Register new account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="register">
            <div>
              <label for="name" class="block mb-2 text-neutral-900 dark:text-neutral-50">Name</label>
              <input type="name" name="name" v-model="registerData.name" class="bg-neutral-50 border border-neutral-300 text-neutral-900 sm:text-sm font-mono rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-50" placeholder="user" required>
            </div>
            <div>
              <label for="email" class="block mb-2 text-neutral-900 dark:text-neutral-50">Email</label>
              <input type="email" name="email" v-model="registerData.email" class="bg-neutral-50 border border-neutral-300 text-neutral-900 sm:text-sm font-mono rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-50" placeholder="email@example.com" required>
            </div>
            <div>
              <label for="password" class="block mb-2 text-neutral-900 dark:text-neutral-50">Password</label>
              <input type="password" name="password" v-model="registerData.password" class="bg-neutral-50 border border-neutral-300 text-neutral-900 sm:text-sm font-mono rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-50" placeholder="••••••••" required>
            </div>
            <button type="submit" class="w-full text-neutral-900 dark:text-neutral-50 bg-gradient-to-b from-melody-purple to-melody-blue rounded-lg px-5 py-2.5 text-center">Register</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { RegisterData } from "@/models/data/register";
import { useTokensStore } from "@/store/modules/tokens";

export default defineComponent({
  name: "RegisterForm",
  data() {
    return {
      registerData: new RegisterData({
        name: null,
        email: null,
        password: null,
      })
    };
  },
  methods: {
    async register() {
      const store = useTokensStore();

      await store.register(this.registerData);

      await this.$router.push("/verify");
    }
  },
});
</script>
