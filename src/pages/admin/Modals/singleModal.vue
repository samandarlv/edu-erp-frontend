<template>
  <AppModal v-model="dialog">
    <vee-form
      :validation-schema="schema"
      @submit="save"
      :initial-values="forms"
    >
      <VInput type="text" name="description" placeholder="Sababini kiriting" />
      <div class="flex mt-3 gap-5">
        <Vbutton type="submit" btn_type="primary" :is-loading="loading">{{
          loading ? "" : "Save"
        }}</Vbutton>
        <Vbutton
          type="button"
          btn_type="danger"
          :is-loading="false"
          @click="dialog = false"
          >Cancel</Vbutton
        >
      </div>
    </vee-form>
  </AppModal>
</template>

<script setup>
  import Vbutton from "../../../components/form/VButton.vue";
  import VInput from "../../../components/form/VInput.vue";
  import AppModal from "../../../components/ui/app-modal.vue";
  import { ref, computed } from "vue";
  import { useGroupStore } from "../../../stores/admin/adminGroup";

  const dialog = ref(false);
  const loading = ref(false);
  const store = useGroupStore();
  const forms = ref({});

  const schema = computed(() => {
    return {
      description: "required|min:5|max:30",
    };
  });

  const save = async (values) => {
    loading.value = true;

    if (values.number) {
      await store.updateLessonSingleGroup(forms.value._id, {
        ...values,
        paid: false,
      });
    } else {
      let payload = {
        comment: values.description,
        participated: false,
      };
      await store.updateStudentSingleGroup(forms.value.lesson, payload);
    }

    loading.value = false;
  };

  const openModal = (item) => {
    if (item) {
      forms.value = { ...item };
    }
    dialog.value = true;
  };

  defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
