<template>
  <div v-if="currentUser">
    <div
      class="w-[700px] mx-auto rounded-[5px] shadow-md border-t-[5px] border-primary"
    >
      <div class="p-[20px] border-b border-[#ededed]">
        <div class="flex items-center justify-between">
          <p>
            Hello, <span class="text-primary">{{ currentUser.email }}</span>
          </p>
          <div class="flex items-center justify-end gap-3">
            <button @click="handleLogout">
              <icon-logout />
            </button>
            <button><icon-dark-mode /></button>
          </div>
        </div>
      </div>
      <div class="p-[20px] border-b border-[#ededed]" v-if="todos.length">
        <div class="flex flex-col">
          <div class="item" v-for="(todo, index) in todos" :key="index.id">
            <router-link :to="{ name: 'Edit', params: { id: todo.id } }">
              <p>{{ todo.name }}</p>
              <span>{{ todo.description }}</span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="p-[20px]">
        <div class="flex justify-between">
          <button
            @click="router.push({ name: 'AddTask', params: {} })"
            class="flex items-center gap-2"
          >
            <icon-plus /><span>Add task</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconDarkMode from "@/components/icon/IconDarkMode.vue";
import IconLogout from "@/components/icon/IconLogout.vue";
import IconPlus from "@/components/icon/IconPlus.vue";
import { useAuthStore } from "@/store/AuthStore.js";
import { useTodoStore } from "@/store/TodoStore.js";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  components: {
    IconDarkMode,
    IconLogout,
    IconPlus,
  },
  setup() {
    const { fetchCurrentUser, currentUser, useLogout } = useAuthStore();
    const router = useRouter();
    const todos = ref([]);
    const { getTodo } = useTodoStore();

    const fetchTodo = async () => {
      try {
        todos.value = await getTodo();
        //console.log(todos.value);
      } catch (err) {
        console.log(err);
      }
    };
    onMounted(() => {
      fetchCurrentUser();
      fetchTodo();
    });
    const handleLogout = async () => {
      await useLogout();
      router.push({ name: "Login", params: {} });
    };
    return { currentUser, handleLogout, todos, router };
  },
};
</script>
