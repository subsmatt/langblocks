import { IRecordTag } from "@/types/card";
import useGenCrudMethods from "../useGenCrudMethods";
import { v4 as uuidv4 } from "uuid";

function useEntityTags(url: string, errorNotificationFn: (err: string) => void) {
    const initRecordTag = {
        "id": "0",
        "tagName": ""
    };
    const initData: IRecordTag[] = [initRecordTag];

    const {data, error, createRecord} = useGenCrudMethods(url, errorNotificationFn, initData);

    function createTagsAndMerge(tagIdsIn: string[], tagNamesInString: string){
        if(!tagIdsIn && !tagNamesInString) return [];

        const tagNamesIn = tagNamesInString ? tagNamesInString.split(",").filter(t => t && t.length > 0) : [];
        const tagIds = tagIdsIn ? [...tagIdsIn] : [];
        const tagNamesAllUppercase = data?.map(r => r.tagName.toUpperCase());

        tagNamesIn.filter(rec => {
            return !(!rec || rec.trim().length ===0);
        }).forEach(function(tag){
            if(tagNamesAllUppercase.includes(tag.toUpperCase())){
                const tagNameValue = tagNamesAllUppercase.find(r => r === tag.toUpperCase());
                const match = data?.find(r => r.tagName.toUpperCase() === tagNameValue);
                const id = match ? match.id : "-1";
                if(!tagIds.includes(id)) {
                    tagIds.push(id);
                }
            } else {
                const newTagId = uuidv4();
                createRecord(url, {
                    id: newTagId, tagName: tag
                });
                tagIds.push(newTagId);
            }
        });

        return tagIds;
    }

    return {data, error, createTagsAndMerge};
}

export default useEntityTags;