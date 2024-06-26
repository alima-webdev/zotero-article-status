import { config } from "../../../package.json";
import { getString } from "../../utils/locale";
import { module } from "../../utils/module";
import {
    getStatusContextMenu,
    initStatusColumn,
    statusKeyboardEvents,
    statusRegisterGlobalFunctions,
} from "./columns/status";
import {
    getReasonContextMenu,
    initReasonColumn,
    reasonKeyboardEvents,
    reasonRegisterDOM,
    reasonRegisterGlobalFunctions,
} from "./columns/reason";
import {
    getReportContextMenu,
    reportRegisterGlobalFunctions,
    reportRegisterDOM,
    reportKeyboardEvents,
} from "./report";
import { registerEventListener } from "../../utils/events";

// ---------------------------------------------
// Review Module
// ---------------------------------------------
export class ReviewModule {
    // Stylesheet
    @module
    static registerStyleSheet() {
        const styles = ztoolkit.UI.createElement(document, "link", {
            properties: {
                type: "text/css",
                rel: "stylesheet",
                href: `chrome://${config.addonRef}/content/styles/styles.css?${Date.now()}`,
                id: `${config.addonRef}-stylesheet`,
            },
        });
        ztoolkit.getGlobal("document").documentElement.appendChild(styles);
    }
    @module
    static deregisterStyleSheet() {
        ztoolkit
            .getGlobal("document")
            .querySelector(`#${config.addonRef}-stylesheet`)
            ?.remove();
    }

    // Extra Columns
    @module
    static registerExtraColumnWithBindings() {
        initStatusColumn();
        initReasonColumn();

        const statusContextMenu = getStatusContextMenu();
        const reasonContextMenu = getReasonContextMenu();
        const reportContextMenu = getReportContextMenu();
        const contextMenu = statusContextMenu
            .concat(reasonContextMenu)
            .concat(reportContextMenu);

        ztoolkit.Menu.register("item", { tag: "menuseparator" });
        ztoolkit.Menu.register("item", {
            tag: "menu",
            label: getString("context-menu-status"),
            children: contextMenu,
        });

        // Keyboard Shortcuts
        registerEventListener(
            ztoolkit.getGlobal("document"),
            "keydown",
            (ev: KeyboardEvent) => {
                // Check if the ItemTree is focused to use keyboard shortcuts
                const activeElement =
                    ztoolkit.getGlobal("document").activeElement;
                const itemTreeElement = ztoolkit
                    .getGlobal("document")
                    .querySelector("#item-tree-main-default");
                if (itemTreeElement?.contains(activeElement)) {
                    statusKeyboardEvents(ev);
                    reasonKeyboardEvents(ev);
                    reportKeyboardEvents(ev);
                }
            },
        );
        // ztoolkit
        //     .getGlobal("document")
        //     .addEventListener("keydown", (ev: KeyboardEvent) => {
        //         // Check if the ItemTree is focused to use keyboard shortcuts
        //         const activeElement =
        //             ztoolkit.getGlobal("document").activeElement;
        //         const itemTreeElement = ztoolkit
        //             .getGlobal("document")
        //             .querySelector("#item-tree-main-default");
        //         if (itemTreeElement?.contains(activeElement)) {
        //             statusKeyboardEvents(ev);
        //             reasonKeyboardEvents(ev);
        //             reportKeyboardEvents(ev);
        //         }
        //     });

        // Register the global context menu functions
        statusRegisterGlobalFunctions();
        reasonRegisterGlobalFunctions();
        reportRegisterGlobalFunctions();
    }

    // DOM Events
    @module
    static async registerDOMElements() {
        await reasonRegisterDOM();
        await reportRegisterDOM();
    }
}
