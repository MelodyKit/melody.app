<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-neutral-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-neutral-800 dark:border-neutral-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <router-link to="/"><img class="w-auto h-10" src="https://melodykit.app/static/images/gradient.svg" alt="MelodyKit"/></router-link>
          <h1 class="text-xl text-neutral-900 md:text-2xl dark:text-neutral-50">
            Reset password
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="reset">
            <div>
              <label for="token" class="block mb-2 text-neutral-900 dark:text-neutral-50">Temporary token</label>
              <input type="password" name="token" v-model="resetData.token" class="bg-neutral-50 border border-neutral-300 text-neutral-900 sm:text-sm font-mono rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-50" placeholder="••••••••" required>
            </div>
            <div>
              <label for="password" class="block mb-2 text-neutral-900 dark:text-neutral-50">Password</label>
              <input type="password" name="password" v-model="resetData.password" class="bg-neutral-50 border border-neutral-300 text-neutral-900 sm:text-sm font-mono rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-50" placeholder="••••••••" required>
            </div>
            <div>
              <label for="confirm" class="block mb-2 text-neutral-900 dark:text-neutral-50">Confirm password</label>
              <input type="password" name="confirm" v-model="resetData.confirm" class="bg-neutral-50 border border-neutral-300 text-neutral-900 sm:text-sm font-mono rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-50" placeholder="••••••••" required>
            </div>
            <div class="flex items-center justify-between">
              <p class="text-neutral-600 dark:text-neutral-500">Note: changing the password revokes all sessions!</p>
            </div>
            <button type="submit" class="w-full text-neutral-900 dark:text-neutral-50 bg-gradient-to-b from-melody-purple to-melody-blue rounded-lg px-5 py-2.5 text-center">Reset</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { ResetData } from "@/models/data/reset";
import { useTokensStore } from "@/store/modules/tokens";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ResetForm",
  data() {
    return {
      resetData: new ResetData({
        token: null,
        password: null,
        confirm: null,
      })
    };
  },
  methods: {
    async reset() {
      const store = useTokensStore();

      await store.reset(this.resetData);

      await this.$router.push("/");
    }
  }
})
</script>
