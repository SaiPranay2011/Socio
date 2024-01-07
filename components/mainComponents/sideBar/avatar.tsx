"use client";

import useActiveList from "@/hooks/useActiveList";
import { User } from "@prisma/client";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface AvatarProps {
  user?: User;
}
const Avatar: React.FC<AvatarProps> = ({ user }) => {
  const {members} = useActiveList()
  const isActive = members.indexOf(user?.email!) != -1
  return (
    <div className="relative">
      <div className="
        relative 
        inline-block 
        rounded-full 
        overflow-hidden
        h-8 
        w-8 
        md:h-10 
        md:w-10
      ">
        <Image
          fill
          src={user?.image || '/assets/images/placeholder.jpg'}
          alt="Avatar"
        />
      </div>
      {isActive && (
        <span 
        className="
          absolute 
          block 
          rounded-full 
          bg-green-500 
          ring-2 
          ring-white 
          top-0 
          right-0
          h-2 
          w-2 
          md:h-3 
          md:w-3
        " 
      />
      )}
      
    </div>
  );
};

export default Avatar;
