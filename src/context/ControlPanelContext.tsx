import { createContext, useContext, useState } from "react";

interface Props {
    children: React.ReactNode
}

// // export {ControlPanelContext, ControlPanelProvider};

// interface AuthContextValues {
//     authInfo: AuthInfo,
//     isAuthenticated: boolean,
//     setAuthInfo: string,
//     isAdmin: boolean
// }

// export const AuthContext = createContext<undefined | AuthContextValues>(undefined);
// const Provider = AuthContext.Provider;

// interface UserData {
//     role: "USER" | "ADMIN";
// }

// interface AuthInfo {
//     userData: UserData | null;
// }

// export function AuthProvider({children}: Props){
//     const [authInfo, setAuthInfo] = useState<AuthInfo>({
//         userData: null
//     });

//     const isAuthenticated = authInfo.userData !== null;
//     const isAdmin = authInfo.userData?.role === "ADMIN";

//     return (
//         <Provider value={{authInfo, isAuthenticated, setAuthInfo, isAdmin}}>
//             {children}
//         </Provider>
//     );
// }

interface IControlPanelContextValues {
    searchQuery: string, 
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
    searchType: string, 
    setSearchType: React.Dispatch<React.SetStateAction<string>>
}

const CorntrolPanelContext = createContext<undefined | IControlPanelContextValues>(undefined);
const Provider = CorntrolPanelContext.Provider;

function ControlPanelProvider({children}: Props) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchType, setSearchType] = useState("");

    return (
        <Provider value={{searchQuery, setSearchQuery, searchType, setSearchType}}>
            {children}
        </Provider>
    );
}

function useControlPanelContext(){
    const context = useContext(CorntrolPanelContext);

    if(context === undefined) {
        //handle
        throw new Error("useControlPanelContext should be used within an ControlPanelProvider.");
    }
    
    return context;
}

export {CorntrolPanelContext, ControlPanelProvider, useControlPanelContext};