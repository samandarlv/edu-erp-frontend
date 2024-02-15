<template>
  <section
    class="w-full h-screen bg-[#E7EDF0] flex items-center justify-center"
  >
    <div class="w-[80%] flex items-center justify-center">
      <div class="w-[60%] flex items-center justify-center flex-col">
        <h1 class="text-global1 font-bold text-[44px]">Najot Ta'limga</h1>
        <p class="text-global1 font-normal text-[32px]">Xush kelibsiz!</p>
        <vee-form
          :validation-schema="schema"
          class="w-[90%] mt-[70px] flex flex-col gap-[30px]"
          @submit="send"
        >
          <div class="w-full">
            <VInput
              type="text"
              label="Phone number"
              name="phone"
              mask="+998-##-###-##-##"
              placeholder="+998-00-000-00-00"
            />
          </div>
          <div class="w-full justify-between items-center">
            <VPasswordInputVue
              type="password"
              label="Password"
              name="password"
              placeHolder="Enter your password"
            ></VPasswordInputVue>
          </div>

          <VButtonVue type="submit" btn_type="primary" :isLoading="loading">
            {{ btn_title }}</VButtonVue
          >
        </vee-form>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { computed, ref } from "vue";
  import VInput from "../../components/form/VInput.vue";
  import VPasswordInputVue from "../../components/form/VPasswordInput.vue";
  import VButtonVue from "../../components/form/VButton.vue";
  import { useAuthStore } from "../../stores/auth";
  const store = useAuthStore();

  const schema = computed(() => {
    return {
      phone: "required|min:6|max:30",
      password: "required|min:5|max:30",
    };
  });

  const loading = ref(false);

  const btn_title = computed(() => {
    if (loading.value) {
      return "Loading";
    } else {
      return "Kirish";
    }
  });

  const send = async (values) => {
    loading.value = true;
    let a = values.phone.split("");
    let b = a.filter((item) => !isNaN(+item));
    let c = "+" + b.join("");

    let payload = {
      phone: c,
      password: values.password,
    };
    await store.authLogin(payload);
    loading.value = false;
  };
</script>

<style lang="scss" scoped></style>
