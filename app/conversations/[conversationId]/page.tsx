import getConversationById from "@/actions/getConversationById";
import getMessages from "@/actions/getMessages";
import ConversationBody from "@/components/mainComponents/conversations/conversationId/Body";
import ConversationHeader from "@/components/mainComponents/conversations/conversationId/Header";
import ConversationForm from "@/components/mainComponents/conversations/conversationId/form";
import EmptyState from "@/components/reusableComponents/EmptyState";

interface IParams {
  conversationId: string;
}

const ConversationId = async ({ params }: { params: IParams }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-full">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="lg:pl-80 h-full dark:bg-gray-800">
      <div className="h-screen  flex flex-col">
         <ConversationHeader conversation={conversation}/>
         <ConversationBody initialMessages={messages}/>
         <ConversationForm/>
      </div>
    </div>
  );
};

export default ConversationId;
