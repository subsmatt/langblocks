import { IRecord } from "@/types/card";
import useEntityCards from "./entityMethods/useEntityCards";
import useEntityCardAttributes from "./entityMethods/useEntityCardAttributes";
import useEntityChangeLogs from "./entityMethods/useEntityChangeLogs";

function useCards(errorNotificationFn: (err: string) => void) {
    const {
        data: cardsData,
        error: cardsDataError,
        createCardEntity,
        updateCardEntity,
        deleteCardEntity,
    } = useEntityCards("/api/cards", errorNotificationFn);

    const {
        data: cardAttributesData,
        error: cardAttributesDataError,
        updateCardAttributesEntity,
        deleteCardAttributesEntity,
    } = useEntityCardAttributes("/api/cardattributes", errorNotificationFn);

    const {
        data: cardChangeLogsData,
        error: cardChangeLogsError,
        createCardChangeLogEntity
    } = useEntityChangeLogs("/api/changelogs", errorNotificationFn);

    function createCard(aoRec: IRecord, doneCallback: () => void){
        const lsFuncName = "useCard>createCard";
        
        // Check if records is in correct format
        if(aoRec && (aoRec.word && aoRec.desc)) {
            const cardId = createCardEntity(aoRec);
            if (cardId) {
                console.log(`sms>createCardChangeLogEntity...`);
                createCardChangeLogEntity(cardId, "CREATE");
            }
        } else {
            console.log(`ERROR:${lsFuncName} - Malformed record`);
        }
    }

    function updateCard(aoRec: IRecord, doneCallback: () => void, pinned: number, important: number){
        const lsFuncName = "useCard>updateCard";
        
        if (aoRec && aoRec.id) {
            console.log(`call updateCardEntity id[${aoRec.id}]...`);
            //debugger;
            updateCardEntity(aoRec);
            updateCardAttributesEntity(aoRec.id, pinned, important);
            createCardChangeLogEntity(aoRec.id, "UPDATE");

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
        cardAttributesData,
        createCard, 
        updateCard, 
        deleteCard
    };
}

export default useCards;