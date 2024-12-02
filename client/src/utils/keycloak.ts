import { IKeycloakTokens } from "@/types/IKeycloakTokens.ts";
import Keycloak from "keycloak-js";
export const KEYCLOAK_URL =
  import.meta.env.VITE_KEYCLOAK_URL || "http://localhost:8080";
export const KEYCLOAK_REALM = import.meta.env.VITE_KEYCLOAK_REALM || "ComunApp";
export const KEYCLOAK_CLIENT_ID =
  import.meta.env.VITE_KEYCLOAK_CLIENT_ID || "comunapp-auth";
export const keycloak = new Keycloak({
  url: KEYCLOAK_URL,
  realm: KEYCLOAK_REALM,
  clientId: KEYCLOAK_CLIENT_ID,
});

export const handleTokens = (tokens: IKeycloakTokens) => {
  const keycloakTokens: IKeycloakTokens = {
    token: tokens.token || "",
    refreshToken: tokens.refreshToken || "",
    idToken: tokens.idToken || "",
  };
  localStorage.setItem("keycloakTokens", JSON.stringify(keycloakTokens));
};

export const handleEvent = (event: string) => {
  if (event === "onAuthSuccess") {
    const tokens: IKeycloakTokens = {
      token: keycloak.token || "",
      refreshToken: keycloak.refreshToken || "",
      idToken: keycloak.idToken || "",
    };
    handleTokens(tokens);
  }
};
