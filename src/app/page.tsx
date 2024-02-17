'use client';
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import NonAuthContent from "@/components/NonAuthContent";
import Content from "@/components/Content";

export default function Home() {
  const theme = "light";
  const { data: session } = useSession();

  function LogInBtn(){    
    if (session) {
        return (
        <>
            <p className="p-2 text-end dark:text-black">Signed in as <span className="text-blue-900">{session.user?.email}</span></p>
            <button className="float-right border border-zinc-300 p-2 hover:text-blue-500 dark:border-black dark:text-black" onClick={() => signOut({callbackUrl: "/"})}>Sign out</button>
        </>
        );
    }
    return (
        <>
          {/* pass 2 additional args to force user to provide credentials */}
          {/* <button className="btn btn-outline-info float-end" onClick={() => signIn("auth0", null, { prompt: "login" })}>Sign in</button> */}
          <button className="float-right border border-zinc-300 p-2 dark:border-black dark:text-black" onClick={() => signIn("auth0")}>Sign in</button>
        </>
    );
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-32 px-8 sm:pt-24 sm:px-14">
      <div className="relative z-10 max-w-5xl w-full items-center justify-between font-mono">
        <div className="z-10 fixed left-0 top-0 flex w-full justify-between border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-2 backdrop-blur-2xl dark:border-neutral-800 dark:to-zinc-500">
          <div className="flex justify-start w-2/5 sm:w-1/3">
            <Image src={`/images/subsmatt_logo_${theme}_theme.png`} width="127" height="76" alt="Subsmatt" priority={true}/>
          </div>
          <div className="flex justify-center self-center w-0 sm:w-1/3 invisible sm:visible"><h1 className="text-2xl dark:text-black">LangBlocks</h1></div>
          <div className="w-3/5 sm:w-1/3">
            <LogInBtn/>
          </div>
        </div>
        {session ? <Content/> : <NonAuthContent/>}
      </div>
    </main>
  )
}
