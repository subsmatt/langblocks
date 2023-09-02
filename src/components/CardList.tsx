import { useControlPanelContext } from "@/context/ControlPanelContext";
import { sampleData as data } from "../../data/sampleData.js";

function CardList() {
    const {searchQuery, searchType} = useControlPanelContext();

    const cardsData = data;
    return (
        <>          
            <div className="mt-2 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {cardsData.filter(function(rec){
                        if (Object.hasOwn(rec, "word") && rec.word !== null 
                         && Object.hasOwn(rec, "desc") && rec.desc !== null
                         && Object.hasOwn(rec, "type") && (searchType === "" || rec.type === searchType)
                        ) {
                            return rec.word.toLowerCase().includes(searchQuery) || rec.desc.toLowerCase().includes(searchQuery);
                        } else {
                            return false;
                        }
                    }).map(function(rec){                        
                        return (
                            <div key={rec.id} className="border border-zinc-300"><span className="font-bold">{rec.word}</span><p className="text-sm">{rec.desc}</p></div>
                        );
                    })
                }
            </div>
        </>
    );
}

export default CardList;