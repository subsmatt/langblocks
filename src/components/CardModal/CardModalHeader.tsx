import { useCardModalContext } from "../../context/CardModalContext";
import { Dialog } from '@headlessui/react';
import { ExclamationCircleIcon, PlusCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

function CardModalHeader(){
    const {modalCardId, setModalShow} = useCardModalContext();
    
    return (
        <div className="bg-white flex justify-between px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-yellow-100 sm:mx-0 sm:h-10 sm:w-10">
                    {modalCardId === 0 ? <PlusCircleIcon className="h-6 w-6 text-yellow-600" aria-hidden="true" /> : <ExclamationCircleIcon className="h-6 w-6 text-yellow-600" aria-hidden="true" />}
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        {modalCardId === 0 ? "Create card" : "Edit card"}
                    </Dialog.Title>
                    <div className="mt-2">
                        <p className="text-sm text-gray-500">
                            Description
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <button type="button" className="" data-bs-dismiss="modal" aria-label="Close" onClick={() => {setModalShow(false);}}>
                    <XMarkIcon className="h-6 w-6 text-zinc-800" aria-hidden="true" />
                </button>
            </div>
        </div>
    );
}

export default CardModalHeader;