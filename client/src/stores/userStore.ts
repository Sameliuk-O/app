import { ICounters } from "@/types/ICounters.ts";
import create, { StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { IHome } from "@/types/IHome.ts";
import { IMessage } from "@/types/IMessage.ts";
import { IService } from "@/types/IService.ts";

export interface IUserInfo {
  email: string;
  first_name: string;
  last_name: string;
  enabled: boolean;
  id: string;
}

export interface IStore {
  userId: string;
  user: IUserInfo | null;
  userInfo: IUserInfo[] | null;
  userHomes: IHome[];
  messages: IMessage[];
  messagesCounter: number;
  homeServices: IService[];
  homeCounters: ICounters | null;
  newHomeCounters: ICounters | Partial<ICounters> | null;
  setUserId: (newUserId: string) => void;
  setUser: (newUser: IUserInfo | null) => void;
  setUserHomes: (newHomes: IHome[]) => void;
  setUserInfo: (newUserInfo: IUserInfo[]) => void;
  setHomeServices: (newServices: IService[]) => void;
  setMessages: (
    newMessages: IMessage[] | ((prevMessages: IMessage[]) => IMessage[]),
  ) => void;
  setMessagesCounter: (counter: number) => void;
  setHomeCounters: (newCounters: ICounters) => void;
  setNewHomeCounters: (newCounters: ICounters | Partial<ICounters>) => void;
}

type MyPersist = (
  config: StateCreator<IStore>,
  options: PersistOptions<IStore>,
) => StateCreator<IStore>;

export const userStore = create<IStore>(
  (persist as MyPersist)(
    (set) => ({
      userId: "",
      userHomes: [],
      messages: [],
      user: null,
      userInfo: null,
      homeServices: [],
      messagesCounter: 0,
      homeCounters: null,
      newHomeCounters: null,
      setUserId: (newUserId: string) => set({ userId: newUserId }),
      setUserHomes: (newHomes: IHome[]) =>
        set(() => ({ userHomes: [...newHomes] })),
      setUser: (newUser: IUserInfo | null) => set(() => ({ user: newUser })),
      setUserInfo: (newUserInfo: IUserInfo[]) =>
        set(() => ({
          userInfo: Array.isArray(newUserInfo) ? [...newUserInfo] : [],
        })),
      setHomeServices: (newServices: IService[]) =>
        set(() => ({
          homeServices: Array.isArray(newServices) ? [...newServices] : [],
        })),
      setHomeCounters: (newCounters: ICounters) =>
        set(() => ({ homeCounters: newCounters })),

      setNewHomeCounters: (newCounters: ICounters | Partial<ICounters>) =>
        set((state) => ({
          newHomeCounters: state.newHomeCounters
            ? { ...state.newHomeCounters, ...newCounters }
            : newCounters,
        })),
      setMessages: (newMessages) => {
        set((state) => ({
          messages:
            typeof newMessages === "function"
              ? newMessages(state.messages)
              : [...newMessages],
        }));
      },
      setMessagesCounter: (counter: number) =>
        set({ messagesCounter: counter }),
    }),

    {
      name: "user-store",
    },
  ),
);
