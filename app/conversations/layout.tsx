import getConversations from "@/actions/getConversations";
import getUsers from "@/actions/getUsers";
import ConversationList from "@/components/mainComponents/conversations/conversationList";
import SideBar from "@/components/mainComponents/sideBar/Sidebar";

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode,
}) {
  const conversations = await getConversations();
  const users = await getUsers();

  return (

    <SideBar>
      <div className="h-full">
        <ConversationList 
          users={users}
          initialItems={conversations}
        />
        {children}
      </div>
    </SideBar>
  );
}
