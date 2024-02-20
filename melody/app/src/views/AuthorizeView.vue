<template>
  <AuthorizeForm v-if="isAuthorized()"/>
  <LoginForm v-else/>
</template>

<script setup lang="ts">
import { isAuthorized } from "@/checks";
import AuthorizeForm from "@/components/AuthorizeForm.vue";
import LoginForm from "@/components/LoginForm.vue";
</script>
