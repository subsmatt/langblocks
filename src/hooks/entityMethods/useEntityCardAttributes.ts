import { IRecordAttribute } from "@/types/card";
import useGenCrudMethods from "../useGenCrudMethods";
import { v4 as uuidv4 } from "uuid";

function useEntityCardAttributes(url: string, errorNotificationFn: (err: string) => void) {
    const initRecordAttribute = {
        "id": "0",
        "cardId": "0",
        "important": 0,
        "pinned": 0,
        "updateDate": ""
    };
    const initData: IRecordAttribute[] = [initRecordAttribute];

    const {data, error, createRecord, updateRecord, deleteRecord} =  useGenCrudMethods(url, errorNotificationFn, initData);
    
    function updateCardAttributesEntity(cardId: string, pinned: number, important: number){
        // check if Attributes record exists
        const cardAttributes = data.find(rec => rec.cardId === cardId);
        
        if (cardAttributes){
            if (pinned !== undefined && important !== undefined) {
                const updatedRecord = {id: cardAttributes.id, cardId: cardAttributes.cardId, pinned: pinned,
                    important: important,
                    updateDate: new Date().toISOString()
                };
                
                updateRecord(cardAttributes.id, updatedRecord);
            }
        } else {
            const cardAttrId = uuidv4();
            createRecord(url, {
                id: cardAttrId,
                cardId: cardId,
                pinned: pinned === undefined ? 0 : pinned,
                important: important === undefined ? 0 : important,
                updateDate: new Date().toISOString()
            });
        }
    }

    function deleteCardAttributesEntity(id: string){
        data.filter(rec => rec.cardId === id)
            .forEach(rec => deleteRecord(rec.id));
    }
    
    return {data, error, updateCardAttributesEntity, deleteCardAttributesEntity};
}

export default useEntityCardAttributes;