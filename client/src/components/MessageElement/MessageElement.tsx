import { BlackMain, GrayMain } from "@/constants/colors";
import icomoon from "@/constants/icomoon.json";
import { FormatDate } from "@/helpers/formatData";
import { deleteUserMessage } from "@/services/deleteUserMessage";
import { userStore } from "@/stores/userStore";
import { IMessage } from "@/types/IMessage";
import classNames from "classnames";
import { cloneElement, useState } from "react";
import IcoMoon from "react-icomoon";

const MessageElement = (msg: IMessage) => {
  const setMessages = userStore((state) => state.setMessages);
  const [isHover, setIsHover] = useState(false);
  const messages = userStore((state) => state.messages);
  const userId = userStore((state) => state.userId);

  const handleDeleteUserMessage = async (userId: string, messageId: string) => {
    const data = { userId, messageId };
    const response = await deleteUserMessage(data);

    if (response && response.id) {
      const updatedMessages = messages.filter((el) => el.id !== response.id);
      setMessages(updatedMessages);
    } else {
      console.error("Failed to delete the message:", response);
    }
  };

  const icon = cloneElement(
    <IcoMoon iconSet={icomoon} icon="bascket" className="h-8 w-8" />,
    {
      style: { fill: isHover ? BlackMain : GrayMain },
    },
  );

  return (
    <li className="border-dashed border-gray300 border-b-2 py-4">
      <div className="flex justify-between mb-3">
        <div
          className={classNames(
            "w-fit py-1 px-5 flex items-center rounded-xl text-white",
            {
              "bg-green500": msg.action === "Add",
              "bg-redM500": msg.action === "Delete",
              "bg-yellow500": msg.action === "Counter",
            },
          )}
        >
          {msg.interaction}
        </div>
        <button
          onClick={() => handleDeleteUserMessage(userId, msg.id)}
          className="h-fit p-2"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        >
          {icon}
        </button>
      </div>
      <p className="text-gray800 text-2xl pb-1">{msg.message}</p>
      <p className="text-gray500 text-xl pb-1">{msg.description}</p>
      <p className="text-gray500 text-xl mt-3.5">{FormatDate(msg.createdAt)}</p>
    </li>
  );
};

export default MessageElement;
