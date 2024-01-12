'use client'

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { MdOutlineDarkMode } from "react-icons/md";
import { MdLightMode } from "react-icons/md";

export default function ThemeSwitch(){
    const [mounted,setmounted] = useState(false)
    const {setTheme,resolvedTheme} = useTheme()

    useEffect(() => {
        setmounted(true)
    },[])
    if(!mounted) return(
        <div>loading</div>
    )

    if (resolvedTheme === "dark"){
        return <button onClick={() => setTheme('light')}><div className="flex flex-row items-center"> <p className="mr-2">Light</p> <MdLightMode size={20}/></div></button>
    }
    if (resolvedTheme === "light"){
        return <button onClick={() => setTheme('dark')}><div className="flex flex-row items-center"> <p className="mr-2">Dark</p><MdOutlineDarkMode/></div></button>
    }
}