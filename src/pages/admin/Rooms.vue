<template>
  <div class="ml-[5px]">
    <RoomModal ref="room_modal" />
    <h1>Rooms</h1>
    <VButton
      type="submit"
      btn_type="primary"
      :is-loading="false"
      @click="openCreateModal"
      >Create Room</VButton
    >

    <Table
      :headers="headers"
      :body="store?.rooms"
      v-if="store.rooms.length > 0"
      class="text-center"
    >
      <template #body_action="{ item }">
        <div class="flex justify-center">
          <VAction :item="item" :modal_value="room_modal" />
        </div>
      </template>
    </Table>

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
    ></AppPagination>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import VAction from "../../components/form/VAction.vue";
  import VButton from "../../components/form/VButton.vue";
  import Table from "../../components/ui/Table.vue";
  import { useAdminRoomStore } from "../../stores/admin/adminRooms";
  import RoomModal from "./Modals/roomModal.vue";
  import AppPagination from "../../components/ui/app-pagination.vue";

  const store = useAdminRoomStore();
  const room_modal = ref("");
  const headers = ref([
    { title: "Room name", value: "name" },
    { title: "Room capacity", value: "size" },
    { title: "Actions", value: "action" },
  ]);

  // Use const for non-reactive data
  const params = ref({
    page: 1,
    limit: 10,
  });

  const count = ref(null);

  const onClickHandler = async () => {
    count.value = await store.getRooms(params);
  };

  const openCreateModal = () => {
    room_modal.value.openModal();
  };

  onMounted(async () => {
    count.value = await store.getRooms(params);
    console.log(store.rooms);
  });
</script>

<style lang="scss" scoped></style>
