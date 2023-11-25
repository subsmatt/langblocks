import { useCardModalContext } from "../context/CardModalContext";
import { useCardsContext } from "@/context/CardsContext";
import { ICard, IRecord } from "@/types/card";
import { PencilSquareIcon, TrashIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

function Card(props: ICard) {
    const {rec} = props;

    const schemaRecord: IRecord = {
        id: rec.id, 
        lang: rec.lang,
        word: rec.word,
        desc_lang: rec.desc_lang,
        desc: rec.desc,
        type: rec.type,
        hits: rec.hits,
        examples: rec.examples,
        iknowthis: rec.iknowthis
    }

    const {
        setModalShow, 
        setModalCardId, 
        setModalCardWord, 
        setModalCardDesc, 
        setModalCardWordType,
        setModalCardTagIds,
        setTagNamesNewValue
    } = useCardModalContext();

    const {cardAttributesData, tagOnCardData, tagsData, updateCard, deleteCard } = useCardsContext();

    function editCard(aoRec: IRecord){
        setModalCardId(aoRec.id);
        setModalCardWord(aoRec.word);
        setModalCardDesc(aoRec.desc);
        setModalCardWordType(aoRec.type);
        setModalCardTagIds(tagOnCardData.filter(r => r.cardId === aoRec.id).map(t => t.tagId));
        setTagNamesNewValue("");
        setModalShow(true);
    }

    function removeCard(id: string){
        function deleteDoneCB() {
            console.log(`deleteDoneCB...`);
        }
        if (confirm("Delete card?") === true) deleteCard(id, deleteDoneCB);
    }

    const cardAttributes = cardAttributesData.find(ca => ca.cardId === rec.id);

    const cardPinned = cardAttributes?.pinned === 1 ? true : false; 
    const cardImportant = cardAttributes?.important === 1 ? true : false;

    const emptyStringArray: string[] = [];
    const tagsDataDictionary = Object.fromEntries(tagsData.map(({id, tagName}) => [id, tagName]));

    const cardTags = tagOnCardData
        ? tagOnCardData.filter(r => r.cardId === rec.id).map(r => {
            return {
                ...r,
                tagName: tagsDataDictionary[r.tagId]
            };
        })
        : [];
    
    function clickStarButtonCallback() {
        console.log(`sms>clickStarButtonCallback...`);
    }

    function CardTagsSection() {
        function blankCallback() {
            console.log(`sms>blankCallback...`);
            return;
        }
        return (
            <div className="d-flex">
                {
                    cardTags.map(cardTag => {
                        
                        return (
                            <div key={cardTag.id}>
                                <span className="textbox-tag small">
                                    {cardTag.tagName}&nbsp;
                                    <a href="#" className="text-decoration-none fa me-2" onClick={() => {
                                        const tagIdsForCard = cardTags.filter(r => r.tagId !== cardTag.tagId).map(t => t.tagId);
                                        updateCard(rec, blankCallback, Number(cardPinned), Number(cardImportant), tagIdsForCard, "");
                                    }}>{" "}<i className="icon fa fa-times-circle"></i></a>{" "}
                                </span>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
    
    return (
        <div className="border border-zinc-300" key={rec.id}>
            <div className={`p-2`}>
                <div className="flex mb-0 justify-between">
                    <h5 className="font-bold">{rec.word}</h5>
                    
                    <a href="#" className="me-2" onClick={() => { updateCard({...schemaRecord, hits: schemaRecord.hits + 1}, clickStarButtonCallback, Number(!cardPinned), Number(cardImportant), emptyStringArray, ""); }}>
                        {
                        cardPinned ? <StarSolidIcon className="h-4 w-4" aria-hidden="true" /> : <StarIcon className="h-4 w-4" aria-hidden="true" /> 
                        }
                    </a>
                </div>
                <div className="py-2">
                    <div className="mb-2">{rec.desc}</div>
                </div>
                <div className="">
                    <CardTagsSection />
                </div>
                <div className="d-flex justify-content-between">
                    <div className="text-sm">{rec.type}</div>
                    <div className="flex justify-end">
                        <span className="mx-2">
                            <a href="#" onClick={() => {editCard(rec);}}>
                                <PencilSquareIcon className="h-4 w-4" aria-hidden="true" />
                            </a>
                        </span>
                        <span className="mx-2">
                            <a href="#" onClick={() => {removeCard(rec.id);}}>
                                <TrashIcon className="h-4 w-4" aria-hidden="true" />
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;