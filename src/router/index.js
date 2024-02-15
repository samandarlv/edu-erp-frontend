import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import auth from "./auth";
import admin from "./admin";
import director from "./director";
import finance from "./finance";
import student from "./student";
import teacher from "./teacher";
import notFound from "./not-found";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [auth, admin, director, finance, student, teacher, notFound],
});

router.beforeResolve((to, from, next) => {
  NProgress.start();
  next();
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  if (to.path.includes("/login")) {
    if (!token) {
      return next();
    } else if (token) {
      return next({ name: "students" });
    }
  } else if (token) {
    return next();
  } else {
    return next({ name: "login" });
  }

  return next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
