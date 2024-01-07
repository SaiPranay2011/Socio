'use client'

import { User } from "@prisma/client";
import React from "react";
import UserBox from "./userBox";

interface UserListProps{
    items: User[]
}

const UserList:React.FC<UserListProps> = ({
    items
}) => {
    return ( <div>
        <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-r-gray-200 dark:border-r-gray-700 dark:bg-gray-900 block w-full left-0">
            <div className="px-5 ">
                <div className="flex-col">
                    <div className="text-2xl font-bold text-neutral-800 dark:text-gray-50 py-4">
                        People
                    </div>
                </div>
                {items.map((item) => (
                    <UserBox key={item.id} data={item}/>
                ))}
            </div>
        </aside>
    </div> );
}
 
export default UserList;