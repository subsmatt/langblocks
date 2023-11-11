import { IRecord } from "@/types/card";
import useGenCrudMethods from "../useGenCrudMethods";
import { v4 as uuidv4 } from "uuid";

function useEntityCards(url: string, errorNotificationFn: (err: string) => void) {
    const initRecord = {
        "id": "0",
        "lang": "es",
        "word": "init word",
        "desc_lang": "en",
        "desc": "init desc",
        "type": "unknown",
        "hits": 0,
        "examples": [],
        "iknowthis": false
    };
    const initData: IRecord[] = [initRecord];
    
    const {
        data,
        error,
        createRecord,
        updateRecord,
        deleteRecord,
    } = useGenCrudMethods(url, errorNotificationFn, initData);

    function createCardEntity(aoRec: IRecord) {
        console.log(`INFO: createCardEntity...`);
        const cardId = uuidv4();
        const newRecord = {...aoRec, id: cardId};

        createRecord("/api/cards", newRecord);
        return cardId;
    }

    function updateCardEntity(aoRec: IRecord) {
        const updatedRecord = {...aoRec};
        console.log(`updateCardEntity id[${aoRec.id}] lang[${aoRec.lang}] word[${aoRec.word}] desc[${aoRec.desc}] type[${aoRec.type}] hits[${aoRec.hits}] iknowthis[${aoRec.iknowthis}]`);
        
        if (aoRec.id !== undefined && aoRec.id !== "0") {
            updateRecord(aoRec.id, updatedRecord);
        }
    }

    function deleteCardEntity(asId: string) {
        console.log(`INFO: deleteCardEntity...`);
        deleteRecord(asId);
    }

    return {data, error, createCardEntity, updateCardEntity, deleteCardEntity};
}

export default useEntityCards;