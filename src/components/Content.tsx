import CardList from "./CardList";
import ControlPanel from "./ControlPanel";
import { ControlPanelProvider } from "@/context/ControlPanelContext";
import { CardModalProvider } from "@/context/CardModalContext";
import { CardsProvider } from "@/context/CardsContext";
import CardModal from "./CardModal/CardModal";

function Content() {
    return (
        <ControlPanelProvider>
            <CardModalProvider>
                <CardsProvider>
                    <ControlPanel/>
                    <CardList/>
                    <CardModal/>
                </CardsProvider>
            </CardModalProvider>
        </ControlPanelProvider>
    );
}

export default Content;