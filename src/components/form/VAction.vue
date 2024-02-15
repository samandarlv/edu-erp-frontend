<template>
  <div class="flex gap-3 justify-start">
    <VButtonVue btn_type="success" @click="openEditModal"
      ><SvgIcon type="mdi" :path="mdiPencilOutline"
    /></VButtonVue>
    <VButtonVue btn_type="danger" @click="openDeleteModal"
      ><SvgIcon type="mdi" :path="mdiDeleteOutline"
    /></VButtonVue>
  </div>
</template>

<script setup>
  import SvgIcon from "@jamescoyle/vue-icon";
  import VButtonVue from "./VButton.vue";
  import { mdiDeleteOutline, mdiPencilOutline } from "@mdi/js";

  const props = defineProps({
    item: {
      type: Object,
    },
    modal_value: {
      type: String,
    },
  });

  const openDeleteModal = () => {
    props.modal_value.openDeleteModal(props?.item?._id);
  };

  const openEditModal = () => {
    props.modal_value.openModal(props?.item);
  };
</script>

<style lang="scss" scoped></style>
