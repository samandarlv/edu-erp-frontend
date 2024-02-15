<template>
  <AppModal v-model="dialog">
    <vee-form id="form" :validation-schema="schema" @submit="save">
      <Label class="text-[20px]">Date: </Label>
      <select
        v-model="date"
        @change="getStudentAttendance"
        class="mb-5 text-[20px]"
      >
        <option
          :value="item.date"
          v-for="(item, index) in store.lessons"
          :key="index"
        >
          {{ formatDate(item.date) }}
        </option>
      </select>

      <VInput
        type="text"
        name="title"
        placeholder="Mavzuni kiriting"
        class="mb-5"
      />

      <div
        v-for="(item, index) in store.one_day"
        :key="index"
        class="text-[20px] flex justify-between"
      >
        <p class="mb-2">
          {{
            `${index + 1}. ${item?.student?.first_name} ${
              item?.student?.last_name
            }`
          }}
        </p>
        <button
          type="button"
          class="text-global1 cursor-pointer"
          @click="changeAttendance(index)"
        >
          {{ item?.participated ? "participated" : "absent" }}
        </button>
      </div>
      <Vbutton
        btn_type="success"
        :is-loading="loading"
        class="w-full mt-3"
        form="form"
        >{{ loading ? "" : "Save" }}</Vbutton
      >
    </vee-form>
  </AppModal>
</template>

<script setup>
  import AppModal from "../../../components/ui/app-modal.vue";
  import { ref, watch, computed } from "vue";
  import { useTeacherSingleGroupStore } from "../../../stores/teacher/teacherSingleGroup";
  import { formatDate } from "../../../plugins/format";
  import { useRoute } from "vue-router";
  import Vbutton from "../../../components/form/VButton.vue";
  import VInput from "../../../components/form/VInput.vue";

  const store = useTeacherSingleGroupStore();
  const route = useRoute();
  const dialog = ref(false);
  const loading = ref(false);
  const date = ref("");

  watch(dialog, (value) => {
    if (!value) {
      store.one_day = [];
      date.value = "";
    }
  });

  const schema = computed(() => {
    return {
      title: "required|min:3|max:30",
    };
  });

  const getStudentAttendance = async () => {
    let payload = { date: date.value };
    await store.getStudentsAttendanceOneDay(route.params.id, payload);
  };

  const changeAttendance = (index) => {
    store.one_day[index].participated = !store.one_day[index].participated;
  };

  const save = async (values) => {
    let payload = { title: values?.title };
    loading.value = true;
    await store.updateLessonAttendance({ data: store.one_day });
    await store.setLessonTitle(store?.one_day[0]?.lesson?._id, payload);
    loading.value = false;
    location.reload();
  };

  const openModal = () => {
    dialog.value = true;
  };
  defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
