<template>
  <section v-if="client">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
      <div class="w-full bg-neutral-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-neutral-800 dark:border-neutral-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <img class="w-auto h-10" :src="GRADIENT_URL" alt="MelodyKit"/>
          <h1 class="text-xl text-neutral-900 md:text-2xl dark:text-neutral-50">
            Authorize <span class="text-transparent bg-clip-text bg-gradient-to-b from-melody-purple to-melody-blue">{{ client.name }}</span> by <span class="text-transparent bg-clip-text bg-gradient-to-b from-melody-purple to-melody-blue">{{ client.creator.name }}</span>
          </h1>
          <section>
            You will be redirected to <span class="text-transparent bg-clip-text bg-gradient-to-b from-melody-purple to-melody-blue">{{ redirectUri }}</span>
          </section>
          <form class="space-y-4 md:space-y-6" @submit.prevent="authorize">
            <button type="submit" class="w-full text-neutral-900 dark:text-neutral-50 bg-gradient-to-b from-melody-purple to-melody-blue rounded-lg px-5 py-2.5 text-center">Authorize</button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

import useSWRV from "swrv";

import { GRADIENT_URL } from "@/api/constants";
import { useTokensStore } from "@/stores/tokens";
import { SCOPE_SEPARATOR } from "@/scopes";
import { clientKey } from "@/keys";

const route = useRoute();

const query = route.query;

const clientId = query.client_id;

if (typeof clientId != "string") {
  throw new Error("invalid client ID");
}

const redirectUri = query.redirect_uri;

if (typeof redirectUri != "string") {
  throw new Error("invalid redirect URI");
}

const state = query.state;

if (typeof state != "string") {
  throw new Error("invalid state");
}

const maybeScope = query.scope;

if (maybeScope != null && typeof maybeScope != "string") {
  throw new Error("invalid scope");
}

const scopes = maybeScope ? maybeScope.split(SCOPE_SEPARATOR) : [];

const scope = scopes.join(SCOPE_SEPARATOR);

const stateClient = useTokensStore().stateClient;

const { data: client } = useSWRV(
  clientKey(clientId),
  async key => await stateClient.fetchClient(clientId),
);

const authorize = async () => {
  const authorizationCode = await stateClient.authorize({
    clientId,
    redirectUri,
    scope,
    state,
  });

  const parameters = new URLSearchParams({...authorizationCode});

  location.href = `${redirectUri}?${parameters}`;
};
</script>
