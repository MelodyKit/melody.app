<template>
  <section v-if="client && authorizeData">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen">
      <div class="w-full bg-neutral-50 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-neutral-800 dark:border-neutral-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <img class="w-auto h-10" :src="GRADIENT_URL" alt="MelodyKit"/>
          <h1 class="text-xl text-neutral-900 md:text-2xl dark:text-neutral-50">
            Authorize <span class="text-transparent bg-clip-text bg-gradient-to-b from-melody-purple to-melody-blue">{{ client.name }}</span> by <span class="text-transparent bg-clip-text bg-gradient-to-b from-melody-purple to-melody-blue">{{ client.creator.name }}</span>
          </h1>
          <ul v-if="scopes" class="list-disc list-inside">
            This will grant the application:
            <li v-for="scope in scopes">
              {{ describeScope(scope) }}
            </li>
          </ul>
          <section>
            You will be redirected to <span class="text-transparent bg-clip-text bg-gradient-to-b from-melody-purple to-melody-blue">{{ authorizeData.redirectUri }}</span>
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
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useToast } from "vue-toastification";

import useSWRV from "swrv";

import { describeScope, fromScope, isDescribedScope } from "@/scopes";

import { GRADIENT_URL } from "@/api/constants";
import { isString } from "@/api/typing";
import { useTokensStore } from "@/stores/tokens";
import { clientKey } from "@/keys";

const route = useRoute();

const toast = useToast();

const query = route.query;

const parseAuthorizeData = () => {
  const clientId = query.client_id;
  const redirectUri = query.redirect_uri;
  const state = query.state;
  const scope = query.scope;

  if (!isString(clientId)) {
    toast.error("invalid client ID");

    return null;
  }

  if (!isString(redirectUri)) {
    toast.error("invalid redirect URI");

    return null;
  }

  if (!isString(state)) {
    toast.error("invalid state");

    return null;
  }

  if (!isString(scope)) {
    toast.error("invalid scope");

    return null;
  }

  return {
    clientId,
    redirectUri,
    state,
    scope,
  };
};

const authorizeData = parseAuthorizeData();

const stateClient = useTokensStore().stateClient;

const client = authorizeData ? useSWRV(
  clientKey(authorizeData.clientId),
  () => stateClient.fetchClient(authorizeData.clientId),
).data : ref(null);

const scopes = authorizeData ? fromScope(authorizeData.scope).filter(isDescribedScope) : null;

const authorize = async () => {
  if (authorizeData == null) {
    return;
  }

  const authorizationCode = await stateClient.authorize(authorizeData);

  const parameters = new URLSearchParams({...authorizationCode});

  location.href = `${authorizeData.redirectUri}?${parameters}`;
};
</script>
