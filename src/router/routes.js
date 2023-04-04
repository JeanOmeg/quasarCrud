const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "loginPage",
        component: () => import("src/pages/login.vue"),
      },
      {
        path: "register-page",
        name: "registerPage",
        component: () => import("src/pages/register-page.vue"),
      },
      {
        path: "home",
        name: "home",
        component: () => import("src/pages/index-page.vue"),
      },
      {
        path: "form-task/:id?",
        name: "formTask",
        component: () => import("src/pages/form-task.vue"),
      },
      {
        path: "all-tasks",
        name: "allTasks",
        component: () => import("src/pages/AdmTasksPage.vue"),
      },
      {
        path: "all-users/:id?",
        name: "allUsers",
        component: () => import("src/pages/AllUsers.vue"),
      },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    name: "notFound",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
