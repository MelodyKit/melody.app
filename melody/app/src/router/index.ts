import { createRouter, createWebHistory } from "vue-router";

import ForgotView from "@/views/ForgotView.vue";
import HomeView from "@/views/HomeView.vue";
import LibraryView from "@/views/LibraryView.vue";
import PlaylistView from "@/views/PlaylistView.vue";
import RegisterView from "@/views/RegisterView.vue";
import ResetView from "@/views/ResetView.vue";
import SearchView from "@/views/SearchView.vue";
import SettingsView from "@/views/SettingsView.vue";
import VerificationView from "@/views/VerificationView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/search",
    name: "search",
    component: SearchView,
  },
  {
    path: "/library",
    name: "library",
    component: LibraryView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/verify",
    name: "verification",
    component: VerificationView,
  },
  {
    path: "/forgot",
    name: "forgot",
    component: ForgotView,
  },
  {
    path: "/reset",
    name: "reset",
    component: ResetView,
  },
  {
    path: "/settings",
    name: "settings",
    component: SettingsView,
  },
  {
    path: "/playlists/:playlistID",
    name: "playlist",
    component: PlaylistView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;