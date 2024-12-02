import { keycloak } from "@/utils/keycloak.ts";

export const updatePassword = async () => {
  try {
    if (keycloak.authenticated && keycloak.tokenParsed) {
      await keycloak.updateToken(30);
      keycloak.tokenParsed.requiredActions = ["UPDATE_PASSWORD"];
      await keycloak.updateToken(30);

      await keycloak.login({
        action: "UPDATE_PASSWORD",
      });
    } else {
      console.error("User not authenticated");
    }
  } catch (error) {
    console.error("Error triggering required action:", error);
  }
};
