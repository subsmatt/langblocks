import { IRecord } from "@/types/card";
import useGenCrudMethods from "../useGenCrudMethods";
//import MongoId from "mongoid-js";

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

    function createCardEntity() {
        console.log(`INFO: createCardEntity...`);
    }

    function updateCardEntity() {
        console.log(`INFO: updateCardEntity...`);
    }

    function deleteCardEntity() {
        console.log(`INFO: deleteCardEntity...`);
    }

    return {data, error, createCardEntity, updateCardEntity, deleteCardEntity};
}

export default useEntityCards;