import { IStore, userStore } from "@/stores/userStore";
import { IKeycloakTokens } from "@/types/IKeycloakTokens.ts";
import { useCallback } from "react";

const useLogout = () => {
  const setUserHomes = userStore((state: IStore) => state.setUserHomes);
  const setUserId = userStore((state: IStore) => state.setUserId);
  const setUserInfo = userStore((state) => state.setUserInfo);
  const setUser = userStore((state) => state.setUser);

  return useCallback(() => {
    localStorage.setItem("token", "");
    setUserHomes([]);
    setUserInfo([]);
    setUserId("");
    setUser(null);
    const keycloakTokens: IKeycloakTokens = {
      token: "",
      refreshToken: "",
      idToken: "",
    };
    localStorage.setItem("keycloakTokens", JSON.stringify(keycloakTokens));
  }, [setUserHomes, setUserId, setUserInfo]);
};

export default useLogout;
