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
      <div
        class="p-[20px] border-b border-[#ededed]"
        v-if="paginateData.length"
      >
        <div class="flex flex-col">
          <div
            class="item"
            v-for="(todo, index) in paginateData"
            :key="index.id"
          >
            <router-link :to="{ name: 'Edit', params: { id: todo.id } }">
              <p>{{ todo.name }}</p>
              <span>{{ todo.description }}</span>
            </router-link>
          </div>
        </div>
        <div
          class="pagination-controls mt-5 flex justify-center items-center gap-1"
        >
          <button
            @click="goToPreviousPage"
            :disabled="currentPage === 1"
            class="rotate-90 pl-[6px] border-0"
            :class="{ 'cursor-not-allowed': currentPage === 1 }"
          >
            <icon-arrow-left />
          </button>
          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            :class="{ active: page === currentPage }"
          >
            {{ page }}
          </button>
          <button
            class="rotate-90 pl-[6px] border-0"
            @click="goToNextPage"
            :disabled="currentPage === totalPages"
            :class="{ 'cursor-not-allowed': currentPage === totalPages }"
          >
            <icon-arrow-right />
          </button>
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
<style>
.pagination-controls button {
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #41b883;
  font-size: 14px;
  background: #fff;
  color: #41b883;
}
.pagination-controls button svg path {
  fill: #41b883;
}
.pagination-controls button.active {
  @apply bg-primary;
  color: #fff;
}
</style>
<script>
import IconDarkMode from "@/components/icon/IconDarkMode.vue";
import IconLogout from "@/components/icon/IconLogout.vue";
import IconArrowLeft from "@/components/icon/IconArrowLeft.vue";
import IconArrowRight from "@/components/icon/IconArrowRight.vue";
import IconPlus from "@/components/icon/IconPlus.vue";
import { useAuthStore } from "@/store/AuthStore.js";
import { useTodoStore } from "@/store/TodoStore.js";
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
export default {
  components: {
    IconDarkMode,
    IconLogout,
    IconPlus,
    IconArrowLeft,
    IconArrowRight,
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

    const itemsPerPage = ref(6);
    const currentPage = ref(1);
    const totalPages = computed(() => {
      return Math.ceil(todos.value.length / itemsPerPage.value);
    });
    const paginateData = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return todos.value.slice(start, end);
    });
    const goToPreviousPage = () => {
      if (currentPage.value > 1) currentPage.value--;
    };
    const goToNextPage = () => {
      if (currentPage.value < totalPages.value) currentPage.value++;
    };
    const goToPage = (page) => {
      if (page >= 1 && page <= totalPages.value) currentPage.value = page;
    };

    const handleLogout = async () => {
      await useLogout();
      router.push({ name: "Login", params: {} });
    };
    return {
      currentUser,
      handleLogout,
      todos,
      router,
      paginateData,
      goToNextPage,
      goToPreviousPage,
      goToPage,
      itemsPerPage,
      currentPage,
      totalPages,
    };
  },
};
</script>
