<template>
  <appModalVue v-model="dialog">
    <vee-form :validation-schema="schema" :initial-values="form" @submit="send">
      <VInput
        type="text"
        label="Course name"
        name="name"
        placeholder="Course name"
      />
      <VInput type="number" label="Price" name="price" placeholder="Price" />
      <VInput type="number" label="Period" name="period" placeholder="Period" />
      <VButtonVue
        type="submit"
        btn_type="primary"
        :is-loading="loading"
        class="w-full"
        >{{ loading ? "Loading" : btn_title }}</VButtonVue
      >
    </vee-form>
  </appModalVue>

  <appModalVue v-model="dialog2">
    <h1 class="text-[28px] text-center">
      Are you sure you want to delete this course?
    </h1>
    <div class="flex gap-5 w-full mt-[30px] justify-center">
      <VButtonVue btn_type="success" class="w-[30%]" @click="yes"
        >Yes</VButtonVue
      >
      <VButtonVue btn_type="danger" class="w-[30%]" @click="dialog2 = false"
        >Cancel</VButtonVue
      >
    </div>
  </appModalVue>
</template>

<script setup>
  import VButtonVue from "../../../components/form/VButton.vue";
  import VInput from "../../../components/form/VInput.vue";
  import appModalVue from "../../../components/ui/app-modal.vue";
  import { ref, watch } from "vue";
  import { useCourseStore } from "../../../stores/admin/adminCourse";

  const store = useCourseStore();
  const dialog = ref(false);
  const dialog2 = ref(false);

  const schema = ref({
    name: "required|min:3|max:30",
    price: "required|min:3|max:30",
    period: "required|min:1|max:30",
  });

  const loading = ref(false);

  watch(dialog, (value) => {
    if (!value) {
      form.value = {};
    }
  });

  let btn_title = ref();
  const unique_id = ref("");

  const form = ref({
    name: "",
    price: null,
    period: null,
  });

  const openDeleteModal = (id) => {
    unique_id.value = id;
    dialog2.value = true;
  };

  const yes = async () => {
    await store.deleteCourse(unique_id.value);
    dialog2.value = false;
    this.loadPageData(this.$route.query.page);
    // location.reload();
  };

  const send = async (values) => {
    loading.value = true;
    if (form.value?._id) {
      await store.updateCourse(values, form.value?._id);
    } else {
      await store.addCourse(values);
    }
    loading.value = false;
    location.reload();
  };

  const openModal = (item) => {
    if (item) {
      form.value = { ...item };
      btn_title = "Save";
    } else {
      btn_title = "Add";
    }
    dialog.value = true;
  };
  defineExpose({ openModal, openDeleteModal });
</script>

<style lang="scss" scoped></style>
