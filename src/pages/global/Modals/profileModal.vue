<template>
  <AppModal v-model="dialog">
    <div class="flex">
      <div class="mt-[30px] mb-5">
        <h1 class="text-[20px] mb-2 text-global1">Choose profile picture</h1>
        <input type="file" @change="handleImage($event)" />
      </div>
      <div class="w-[100px] h-[100px]">
        <img
          v-if="image"
          :src="image"
          alt="new profile image"
          class="w-[100%] h-[100%] object-cover rounded-full"
        />
      </div>
    </div>
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
      <div class="flex gap-5 ml-[10%]">
        <VButton
          type="submit"
          btn_type="primary"
          :is-loading="loading"
          class="w-[40%] mt-4"
          >{{ loading ? "Loading" : "Edit profile" }}</VButton
        >
        <VButton
          btn_type="danger"
          :is-loading="false"
          class="w-[40%] mt-4"
          @click="dialog = false"
          >Cancel</VButton
        >
      </div>
    </vee-form>
  </AppModal>
</template>

<script setup>
  import VButton from "../../../components/form/VButton.vue";
  import VInputVue from "../../../components/form/VInput.vue";
  import AppModal from "../../../components/ui/app-modal.vue";
  import { useAuthStore } from "../../../stores/auth";
  import { ref } from "vue";

  const dialog = ref(false);
  const store = useAuthStore();
  const image = ref("");
  const loading = ref(false);
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

  const handleImage = async (e) => {
    const form = new FormData();
    form.append("image", e.target.files[0]);
    await store.updateImage(form);
    image.value = `${store?.image}`;
  };

  const send = async (values) => {
    loading.value = true;
    let a = values.phone.split("");
    let b = a.filter((item) => !isNaN(+item));
    let c = "+" + b.join("");

    let payload = {
      first_name: values.first_name,
      last_name: values.last_name,
      image: image.value,
      phone: c,
    };
    await store.updateProfile(payload);
    loading.value = false;
    location.reload();
  };

  const openModal = (item) => {
    if (item.image) {
      image.value = `${item?.image}`;
    }
    form.value = { ...item };
    dialog.value = true;
  };

  defineExpose({ openModal });
</script>

<style lang="scss" scoped>
  input[type="file"] {
    color: transparent;
  }
</style>
