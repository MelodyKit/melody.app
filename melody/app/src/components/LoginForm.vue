<template>
  <section>
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
      <div class="w-full bg-neutral-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-neutral-800 dark:border-neutral-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <img class="w-auto h-10" src="https://melodykit.app/static/images/gradient.svg" alt="MelodyKit"/>
          <h1 class="text-xl text-neutral-900 md:text-2xl dark:text-neutral-50">
            Log in to your account
          </h1>
          <form class="space-y-4 md:space-y-6" @submit.prevent="submit">
            <div>
              <label for="email" class="block mb-2 text-neutral-900 dark:text-neutral-50">Email</label>
              <input type="email" name="email" v-model="userData.email" class="bg-neutral-50 border border-neutral-300 text-neutral-900 sm:text-sm font-mono rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-50" placeholder="email@example.com" required>
            </div>
            <div>
              <label for="password" class="block mb-2 text-neutral-900 dark:text-neutral-50">Password</label>
              <input type="password" name="password" v-model="userData.password" class="bg-neutral-50 border border-neutral-300 text-neutral-900 sm:text-sm font-mono rounded-lg block w-full p-2.5 dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-50" placeholder="••••••••" required>
            </div>
            <div class="flex items-center justify-between">
              <a href="/forgot" class="text-neutral-600 hover:underline dark:text-neutral-500">Forgot password?</a>
            </div>
            <button type="submit" class="w-full text-neutral-900 dark:text-neutral-50 bg-gradient-to-b from-melody-purple to-melody-blue rounded-lg px-5 py-2.5 text-center">Log in</button>
            <p class="text-neutral-600 dark:text-neutral-500">
              Don't have an account? <a href="/register" class="text-transparent bg-clip-text bg-gradient-to-b from-melody-purple to-melody-blue">Register</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import { mapActions } from "vuex";

export default defineComponent({
  name: "LoginForm",
  data() {
    return {
      userData: {
        name: "",
        password: "",
      }
    };
  },
  methods: {
    ...mapActions(["login"]),

    async submit() {
      await this.login(this.userData);
      this.$root.fetchData();
    },
  },
});
</script>