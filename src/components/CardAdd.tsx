'use client';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useCardModalContext } from '@/context/CardModalContext';

function CardAdd(){
    const {setModalShow, setModalCardId, setModalCardWord, setModalCardDesc, setModalCardWordType, setTagNamesNewValue, setModalCardTagIds} = useCardModalContext();

    function createCard(){
        setModalCardId("0");
        setModalCardWord("");
        setModalCardDesc("");
        setModalCardWordType("noun");
        setModalShow(true);
        setTagNamesNewValue("");
        setModalCardTagIds([]);
    }

    return (
        <div className="mt-2">
            <button className="float-right inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => createCard()}>
                    Add <PlusIcon className="h-4 w-4" aria-hidden="true" />
            </button>
        </div>
    );
}

export default CardAdd;