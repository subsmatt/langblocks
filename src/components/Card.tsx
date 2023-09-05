import { useCardModalContext } from "../context/CardModalContext";
//import { CardsContext } from "../context/CardsContext";
import { useContext } from "react";
import { ICard, IRecord } from "@/types/card";
import { PencilSquareIcon, TrashIcon, StarIcon } from '@heroicons/react/24/outline';

function Card(props: ICard) {
    const {rec} = props;
    const {
        setModalShow, 
        setModalCardId, 
        setModalCardWord, 
        setModalCardDesc, 
        setModalCardWordType,
        // setModalCardTagIds,
        // setTagNamesNewValue
    } = useCardModalContext(); //useContext(CardModalContext);

    // const {
    //     cardsData, 
    //     cardAttributesData,
    //     tagsData,
    //     tagOnCardData, 
    //     deleteCard, 
    //     updateCard
    // } = useContext(CardsContext);

    function editCard(aoRec: IRecord){
        setModalCardId(aoRec.id);
        setModalCardWord(aoRec.word);
        setModalCardDesc(aoRec.desc);
        setModalCardWordType(aoRec.type);
        // setModalCardTagIds(tagOnCardData.filter(r => r.cardId === aoRec.id).map(t => t.tagId));
        // setTagNamesNewValue("");
        setModalShow(true);
    }

    // function removeCard(id){
    //     if (confirm("Delete card?") === true) deleteCard(id);
    // }

    // const cardAttributes = cardAttributesData 
    //     ? cardAttributesData.find(ca => ca.cardId === rec.id) 
    //     : {cardPinned: 0, cardImportant: 0};

    // const cardPinned = cardAttributes?.pinned === 1 ? true : false; 
    // const cardImportant = cardAttributes?.important === 1 ? true : false;

    // const tagsDataDictionary = tagsData
    //     ? Object.fromEntries(tagsData.map(({id, tagName}) => [id, tagName]))
    //     : [];

    // const cardTags = tagOnCardData
    //     ? tagOnCardData.filter(r => r.cardId === rec.id).map(r => {
    //         return {
    //             ...r,
    //             tagName: tagsDataDictionary[r.tagId]
    //         };
    //     })
    //     : [];

    // function CardTagsSection() {
    //     return (
    //         <div className="d-flex">
    //             {
    //                 cardTags.map(cardTag => {
                        
    //                     return (
    //                         <div key={cardTag.id}>
    //                             <span className="textbox-tag small">
    //                                 {cardTag.tagName}&nbsp;
    //                                 <a href="#" className="text-decoration-none fa me-2" onClick={() => {
    //                                     const tagIdsForCard = cardTags.filter(r => r.tagId !== cardTag.tagId).map(t => t.tagId);
    //                                     updateCard(rec, undefined, cardPinned, cardImportant, tagIdsForCard, undefined);
    //                                 }}>{" "}<i className="icon fa fa-times-circle"></i></a>{" "}
    //                             </span>
    //                         </div>
    //                     );
    //                 })
    //             }
    //         </div>
    //     );
    // }

    return (
        <div className="border border-zinc-300" key={rec.id}>
            <div className={`p-2`}>
                <div className="flex mb-0 justify-between">
                    <h5 className="font-bold">{rec.word}</h5>
                    <StarIcon className="h-4 w-4" aria-hidden="true" />
                    {/* <a href="#" className="me-2" onClick={() => { updateCard(rec, undefined, !cardPinned, cardImportant); }}>
                        <i className={
                            cardPinned ? "float-right fas fa-thumbtack fa-lg text-info"
                            : "float-right fas fa-thumbtack fa-rotate-90"
                        }></i>
                    </a> */}
                </div>
                <div className="py-2">
                    <div className="mb-2">{rec.desc}</div>
                    {/* <div className="">
                        <CardTagsSection />
                    </div> */}
                </div>
                <div className="d-flex justify-content-between">
                    <div className="text-sm">{rec.type}</div>
                    <div className="flex justify-end">
                        <span className="mx-2">
                            {/* <PencilSquareIcon className="h-4 w-4" aria-hidden="true" /> */}
                            <a href="#" onClick={() => {editCard(rec);}}>
                                {/* <i className="fa fa-edit"/> */}
                                <PencilSquareIcon className="h-4 w-4" aria-hidden="true" />
                            </a>
                        </span>
                        <span className="mx-2">
                            <TrashIcon className="h-4 w-4" aria-hidden="true" />
                            {/* <a href="#" onClick={() => {removeCard(rec.id);}}>
                                <i className="fa fa-trash"/>
                            </a> */}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;