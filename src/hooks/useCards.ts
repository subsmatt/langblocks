import useEntityCards from "./entityMethods/useEntityCards";

function useCards(errorNotificationFn: (err: string) => void) {
    const {
        data: cardsData,
        error: cardsDataError,
        createCardEntity,
        updateCardEntity,
        deleteCardEntity,
    } = useEntityCards("/api/cards", errorNotificationFn);

    function createCard(){
        const lsFuncName = "useCard>createCard";
        console.log(`INFO:${lsFuncName}`);
    }

    function updateCard(){
        const lsFuncName = "useCard>updateCard";
        console.log(`INFO:${lsFuncName}`);
    }

    function deleteCard(){
        const lsFuncName = "useCard>deleteCard";
        console.log(`INFO:${lsFuncName}`);
    }

    return {
        cardsData, 
        createCard, 
        updateCard, 
        deleteCard
    };
}

export default useCards;