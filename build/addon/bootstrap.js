/**
 * Most of this code is from Zotero team's official Make It Red example[1]
 * or the Zotero 7 documentation[2].
 * [1] https://github.com/zotero/make-it-red
 * [2] https://www.zotero.org/support/dev/zotero_7_for_developers
 */

var chromeHandle;

function install(data, reason) {}

async function startup({ id, version, resourceURI, rootURI }, reason) {
    await Zotero.initializationPromise;

    // String 'rootURI' introduced in Zotero 7
    if (!rootURI) {
        rootURI = resourceURI.spec;
    }

    var aomStartup = Components.classes[
        "@mozilla.org/addons/addon-manager-startup;1"
    ].getService(Components.interfaces.amIAddonManagerStartup);
    var manifestURI = Services.io.newURI(rootURI + "manifest.json");
    chromeHandle = aomStartup.registerChrome(manifestURI, [
        ["content", "zoteroarticlestatus", rootURI + "chrome/content/"],
    ]);

    /**
     * Global variables for plugin code.
     * The `_globalThis` is the global root variable of the plugin sandbox environment
     * and all child variables assigned to it is globally accessible.
     * See `src/index.ts` for details.
     */
    const ctx = {
        rootURI,
    };
    ctx._globalThis = ctx;

    Services.scriptloader.loadSubScript(
        // `${rootURI}/chrome/content/scripts/zoteroarticlestatus.js`,
        `${rootURI}/chrome/content/index.js`,
        ctx,
    );
    Zotero.ZoteroArticleStatus.hooks.onStartup();
}

async function onMainWindowLoad({ window }, reason) {
    Zotero.ZoteroArticleStatus?.hooks.onMainWindowLoad(window);
}

async function onMainWindowUnload({ window }, reason) {
    Zotero.ZoteroArticleStatus?.hooks.onMainWindowUnload(window);
}

function shutdown({ id, version, resourceURI, rootURI }, reason) {
    if (reason === APP_SHUTDOWN) {
        return;
    }

    if (typeof Zotero === "undefined") {
        Zotero = Components.classes["@zotero.org/Zotero;1"].getService(
            Components.interfaces.nsISupports,
        ).wrappedJSObject;
    }
    Zotero.ZoteroArticleStatus?.hooks.onShutdown();

    Cc["@mozilla.org/intl/stringbundle;1"]
        .getService(Components.interfaces.nsIStringBundleService)
        .flushBundles();

    // Cu.unload(`${rootURI}/chrome/content/scripts/zoteroarticlestatus.js`);
    Cu.unload(`${rootURI}/chrome/content/index.js`);

    if (chromeHandle) {
        chromeHandle.destruct();
        chromeHandle = null;
    }
}

function uninstall(data, reason) {}
