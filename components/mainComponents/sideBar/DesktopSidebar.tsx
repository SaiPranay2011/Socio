"use client";

import useRoutes from "@/hooks/useRoutes";
import { useState } from "react";
import DesktopItem from "./DesktopItem";
import { User } from "@prisma/client";
import Avatar from "./avatar";
import SettingModal from "./settingsModal";

interface DesktopSideBarProps {
  currentUser: User;
}

const DesktopSideBar: React.FC<DesktopSideBarProps> = ({ currentUser }) => {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
    <SettingModal currentUser={currentUser} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-y-auto lg:bg-white dark:lg:bg-gray-900 lg:border-r-[1px] dark:lg:border-r-gray-800 lg:pb-4 lg:flex lg:flex-col justify-between">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            {routes.map((item) => (
              <DesktopItem
                key={item.label}
                href={item.href}
                icon={item.icon}
                label={item.label}
                active={item.active}
                onClick={item.onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer transition"
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  );
};

export default DesktopSideBar;
