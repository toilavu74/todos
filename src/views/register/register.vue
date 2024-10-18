<template>
  <div class="container mx-auto">
    <form
      @submit.prevent="handleRegister"
      class="p-[30px] shadow-md rounded-lg border-t-[4px] border-primary"
    >
      <div class="group-item mb-4">
        <label for="email">
          <span class="block text-[14px] text-black mb-2">Email</span>
          <input
            type="email"
            id="email"
            class="w-full h-[45px] border rounded-lg border-gray px-3 outline-none"
            name="email"
            placeholder="example@gmail.com"
            v-model="email"
            @input="debouncedHandleEmailChange"
          />
        </label>
        <span v-if="emailError" class="block mt-[6px] text-red-500">{{
          emailError
        }}</span>
      </div>
      <div class="group-item mb-6">
        <label for="password">
          <span class="block text-[14px] text-black mb-2">Password</span>
          <input
            type="password"
            id="password"
            class="w-full h-[45px] border rounded-lg border-gray px-3 outline-none"
            name="password"
            placeholder="password"
            v-model="password"
            @input="debouncedHandlePasswordChange"
          />
        </label>
        <span v-if="passwordError" class="block mt-[6px] text-red-500">{{
          passwordError
        }}</span>
      </div>
      <div class="group-item">
        <div class="flex items-center gap-[15px] justify-between">
          <button
            type="button"
            @click="onLogin"
            class="py-[7px] text-center border border-primary w-1/2 rounded-md text-[14px] uppercase text-primary"
          >
            Login
          </button>
          <button
            v-if="isPending"
            type="submit"
            class="py-[7px] text-center border border-primary w-1/2 rounded-md text-[14px] bg-primary text-white uppercase"
          >
            Loading...
          </button>
          <button
            v-else
            type="submit"
            class="py-[7px] text-center border border-primary w-1/2 rounded-md text-[14px] bg-primary text-white uppercase"
          >
            Register
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { auth } from "@/config/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
import debounce from "lodash/debounce";
import { useNotification } from "@kyvg/vue3-notification";
export default {
  setup() {
    const router = useRouter();
    // const email = ref("");
    // const password = ref("");
    const isPending = ref(false);
    //const errorLoad = ref(null);

    function onLogin() {
      router.push({ name: "Login", params: {} });
    }
    const schema = yup.object({
      email: yup.string().required().email(),
      password: yup.string().min(6).required(),
    });
    const { handleSubmit } = useForm({
      validationSchema: schema,
    });
    const {
      value: email,
      errorMessage: emailError,
      handleChange: handleEmailChange,
    } = useField("email");
    const {
      value: password,
      errorMessage: passwordError,
      handleChange: handlePasswordChange,
    } = useField("password");

    const debouncedHandleEmailChange = debounce(handleEmailChange, 5000);
    const debouncedHandlePasswordChange = debounce(handlePasswordChange, 5000);

    const { notify } = useNotification();
    const handleRegister = handleSubmit(async () => {
      try {
        isPending.value = true;
        const data = await createUserWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        console.log(isPending);
        notify({
          title: "Success",
          text: "You have successfully registered!",
          type: "success",
        });
        router.push({ name: "Home", params: {} });

        return data;
      } catch (error) {
        console.log(error);
        notify({
          title: "Error",
          text: "Email already in use",
          type: "error",
        });
      } finally {
        isPending.value = false;
      }
    });
    return {
      onLogin,
      handleRegister,
      email,
      password,
      isPending,
      emailError,
      passwordError,
      debouncedHandleEmailChange,
      debouncedHandlePasswordChange,
    };
  },
};
</script>
