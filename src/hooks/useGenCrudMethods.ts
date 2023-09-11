import { useState, useEffect } from "react";
import axios from "axios";
import { IRecord } from "@/types/card";

function useGenCrudMethods(url: string, errorNotificationFn: (err: string) => void, initData: IRecord[]) {

    const lsFuncName = "useGenCrudMethods";
    const blankData: IRecord[] = [];
    const [data, setData] = useState(blankData);
    const [error, setError] = useState("");
    
    if((!url || url.length === 0) && !initData) {
        throw "useGenCrudMethods NO URL passed in";
    }

    useEffect(() => {
        async function getData() {
            try {
                if (url && url !== "skip") {
                    const results = await axios.get(url);                    
                    setData(results.data);
                } else {
                    setData(initData);
                }
                // setTimeout(function(){
                //     console.log(`sms>useGenCrudMethods: Load data - set init data...`);
                //     setData(initData);
                // }, 300);
            }
            catch (e){
                console.log(`ERROR:${lsFuncName} `, e);
            }
        }
        
        getData();
    }, [url, initData]);

    function createRecord() {
        console.log(`INFO>useGenCrudMethods createRecord...`);
    }

    function updateRecord() {
        console.log(`INFO>useGenCrudMethods updateRecord...`);
    }

    function deleteRecord() {
        console.log(`INFO>useGenCrudMethods deleteRecord...`);
    }

    return {data, error, createRecord, updateRecord, deleteRecord};
}

export default useGenCrudMethods;