import { useCardModalContext } from "../context/CardModalContext";
import { useCardsContext } from "@/context/CardsContext";
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
    } = useCardModalContext();

    const { deleteCard } = useCardsContext();

    function editCard(aoRec: IRecord){
        setModalCardId(aoRec.cid ?? aoRec.id);
        setModalCardWord(aoRec.word);
        setModalCardDesc(aoRec.desc);
        setModalCardWordType(aoRec.type);
        setModalShow(true);
    }

    function removeCard(id: string){
        function deleteDoneCB() {
            console.log(`deleteDoneCB...`);
        }
        if (confirm("Delete card?") === true) deleteCard(id, deleteDoneCB);
    }

    return (
        <div className="border border-zinc-300" key={rec.cid ?? rec.id}>
            <div className={`p-2`}>
                <div className="flex mb-0 justify-between">
                    <h5 className="font-bold">{rec.word}</h5>
                    <StarIcon className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="py-2">
                    <div className="mb-2">{rec.desc}</div>
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