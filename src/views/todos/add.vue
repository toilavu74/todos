<template>
  <div class="container mx-auto">
    <form
      @submit.prevent="handleAdd"
      class="p-[30px] shadow-md rounded-lg border-t-[4px] border-primary"
    >
      <div class="group-item mb-4">
        <label for="text">
          <span class="block text-[14px] text-black mb-2">Text</span>
          <input
            type="text"
            id="text"
            class="w-full h-[45px] border rounded-lg border-gray px-3 outline-none"
            name="text"
            placeholder="text"
            v-model="name"
          />
        </label>
        <span v-if="nameError" class="block mt-[6px] text-red-500">{{
          nameError
        }}</span>
      </div>
      <div class="group-item mb-6">
        <label for="description">
          <span class="block text-[14px] text-black mb-2">Description</span>
          <textarea
            name="description"
            id="description"
            placeholder="description"
            class="w-full h-[65px] py-2 border rounded-lg border-gray px-3 outline-none"
            v-model="description"
          ></textarea>
        </label>
        <span v-if="descriptionError" class="block mt-[6px] text-red-500">{{
          descriptionError
        }}</span>
      </div>
      <div class="group-item">
        <div class="flex items-center gap-[15px] justify-between">
          <button
            type="button"
            @click="handleCancel"
            class="py-[7px] text-center border border-primary w-1/2 rounded-md text-[14px] uppercase text-primary"
          >
            Cancel
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
            Add
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/AuthStore";
import { useTodoStore } from "@/store/TodoStore";
import { useNotification } from "@kyvg/vue3-notification";
import { useField, useForm } from "vee-validate";
import * as yup from "yup";
export default {
  setup() {
    const router = useRouter();
    const { addTodo, isPending } = useTodoStore();
    console.log(isPending);
    const authStore = useAuthStore();
    const { notify } = useNotification();
    const schema = yup.object({
      name: yup.string().min(6).required(),
      description: yup.string().min(6).required(),
    });
    const { handleSubmit } = useForm({
      validationSchema: schema,
    });
    const { value: name, errorMessage: nameError } = useField("name");
    const { value: description, errorMessage: descriptionError } =
      useField("description");

    const handleAdd = handleSubmit(async (values) => {
      const newData = values;
      const data = {
        user_id: authStore.currentUser.uid,
        name: newData.name,
        description: newData.description,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      //console.log(data);
      await addTodo(data);
      notify({
        title: "Success",
        text: "You have successfully added a new item.",
        type: "success",
      });
      router.push({ name: "Home", params: {} });
    });
    const handleCancel = () => {
      router.push({ name: "Home", params: {} });
    };
    return {
      handleAdd,
      handleCancel,
      name,
      nameError,
      description,
      descriptionError,
      isPending,
    };
  },
};
</script>
