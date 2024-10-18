import { defineStore } from "pinia";
import { ref } from "vue";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/config/firebase";
export const useAuthStore = defineStore("auth", () => {
  const currentUser = ref(null);
  const accessToken = ref("");
  const isLogin = ref(false);
  const fetchCurrentUser = () => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          currentUser.value = user;
          isLogin.value = true;
          try {
            const token = await user.getIdToken();
            accessToken.value = token;
            resolve(user);
          } catch (error) {
            reject(error);
          }
        } else {
          currentUser.value = null;
          accessToken.value = "";
          isLogin.value = false;
          resolve(null);
        }
      });
    });
  };
  const useLogout = async () => {
    try {
      const data = await signOut(auth);
      currentUser.value = null;
      accessToken.value = "";
      isLogin.value = false;
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  return { currentUser, accessToken, isLogin, fetchCurrentUser, useLogout };
});
