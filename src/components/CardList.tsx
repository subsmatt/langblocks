import { useControlPanelContext } from "@/context/ControlPanelContext";
import Card from "./Card";
import { useCardsContext } from "@/context/CardsContext";

function CardList() {
    const {searchQuery, searchType} = useControlPanelContext();

    // Use data from CardsContext
    const {cardsData} = useCardsContext();
    
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
                            <Card key={rec.cid ?? rec.id} rec={rec} />
                        );
                    })
                }
            </div>
        </>
    );
}

export default CardList;