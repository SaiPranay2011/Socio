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
        return <button onClick={() => setTheme('light')}><MdLightMode/></button>
    }
    if (resolvedTheme === "light"){
        return <button onClick={() => setTheme('dark')}><MdOutlineDarkMode/></button>
    }
}