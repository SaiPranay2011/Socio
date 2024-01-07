"use client";

import ThemeSwitch from "@/components/mainComponents/themeSwitcher";

import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <>
      {/* <ThemeSwitch/> */}
      <main className="w-screen h-screen">
        <div className=" h-fit flex flex-row justify-between">
          <div className="p-2 m-2 uppercase text-lg">Socio</div>
          <div className="flex justify-evenly">
            <button className="p-2 m-2 mr-4 border-2 rounded-xl border-white uppercase" onClick={() => router.push("/login")}>Login</button>
          </div>
        </div>
        <div className=" flex  w-full h-4/5 justify-center items-center">
          <div className="text-xl text-blue-400 sm:text-5xl">Welcome to Socio</div>
        </div>
      </main>
    </>
  );
}


