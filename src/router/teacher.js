export default {
  path: "/teacher",
  name: "teacher",
  component: import("../pages/teacher/Teacher.vue"),
  children: [
    {
      path: "group",
      name: "group",
      meta: {
        child: "group",
      },
      component: import("../pages/teacher/Groups.vue"),
    },
    {
      path: "group/:id",
      name: "teacher_single_group",
      meta: {
        child: "group",
      },
      component: import("../pages/teacher/SingleGroup.vue"),
    },
  ],
};
