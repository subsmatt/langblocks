import { IRecordChangeLog } from "@/types/card";
import useGenCrudMethods from "../useGenCrudMethods";
import { v4 as uuidv4 } from "uuid";

function useEntityChangeLogs(url: string, errorNotificationFn: (err: string) => void) {
    const initRecordChangeLog = {
        "id": "0",
        "cardId": "0",
        "operation": "",
        "changeDate": ""
    };
    const initData: IRecordChangeLog[] = [initRecordChangeLog];

    const {data, error, createRecord} = useGenCrudMethods(url, errorNotificationFn, initData);
    
    function createCardChangeLogEntity(cardId: string, operation: string){
        const changeLogId = uuidv4();
        createRecord("/api/changelogs", {
            id: changeLogId,
            cardId: cardId,
            operation: operation,
            changeDate: new Date().toISOString()
        });
    }

    return {data, error, createCardChangeLogEntity};
}

export default useEntityChangeLogs;