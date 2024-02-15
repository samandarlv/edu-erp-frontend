<template>
  <AddStudentGroupModal ref="add_modal" />
  <SingleModal ref="single_modal" />
  <div class="flex justify-around mt-[80px]">
    <div
      class="w-[50%] h-fit max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="flex flex-col">
        <h1 class="flex justify-between pb-3 border-b-2 border-[#E7EDF0]">
          Name: <span>{{ group?.name }}</span>
        </h1>
        <h1 class="flex justify-between pb-3 border-b-2 mt-2 border-[#E7EDF0]">
          Course: <span>{{ group?.course?.name }}</span>
        </h1>
        <h1 class="flex justify-between pb-3 border-b-2 mt-2 border-[#E7EDF0]">
          Started: <span>{{ formatDate(group?.start_date) }}</span>
        </h1>
        <h1 class="flex justify-between pb-3 border-b-2 mt-2 border-[#E7EDF0]">
          Last lesson: <span>{{ formatDate(group?.end_date) }}</span>
        </h1>
        <h1 class="flex justify-between pb-3 border-b-2 mt-2 border-[#E7EDF0]">
          Room: <span>{{ group?.room?.name }}</span>
        </h1>
        <h1 class="flex justify-between pb-3 border-b-2 mt-2 border-[#E7EDF0]">
          Lesson starts: <span>{{ formatTime(group?.start_time) }}</span>
        </h1>
        <h1 class="flex justify-between pb-3 border-b-2 mt-2 border-[#E7EDF0]">
          Lesson ends: <span>{{ formatTime(group?.end_time) }}</span>
        </h1>
        <h1 class="flex justify-between pb-3 border-b-2 mt-2 border-[#E7EDF0]">
          Days: <span v-if="group?.days">Mon/Wed/Fri</span
          ><span v-else>Tue/Thu/Sat</span>
        </h1>
      </div>
    </div>
    <div class="w-[50%]">
      <VButton btn_type="primary" @click="openModal" class="mb-5"
        >Add student</VButton
      >
      <el-collapse>
        <el-collapse-item name="schedule">
          <template #title>
            <span class="text-[20px]">Schedule</span>
          </template>

          <div class="w-full flex gap-2 flex-wrap">
            <div
              v-for="(item, index) in single_store.lessons"
              :key="index"
              class="cursor-pointer"
            >
              <el-popover
                placement="top-start"
                :title="formatDate(item?.date)"
                :width="200"
                trigger="hover"
                transition="100 linear"
                :content="item?.description"
              >
                <template #reference>
                  <div
                    class="w-[40px] h-[40px] cursor-pointer border-[1px] px-[5px] text-global1 border-global1 flex items-center"
                    :class="
                      item?.pass
                        ? ''
                        : item?.description
                        ? 'bg-[crimson] text-[#fff] border-none'
                        : 'bg-[gray] text-[#fff]'
                    "
                    @click="openSingleModal(item)"
                  >
                    {{ formatDateAttendance(item?.date) }}
                  </div>
                </template>
              </el-popover>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>

      <el-collapse>
        <el-collapse-item name="students">
          <template #title>
            <span class="text-[20px]">All Students</span>
          </template>
          <Accardion
            :data="single_store.attendance"
            :modal_value="single_modal"
            class="mb-5"
          />
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup>
  import { useGroupStore } from "../../stores/admin/adminGroup";
  import { useRoute } from "vue-router";
  import { ref, onMounted } from "vue";
  import {
    formatDate,
    formatTime,
    formatDateAttendance,
  } from "../../plugins/format";
  import VButton from "../../components/form/VButton.vue";
  import AddStudentGroupModal from "./Modals/addStudentGroupModal.vue";
  import { useTeacherSingleGroupStore } from "../../stores/teacher/teacherSingleGroup";
  import Accardion from "../../components/ui/accardion.vue";
  import SingleModal from "./Modals/singleModal.vue";

  const route = useRoute();
  const store = useGroupStore();
  const single_store = useTeacherSingleGroupStore();
  const add_modal = ref();
  const single_modal = ref();

  const group = ref();

  const openSingleModal = (item) => {
    if (!item.pass) single_modal.value.openModal(item);
  };

  const openModal = () => {
    add_modal.value.openModal();
  };

  onMounted(async () => {
    await store.getSingleGroup(route.params.id);
    await single_store.getAllLessons(route.params.id);
    await single_store.getAllStudentsAttendance(route.params.id);
    group.value = store.group;
  });
</script>
