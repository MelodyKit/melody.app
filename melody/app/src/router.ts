import { createRouter, createWebHistory } from "vue-router";

import ForgotForm from "@/components/ForgotForm.vue";
import RegisterForm from "@/components/RegisterForm.vue";
import ResetForm from "@/components/ResetForm.vue";
import VerificationForm from "@/components/VerificationForm.vue";
import AuthorizeView from "@/views/AuthorizeView.vue";
import HomeView from "@/views/HomeView.vue";
import LibraryView from "@/views/LibraryView.vue";
import PlaylistView from "@/views/PlaylistView.vue";
import SearchView from "@/views/SearchView.vue";
import SettingsView from "@/views/SettingsView.vue";
import UserView from "@/views/UserView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/authorize",
    name: "authorize",
    component: AuthorizeView,
  },
  {
    path: "/search",
    name: "search",
    component: SearchView,
  },
  {
    path: "/me/library",
    name: "library",
    component: LibraryView,
  },
  {
    path: "/register",
    name: "register",
    component: RegisterForm,
  },
  {
    path: "/verify",
    name: "verification",
    component: VerificationForm,
  },
  {
    path: "/forgot",
    name: "forgot",
    component: ForgotForm,
  },
  {
    path: "/reset",
    name: "reset",
    component: ResetForm,
  },
  {
    path: "/me/settings",
    name: "settings",
    component: SettingsView,
  },
  {
    path: "/users/:userId",
    name: "user",
    component: UserView,
  },
  {
    path: "/playlists/:playlistId",
    name: "playlist",
    component: PlaylistView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
