import { useContext } from "react";
import { useCardModalContext } from "../../context/CardModalContext";
import { useCardsContext } from "@/context/CardsContext";

function CardModalTags(){
    const {
        modalCardTagIds,
        setModalCardTagIds,
        tagNamesNewValue,
        setTagNamesNewValue
    } = useCardModalContext();

    const { tagsData } = useCardsContext();

    if (!modalCardTagIds && !tagsData) return null;

    return (
        <div className="flex flex-col justify-center mt-5 tags-box">
            <label htmlFor="tagWrapper" className="w-4/5 mx-auto block text-sm font-medium leading-6 text-gray-900">Tags</label>
            <div className="flex w-4/5 mx-auto" id="tagWrapper">
                {
                    tagsData ? [...tagsData].map(rec => {
                        return (
                            <div className="mx-2" key={rec.id}>
                                <input className="form-check-input me-1" type="checkbox" id={`formchecklabelid-${rec.id}`}
                                    onChange={(e) => {
                                        if(e.target.checked){
                                            setModalCardTagIds([...modalCardTagIds, rec.id]);
                                        } else {
                                            setModalCardTagIds(modalCardTagIds.filter(r => r !== rec.id));
                                        }
                                    }}
                                    checked={modalCardTagIds.includes(rec.id) ? true : false}
                                />
                                <label className="form-check-label text-sm dark:text-black" htmlFor={`formchecklabelid-${rec.id}`}>{rec.tagName}</label>
                            </div>
                        );
                    }) : null
                }
            </div>
            <div className="relative rounded-md shadow-sm w-4/5 mx-auto mt-2">
                <input value={tagNamesNewValue} type="text" placeholder="New tags (CSV)"
                    className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => {
                        setTagNamesNewValue(e.target.value);
                    }}/>
            </div>
        </div>
    );
}

export default CardModalTags;