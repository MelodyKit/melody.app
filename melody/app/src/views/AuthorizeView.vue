<template>
  <AuthorizeForm v-if="isTokensStoreLoaded()"/>
  <LoginForm v-else/>
</template>

<script setup lang="ts">
import AuthorizeForm from "@/components/AuthorizeForm.vue";
import LoginForm from "@/components/LoginForm.vue";

import { isTokensStoreLoaded } from "@/checks";
</script>
