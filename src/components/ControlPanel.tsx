'use client';
import { useControlPanelContext } from "@/context/ControlPanelContext";
import WordType from "./WordType";
import CardAdd from "./CardAdd";

function ControlPanel() {
    const {searchQuery, setSearchQuery, searchType, setSearchType} = useControlPanelContext();

    return (
        <div className="flex flex-col md:flex-row">
            <div className="basis-1/4">
                <WordType incShowAll={true} currentValue={searchType} eventHandler={setSearchType} />
            </div>
            <div className="basis-1/2 mx-3">
                <div className="">
                    <div className="relative mt-2 rounded-md shadow-sm">
                        <input type="text" className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm" placeholder="Search..." aria-label="Search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/>
                    </div>
                </div>
            </div>
            <div className="basis-1/4">
                <CardAdd/>
            </div>
        </div>
    );
}

export default ControlPanel;