<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="w-full bg-neutral-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-neutral-800 dark:border-neutral-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <router-link to="/"><img class="w-auto h-10" :src="`${baseUrl}/static/images/gradient.svg`" alt="MelodyKit"/></router-link>
          <h1 class="text-xl text-neutral-900 md:text-2xl dark:text-neutral-50">
            Verification token has been sent to your email
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="verify">
            <div>
              <label for="name" class="block mb-2 text-neutral-900 dark:text-neutral-50">Verification token</label>
              <input type="name" name="name" v-model="verificationData.verificationToken" class="bg-neutral-50 border border-neutral-300 text-neutral-900 sm:text-sm font-mono rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-50" placeholder="token" required>
            </div>
            <button type="submit" class="w-full text-neutral-900 dark:text-neutral-50 bg-gradient-to-b from-melody-purple to-melody-blue rounded-lg px-5 py-2.5 text-center">Verify</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { BASE_URL } from "@/constants";
import { useTokensStore } from "@/stores/tokens";
import { VerificationData } from "@/models/data/verification";

export default defineComponent({
  name: "VerificationForm",
  data() {
    return {
      verificationData: new VerificationData({
        verificationToken: null
      })
    };
  },
  computed: {
    baseUrl() {
      return BASE_URL;
    }
  },
  methods: {
    async verify() {
      const store = useTokensStore();

      await store.verify(this.verificationData);

      await this.$router.push("/");
    }
  },
});
</script>
