import { IRecord } from "@/types/card";
import { useCardModalContext } from "../../context/CardModalContext";
import { useCardsContext } from "@/context/CardsContext";

function CardModalFooter(){
    const {
        setModalShow, 
        modalCardId, 
        setModalCardId, 
        modalCardWord, 
        setModalCardWord, 
        modalCardDesc, 
        setModalCardDesc, 
        modalCardWordType, 
        setModalCardWordType
    } = useCardModalContext();
    
    const schemaRecord: IRecord = {
        id: "0", 
        cid: modalCardId,
        lang: "es",
        word: modalCardWord,
        desc_lang: "en",
        desc: modalCardDesc,
        type: modalCardWordType,
        hits: 0,
        examples: [],
        iknowthis: false
    }

    const { createCard, updateCard } = useCardsContext();

    function createDoneCB() {
        console.log(`createDoneCB...`)
    }

    function updateDoneCB() {
        console.log(`updateDoneCB...`)
    }

    function closeModal() {
        setModalCardId("0");
        setModalCardWord("");
        setModalCardDesc("");
        setModalCardWordType("");
        setModalShow(false);
    }

    return (
        <div className="bg-gray-50 mt-5 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            {modalCardId === "0" && (
                <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 sm:ml-3 sm:w-auto"
                    onClick={() => {
                        createCard(schemaRecord, createDoneCB);
                        closeModal();
                    }}
                >
                    Add
                </button>                
            )}
            {modalCardId !== "0" && (
                <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 sm:ml-3 sm:w-auto"
                onClick={() => {
                    updateCard({...schemaRecord, word: modalCardWord, desc: modalCardDesc, type: modalCardWordType}, updateDoneCB);
                    closeModal();
                }}
            >
                Update
            </button> 
            )}
            <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => closeModal()}
            >
                Cancel
            </button>
        </div> 
    );
}

export default CardModalFooter;