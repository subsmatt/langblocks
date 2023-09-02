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
            <p>Signed in as {session.user?.email}</p>
            <button className="" onClick={() => signOut({callbackUrl: "/"})}>Sign out</button>
        </>
        );
    }
    return (
        <>
          {/* pass 2 additional args to force user to provide credentials */}
          {/* <button className="btn btn-outline-info float-end" onClick={() => signIn("auth0", null, { prompt: "login" })}>Sign in</button> */}
          <button className="" onClick={() => signIn("auth0")}>Sign in</button>
        </>
    );
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono">
        <div className="fixed left-0 top-0 flex w-full justify-between border-b border-gray-300 bg-gradient-to-b from-zinc-200 p-2 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:dark:bg-zinc-800/30">
          <div className="flex justify-start w-1/3">
            <Image src={`/images/subsmatt_logo_${theme}_theme.png`} width="127" height="76" alt="Subsmatt"/>
          </div>
          <div className="flex justify-center w-1/3">LangBlocks</div>
          <div className="flex justify-end w-1/3">
            <LogInBtn/>
          </div>
        </div>
        {session ? <Content/> : <NonAuthContent/>}
      </div>
    </main>
  )
}
