import { useState, useEffect } from "react";
import axios from "axios";
import { IEntry, IRecord, IRecordAttribute } from "@/types/card";

function useGenCrudMethods<T extends IEntry>(url: string, errorNotificationFn: (err: string) => void, initData: T[]) {

    const lsFuncName = "useGenCrudMethods";
    const blankData: T[] = [];
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
                }
            }
            catch (e){
                console.log(`ERROR:${lsFuncName} `, e);
            }
        }
        
        getData();
    }, [url]);

    function createRecord(url: string, createObject: T) {
        async function addData(){
            try {
                const newObject = {...createObject, mid: undefined};
                await axios.post(url, newObject);
                setData(function(originalData){
                    return [...originalData, createObject];
                });                

            } catch(e) {
                const errorString = "ERROR in useGenCrudMethods: createCard"; //formatErrorString(e, url);
                errorNotificationFn?.(errorString);
                //validate();
            }
        }

        addData();
    }

    function updateRecord(id: string, updateObject: T) {
        async function updateData(){
            try {
                await axios.put(`${url}/${id}`, updateObject);

                setData(function(originalData){
                    const originalRecord = originalData.find(rec => rec.id === id);
                    const dataRecord = {...originalData, ...updateObject};
                    
                    return originalData.map(rec => rec.id === id ? dataRecord : rec);
                });          
            } catch (e) {
                const errorString = "ERROR in useGenCrudMethods: updateCard"; //formatErrorString(e, url);
                errorNotificationFn?.(errorString);
                //validate();
            }
        }

        updateData();
    }

    function deleteRecord(id: string) {
        async function deleteData(){
            try {
                await axios.delete(`${url}/${id}`);

                setData(function(originalData){
                    return originalData.filter(rec => rec.id !== id);
                });                
            }  catch (e) {
                const errorString = "ERROR in useGenCrudMethods: deleteCard"; //formatErrorString(e, url);
                errorNotificationFn?.(errorString);
                //validate();
            }
        }

        deleteData();
    }

    return {data, error, createRecord, updateRecord, deleteRecord};
}

export default useGenCrudMethods;