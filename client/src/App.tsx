import { BACK_END_URL } from "@/constants/constants.ts";
import * as Frigade from "@frigade/react";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";

import { handleEvent, handleTokens, keycloak } from "@/utils/keycloak";
import { Header } from "@/components/layout/Header";
import { Nav } from "@/components/layout/Nav";
import { Container } from "@/components/ui/Container";

import { IStore, userStore } from "@/stores/userStore";
import { IKeycloakTokens } from "@/types/IKeycloakTokens";
import { routing } from "@/constants/routing";
import { IMessage } from "@/types/IMessage.ts";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const socket = io(BACK_END_URL);

function App() {
  const setUserId = userStore((state: IStore) => state.setUserId);
  const setMessages = userStore((state) => state.setMessages);
  const userId = userStore((state) => state.userId);

  useEffect(() => {
    const storedTokens = localStorage.getItem("keycloakTokens");
    if (storedTokens) {
      const tokens: IKeycloakTokens = JSON.parse(storedTokens);
      keycloak.token = tokens.token;
      keycloak.refreshToken = tokens.refreshToken;
    }

    keycloak.onTokenExpired = () => {
      keycloak
        .updateToken(30)
        .then((refreshed) => {
          if (refreshed) {
            localStorage.setItem(
              "keycloakTokens",
              JSON.stringify(keycloak.token),
            );
          } else {
            keycloak.login();
          }
        })
        .catch(() => {
          keycloak.login();
        });
    };

    if (keycloak.authenticated) {
      const userId = keycloak?.tokenParsed?.sub;
      if (userId) {
        localStorage.setItem("userId", userId);
        setUserId(userId);
      }
    }
  }, [keycloak.authenticated, setUserId]);

  useEffect(() => {
    if (userId) {
      socket.emit("checkUser", { userId: String(userId) });
    }

    socket.on("userMessages", (userMessages: IMessage[]) => {
      setMessages(userMessages);
    });

    socket.on("newMessage", (newMessage: IMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on("connect", () => {
      if (userId) {
        socket.emit("checkUser", { userId: String(userId) });
      }
    });
    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
    });

    return () => {
      socket.off("userMessages");
      socket.off("newMessage");
      socket.off("connect");
      socket.off("connect_error");
    };
  }, [userId, setMessages]);

  return (
    <ReactKeycloakProvider
      authClient={keycloak}
      onTokens={handleTokens}
      onEvent={handleEvent}
      initOptions={{
        onLoad: "check-sso",
        checkLoginIframe: false,
        silentCheckSsoRedirectUri:
          window.location.origin + "/silent-check-sso.html",
      }}
    >
      <Frigade.Provider
        apiKey="api_public_eJ2W2vrijG9wKSt2qfKmIXcK2lbtTyb0WSuGrThpkPgqrkJXiwYqc7fGENPplnKS"
        userId="my-user-id"
      >
        <BrowserRouter>
          <Header />
          <div className="my-6 mx-3 lg:mx-6">
            <Container>
              <Nav classNameNavigation="hidden lg:block" />
              <Routes>
                {routing.map((route) => (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  />
                ))}
              </Routes>
            </Container>
          </div>
        </BrowserRouter>
      </Frigade.Provider>
    </ReactKeycloakProvider>
  );
}

export default App;
