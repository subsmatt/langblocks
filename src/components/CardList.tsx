import { useControlPanelContext } from "@/context/ControlPanelContext";
import Card from "./Card";
import { useCardsContext } from "@/context/CardsContext";
import { IRecord } from "@/types/card";

function CardList() {
    const {searchQuery, searchType} = useControlPanelContext();

    // Use data from CardsContext
    const {cardsData, cardAttributesData} = useCardsContext();

    // Show Error and abort if loading failed
    if ( !(cardsData && cardAttributesData)) {
        return (
            <div className="text-center text-info my-5">
                INFO: <b>No data found.</b>
            </div>
        );
    }

    // Select 'Pinned' cards, so that they can be displayed at the top of the page
    const cardsPinned = cardAttributesData.filter(rec => rec.pinned === 1)
    .map(rec => rec.cardId);

    // Sort records
    function sortByDesc(a: IRecord, b: IRecord) {
        return a.desc < b.desc ? -1 : a.desc > b.desc ? 1 : 0;
    }

    return (
        <>
            {/* Display 'Pinned' cards */}
            <div className="mt-2 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                {cardsData.filter(n => cardsPinned.includes(n.id))
                    .filter(function(rec){
                        if (Object.hasOwn(rec, "word") && rec.word !== null 
                         && Object.hasOwn(rec, "desc") && rec.desc !== null
                         && Object.hasOwn(rec, "type") && (searchType === "" || rec.type === searchType)
                        ) {
                            return rec.word.toLowerCase().includes(searchQuery) || rec.desc.toLowerCase().includes(searchQuery);
                        } else {
                            return false;
                        }
                    }).sort(sortByDesc).map(function(rec){                        
                        return (
                            <Card key={rec.id} rec={rec} />
                        );
                    })
                }
            </div>

            {/* Display horizontal line to separate 'Pinned' and 'Unpinned' cards */}
            {cardsPinned.length > 0 ? <hr className="mt-2 border border-zinc-300"/> : null}

            {/* Display 'Unpinned' cards */}          
            <div className="mt-2 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
            {cardsData.filter(n => !cardsPinned.includes(n.id)).filter(function(rec){
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
                            <Card key={rec.id} rec={rec} />
                        );
                    })
                }
            </div>
        </>
    );
}

export default CardList;