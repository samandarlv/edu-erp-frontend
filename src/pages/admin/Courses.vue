<template>
  <div class="ml-[5px]">
    <courseModalVue ref="course_modal" />
    <deleteCourseModalVue ref="delete_modal" />
    <h1>Courses</h1>
    <VButtonVue
      type="submit"
      btn_type="primary"
      :is-loading="false"
      @click="openCreateModal"
    >
      Create course
    </VButtonVue>
    <TableVue
      :headers="headers"
      :body="store?.courses"
      v-if="store.courses.length > 0"
    >
      <template #body_action="{ item }">
        <VAction :item="item" :modal_value="course_modal" />
      </template>
    </TableVue>

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
  import VButtonVue from "../../components/form/VButton.vue";
  import TableVue from "../../components/ui/Table.vue";
  import { ref, onMounted } from "vue";
  import { useCourseStore } from "../../stores/admin/adminCourse";
  import courseModalVue from "./Modals/courseModal.vue";
  import VAction from "../../components/form/VAction.vue";
  import AppPagination from "../../components/ui/app-pagination.vue";

  const store = useCourseStore();
  const headers = ref([
    { title: "Course name", value: "name" },
    { title: "Course price", value: "price" },
    { title: "Period", value: "period" },
    { title: "Actions", value: "action" },
  ]);
  const params = ref({
    page: 1,
    limit: 10,
  });
  const course_modal = ref("");
  const count = ref();

  const openCreateModal = () => {
    course_modal.value.openModal();
  };

  const onClickHandler = async (page) => {
    count.value = await store.getCourses(params.value);
    $router.push({ query: { page: page } });
  };

  onMounted(async () => {
    count.value = await store.getCourses(params.value);
  });
</script>

<style lang="scss" scoped></style>
