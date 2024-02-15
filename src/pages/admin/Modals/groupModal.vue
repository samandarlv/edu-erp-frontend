<template>
  <AppModal v-model="dialog">
    <label class="text-global1 text-[20px] font-normal">Group</label>
    <input
      class="w-[100%] p-[10px] text-[21px] outline-none border rounded-lg bg-[white] mt-[7px]"
      type="text"
      v-model="form.name"
      placeholder="Group name"
    />

    <div class="w-full">
      <label class="text-global1 text-[20px] font-normal">Course name</label>
      <select
        class="w-[100%] p-[5px] text-[21px] outline-none border rounded-lg bg-[white] mt-[7px]"
        v-model="form.course"
        @change="getTeachers"
      >
        <option
          v-for="(item, index) in course_store?.courses"
          :value="item._id"
          :key="index"
          :selected="form.course === item._id"
        >
          {{ item.name }}
        </option>
      </select>
    </div>

    <div class="w-full" v-if="course_store?.teachers?.length">
      <label class="text-global1 text-[20px] font-normal">Teacher</label>
      <select
        class="w-[100%] p-[5px] text-[21px] outline-none border rounded-lg bg-[white] mt-[7px]"
        v-model="form.teacher"
      >
        <option
          v-for="(item, index) in course_store?.teachers"
          :value="item._id"
          :key="index"
          :selected="form.teacher === item._id"
        >
          {{ item.first_name + " " + item.last_name }}
        </option>
      </select>
    </div>

    <div class="demo-date-picker">
      <div class="block">
        <span class="demonstration">Start date</span>
        <el-date-picker
          v-model="form.start_date"
          type="date"
          :placeholder="new Date().toLocaleDateString()"
          :default-value="form.start_date ? new Date(form.start_date) : null"
        />
      </div>
    </div>

    <div class="w-full">
      <label class="text-global1 text-[20px] font-normal">Days</label>
      <select
        class="w-[100%] p-[5px] text-[21px] outline-none border rounded-lg bg-[white] mt-[7px]"
        v-model="form.days"
      >
        <option value="odd">Odd</option>
        <option value="even">Even</option>
      </select>
    </div>

    <div class="demo-time-range my-[10px]">
      <el-time-select
        v-model="form.start_time"
        :max-time="form.end_time"
        class="mr-4"
        placeholder="Start time"
        start="08:00"
        step="00:30"
        end="19:00"
        @change="setStartTime"
      />
      <el-time-select
        v-model="form.end_time"
        :min-time="form.start_time"
        placeholder="End time"
        start="09:30"
        step="00:30"
        end="21:00"
        @change="setEndTime"
      />
    </div>
    <div class="w-full" v-if="rooms || new_item?.value?.romm_id">
      <label class="text-global1 text-[20px] font-normal">Rooms</label>
      <select
        class="w-[100%] p-[5px] text-[21px] outline-none border rounded-lg bg-[white] mt-[7px] mb-5"
        v-model="form.room"
      >
        <option v-for="(item, index) in rooms" :value="item._id">
          {{ item.name }}
        </option>
      </select>
    </div>
    <VButtonVue
      btn_type="primary"
      :is-loading="loading"
      class="w-full"
      @click="send"
      >{{ loading ? "Loading" : btn_title }}</VButtonVue
    >
  </AppModal>
  <AppModal v-model="dialog2">
    <h1 class="text-[28px] text-center">
      Are you sure you want to delete this group?
    </h1>
    <div class="flex gap-5 w-full mt-[30px] justify-center">
      <VButtonVue btn_type="success" class="w-[30%]" @click="yes"
        >Yes</VButtonVue
      >
      <VButtonVue btn_type="danger" class="w-[30%]" @click="dialog2 = false"
        >Cancel</VButtonVue
      >
    </div>
  </AppModal>
</template>

<script setup>
  import { ref, watch } from "vue";
  import AppModal from "../../../components/ui/app-modal.vue";
  import { useGroupStore } from "../../../stores/admin/adminGroup";
  import VInputVue from "../../../components/form/VInput.vue";
  import VButtonVue from "../../../components/form/VButton.vue";
  import { useCourseStore } from "../../../stores/admin/adminCourse";

  const store = useGroupStore();
  const course_store = useCourseStore();

  const dialog = ref(false);
  const dialog2 = ref(false);
  const loading = ref(false);
  const unique_id = ref();
  const form = ref({
    name: "",
    start_date: "",
    start_time: "",
    end_time: "",
    days: null,
    course: "",
    teacher: "",
    room: "",
  });

  let btn_title = ref();

  const params = {
    page: 1,
    limit: 10,
  };

  const getTeachers = async () => {
    await course_store.getCourseTeacher(form.value.course);
  };

  watch(dialog, (value) => {
    if (!value) {
      form.value = {};
      course_store.teachers = [];
      rooms.value = [];
    }
  });

  const new_item = ref();

  const time = ref({
    start_date: "",
    days: null,
    start_time: null,
    end_time: null,
  });

  const rooms = ref();

  const openModal = async (item) => {
    if (item) {
      let start_hour = `${parseInt(item.start_time / 60)}`.padStart(2, 0);
      let end_hour = `${parseInt(item.end_time / 60)}`.padStart(2, 0);
      let start_minute = `${parseInt(item.start_time % 60)}`.padStart(2, 0);
      let end_minute = `${parseInt(item.end_time % 60)}`.padStart(2, 0);

      form.value = {
        ...item,
        start_time: `${start_hour}:${start_minute}`,
        end_time: `${end_hour}:${end_minute}`,
      };
      btn_title = "Save";
    } else {
      btn_title = "Add";
    }
    params.limit = await course_store.getCourses(params);
    dialog.value = true;
  };

  const setStartTime = async (value) => {
    if (form.value.end_time) {
      setEndTime();
    }
  };

  const setEndTime = async (value) => {
    if (form.value.start_time) {
      let a = form.value.start_time.split(":");
      let b = form.value.end_time.split(":");

      if (form.value.days == "even") {
        time.value.days = false;
      } else {
        time.value.days = true;
      }

      time.value.start_time = a[0] * 60 + Number(a[1]);
      time.value.end_time = b[0] * 60 + Number(b[1]);
      time.value.start_date = form.value.start_date;

      await store.getAvailableRooms(time.value);
      rooms.value = store.rooms;
    }
  };

  const openDeleteModal = (id) => {
    unique_id.value = id;
    dialog2.value = true;
  };

  const yes = async () => {
    await store.deleteGroup(unique_id.value);
    dialog2.value = false;
    location.reload();
    loadPageData($route.query.page);
  };

  const send = async () => {
    loading.value = true;

    let payload = {
      ...form.value,
      ...time.value,
      status: true,
    };
    console.log(payload);

    await store.addGroup(payload);

    loading.value = false;

    // dialog.value = false;
    form.value = {};
    time.value = {};
    // location.reload();
  };

  defineExpose({ openModal, openDeleteModal });
</script>

<style scoped>
  .demo-date-picker {
    display: flex;
    width: 100%;
    padding: 0;
    flex-wrap: wrap;
  }

  .demo-date-picker .block {
    display: flex;
    flex-direction: column;
    padding: 7px 0;
    text-align: center;
    border-right: solid 1px var(--el-border-color);
  }

  .demo-date-picker .block:last-child {
    border-right: none;
  }

  .demo-date-picker .demonstration {
    display: block;
    color: #12486b;
    text-align: start;
    font-size: 20px;
  }
</style>
