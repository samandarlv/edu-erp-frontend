<template>
  <AppModal v-model="dialog">
    <vee-form :validation-schema="schema" :initial-values="form" @submit="send">
      <VInputVue
        type="text"
        label="First name"
        name="first_name"
        placeholder="First name"
      />
      <VInputVue
        type="text"
        label="Last name"
        name="last_name"
        placeholder="Last name"
      />
      <VInputVue
        type="text"
        label="Phone number"
        mask="+998-##-###-##-##"
        name="phone"
        placeholder="+998-00-000-00-00"
      />
      <VButton
        type="submit"
        btn_type="primary"
        :is-loading="loading"
        class="w-full"
        >{{ loading ? "Loading" : btn_title }}</VButton
      >
    </vee-form>
  </AppModal>

  <AppModal v-model="dialog2">
    <h1 class="text-[28px] text-center">
      Are you sure you want to delete this student?
    </h1>
    <div class="flex gap-5 w-full mt-[30px] justify-center">
      <VButton btn_type="success" class="w-[30%]" @click="yes">Yes</VButton>
      <VButton btn_type="danger" class="w-[30%]" @click="dialog2 = false"
        >Cancel</VButton
      >
    </div>
  </AppModal>
</template>

<script setup>
  import { ref, watch } from "vue";
  import AppModal from "../../../components/ui/app-modal.vue";
  import VInputVue from "../../../components/form/VInput.vue";
  import VButton from "../../../components/form/VButton.vue";
  import { useAdminStudentStore } from "../../../stores/admin/adminStudent";

  const store = useAdminStudentStore();

  const dialog = ref(false);
  const dialog2 = ref(false);
  const loading = ref(false);

  let btn_title = ref();
  const unique_id = ref("");

  watch(dialog, (value) => {
    if (!value) {
      form.value = {};
    }
  });

  const form = ref({
    first_name: "",
    last_name: "",
    phone: "",
  });

  const schema = ref({
    first_name: "required|min:2|max:30",
    last_name: "required|min:2|max:30",
    phone: "required|min:17|max:30",
  });

  const openModal = (item) => {
    if (item) {
      form.value = { ...item };
      btn_title = "Save";
    } else {
      btn_title = "Add";
    }
    dialog.value = true;
  };

  const openDeleteModal = (id) => {
    unique_id.value = id;
    dialog2.value = true;
  };

  const yes = async () => {
    await store.deleteStudent(unique_id.value);
    dialog2.value = false;
    location.reload();
  };

  const send = async (values) => {
    loading.value = true;
    let a = values.phone.split("");
    let b = a.filter((item) => !isNaN(+item));
    let c = "+" + b.join("");

    let payload = {
      first_name: values.first_name,
      last_name: values.last_name,
      phone: c,
    };
    if (form.value?._id) {
      await store.updateStudent(payload, form.value?._id);
    } else {
      await store.addStudent(payload);
    }
    loading.value = false;
    dialog.value = false;
    // location.reload();
  };

  defineExpose({ openModal, openDeleteModal });
</script>

<style lang="scss" scoped></style>
