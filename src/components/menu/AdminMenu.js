import {
  mdiAccount,
  mdiBook,
  mdiAccountGroupOutline,
  mdiCogOutline,
  mdiDoorOpen,
} from "@mdi/js";
export const AdminMenu = [
  {
    path: "/admin/students",
    label: "Students",
    name: "sudents",
    keys: "students",
    icon: mdiAccount,
  },
  {
    path: "/admin/courses",
    label: "Courses",
    name: "courses",
    keys: "courses",
    icon: mdiBook,
  },
  {
    path: "/admin/groups",
    label: "Groups",
    name: "groups",
    keys: "admin_groups",
    icon: mdiAccountGroupOutline,
  },
  {
    path: "/admin/rooms",
    label: "Rooms",
    name: "rooms",
    keys: "rooms",
    icon: mdiDoorOpen,
  },
  {
    path: "/admin/profile",
    label: "Profile",
    name: "profile",
    keys: "profile",
    icon: mdiCogOutline,
  },
];
