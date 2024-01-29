<template>
  <Head>
    <title>MelodyKit | {{ title }}</title>

    <meta charset="utf-8">

    <meta name="viewport" content="height=device-height, width=device-width, initial-scale=1, user-scalable=no">

    <meta author="MelodyKit">
    <meta name="description" content="All your music, in one place.">

    <meta property="og:site_name" content="MelodyKit">
    <meta property="og:title" :content="title">
    <meta property="og:description" :content="description">
    <meta property="og:image" :content="`${baseUrl}/static/images/icon.png`">

    <meta name="application-name" content="MelodyKit">

    <meta name="mobile-web-app-capable" content="yes">

    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="MelodyKit">

    <link rel="icon" type="image/svg+xml" :href="`${baseUrl}/static/images/icon.svg`">
    <link rel="icon" type="image/png" :href="`${baseUrl}/static/images/icon.png`">

    <link rel="apple-touch-icon" :href="`${baseUrl}/static/images/icon.png`">

    <link rel="manifest" :href="`${baseUrl}/static/manifest.json`">
  </Head>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { BASE_URL } from "@/constants";

export default defineComponent({
  name: "BaseHead",
  computed: {
    baseUrl() {
      return BASE_URL;
    }
  },
  props: {
    title: String,
    description: String,
  },
  components: {Head},
})
</script>

<script setup lang="ts">
import { Head } from "@unhead/vue/components";
</script>
