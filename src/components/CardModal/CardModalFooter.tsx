import { useCardModalContext } from "../../context/CardModalContext";

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
        // modalCardTagIds,
        // tagNamesNewValue
    } = useCardModalContext();
    
    // const {createCard, updateCard} = useContext(CardsContext);
    function createCard() {
        console.log(`sms>CardModal createCard...`);
        closeModal();
    }

    function updateCard() {
        console.log(`sms>CardModal updateCard...`);
        closeModal();
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
                    onClick={() => createCard()}
                >
                    Add
                </button>                
            )}
            {modalCardId !== "0" && (
                <button
                type="button"
                className="inline-flex w-full justify-center rounded-md bg-yellow-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-500 sm:ml-3 sm:w-auto"
                onClick={() => updateCard()}
            >
                Update
            </button> 
            )}
            <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => closeModal()}
                // ref={cancelButtonRef}
            >
                Cancel
            </button>
        </div> 
    );
}

export default CardModalFooter;