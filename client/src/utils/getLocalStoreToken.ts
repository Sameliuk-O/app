export const getLocalStoreToken = () => {
  const local = localStorage.getItem("keycloakTokens");
  const parseLocal = local ? JSON.parse(local) : { token: "" };
  const token: string = parseLocal.token;

  return { token };
};
