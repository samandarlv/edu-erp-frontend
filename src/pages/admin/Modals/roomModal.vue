<template>
  <AppModal v-model="dialog">
    <vee-form :validation-schema="schema" :initial-values="form" @submit="send">
      <VInput
        type="text"
        label="Room name"
        name="name"
        placeholder="Room name"
      />

      <VInput
        type="number"
        label="Room capacity"
        name="size"
        placeholder="Room capacity"
      />

      <VButton
        btn_type="primary"
        :is-loading="loading"
        class="w-full mt-5"
        @click="send"
        >{{ loading ? "Loading" : btn_title }}
      </VButton>
    </vee-form>
  </AppModal>

  <AppModal v-model="dialog2">
    <h1 class="text-[28px] text-center">
      Are you sure you want to delete this room?
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
  import VButton from "../../../components/form/VButton.vue";
  import VInput from "../../../components/form/VInput.vue";
  import AppModal from "../../../components/ui/app-modal.vue";
  import { useAdminRoomStore } from "../../../stores/admin/adminRooms";
  import { ref, watch } from "vue";

  const store = useAdminRoomStore();

  const dialog = ref(false);
  const loading = ref(false);
  const dialog2 = ref(false);
  let btn_title = ref();
  watch(dialog, (value) => {
    if (!value) {
      form.value = {};
    }
  });

  const schema = ref({
    name: "required|min:3|max:30",
    size: "required|min:1|max:2",
  });

  const form = ref({
    name: "",
    size: null,
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

  const send = async (values) => {
    loading.value = true;

    let payload = {};
    if (form.value._id) {
      await store.updateRoom(payload, form.value._id);
    }
    await store.addRoom(payload);
  };

  defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
