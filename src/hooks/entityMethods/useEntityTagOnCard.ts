import { IRecordTagOnCard } from "@/types/card";
import useGenCrudMethods from "../useGenCrudMethods";
import { v4 as uuidv4 } from "uuid";

function useEntityTagOnCard(url: string, errorNotificationFn: (err: string) => void){
    const initRecordTagOnCard = {
        "id": "0",
        "tagId": "0",
        "cardId": "0",
        "createdAt": ""
    };
    const initData: IRecordTagOnCard[] = [initRecordTagOnCard];

    const {data, error, createRecord, deleteRecord} = useGenCrudMethods(url, errorNotificationFn, initData);
    
    function updateCardTags(tagIdsToSet: string[], cardId: string){
        if(!tagIdsToSet && !cardId){
            return;
        }
        
        const tagIdsOnCard = data.filter(rec => rec.cardId === cardId).map(rec => rec.tagId);
        const tagIdsToAdd  = tagIdsToSet.filter(tagId => !tagIdsOnCard.includes(tagId));
        const tagIdsToDelete = tagIdsOnCard.filter(tagId => !tagIdsToSet.includes(tagId));
        
        tagIdsToAdd.forEach(tagId => {
            const cardTagOnCardId = uuidv4();
            createRecord(url, {
                id: cardTagOnCardId,
                cardId,
                tagId,
                createdAt: new Date().toISOString()
            });
        });

        const tagOnCardRecIdsToDelete = data.filter(rec => rec.cardId === cardId && tagIdsToDelete.includes(rec.tagId)).map(rec => rec.id);
        tagOnCardRecIdsToDelete.forEach(id => deleteRecord(id));
    }

    function deleteTagOnCardByCardId(cardId: string){
        data.filter(rec => {
            if(rec.cardId === cardId) {
                deleteRecord(rec.id);
            }
        });
    }
    
    return {data, error, updateCardTags, deleteTagOnCardByCardId};
}

export default useEntityTagOnCard;