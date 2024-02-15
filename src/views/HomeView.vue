<template>
  <main>
    <h1>Edu</h1>
    <vee-form :validation-schema="schema" @submit="saveForm">
      <!-- <vee-field type="text" name="username" />
      <ErrorMessage name="username" /> -->

      <div>
        <VInput
          type="text"
          name="username"
          label="Username"
          placeholder="Username"
        >
        </VInput>
      </div>
      
      <div>
        <VInput
          type="password"
          name="password"
          label="Password"
          placeholder="Password"
        >
        </VInput>
      </div>

      <button type="submit">save</button>
    </vee-form>
  </main>
</template>

<script setup>
  import { ErrorMessage } from "vee-validate";
  import { computed } from "vue";
  import VInput from "../components/form/VInput.vue";

  const schema = computed(() => {
    return {
      username: "required|min:3|max:30",
      // password: "required|min:6|max:30",
    };
  });

  const saveForm = (value) => {
    console.log(value);
  };
</script>
