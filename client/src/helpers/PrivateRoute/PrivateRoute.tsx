import { EnabledUserAccount } from "@/pages/EnabledUserAccount";
import { getUserById } from "@/services/getUserById.ts";
import { userStore } from "@/stores/userStore.ts";
import { getLocalStoreToken } from "@/utils/getLocalStoreToken.ts";
import { useKeycloak } from "@react-keycloak/web";
import { ReactNode, useEffect } from "react";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { keycloak } = useKeycloak();
  const userId = keycloak?.tokenParsed?.sub;
  const setUser = userStore((state) => state.setUser);
  const user = userStore((state) => state.user);

  const { token } = getLocalStoreToken();

  const getUser = async () => {
    try {
      const fetchedUser = userId && (await getUserById(userId));
      setUser({ ...fetchedUser });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [userId]);

  const isLoggedIn =
    (keycloak.authenticated && !!user?.enabled) ||
    (token !== undefined && token.length > 0);

  if (isLoggedIn) {
    return children;
  }

  if (user && !user.enabled) {
    return <EnabledUserAccount />;
  }

  return null;
};

export default PrivateRoute;
