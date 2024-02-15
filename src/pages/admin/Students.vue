<template>
  <div class="ml-[5px]">
    <studentModal ref="student_modal" />
    <h1>Students</h1>
    <VButtonVue
      type="submit"
      btn_type="primary"
      :is-loading="false"
      @click="openCreateModal"
    >
      Create student
    </VButtonVue>
    <div v-if="store.students.length > 0">
      <Table
        :headers="headers"
        :body="store?.students"
        v-if="store.students.length > 0"
      >
        <template #body_first_name="{ item }">
          {{ item.first_name + " " + item.last_name }}
        </template>
        <template #body_action="{ item }">
          <VActionVue :item="item" :modal_value="student_modal" />
        </template>
      </Table>
      <AppPagination
        :params="params"
        :changeParam="onClickHandler"
        :count="count"
      />
    </div>
    <div
      class="w-full text-center text-[20px] text-global1 mt-10 font-medium"
      v-else
    >
      <h1>No data</h1>
    </div>
  </div>
</template>

<script setup>
  import { useAdminStudentStore } from "../../stores/admin/adminStudent";
  import { ref, onMounted } from "vue";
  import studentModal from "./Modals/studentModal.vue";
  import Table from "../../components/ui/Table.vue";
  import VButtonVue from "../../components/form/VButton.vue";
  import VActionVue from "../../components/form/VAction.vue";
  import AppPagination from "../../components/ui/app-pagination.vue";

  const store = useAdminStudentStore();
  const student_modal = ref("");

  const headers = ref([
    { title: "Student Id", value: "_id" },
    { title: "Full name", value: "first_name" },
    { title: "Phone number", value: "phone" },
    { title: "Actions", value: "action" },
  ]);

  const params = ref({
    page: 1,
    limit: 10,
  });
  const count = ref();

  const openCreateModal = () => {
    student_modal.value.openModal();
  };

  const onClickHandler = async () => {
    count.value = await store.getStudents(params.value);
  };

  onMounted(async () => {
    count.value = await store.getStudents(params.value);
  });
</script>

<style lang="scss" scoped></style>
