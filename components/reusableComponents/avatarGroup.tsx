'use client';

import { User } from "@prisma/client";
import clsx from "clsx";
import Image from "next/image";
import ProfileDrawer from "../mainComponents/conversations/conversationId/profileDrawer";

interface AvatarGroupProps {
  users?: User[];
  ProfileDrawer?:boolean
};

const AvatarGroup: React.FC<AvatarGroupProps> = ({ 
  users = [],ProfileDrawer
}) => {
  const slicedUsers = users.slice(0, 3);
  
  const positionMap = {
    0: ProfileDrawer ? "top-0 left-[30px]" :'top-0 left-[12px]',
    1: 'bottom-0',
    2: 'bottom-0 right-0'
  }

  return (
    <div className={clsx(
      "relative",
      ProfileDrawer ? "h-28 w-28" : "h-11 w-11" 
    )}
    >
      {slicedUsers.map((user, index) => (
        <div 
          key={user.id} 
          className={clsx(`
            absolute
            inline-block 
            rounded-full 
            overflow-hidden
            ${positionMap[index as keyof typeof positionMap]}
          `,
          ProfileDrawer ? `h-[54px] w-[54px]` :"h-[21px] w-[21px]"
          )}>
            <Image
              fill
              src={user?.image || '/assets/images/placeholder.jpg'}
              alt="Avatar"
            />
        </div>
      ))}
    </div>
  );
}

export default AvatarGroup;