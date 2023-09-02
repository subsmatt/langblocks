import CardList from "./CardList";
import ControlPanel from "./ControlPanel";
import { ControlPanelProvider } from "@/context/ControlPanelContext";

function Content() {
    return (
        <ControlPanelProvider>
            <ControlPanel/>
            <CardList/>
        </ControlPanelProvider>
    );
}

export default Content;