import { useCardModalContext } from "../../context/CardModalContext";
import WordType from "../WordType";

function CardModalBody(){
    const {modalCardWord, setModalCardWord, modalCardDesc, setModalCardDesc, modalCardWordType, setModalCardWordType} = useCardModalContext();

    return (
        <div className="flex justify-center">
            <form className="w-4/5">
                <div className="">
                    <div className="">
                        <label htmlFor="modalWord" className="block text-sm font-medium leading-6 text-gray-900">Word</label>
                        <div className="relative rounded-md shadow-sm">
                            <input type="text" name="modalWord" id="modalWord" className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="New word" value={modalCardWord} onChange={(e) => {setModalCardWord(e.target.value);}}/>
                        </div>
                    </div>
                    <div className="mt-2">
                        <label htmlFor="modalDesc" className="block text-sm font-medium leading-6 text-gray-900">Description</label>
                        <div className="relative rounded-md shadow-sm">
                            <input type="text" name="modalDesc" id="modalDesc" className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="New description" value={modalCardDesc} onChange={(e) => {setModalCardDesc(e.target.value);}}/>
                        </div>
                    </div>
                    <div className="mt-2">
                        <label htmlFor="modalType" className="block text-sm font-medium leading-6 text-gray-900">Type</label>
                        <WordType incShowAll={false} currentValue={modalCardWordType} eventHandler={setModalCardWordType} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default CardModalBody;