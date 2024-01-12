"use client";

import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import MobileItem from "./MobileItem";
import SettingModal from "./settingsModal";
import { User } from "@prisma/client";
import { useState } from "react";
import { FaUser,FaUserCog } from "react-icons/fa";
interface MobileFooterProps {
  currentUser: User;
}

const MobileFooter: React.FC<MobileFooterProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const { isOpen } = useConversation();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  if (isOpen) {
    return null;
  }

  return (
    <>
      <SettingModal
        currentUser={currentUser}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />
      <div className="fixed justify-between w-full bottom-0 z-40 flex items-center bg-white dark:bg-black border-t-[1px] dark:border-t-gray-400 lg:hidden">
        {routes.map((route) => (
          <MobileItem
            key={route.href}
            href={route.href}
            icon={route.icon}
            onClick={route.onClick}
            active={route.active}
          />
        ))}
          <MobileItem
          key={currentUser.id}
          href="#"
          onClick={() => setIsProfileOpen(true)}
          icon={FaUserCog}
          />
      </div>
    </>
  );
};

export default MobileFooter;
