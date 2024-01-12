"use client";

import useConversation from "@/hooks/useConversation";
import { FullMessageType } from "@/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./messageBox";
import axios from "axios";
import { pusherClient } from "@/hooks/pusher";
import { find } from "lodash";
import ConversationForm from "./form";

interface ConversationBodyProps {
  initialMessages: FullMessageType[] | null;
}
const ConversationBody: React.FC<ConversationBodyProps> = ({
  initialMessages,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState(initialMessages);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef?.current?.scrollIntoView();

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((current: any) => {
        if (find(current, { id: message.id })) {
          return current;
        }

        return [...current, message];
      });

      bottomRef?.current?.scrollIntoView();
    };

    const updateMessageHandler = (newMessage: FullMessageType) => {
      setMessages((current: any) =>
        current.map((currentMessage: any) => {
          if (currentMessage.id === newMessage.id) {
            return newMessage;
          }

          return currentMessage;
        })
      );
    };

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:update", updateMessageHandler);
    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
      pusherClient.unbind("message:update", updateMessageHandler);
    };
  }, [conversationId]);
  return (
    <>
      <div className="flex-1 pt-24 overflow-y-auto no-scrollbar">
        {messages != null &&
          messages.map((message, i) => (
            <MessageBox
              isLast={i == messages.length - 1}
              key={message.id}
              data={message}
            />
          ))}
        <div ref={bottomRef} className="pt-24" />
      </div>
    </>
  );
};

export default ConversationBody;
