import { IRecord, IRecordAttribute, IRecordTag, IRecordTagOnCard } from "@/types/card";
import { createContext, useContext, useState } from "react";
import useCards from "@/hooks/useCards";

interface Props {
    children: React.ReactNode
}

interface ICardsContextValues {
    cardsData: IRecord[],
    //cardsDataError: "",
    cardAttributesData: IRecordAttribute[],
    //cardAttributesDataError: "",
    tagOnCardData: IRecordTagOnCard[],
    tagsData: IRecordTag[],
    createCard: (aoRec: IRecord, tagIdsIn: string[], tagNamesIn: string, doneCallback: () => void) => void,
    updateCard: (aoRec: IRecord, doneCallback: () => void, pinned: number, important: number, tagIdsIn: string[], tagNamesIn: string) => void,
    deleteCard: (asId: string, doneCallback: () => void) => void
}

const CardsContext = createContext<undefined | ICardsContextValues>(undefined);
const Provider = CardsContext.Provider;

function errorNotificationFn(errorMessage: string) {
    console.log(`ERROR: ${errorMessage}`);
}

function CardsProvider({children}: Props) {    
    const {cardsData, cardAttributesData, tagOnCardData, tagsData, createCard, updateCard, deleteCard} = useCards(errorNotificationFn);

    return (
        <Provider value={{cardsData, cardAttributesData, tagOnCardData, tagsData, createCard, updateCard, deleteCard}}>
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