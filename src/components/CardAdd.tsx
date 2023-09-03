'use client';
//import { useRef, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useCardModalContext } from '@/context/CardModalContext';

function CardAdd(){
    // const [open, setOpen] = useState(false);

    // const cancelButtonRef = useRef(null);
    const {setModalShow} = useCardModalContext();

    function createCard(){
        //setOpen(true);
        setModalShow(true);
    }

    return (
        <>
            <button className="mt-3 float-right inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={() => createCard()}>
                    Add <PlusIcon className="h-4 w-4" aria-hidden="true" />
            </button>
        </>
    );
}

export default CardAdd;