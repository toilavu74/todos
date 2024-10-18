<template>
  <div class="container mx-auto">
    <form
      @submit.prevent="handleLogin()"
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
            @click="onRegister"
            class="py-[7px] text-center border border-primary w-1/2 rounded-md text-[14px] uppercase text-primary"
          >
            Register
          </button>
          <button
            v-if="isPending"
            type="submit"
            class="py-[7px] text-center border border-primary w-1/2 rounded-md bg-primary text-white text-[14px] uppercase"
          >
            Loading...
          </button>
          <button
            v-else
            type="submit"
            class="py-[7px] text-center border border-primary w-1/2 rounded-md bg-primary text-white text-[14px] uppercase"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";
import { useRouter } from "vue-router";
//import { useAuthStore } from "@/store/AuthStore";
import { useField, useForm } from "vee-validate";
import { useNotification } from "@kyvg/vue3-notification";
import * as yup from "yup";
import { ref } from "vue";
export default {
  setup() {
    const isPending = ref(false);
    const router = useRouter();
    const schema = yup.object({
      email: yup.string().email().required(),
      password: yup.string().required().min(6),
    });
    const { handleSubmit } = useForm({
      validationSchema: schema,
    });
    const { value: email, errorMessage: emailError } = useField("email");
    const { value: password, errorMessage: passwordError } =
      useField("password");
    const { notify } = useNotification();
    const handleLogin = handleSubmit(async () => {
      try {
        isPending.value = true;
        const data = await signInWithEmailAndPassword(
          auth,
          email.value,
          password.value
        );
        //console.log(data);
        router.push({ name: "Home", params: {} });
        return data;
      } catch (error) {
        console.log(error);
        notify({
          title: "Error",
          text: "Login information is incorrect.",
          type: "error",
        });
      } finally {
        isPending.value = false;
      }
    });
    function onRegister() {
      router.push({ name: "Register", params: {} });
    }
    return {
      handleLogin,
      onRegister,
      email,
      password,
      emailError,
      passwordError,
      isPending,
    };
  },
};
</script>
