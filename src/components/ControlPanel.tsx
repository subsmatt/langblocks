'use client';
import { useControlPanelContext } from "@/context/ControlPanelContext";
import WordType from "./WordType";
import CardAdd from "./CardAdd";

function ControlPanel() {
    const {searchQuery, setSearchQuery, searchType, setSearchType} = useControlPanelContext();

    return (
        <div className="flex flex-col sm:flex-row h-28 md:h-24">
            <div className="basis-1/3 sm:basis-4/12 md:basis-1/4 my-auto">
                <WordType incShowAll={true} currentValue={searchType} eventHandler={setSearchType} />
            </div>
            <div className="basis-1/3 sm:basis-6/12 md:basis-1/2 sm:mx-2 my-auto">
            {/* relative rounded-md shadow-sm */}
                {/* <div className="relative rounded-md shadow-sm"> */}
                {/* block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm */}
                    <input type="text" className="w-full h-8 p-2" placeholder="Search..." aria-label="Search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/>
                {/* </div> */}
            </div>
            <div className="basis-1/3 sm:basis-2/12 md:basis-1/4 my-auto">
                <CardAdd/>
            </div>
        </div>
    );
}

export default ControlPanel;