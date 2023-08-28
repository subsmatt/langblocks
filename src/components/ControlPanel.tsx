'use client';
import { useSession, signIn, signOut } from "next-auth/react";
// import { useContext } from "react";
// import { ControlPanelContext } from "../context/ControlPanelContext";
import CardAdd from "./CardAdd";
// import WordType from "./WordType";

function ControlPanel() {
    function LogInBtn(){
        const { data: session } = useSession();
        if (session) {
            return (
            <>
                <button className="btn btn-outline-info float-end" onClick={() => signOut({callbackUrl: "/"})}>Sign out</button>
                <p>Signed in as {session.user?.email}</p>
            </>
            );
        }
        return (
            <>
              {/* pass 2 additional args to force user to provide credentials */}
              {/* <button className="btn btn-outline-info float-end" onClick={() => signIn("auth0", null, { prompt: "login" })}>Sign in</button> */}
              <button className="btn btn-outline-info float-end" onClick={() => signIn("auth0")}>Sign in</button>
            </>
        );
    }

    return (
        <div className="flex flex-col md:flex-row">
            <div className="basis-1/4">
                <LogInBtn/>
            </div>
            <div className="basis-1/2">
            </div>
            <div className="basis-1/4">
                <CardAdd/>
            </div>
        </div>
    );
}

export default ControlPanel;