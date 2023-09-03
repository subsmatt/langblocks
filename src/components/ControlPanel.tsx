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
            <div className="basis-1/2">
                <div className="">
                    <input type="text" className="w-full" placeholder="Search..." aria-label="Search" aria-describedby="basic-addon2" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)}/>
                    <span className="" id="basic-addon2"><i className="fa fa-search"></i></span>
                </div>
            </div>
            <div className="basis-1/4">
                <CardAdd/>
            </div>
        </div>
    );
}

export default ControlPanel;