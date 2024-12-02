import { MessageElement } from "@/components/MessageElement";
import { userStore } from "@/stores/userStore";

const MessagesBlock = () => {
  const messages = userStore((state) => state.messages);

  return (
    <ul>
      {messages.length > 0 ? (
        messages
          .slice()
          .reverse()
          .map((msg) => msg && <MessageElement key={msg.id} {...msg} />)
      ) : (
        <li className="text-center">Відсутні повідомлення</li>
      )}
    </ul>
  );
};

export default MessagesBlock;
