<template>
  <AppModal v-model="dialog">
    <div class="relative my-[15px] mx-[40px] border-2 w-[400px]">
      <input
        v-model="payload.phone"
        type="text"
        name="search"
        placeholder="Search"
        @input="handleChange"
        class="outline-none w-[400px] px-[15px] py-3 text-[13px] rounded-[20px] h-[40px]"
      />
      <SvgIcon
        type="mdi"
        :path="mdiMagnify"
        class="absolute top-[8px] left-[350px]"
      />
    </div>
    <Table
      :headers="headers"
      :body="store?.result"
      v-if="store?.result?.length > 0"
    >
      <template #body_name="{ item }">
        {{ item.first_name + " " + item.last_name }}
      </template>

      <template #body_action="{ item }">
        <VButton
          btn_type="success"
          :isLoading="item.loading"
          @click="addToGroup(item)"
          v-if="!isValidPhone(item)"
          >{{ item.loading ? "" : "Add to Group" }}</VButton
        >
      </template>
    </Table>
  </AppModal>
</template>

<script setup>
  import AppModal from "../../../components/ui/app-modal.vue";
  import { ref, watch, computed } from "vue";
  import SvgIcon from "@jamescoyle/vue-icon";
  import { mdiMagnify } from "@mdi/js";
  import { useSearchStore } from "../../../stores/search";
  import { useGroupStore } from "../../../stores/admin/adminGroup";
  import Table from "../../../components/ui/Table.vue";
  import VButton from "../../../components/form/VButton.vue";
  import { useRoute } from "vue-router";

  const dialog = ref(false);
  const payload = ref({ phone: "" });
  const route = useRoute();
  const store = useSearchStore();
  const group_store = useGroupStore();
  const headers = ref([
    { title: "Full name", value: "name" },
    { title: "Phone number", value: "phone" },
    { title: "Action", value: "action" },
  ]);

  watch(dialog, (value) => {
    if (!value) {
      payload.value.phone = "";
      store.result = [];
    }
  });

  const isValidPhone = (item) => {
    return group_store.students.some(
      (student) => student?.phone == item?.phone
    );
  };

  const addToGroup = async (item) => {
    item.loading = true;
    let payload = {
      group: route.params?.id,
      student_phone: item?.phone,
    };
    await group_store.addStudentGroup(payload);
    item.loading = false;
    location.reload();
  };

  const openModal = () => {
    dialog.value = true;
  };

  const handleChange = async () => {
    if (payload.value.phone.length > 0) {
      await store.search(payload.value);
      store.result.map((item) => {
        item.loading = false;
        return item;
      });
    } else if (payload.value.phone.length == 0) {
      store.result = [];
    }
  };

  defineExpose({ openModal });
</script>

<style lang="scss" scoped></style>
