import { IRecord } from "@/types/card";
import useEntityCards from "./entityMethods/useEntityCards";
import useEntityCardAttributes from "./entityMethods/useEntityCardAttributes";
import useEntityChangeLogs from "./entityMethods/useEntityChangeLogs";
import useEntityTagOnCard from "./entityMethods/useEntityTagOnCard";
import useEntityTags from "./entityMethods/useEntityTags";

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

    const {
        data: tagsData,
        error: tagsDataError,
        createTagsAndMerge
    } = useEntityTags("/api/tags", errorNotificationFn);

    const {
        data: tagOnCardData,
        error: tagOnCardDataError,
        updateCardTags,
        deleteTagOnCardByCardId
    } = useEntityTagOnCard("/api/tagoncard", errorNotificationFn);

    function createCard(aoRec: IRecord, tagIdsIn: string[], tagNamesIn: string, doneCallback: () => void){
        const lsFuncName = "useCard>createCard";
        
        // Check if records is in correct format
        if(aoRec && (aoRec.word && aoRec.desc)) {
            const cardId = createCardEntity(aoRec);
            if (cardId) {
                createCardChangeLogEntity(cardId, "CREATE");

                const tagIds = createTagsAndMerge(tagIdsIn, tagNamesIn);

                updateCardTags(tagIds, cardId);
            }
        } else {
            console.log(`ERROR:${lsFuncName} - Malformed record`);
        }
    }

    function updateCard(aoRec: IRecord, doneCallback: () => void, pinned: number, important: number, tagIdsIn: string[], tagNamesIn: string){
        const lsFuncName = "useCard>updateCard";
        
        if (aoRec && aoRec.id) {
            updateCardEntity(aoRec);
            updateCardAttributesEntity(aoRec.id, pinned, important);
            createCardChangeLogEntity(aoRec.id, "UPDATE");

            // Only update tag info if either tagIdsIn or tagNamesIn is provided
            if (tagIdsIn.length > 0 || tagNamesIn) {
                const tagIds = createTagsAndMerge(tagIdsIn, tagNamesIn);
                updateCardTags(tagIds, aoRec.id);
            }

            if (doneCallback) {
                doneCallback();
            }
        } else {
            console.log(`ERROR:${lsFuncName} - Invalid Reocrd/Id`);
        }
    }

    function deleteCard(asId: string, doneCallback: () => void){
        const lsFuncName = "useCard>deleteCard";
        
        // Check if Id is valid
        if(asId) {
            deleteCardEntity(asId);
            deleteCardAttributesEntity(asId);
            deleteTagOnCardByCardId(asId);
        } else {
            console.log(`ERROR:${lsFuncName} - Invalid Id`);
        }
    }

    return {
        cardsData,
        cardAttributesData,
        tagOnCardData,
        tagsData,
        createCard, 
        updateCard, 
        deleteCard
    };
}

export default useCards;