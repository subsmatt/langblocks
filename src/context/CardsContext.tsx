import { IRecord } from "@/types/card";
import { createContext, useContext, useState } from "react";
import useCards from "@/hooks/useCards";

interface Props {
    children: React.ReactNode
}

interface ICardsContextValues {
    cardsData: IRecord[],
    //cardsDataError: "",
    createCard: () => void,
    updateCard: () => void,
    deleteCard: () => void
}

const CardsContext = createContext<undefined | ICardsContextValues>(undefined);
const Provider = CardsContext.Provider;

function errorNotificationFn(errorMessage: string) {
    console.log(`ERROR: ${errorMessage}`);
}

function CardsProvider({children}: Props) {    
    const {cardsData, createCard, updateCard, deleteCard} = useCards(errorNotificationFn);

    return (
        <Provider value={{cardsData, createCard, updateCard, deleteCard}}>
            {children}
        </Provider>
    );
}

function useCardsContext(){
    const context = useContext(CardsContext);

    if(context === undefined) {
        //handle
        throw new Error("useCardsContext should be used within an CardsProvider.");
    }
    
    return context;
}

export {CardsContext, CardsProvider, useCardsContext};