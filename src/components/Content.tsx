import CardList from "./CardList";
import ControlPanel from "./ControlPanel";
import { ControlPanelProvider } from "@/context/ControlPanelContext";
import { CardModalProvider } from "@/context/CardModalContext";
import CardModal from "./CardModal/CardModal";

function Content() {
    return (
        <ControlPanelProvider>
            <CardModalProvider>
                <ControlPanel/>
                <CardList/>
                <CardModal/>
            </CardModalProvider>
        </ControlPanelProvider>
    );
}

export default Content;