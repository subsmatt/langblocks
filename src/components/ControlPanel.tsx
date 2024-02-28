'use client';
import { useControlPanelContext } from "@/context/ControlPanelContext";
import WordType from "./WordType";
import CardAdd from "./CardAdd";

function ControlPanel() {
    const {searchQuery, setSearchQuery, searchType, setSearchType} = useControlPanelContext();

    return (
        <div className="flex flex-col sm:flex-row mb-4">
            <div className="basis-1/3 sm:basis-4/12 md:basis-1/4 m-1 ml-0">
                <WordType incShowAll={true} currentValue={searchType} eventHandler={setSearchType} />
            </div>
            <div className="basis-1/3 sm:basis-6/12 md:basis-1/2 m-1">
                <input type="text" className="w-full h-9 px-2" placeholder="Search..." aria-label="Search" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/>
            </div>
            <div className="basis-1/3 sm:basis-2/12 md:basis-1/4 m-1 mr-0">
                <CardAdd/>
            </div>
        </div>
    );
}

export default ControlPanel;