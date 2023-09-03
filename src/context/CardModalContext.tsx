import { createContext, useContext, useState } from "react";

interface Props {
    children: React.ReactNode
}

interface ICardModalContextValues {
    modalShow: boolean,
    setModalShow: React.Dispatch<React.SetStateAction<boolean>>,
    modalCardId: number,
    setModalCardId: React.Dispatch<React.SetStateAction<number>>,
    modalCardWord: string,
    setModalCardWord: React.Dispatch<React.SetStateAction<string>>,
    modalCardDesc: string,
    setModalCardDesc: React.Dispatch<React.SetStateAction<string>>,
    modalCardWordType: string,
    setModalCardWordType: React.Dispatch<React.SetStateAction<string>>,
    tagNamesNewValue: string, 
    setTagNamesNewValue: React.Dispatch<React.SetStateAction<string>>,
    // modalCardTagIds: [string], 
    // setModalCardTagIds: () => {}
}

const CardModalContext = createContext<undefined | ICardModalContextValues>(undefined);
const Provider = CardModalContext.Provider;

function CardModalProvider({children}: Props) {
    const [modalShow, setModalShow] = useState(false);
    const [modalCardId, setModalCardId] = useState(0);
    const [modalCardWord, setModalCardWord] = useState("");
    const [modalCardDesc, setModalCardDesc] = useState("");
    const [modalCardWordType, setModalCardWordType] = useState("");
    const [tagNamesNewValue, setTagNamesNewValue] = useState("");
    // const [modalCardTagIds, setModalCardTagIds] = useState([]);

    return (
        <Provider value={{modalShow, setModalShow, modalCardId, setModalCardId, modalCardWord, setModalCardWord, modalCardDesc, setModalCardDesc, modalCardWordType, setModalCardWordType, tagNamesNewValue, setTagNamesNewValue}}>
            {children}
        </Provider>
    );
}

function useCardModalContext(){
    const context = useContext(CardModalContext);

    if(context === undefined) {
        //handle
        throw new Error("useCardModalContext should be used within an CardModalProvider.");
    }
    
    return context;
}

export {CardModalContext, CardModalProvider, useCardModalContext};