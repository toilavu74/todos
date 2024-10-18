import { ref } from "vue";
import { defineStore } from "pinia";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/config/firebase.js";
import { useAuthStore } from "@/store/AuthStore.js";

export const useTodoStore = defineStore("todo", () => {
  const isPending = ref(false);
  const error = ref(null);
  const authStore = useAuthStore();

  const addTodo = async (items) => {
    try {
      isPending.value = true;
      error.value = null;
      const todoRef = collection(db, "todos");
      const data = await addDoc(todoRef, items);
      //console.log(isPending);
      return data;
    } catch (err) {
      console.log(err);
      error.value = err.message;
    } finally {
      isPending.value = false;
    }
  };

  const getTodo = async () => {
    error.value = null;
    try {
      const todoRef = query(
        collection(db, "todos"),
        where("user_id", "==", authStore.currentUser.uid)
      );
      const querySnapshot = await getDocs(todoRef);
      const newTodo = ref([]);
      querySnapshot.forEach((doc) => {
        newTodo.value.push({ id: doc.id, ...doc.data() });
      });
      return newTodo.value;
    } catch (err) {
      console.log(err);
      error.value = err.message;
    }
  };
  const editTodo = async (id) => {
    try {
      const todoRef = doc(db, "todos", id);
      const querySnapshot = await getDoc(todoRef);
      if (querySnapshot.exists()) {
        return querySnapshot.data();
      } else {
        throw new Error("Todo does not exist");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const updateTodo = async (id, data) => {
    try {
      isPending.value = true;
      const todoRef = doc(db, "todos", id);
      const respon = await updateDoc(todoRef, {
        ...data,
      });
      return respon;
    } catch (err) {
      console.log(err);
    } finally {
      isPending.value = false;
    }
  };
  return { addTodo, isPending, error, getTodo, editTodo, updateTodo };
});
