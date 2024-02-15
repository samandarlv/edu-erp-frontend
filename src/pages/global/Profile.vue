<template>
  <div class="w-full h-screen flex justify-center items-center">
    <ProfileModal ref="profile_modal" />
    <div class="w-[500px] flex flex-col gap-3">
      <img
        :src="
          image
            ? image
            : 'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png'
        "
        alt="profile image"
        class="w-[150px] h-[150px] object-cover rounded-full"
      />
      <p>
        First name: <span>{{ store?.user?.first_name }}</span>
      </p>
      <p>
        Last name: <span>{{ store?.user?.last_name }}</span>
      </p>
      <p>
        Phone number: <span>{{ store?.user?.phone }}</span>
      </p>
      <VButton btn_type="primary" @click="updateProfile"
        >Update profile</VButton
      >
    </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  import ProfileModal from "./Modals/profileModal.vue";
  import { useAuthStore } from "../../stores/auth";
  import VButton from "../../components/form/VButton.vue";

  const store = useAuthStore();
  const profile_modal = ref("");

  const image = ref("");

  const updateProfile = () => {
    profile_modal.value.openModal(store?.user);
  };

  onMounted(async () => {
    await store.getProfile();
    if (store?.user?.image) {
      image.value = `${store?.user?.image}`;
    }
  });
</script>

<style lang="scss" scoped></style>
