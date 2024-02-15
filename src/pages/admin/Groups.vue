<template>
  <div class="ml-[5px]">
    <h1>Groups</h1>
    <groupModal ref="group_modal" />
    <VButtonVue
      btn_type="primary"
      :is-loading="false"
      type="submit"
      @click="openModal"
      >Create group</VButtonVue
    >
    <Table
      :headers="headers"
      :body="store?.groups"
      v-if="store.groups.length > 0"
    >
      <template #body_name="{ item }">
        <router-link
          :to="{ name: 'single_group', params: { id: `${item._id}` } }"
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

      <template #body_action="{ item }">
        <VAction :item="item" :modal_value="group_modal" />
      </template>
    </Table>
    <div
      class="w-full text-center text-[20px] text-global1 mt-10 font-medium"
      v-else
    >
      <h1>No data</h1>
    </div>
    <AppPagination
      :params="params"
      :changeParam="onClickHandler"
      :count="count"
    />
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import Table from "../../components/ui/Table.vue";
  import { useGroupStore } from "../../stores/admin/adminGroup";
  import VButtonVue from "../../components/form/VButton.vue";
  import groupModal from "../../pages/admin/Modals/groupModal.vue";
  import VAction from "../../components/form/VAction.vue";
  import AppPagination from "../../components/ui/app-pagination.vue";
  import { formatDate, formatTime } from "../../plugins/format";
  const store = useGroupStore();

  const headers = ref([
    { title: "Group name", value: "name" },
    { title: "Course name", value: "course_id" },
    { title: "Room name", value: "room_id" },
    { title: "Started date", value: "start_date" },
    { title: "End date", value: "end_date" },
    { title: "Days", value: "days" },
    { title: "Time", value: "time" },
    { title: "Actions", value: "action" },
  ]);
  const count = ref();
  const params = ref({
    page: 1,
    limit: 10,
  });
  const group_modal = ref("");

  const openModal = () => {
    group_modal.value.openModal();
  };

  const formatData = (item) => {
    let payload = {};
  };

  const onClickHandler = async (page) => {
    count.value = await store.getGroups(params.value);
    $router.push({ query: { page: page } });
  };

  onMounted(async () => {
    count.value = await store.getGroups(params.value);
  });
</script>

<style lang="scss" scoped></style>
