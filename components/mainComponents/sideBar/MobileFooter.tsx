"use client";

import useConversation from "@/hooks/useConversation";
import useRoutes from "@/hooks/useRoutes";
import MobileItem from "./MobileItem";

const MobileFooter = () => {
  const routes = useRoutes();
  const { isOpen } = useConversation();

  if (isOpen) {
    return null;
  }

  return (
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
    </div>
  );
};

export default MobileFooter;