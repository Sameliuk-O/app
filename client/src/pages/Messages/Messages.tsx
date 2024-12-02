import { MessagesBlock } from "@/components/MessagesBlock";
import { Block } from "@/components/ui/Block";
import { readMessage } from "@/services/readMessage.ts";
import { userStore } from "@/stores/userStore.ts";
import { useEffect } from "react";

const Messages = () => {
  const userId = userStore((state) => state.userId);
  const setMessagesCounter = userStore((state) => state.setMessagesCounter);

  const updateReadStatus = async (id: string) => {
    try {
      return await readMessage({ userId: id });
    } catch (error) {
      console.error("Error updating read status:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await updateReadStatus(userId);
        result && setMessagesCounter(0);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Block className="p-5 sm:p-10">
      <MessagesBlock />
    </Block>
  );
};

export default Messages;
