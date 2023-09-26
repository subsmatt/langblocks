import { IRecord } from "@/types/card";
import useEntityCards from "./entityMethods/useEntityCards";

function useCards(errorNotificationFn: (err: string) => void) {
    const {
        data: cardsData,
        error: cardsDataError,
        createCardEntity,
        updateCardEntity,
        deleteCardEntity,
    } = useEntityCards("/api/cards", errorNotificationFn);

    function createCard(aoRec: IRecord, doneCallback: () => void){
        const lsFuncName = "useCard>createCard";
        
        // Check if records is in correct format
        if(aoRec && (aoRec.word && aoRec.desc)) {
            const cardId = createCardEntity(aoRec);
        } else {
            console.log(`ERROR:${lsFuncName} - Malformed record`);
        }
    }

    function updateCard(aoRec: IRecord, doneCallback: () => void){
        const lsFuncName = "useCard>updateCard";
        
        if (aoRec && aoRec.id) {
            console.log(`call updateCardEntity id[${aoRec.id}] cid[${aoRec.cid}]...`);
            updateCardEntity(aoRec);

            if (doneCallback) {
                doneCallback();
            }
        } else {
            console.log(`ERROR:${lsFuncName} - Invalid Reocrd/Id`);
        }
    }

    function deleteCard(asId: string, doneCallback: () => void){
        const lsFuncName = "useCard>deleteCard";
        console.log(`INFO:${lsFuncName}`);
        
        // Check if Id is valid
        if(asId) {
            deleteCardEntity(asId);
        } else {
            console.log(`ERROR:${lsFuncName} - Invalid Id`);
        }
    }

    return {
        cardsData, 
        createCard, 
        updateCard, 
        deleteCard
    };
}

export default useCards;