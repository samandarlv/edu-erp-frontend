<template>
  <div>
    <h1>Teacher Groups</h1>

    <Table :headers="headers" :body="groups" v-if="groups?.length > 0">
      <template #body_name="{ item }">
        <router-link
          :to="{ name: 'teacher_single_group', params: { id: `${item._id}` } }"
          >{{ item.name }}</router-link
        >
      </template>

      <template #body_course_id="{ item }">
        {{ item.course?.name }}
      </template>

      <template #body_days="{ item }">
        <span v-if="item.days">Mon/Wed/Fri</span>
        <span v-else>Tue/Thu/Sat</span>
      </template>

      <template #body_start_date="{ item }">
        {{ formatDate(item.start_date) }}
      </template>
      <template #body_room_id="{ item }">
        {{ item?.room?.name }}
      </template>

      <template #body_end_date="{ item }">
        {{ formatDate(item.end_date) }}
      </template>

      <template #body_time="{ item }">
        <div class="flex flex-col gap-1">
          <span>Starts: {{ formatTime(item.start_time) }}</span>
          <span>Ends: {{ formatTime(item.end_time) }}</span>
        </div>
      </template>
    </Table>
    <div
      class="w-full text-center text-[20px] text-global1 mt-10 font-medium"
      v-else
    >
      <h1>No data</h1>
    </div>
  </div>
</template>

<script setup>
  import { useTeacherGroupStore } from "../../stores/teacher/teacherGroup";
  import Table from "../../components/ui/Table.vue";
  import { formatDate, formatTime } from "../../plugins/format";
  import { ref, onMounted } from "vue";
  import { useAuthStore } from "../../stores/auth";

  const store = useTeacherGroupStore();
  const auth_store = useAuthStore();
  const groups = ref();

  const headers = ref([
    { title: "Group name", value: "name" },
    { title: "Course name", value: "course_id" },
    { title: "Room name", value: "room_id" },
    { title: "Started date", value: "start_date" },
    { title: "End date", value: "end_date" },
    { title: "Days", value: "days" },
    { title: "Time", value: "time" },
  ]);

  onMounted(async () => {
    await auth_store.getProfile();
    await store.getTeacherGroups(auth_store?.user?._id);
    groups.value = store.groups;
  });
</script>

<style lang="scss" scoped></style>
