<template>
  <div>
    <h1>Single Group</h1>
    <CheckAttendance ref="check_modal" />
    <div class="mt-5">
      <Vbutton btn_type="primary" :is-loading="false" @click="openModal"
        >Check students attendance</Vbutton
      >
      <Accardion :data="single_store.attendance" />
    </div>
  </div>
</template>

<script setup>
  import { useTeacherGroupStore } from "../../stores/teacher/teacherGroup";
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useTeacherSingleGroupStore } from "../../stores/teacher/teacherSingleGroup";
  import Accardion from "../../components/ui/accardion.vue";
  import Vbutton from "../../components/form/VButton.vue";
  import CheckAttendance from "./Modals/checkAttendance.vue";

  const store = useTeacherGroupStore();
  const single_store = useTeacherSingleGroupStore();
  const route = useRoute();
  const check_modal = ref();

  const openModal = () => {
    check_modal.value.openModal();
  };

  onMounted(async () => {
    await store.getGroupStudents(route.params.id);
    await single_store.getAllStudentsAttendance(route.params.id);
    // await single_store.getAllLessons(route.params.id);
  });
</script>

<style lang="scss" scoped></style>
