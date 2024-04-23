"use strict";
(() => {
    var ya = Object.create;
    var Ar = Object.defineProperty;
    var wn = Object.getOwnPropertyDescriptor;
    var _a = Object.getOwnPropertyNames;
    var ka = Object.getPrototypeOf,
        wa = Object.prototype.hasOwnProperty;
    var v = (r, e) => () => (
        e || r((e = { exports: {} }).exports, e), e.exports
    );
    var Sa = (r, e, t, i) => {
        if ((e && typeof e == "object") || typeof e == "function")
            for (let n of _a(e))
                !wa.call(r, n) &&
                    n !== t &&
                    Ar(r, n, {
                        get: () => e[n],
                        enumerable: !(i = wn(e, n)) || i.enumerable,
                    });
        return r;
    };
    var Me = (r, e, t) => (
        (t = r != null ? ya(ka(r)) : {}),
        Sa(
            e || !r || !r.__esModule
                ? Ar(t, "default", { value: r, enumerable: !0 })
                : t,
            r,
        )
    );
    var St = (r, e, t, i) => {
        for (
            var n = i > 1 ? void 0 : i ? wn(e, t) : e, s = r.length - 1, o;
            s >= 0;
            s--
        )
            (o = r[s]) && (n = (i ? o(e, t, n) : o(n)) || n);
        return i && n && Ar(e, t, n), n;
    };
    var Sn = v((Ae) => {
        "use strict";
        var xa =
            (Ae && Ae.__importDefault) ||
            function (r) {
                return r && r.__esModule ? r : { default: r };
            };
        Object.defineProperty(Ae, "__esModule", { value: !0 });
        Ae.DebugBridge = void 0;
        var Rr = x(),
            Ca = xa(pe()),
            it = class r {
                get version() {
                    return r.version;
                }
                get disableDebugBridgePassword() {
                    return this._disableDebugBridgePassword;
                }
                set disableDebugBridgePassword(e) {
                    this._disableDebugBridgePassword = e;
                }
                get password() {
                    return Rr.BasicTool.getZotero().Prefs.get(
                        r.passwordPref,
                        !0,
                    );
                }
                set password(e) {
                    Rr.BasicTool.getZotero().Prefs.set(r.passwordPref, e, !0);
                }
                constructor() {
                    (this._disableDebugBridgePassword = !1),
                        this.initializeDebugBridge();
                }
                static setModule(e) {
                    var t;
                    (!(
                        !((t = e.debugBridge) === null || t === void 0) &&
                        t.version
                    ) ||
                        e.debugBridge.version < r.version) &&
                        (e.debugBridge = new r());
                }
                initializeDebugBridge() {
                    let e = {
                        noContent: !0,
                        doAction: async (t) => {
                            var i;
                            let n = Rr.BasicTool.getZotero(),
                                s = n.getMainWindow(),
                                o = t.spec.split("//").pop();
                            if (!o) return;
                            let a = {};
                            (i = o.split("?").pop()) === null ||
                                i === void 0 ||
                                i.split("&").forEach((d) => {
                                    a[d.split("=")[0]] = decodeURIComponent(
                                        d.split("=")[1],
                                    );
                                });
                            let c =
                                    Ca.default.getInstance().debugBridge
                                        .disableDebugBridgePassword,
                                l = !1;
                            if (
                                (c
                                    ? (l = !0)
                                    : typeof a.password > "u" &&
                                        typeof this.password > "u"
                                      ? (l =
                                            s.confirm(`External App ${a.app} wants to execute command without password.
Command:
${(a.run || a.file || "").slice(0, 100)}
If you do not know what it is, please click Cancel to deny.`))
                                      : (l = this.password === a.password),
                                l)
                            ) {
                                if (a.run)
                                    try {
                                        let d = Object.getPrototypeOf(
                                            async function () {},
                                        ).constructor;
                                        await new d("Zotero,window", a.run)(
                                            n,
                                            s,
                                        );
                                    } catch (d) {
                                        n.debug(d), s.console.log(d);
                                    }
                                if (a.file)
                                    try {
                                        Services.scriptloader.loadSubScript(
                                            a.file,
                                            { Zotero: n, window: s },
                                        );
                                    } catch (d) {
                                        n.debug(d), s.console.log(d);
                                    }
                            }
                        },
                        newChannel: function (t) {
                            this.doAction(t);
                        },
                    };
                    Services.io.getProtocolHandler(
                        "zotero",
                    ).wrappedJSObject._extensions["zotero://ztoolkit-debug"] =
                        e;
                }
            };
        Ae.DebugBridge = it;
        it.version = 2;
        it.passwordPref = "extensions.zotero.debug-bridge.password";
    });
    var Cn = v((Ct) => {
        "use strict";
        Object.defineProperty(Ct, "__esModule", { value: !0 });
        Ct.PluginBridge = void 0;
        var La = x(),
            xt = class r {
                get version() {
                    return r.version;
                }
                constructor() {
                    this.initializePluginBridge();
                }
                static setModule(e) {
                    var t;
                    (!(
                        !((t = e.pluginBridge) === null || t === void 0) &&
                        t.version
                    ) ||
                        e.pluginBridge.version < r.version) &&
                        (e.pluginBridge = new r());
                }
                initializePluginBridge() {
                    let { AddonManager: e } = ChromeUtils.import(
                            "resource://gre/modules/AddonManager.jsm",
                        ),
                        t = La.BasicTool.getZotero(),
                        i = {
                            noContent: !0,
                            doAction: async (n) => {
                                var s;
                                try {
                                    let o = n.spec.split("//").pop();
                                    if (!o) return;
                                    let a = {};
                                    if (
                                        ((s = o.split("?").pop()) === null ||
                                            s === void 0 ||
                                            s.split("&").forEach((c) => {
                                                a[c.split("=")[0]] =
                                                    decodeURIComponent(
                                                        c.split("=")[1],
                                                    );
                                            }),
                                        a.action === "install" && a.url)
                                    ) {
                                        if (
                                            (a.minVersion &&
                                                Services.vc.compare(
                                                    t.version,
                                                    a.minVersion,
                                                ) < 0) ||
                                            (a.maxVersion &&
                                                Services.vc.compare(
                                                    t.version,
                                                    a.maxVersion,
                                                ) > 0)
                                        )
                                            throw new Error(
                                                `Plugin is not compatible with Zotero version ${t.version}.The plugin requires Zotero version between ${a.minVersion} and ${a.maxVersion}.`,
                                            );
                                        let c = await e.getInstallForURL(a.url);
                                        if (c && c.state === e.STATE_AVAILABLE)
                                            c.install(),
                                                xn(
                                                    "Plugin installed successfully.",
                                                    !0,
                                                );
                                        else
                                            throw new Error(
                                                `Plugin ${a.url} is not available.`,
                                            );
                                    }
                                } catch (o) {
                                    t.logError(o), xn(o.message, !1);
                                }
                            },
                            newChannel: function (n) {
                                this.doAction(n);
                            },
                        };
                    Services.io.getProtocolHandler(
                        "zotero",
                    ).wrappedJSObject._extensions["zotero://plugin"] = i;
                }
            };
        Ct.PluginBridge = xt;
        xt.version = 1;
        function xn(r, e) {
            let t = new Zotero.ProgressWindow({ closeOnClick: !0 });
            t.changeHeadline("Plugin Toolkit"),
                (t.progress = new t.ItemProgress(
                    e
                        ? "chrome://zotero/skin/tick.png"
                        : "chrome://zotero/skin/cross.png",
                    r,
                )),
                t.progress.setProgress(100),
                t.show(),
                t.startCloseTimer(5e3);
        }
    });
    var pe = v((nt) => {
        "use strict";
        Object.defineProperty(nt, "__esModule", { value: !0 });
        nt.ToolkitGlobal = void 0;
        var Nr = x(),
            Pa = Sn(),
            Ta = Cn(),
            Lt = class r {
                constructor() {
                    Ln(this),
                        (this.currentWindow =
                            Nr.BasicTool.getZotero().getMainWindow());
                }
                static getInstance() {
                    let e = Nr.BasicTool.getZotero(),
                        t = !1;
                    "_toolkitGlobal" in e ||
                        ((e._toolkitGlobal = new r()), (t = !0));
                    let i = e._toolkitGlobal;
                    return (
                        i.currentWindow !== e.getMainWindow() &&
                            (Ia(i), (t = !0)),
                        t && Ln(i),
                        i
                    );
                }
            };
        nt.ToolkitGlobal = Lt;
        function Ln(r) {
            Re(r, "fieldHooks", {
                _ready: !1,
                getFieldHooks: {},
                setFieldHooks: {},
                isFieldOfBaseHooks: {},
            }),
                Re(r, "itemTree", {
                    _ready: !1,
                    columns: [],
                    renderCellHooks: {},
                }),
                Re(r, "itemBox", { _ready: !1, fieldOptions: {} }),
                Re(r, "shortcut", { _ready: !1, eventKeys: [] }),
                Re(r, "prompt", { _ready: !1, instance: void 0 }),
                Re(r, "readerInstance", { _ready: !1, initializedHooks: {} }),
                Pa.DebugBridge.setModule(r),
                Ta.PluginBridge.setModule(r);
        }
        function Re(r, e, t) {
            var i, n;
            if (t) {
                r[e] || (r[e] = t);
                for (let s in t)
                    ((i = (n = r[e])[s]) !== null && i !== void 0) ||
                        (n[s] = t[s]);
            }
        }
        function Ia(r) {
            (r.currentWindow = Nr.BasicTool.getZotero().getMainWindow()),
                (r.itemTree = void 0),
                (r.itemBox = void 0),
                (r.shortcut = void 0),
                (r.prompt = void 0),
                (r.readerInstance = void 0);
        }
        nt.default = Lt;
    });
    var x = v((U) => {
        "use strict";
        var Ea =
            (U && U.__importDefault) ||
            function (r) {
                return r && r.__esModule ? r : { default: r };
            };
        Object.defineProperty(U, "__esModule", { value: !0 });
        U.makeHelperTool = U.unregister = U.ManagerTool = U.BasicTool = void 0;
        var Ma = Ea(pe()),
            st = class r {
                get basicOptions() {
                    return this._basicOptions;
                }
                constructor(e) {
                    (this.patchSign = "zotero-plugin-toolkit@2.0.0"),
                        (this._basicOptions = {
                            log: {
                                _type: "toolkitlog",
                                disableConsole: !1,
                                disableZLog: !1,
                                prefix: "",
                            },
                            debug: Ma.default.getInstance().debugBridge,
                            api: {
                                pluginID:
                                    "zotero-plugin-toolkit@windingwind.com",
                            },
                            listeners: {
                                callbacks: {
                                    onMainWindowLoad: new Set(),
                                    onMainWindowUnload: new Set(),
                                    onPluginUnload: new Set(),
                                },
                                _mainWindow: void 0,
                                _plugin: void 0,
                            },
                        }),
                        this.updateOptions(e);
                }
                getGlobal(e) {
                    let t =
                        typeof Zotero < "u"
                            ? Zotero
                            : Components.classes[
                                  "@zotero.org/Zotero;1"
                              ].getService(Components.interfaces.nsISupports)
                                  .wrappedJSObject;
                    try {
                        let i = t.getMainWindow();
                        switch (e) {
                            case "Zotero":
                            case "zotero":
                                return t;
                            case "window":
                                return i;
                            case "windows":
                                return t.getMainWindows();
                            case "document":
                                return i.document;
                            case "ZoteroPane":
                            case "ZoteroPane_Local":
                                return t.getActiveZoteroPane();
                            default:
                                return i[e];
                        }
                    } catch (i) {
                        Zotero.logError(i);
                    }
                }
                isZotero7() {
                    return Zotero.platformMajorVersion >= 102;
                }
                isFX115() {
                    return Zotero.platformMajorVersion >= 115;
                }
                getDOMParser() {
                    if (this.isZotero7())
                        return new (this.getGlobal("DOMParser"))();
                    try {
                        return new (this.getGlobal("DOMParser"))();
                    } catch {
                        return Components.classes[
                            "@mozilla.org/xmlextras/domparser;1"
                        ].createInstance(Components.interfaces.nsIDOMParser);
                    }
                }
                isXULElement(e) {
                    return (
                        e.namespaceURI ===
                        "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul"
                    );
                }
                createXULElement(e, t) {
                    return this.isZotero7()
                        ? e.createXULElement(t)
                        : e.createElementNS(
                              "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",
                              t,
                          );
                }
                log(...e) {
                    var t;
                    if (e.length === 0) return;
                    let i = this.getGlobal("Zotero"),
                        n = this.getGlobal("console"),
                        s;
                    ((t = e[e.length - 1]) === null || t === void 0
                        ? void 0
                        : t._type) === "toolkitlog"
                        ? (s = e.pop())
                        : (s = this._basicOptions.log);
                    try {
                        s.prefix && e.splice(0, 0, s.prefix),
                            s.disableConsole ||
                                (n.groupCollapsed(...e),
                                n.trace(),
                                n.groupEnd()),
                            s.disableZLog ||
                                i.debug(
                                    e.map((o) => {
                                        try {
                                            return typeof o == "object"
                                                ? JSON.stringify(o)
                                                : String(o);
                                        } catch {
                                            return i.debug(o), "";
                                        }
                                    }).join(`
`),
                                );
                    } catch (o) {
                        n.error(o), i.logError(o);
                    }
                }
                patch(e, t, i, n) {
                    if (e[t][i]) throw new Error(`${String(t)} re-patched`);
                    this.log("patching", t, `by ${i}`),
                        (e[t] = n(e[t])),
                        (e[t][i] = !0);
                }
                addListenerCallback(e, t) {
                    ["onMainWindowLoad", "onMainWindowUnload"].includes(e) &&
                        this._ensureMainWindowListener(),
                        e === "onPluginUnload" && this._ensurePluginListener(),
                        this._basicOptions.listeners.callbacks[e].add(t);
                }
                removeListenerCallback(e, t) {
                    this._basicOptions.listeners.callbacks[e].delete(t),
                        this._ensureRemoveListener();
                }
                _ensureRemoveListener() {
                    let { listeners: e } = this._basicOptions;
                    e._mainWindow &&
                        e.callbacks.onMainWindowLoad.size === 0 &&
                        e.callbacks.onMainWindowUnload.size === 0 &&
                        (Services.wm.removeListener(e._mainWindow),
                        delete e._mainWindow),
                        e._plugin &&
                            e.callbacks.onPluginUnload.size === 0 &&
                            (Zotero.Plugins.removeObserver(e._plugin),
                            delete e._plugin);
                }
                _ensureMainWindowListener() {
                    if (this._basicOptions.listeners._mainWindow) return;
                    let e = {
                        onOpenWindow: (t) => {
                            let i = t.docShell.domWindow,
                                n = async () => {
                                    if (
                                        (i.removeEventListener("load", n, !1),
                                        i.location.href ===
                                            "chrome://zotero/content/zoteroPane.xhtml")
                                    )
                                        for (let s of this._basicOptions
                                            .listeners.callbacks
                                            .onMainWindowLoad)
                                            try {
                                                s(i);
                                            } catch (o) {
                                                this.log(o);
                                            }
                                };
                            i.addEventListener("load", () => n(), !1);
                        },
                        onCloseWindow: async (t) => {
                            let i = t.docShell.domWindow;
                            if (
                                i.location.href ===
                                "chrome://zotero/content/zoteroPane.xhtml"
                            )
                                for (let n of this._basicOptions.listeners
                                    .callbacks.onMainWindowUnload)
                                    try {
                                        n(i);
                                    } catch (s) {
                                        this.log(s);
                                    }
                        },
                    };
                    (this._basicOptions.listeners._mainWindow = e),
                        Services.wm.addListener(e);
                }
                _ensurePluginListener() {
                    if (this._basicOptions.listeners._plugin) return;
                    let e = {
                        shutdown: (...t) => {
                            for (let i of this._basicOptions.listeners.callbacks
                                .onPluginUnload)
                                try {
                                    i(...t);
                                } catch (n) {
                                    this.log(n);
                                }
                        },
                    };
                    (this._basicOptions.listeners._plugin = e),
                        Zotero.Plugins.addObserver(e);
                }
                updateOptions(e) {
                    return e
                        ? (e instanceof r
                              ? (this._basicOptions = e._basicOptions)
                              : (this._basicOptions = e),
                          this)
                        : this;
                }
                static getZotero() {
                    return typeof Zotero < "u"
                        ? Zotero
                        : Components.classes["@zotero.org/Zotero;1"].getService(
                              Components.interfaces.nsISupports,
                          ).wrappedJSObject;
                }
            };
        U.BasicTool = st;
        var Pt = class extends st {
            _ensureAutoUnregisterAll() {
                this.addListenerCallback("onPluginUnload", (e, t) => {
                    e.id === this.basicOptions.api.pluginID &&
                        this.unregisterAll();
                });
            }
        };
        U.ManagerTool = Pt;
        function Aa(r) {
            Object.values(r).forEach((e) => {
                (e instanceof Pt || typeof e?.unregisterAll == "function") &&
                    e.unregisterAll();
            });
        }
        U.unregister = Aa;
        function Ra(r, e) {
            return new Proxy(r, {
                construct(t, i) {
                    let n = new r(...i);
                    return n instanceof st && n.updateOptions(e), n;
                },
            });
        }
        U.makeHelperTool = Ra;
    });
    var te = v((At) => {
        "use strict";
        Object.defineProperty(At, "__esModule", { value: !0 });
        At.UITool = void 0;
        var Da = x(),
            Fr = class extends Da.BasicTool {
                get basicOptions() {
                    return this._basicOptions;
                }
                constructor(e) {
                    super(e),
                        (this.elementCache = []),
                        this._basicOptions.ui ||
                            (this._basicOptions.ui = {
                                enableElementRecord: !0,
                                enableElementJSONLog: !1,
                                enableElementDOMLog: !0,
                            });
                }
                unregisterAll() {
                    this.elementCache.forEach((e) => {
                        var t;
                        try {
                            (t = e?.deref()) === null ||
                                t === void 0 ||
                                t.remove();
                        } catch (i) {
                            this.log(i);
                        }
                    });
                }
                createElement(...e) {
                    var t, i, n;
                    let s = e[0],
                        o = e[1].toLowerCase(),
                        a = e[2] || {};
                    if (!o) return;
                    typeof e[2] == "string" &&
                        (a = { namespace: e[2], enableElementRecord: e[3] }),
                        ((typeof a.enableElementJSONLog < "u" &&
                            a.enableElementJSONLog) ||
                            this.basicOptions.ui.enableElementJSONLog) &&
                            this.log(a),
                        (a.properties = a.properties || a.directAttributes),
                        (a.children = a.children || a.subElementOptions);
                    let c;
                    if (o === "fragment") c = s.createDocumentFragment();
                    else {
                        let l =
                            a.id &&
                            (a.checkExistenceParent
                                ? a.checkExistenceParent
                                : s
                            ).querySelector(`#${a.id}`);
                        if (l && a.ignoreIfExists) return l;
                        if (
                            (l &&
                                a.removeIfExists &&
                                (l.remove(), (l = void 0)),
                            a.customCheck && !a.customCheck(s, a))
                        )
                            return;
                        if (!l || !a.skipIfExists) {
                            let d = a.namespace;
                            if (!d) {
                                let u = Va.includes(o),
                                    h = Ka.includes(o),
                                    f = Za.includes(o);
                                Number(u) + Number(h) + Number(f) > 1 &&
                                    this.log(
                                        `[Warning] Creating element ${o} with no namespace specified. Found multiply namespace matches.`,
                                    ),
                                    u
                                        ? (d = "html")
                                        : h
                                          ? (d = "xul")
                                          : f
                                            ? (d = "svg")
                                            : (d = "html");
                            }
                            d === "xul"
                                ? (l = this.createXULElement(s, o))
                                : (l = s.createElementNS(
                                      {
                                          html: "http://www.w3.org/1999/xhtml",
                                          svg: "http://www.w3.org/2000/svg",
                                      }[d],
                                      o,
                                  )),
                                (typeof a.enableElementRecord < "u"
                                    ? a.enableElementRecord
                                    : this.basicOptions.ui
                                          .enableElementRecord) &&
                                    this.elementCache.push(new WeakRef(l));
                        }
                        a.id && (l.id = a.id),
                            a.styles &&
                                Object.keys(a.styles).length &&
                                Object.keys(a.styles).forEach((d) => {
                                    let u = a.styles[d];
                                    typeof u < "u" && (l.style[d] = u);
                                }),
                            a.properties &&
                                Object.keys(a.properties).length &&
                                Object.keys(a.properties).forEach((d) => {
                                    let u = a.properties[d];
                                    typeof u < "u" && (l[d] = u);
                                }),
                            a.attributes &&
                                Object.keys(a.attributes).length &&
                                Object.keys(a.attributes).forEach((d) => {
                                    let u = a.attributes[d];
                                    typeof u < "u" &&
                                        l.setAttribute(d, String(u));
                                }),
                            !((t = a.classList) === null || t === void 0) &&
                                t.length &&
                                l.classList.add(...a.classList),
                            !((i = a.listeners) === null || i === void 0) &&
                                i.length &&
                                a.listeners.forEach(
                                    ({ type: d, listener: u, options: h }) => {
                                        u && l.addEventListener(d, u, h);
                                    },
                                ),
                            (c = l);
                    }
                    if (
                        !((n = a.children) === null || n === void 0) &&
                        n.length
                    ) {
                        let l = a.children
                            .map(
                                (d) => (
                                    (d.namespace = d.namespace || a.namespace),
                                    this.createElement(s, d.tag, d)
                                ),
                            )
                            .filter((d) => d);
                        c.append(...l);
                    }
                    return (
                        (typeof a.enableElementDOMLog < "u"
                            ? a.enableElementDOMLog
                            : this.basicOptions.ui.enableElementDOMLog) &&
                            this.log(c),
                        c
                    );
                }
                appendElement(e, t) {
                    return t.appendChild(
                        this.createElement(t.ownerDocument, e.tag, e),
                    );
                }
                insertElementBefore(e, t) {
                    if (t.parentNode)
                        return t.parentNode.insertBefore(
                            this.createElement(t.ownerDocument, e.tag, e),
                            t,
                        );
                    this.log(
                        t.tagName + " has no parent, cannot insert " + e.tag,
                    );
                }
                replaceElement(e, t) {
                    if (t.parentNode)
                        return t.parentNode.replaceChild(
                            this.createElement(t.ownerDocument, e.tag, e),
                            t,
                        );
                    this.log(
                        t.tagName +
                            " has no parent, cannot replace it with " +
                            e.tag,
                    );
                }
                parseXHTMLToFragment(e, t = [], i = !0) {
                    let n = this.getDOMParser(),
                        s =
                            "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul",
                        o = "http://www.w3.org/1999/xhtml",
                        a = `${t.length ? `<!DOCTYPE bindings [ ${t.reduce((d, u, h) => d + `<!ENTITY % _dtd-${h} SYSTEM "${u}"> %_dtd-${h}; `, "")}]>` : ""}
      <html:div xmlns="${i ? s : o}"
          xmlns:xul="${s}" xmlns:html="${o}">
      ${e}
      </html:div>`;
                    this.log(a, n);
                    let c = n.parseFromString(a, "text/xml");
                    if (
                        (this.log(c),
                        c.documentElement.localName === "parsererror")
                    )
                        throw new Error("not well-formed XHTML");
                    let l = c.createRange();
                    return (
                        l.selectNodeContents(c.querySelector("div")),
                        l.extractContents()
                    );
                }
            };
        At.UITool = Fr;
        var Va = [
                "a",
                "abbr",
                "address",
                "area",
                "article",
                "aside",
                "audio",
                "b",
                "base",
                "bdi",
                "bdo",
                "blockquote",
                "body",
                "br",
                "button",
                "canvas",
                "caption",
                "cite",
                "code",
                "col",
                "colgroup",
                "data",
                "datalist",
                "dd",
                "del",
                "details",
                "dfn",
                "dialog",
                "div",
                "dl",
                "dt",
                "em",
                "embed",
                "fieldset",
                "figcaption",
                "figure",
                "footer",
                "form",
                "h1",
                "h2",
                "h3",
                "h4",
                "h5",
                "h6",
                "head",
                "header",
                "hgroup",
                "hr",
                "html",
                "i",
                "iframe",
                "img",
                "input",
                "ins",
                "kbd",
                "label",
                "legend",
                "li",
                "link",
                "main",
                "map",
                "mark",
                "menu",
                "meta",
                "meter",
                "nav",
                "noscript",
                "object",
                "ol",
                "optgroup",
                "option",
                "output",
                "p",
                "picture",
                "pre",
                "progress",
                "q",
                "rp",
                "rt",
                "ruby",
                "s",
                "samp",
                "script",
                "section",
                "select",
                "slot",
                "small",
                "source",
                "span",
                "strong",
                "style",
                "sub",
                "summary",
                "sup",
                "table",
                "tbody",
                "td",
                "template",
                "textarea",
                "tfoot",
                "th",
                "thead",
                "time",
                "title",
                "tr",
                "track",
                "u",
                "ul",
                "var",
                "video",
                "wbr",
            ],
            Ka = [
                "action",
                "arrowscrollbox",
                "bbox",
                "binding",
                "bindings",
                "box",
                "broadcaster",
                "broadcasterset",
                "button",
                "browser",
                "checkbox",
                "caption",
                "colorpicker",
                "column",
                "columns",
                "commandset",
                "command",
                "conditions",
                "content",
                "deck",
                "description",
                "dialog",
                "dialogheader",
                "editor",
                "grid",
                "grippy",
                "groupbox",
                "hbox",
                "iframe",
                "image",
                "key",
                "keyset",
                "label",
                "listbox",
                "listcell",
                "listcol",
                "listcols",
                "listhead",
                "listheader",
                "listitem",
                "member",
                "menu",
                "menubar",
                "menuitem",
                "menulist",
                "menupopup",
                "menuseparator",
                "observes",
                "overlay",
                "page",
                "popup",
                "popupset",
                "preference",
                "preferences",
                "prefpane",
                "prefwindow",
                "progressmeter",
                "radio",
                "radiogroup",
                "resizer",
                "richlistbox",
                "richlistitem",
                "row",
                "rows",
                "rule",
                "script",
                "scrollbar",
                "scrollbox",
                "scrollcorner",
                "separator",
                "spacer",
                "splitter",
                "stack",
                "statusbar",
                "statusbarpanel",
                "stringbundle",
                "stringbundleset",
                "tab",
                "tabbrowser",
                "tabbox",
                "tabpanel",
                "tabpanels",
                "tabs",
                "template",
                "textnode",
                "textbox",
                "titlebar",
                "toolbar",
                "toolbarbutton",
                "toolbargrippy",
                "toolbaritem",
                "toolbarpalette",
                "toolbarseparator",
                "toolbarset",
                "toolbarspacer",
                "toolbarspring",
                "toolbox",
                "tooltip",
                "tree",
                "treecell",
                "treechildren",
                "treecol",
                "treecols",
                "treeitem",
                "treerow",
                "treeseparator",
                "triple",
                "vbox",
                "window",
                "wizard",
                "wizardpage",
            ],
            Za = [
                "a",
                "animate",
                "animateMotion",
                "animateTransform",
                "circle",
                "clipPath",
                "defs",
                "desc",
                "ellipse",
                "feBlend",
                "feColorMatrix",
                "feComponentTransfer",
                "feComposite",
                "feConvolveMatrix",
                "feDiffuseLighting",
                "feDisplacementMap",
                "feDistantLight",
                "feDropShadow",
                "feFlood",
                "feFuncA",
                "feFuncB",
                "feFuncG",
                "feFuncR",
                "feGaussianBlur",
                "feImage",
                "feMerge",
                "feMergeNode",
                "feMorphology",
                "feOffset",
                "fePointLight",
                "feSpecularLighting",
                "feSpotLight",
                "feTile",
                "feTurbulence",
                "filter",
                "foreignObject",
                "g",
                "image",
                "line",
                "linearGradient",
                "marker",
                "mask",
                "metadata",
                "mpath",
                "path",
                "pattern",
                "polygon",
                "polyline",
                "radialGradient",
                "rect",
                "script",
                "set",
                "stop",
                "style",
                "svg",
                "switch",
                "symbol",
                "text",
                "textPath",
                "title",
                "tspan",
                "use",
                "view",
            ];
    });
    var Dr = v((Oe) => {
        "use strict";
        Object.defineProperty(Oe, "__esModule", { value: !0 });
        Oe.waitUtilAsync = Oe.waitUntil = void 0;
        var Ga = x(),
            qe = new Ga.BasicTool();
        function Wa(r, e, t = 100, i = 1e4) {
            let n = Date.now(),
                s = qe.getGlobal("setInterval")(() => {
                    r()
                        ? (qe.getGlobal("clearInterval")(s), e())
                        : Date.now() - n > i &&
                          qe.getGlobal("clearInterval")(s);
                }, t);
        }
        Oe.waitUntil = Wa;
        function ja(r, e = 100, t = 1e4) {
            return new Promise((i, n) => {
                let s = Date.now(),
                    o = qe.getGlobal("setInterval")(() => {
                        r()
                            ? (qe.getGlobal("clearInterval")(o), i())
                            : Date.now() - s > t &&
                              (qe.getGlobal("clearInterval")(o), n());
                    }, e);
            });
        }
        Oe.waitUtilAsync = ja;
    });
    var Kr = v((Rt) => {
        "use strict";
        Object.defineProperty(Rt, "__esModule", { value: !0 });
        Rt.ReaderTool = void 0;
        var Ua = x(),
            Ja = Dr(),
            Vr = class extends Ua.BasicTool {
                async getReader(e = 5e3) {
                    let t = this.getGlobal("Zotero_Tabs");
                    if (t.selectedType !== "reader") return;
                    let i = Zotero.Reader.getByTabID(t.selectedID),
                        n = 0,
                        s = 50;
                    for (; !i && n * s < e; )
                        await Zotero.Promise.delay(s),
                            (i = Zotero.Reader.getByTabID(t.selectedID)),
                            n++;
                    return await i?._initPromise, i;
                }
                getWindowReader() {
                    let e = this.getGlobal("Zotero_Tabs"),
                        t = [],
                        i = e._tabs.map((n) => n.id);
                    for (let n = 0; n < Zotero.Reader._readers.length; n++) {
                        let s = !1;
                        for (let o = 0; o < i.length; o++)
                            if (Zotero.Reader._readers[n].tabID == i[o]) {
                                s = !0;
                                break;
                            }
                        s || t.push(Zotero.Reader._readers[n]);
                    }
                    return t;
                }
                getReaderTabPanelDeck() {
                    var e;
                    return (e =
                        this.getGlobal("window").document.querySelector(
                            ".notes-pane-deck",
                        )) === null || e === void 0
                        ? void 0
                        : e.previousElementSibling;
                }
                async addReaderTabPanelDeckObserver(e) {
                    await (0, Ja.waitUtilAsync)(
                        () => !!this.getReaderTabPanelDeck(),
                    );
                    let t = this.getReaderTabPanelDeck(),
                        i = new (this.getGlobal("MutationObserver"))(
                            async (n) => {
                                n.forEach(async (s) => {
                                    let o = s.target;
                                    (o.classList.contains(
                                        "zotero-view-tabbox",
                                    ) ||
                                        o.tagName === "deck") &&
                                        e();
                                });
                            },
                        );
                    return (
                        i.observe(t, {
                            attributes: !0,
                            attributeFilter: ["selectedIndex"],
                            subtree: !0,
                        }),
                        i
                    );
                }
                getSelectedAnnotationData(e) {
                    var t;
                    return (t =
                        e?._internalReader._lastView._selectionPopup) ===
                        null || t === void 0
                        ? void 0
                        : t.annotation;
                }
                getSelectedText(e) {
                    var t, i;
                    return (i =
                        (t = this.getSelectedAnnotationData(e)) === null ||
                        t === void 0
                            ? void 0
                            : t.text) !== null && i !== void 0
                        ? i
                        : "";
                }
            };
        Rt.ReaderTool = Vr;
    });
    var Bn = v((Nt) => {
        "use strict";
        Object.defineProperty(Nt, "__esModule", { value: !0 });
        Nt.ExtraFieldTool = void 0;
        var Qa = x(),
            Zr = class extends Qa.BasicTool {
                getExtraFields(e, t = "custom") {
                    let i = e.getField("extra");
                    if (t === "default")
                        return this.getGlobal(
                            "Zotero",
                        ).Utilities.Internal.extractExtraFields(i).fields;
                    {
                        let n = new Map(),
                            s = [];
                        return (
                            i
                                .split(
                                    `
`,
                                )
                                .forEach((o) => {
                                    let a = o.split(": ");
                                    a.length >= 2 && a[0]
                                        ? n.set(a[0], a.slice(1).join(": "))
                                        : s.push(o);
                                }),
                            n.set(
                                "__nonStandard__",
                                s.join(`
`),
                            ),
                            n
                        );
                    }
                }
                getExtraField(e, t) {
                    return this.getExtraFields(e).get(t);
                }
                async replaceExtraFields(e, t) {
                    let i = [];
                    t.has("__nonStandard__") &&
                        (i.push(t.get("__nonStandard__")),
                        t.delete("__nonStandard__")),
                        t.forEach((n, s) => {
                            i.push(`${s}: ${n}`);
                        }),
                        e.setField(
                            "extra",
                            i.join(`
`),
                        ),
                        await e.saveTx();
                }
                async setExtraField(e, t, i) {
                    let n = this.getExtraFields(e);
                    i === "" || typeof i > "u" ? n.delete(t) : n.set(t, i),
                        await this.replaceExtraFields(e, n);
                }
            };
        Nt.ExtraFieldTool = Zr;
    });
    var Wr = v((qt) => {
        "use strict";
        Object.defineProperty(qt, "__esModule", { value: !0 });
        qt.PatchHelper = void 0;
        var $a = x(),
            Gr = class extends $a.BasicTool {
                constructor() {
                    super(), (this.options = void 0);
                }
                setData(e) {
                    this.options = e;
                    let t = this.getGlobal("Zotero"),
                        { target: i, funcSign: n, patcher: s } = e,
                        o = i[n];
                    return (
                        this.log("patching ", n),
                        (i[n] = function (...a) {
                            if (e.enabled)
                                try {
                                    return s(o).apply(this, a);
                                } catch (c) {
                                    t.logError(c);
                                }
                            return o.apply(this, a);
                        }),
                        this
                    );
                }
                enable() {
                    if (!this.options) throw new Error("No patch data set");
                    return (this.options.enabled = !0), this;
                }
                disable() {
                    if (!this.options) throw new Error("No patch data set");
                    return (this.options.enabled = !1), this;
                }
            };
        qt.PatchHelper = Gr;
    });
    var Ht = v((Ot) => {
        "use strict";
        Object.defineProperty(Ot, "__esModule", { value: !0 });
        Ot.FieldHookManager = void 0;
        var jr = Wr(),
            Xa = x(),
            Ur = class extends Xa.ManagerTool {
                constructor(e) {
                    super(e),
                        (this.data = {
                            getField: {},
                            setField: {},
                            isFieldOfBase: {},
                        }),
                        (this.patchHelpers = {
                            getField: new jr.PatchHelper(),
                            setField: new jr.PatchHelper(),
                            isFieldOfBase: new jr.PatchHelper(),
                        });
                    let t = this;
                    for (let i of Object.keys(this.patchHelpers))
                        this.patchHelpers[i].setData({
                            target: this.getGlobal("Zotero").Item.prototype,
                            funcSign: i,
                            patcher: (s) =>
                                function (o, ...a) {
                                    let c = this,
                                        l = t.data[i][o];
                                    if (typeof l == "function")
                                        try {
                                            return l(o, a[0], a[1], c, s);
                                        } catch (d) {
                                            return o + String(d);
                                        }
                                    return s.apply(c, [o, ...a]);
                                },
                            enabled: !0,
                        });
                }
                register(e, t, i) {
                    this.data[e][t] = i;
                }
                unregister(e, t) {
                    delete this.data[e][t];
                }
                unregisterAll() {
                    (this.data.getField = {}),
                        (this.data.setField = {}),
                        (this.data.isFieldOfBase = {}),
                        this.patchHelpers.getField.disable(),
                        this.patchHelpers.setField.disable(),
                        this.patchHelpers.isFieldOfBase.disable();
                }
            };
        Ot.FieldHookManager = Ur;
    });
    var Qr = v((zt) => {
        "use strict";
        Object.defineProperty(zt, "__esModule", { value: !0 });
        zt.PatcherManager = void 0;
        var Ya = x(),
            Jr = class extends Ya.ManagerTool {
                constructor(e) {
                    super(e), (this.patcherIDMap = new Map());
                }
                register(e, t, i) {
                    let n = this.getGlobal("Zotero"),
                        s = this.patcherIDMap,
                        o = n.randomString();
                    for (; s.has(o); ) o = n.randomString();
                    let a = e[t];
                    return (
                        s.set(o, !0),
                        this.log("patching ", t),
                        (e[t] = function (...c) {
                            if (s.get(o))
                                try {
                                    return i(a).apply(this, c);
                                } catch (l) {
                                    n.logError(l);
                                }
                            return a.apply(this, c);
                        }),
                        o
                    );
                }
                unregister(e) {
                    this.patcherIDMap.delete(e);
                }
                unregisterAll() {
                    this.patcherIDMap.clear();
                }
            };
        zt.PatcherManager = Jr;
    });
    var Fn = v((He) => {
        "use strict";
        var el =
            (He && He.__importDefault) ||
            function (r) {
                return r && r.__esModule ? r : { default: r };
            };
        Object.defineProperty(He, "__esModule", { value: !0 });
        He.ItemTreeManager = void 0;
        var tl = x(),
            rl = Ht(),
            il = el(pe()),
            nl = Qr(),
            $r = class extends tl.ManagerTool {
                constructor(e) {
                    super(e),
                        (this.defaultPersist = [
                            "width",
                            "ordinal",
                            "hidden",
                            "sortActive",
                            "sortDirection",
                        ]),
                        (this.backend =
                            this.getGlobal("Zotero").ItemTreeManager),
                        (this.localColumnCache = []),
                        (this.localRenderCellCache = []),
                        (this.fieldHooks = new rl.FieldHookManager(e)),
                        (this.patcherManager = new nl.PatcherManager(e)),
                        (this.initializationLock =
                            this.getGlobal("Zotero").Promise.defer()),
                        this.backend
                            ? this.initializationLock.resolve()
                            : this.initializeGlobal();
                }
                unregisterAll() {
                    [...this.localColumnCache].forEach((e) =>
                        this.unregister(e, { skipGetField: !0 }),
                    ),
                        [...this.localRenderCellCache].forEach(
                            this.removeRenderCellHook.bind(this),
                        ),
                        this.fieldHooks.unregisterAll();
                }
                async register(e, t, i, n = { showInColumnPicker: !0 }) {
                    var s;
                    if (
                        (await ((s = this.initializationLock) === null ||
                        s === void 0
                            ? void 0
                            : s.promise),
                        !this.backend &&
                            this.globalCache.columns
                                .map((a) => a.dataKey)
                                .includes(e))
                    ) {
                        this.log(`ItemTreeTool: ${e} is already registered.`);
                        return;
                    }
                    let o = {
                        dataKey: e,
                        label: t,
                        pluginID: this._basicOptions.api.pluginID,
                        iconLabel: n.iconPath
                            ? this.createIconLabel({
                                  iconPath: n.iconPath,
                                  name: t,
                              })
                            : void 0,
                        iconPath: n.iconPath,
                        htmlLabel: n.htmlLabel,
                        zoteroPersist:
                            n.zoteroPersist ||
                            (this.backend
                                ? this.defaultPersist
                                : new Set(this.defaultPersist)),
                        defaultIn: n.defaultIn,
                        disabledIn: n.disabledIn,
                        enabledTreeIDs: n.enabledTreeIDs,
                        defaultSort: n.defaultSort,
                        sortReverse: n.sortReverse || n.defaultSort === -1,
                        flex: typeof n.flex > "u" ? 1 : n.flex,
                        width: n.width,
                        fixedWidth: n.fixedWidth,
                        staticWidth: n.staticWidth,
                        minWidth: n.minWidth,
                        ignoreInColumnPicker: n.ignoreInColumnPicker,
                        showInColumnPicker:
                            typeof n.ignoreInColumnPicker > "u"
                                ? !0
                                : n.showInColumnPicker,
                        submenu: n.submenu,
                        columnPickerSubMenu: n.columnPickerSubMenu || n.submenu,
                        dataProvider:
                            n.dataProvider || ((a, c) => a.getField(e)),
                        renderCell: n.renderCell || n.renderCellHook,
                    };
                    if (
                        (i && this.fieldHooks.register("getField", e, i),
                        this.backend)
                    )
                        return await this.backend.registerColumns(o);
                    this.globalCache.columns.push(o),
                        this.localColumnCache.push(o.dataKey),
                        n.renderCellHook &&
                            (await this.addRenderCellHook(e, n.renderCellHook)),
                        await this.refresh();
                }
                async unregister(e, t = {}) {
                    if ((await this.initializationLock.promise, this.backend)) {
                        await this.backend.unregisterColumns(e),
                            t.skipGetField ||
                                this.fieldHooks.unregister("getField", e);
                        return;
                    }
                    let i = this.getGlobal("Zotero"),
                        n = i.Prefs.get("pane.persist"),
                        s = JSON.parse(n);
                    delete s[e], i.Prefs.set("pane.persist", JSON.stringify(s));
                    let o = this.globalCache.columns
                        .map((c) => c.dataKey)
                        .indexOf(e);
                    o >= 0 && this.globalCache.columns.splice(o, 1),
                        t.skipGetField ||
                            this.fieldHooks.unregister("getField", e),
                        this.removeRenderCellHook(e),
                        await this.refresh();
                    let a = this.localColumnCache.indexOf(e);
                    a >= 0 && this.localColumnCache.splice(a, 1);
                }
                async addRenderCellHook(e, t) {
                    await this.initializationLock.promise,
                        e in this.globalCache.renderCellHooks &&
                            this.log(
                                "[WARNING] ItemTreeTool.addRenderCellHook overwrites an existing hook:",
                                e,
                            ),
                        (this.globalCache.renderCellHooks[e] = t),
                        this.localRenderCellCache.push(e);
                }
                async removeRenderCellHook(e) {
                    delete this.globalCache.renderCellHooks[e];
                    let t = this.localRenderCellCache.indexOf(e);
                    t >= 0 && this.localRenderCellCache.splice(t, 1),
                        await this.refresh();
                }
                async initializeGlobal() {
                    await this.getGlobal("Zotero").uiReadyPromise;
                    let t = this.getGlobal("window");
                    this.globalCache = il.default.getInstance().itemTree;
                    let i = this.globalCache;
                    if (!i._ready) {
                        i._ready = !0;
                        let n = t.require("zotero/itemTree");
                        this.backend ||
                            this.patcherManager.register(
                                n.prototype,
                                "getColumns",
                                (s) =>
                                    function () {
                                        let o = s.apply(this, arguments),
                                            a = o.findIndex(
                                                (c) => c.dataKey === "title",
                                            );
                                        return (
                                            o.splice(a + 1, 0, ...i.columns), o
                                        );
                                    },
                            ),
                            this.patcherManager.register(
                                n.prototype,
                                "_renderCell",
                                (s) =>
                                    function (o, a, c) {
                                        if (!(c.dataKey in i.renderCellHooks))
                                            return s.apply(this, arguments);
                                        let l = i.renderCellHooks[c.dataKey],
                                            d = l(o, a, c, s.bind(this));
                                        if (d.classList.contains("cell"))
                                            return d;
                                        let u = t.document.createElementNS(
                                            "http://www.w3.org/1999/xhtml",
                                            "span",
                                        );
                                        return (
                                            u.classList.add(
                                                "cell",
                                                c.dataKey,
                                                `${c.dataKey}-item-tree-main-default`,
                                            ),
                                            c.fixedWidth &&
                                                u.classList.add("fixed-width"),
                                            u.appendChild(d),
                                            u
                                        );
                                    },
                            );
                    }
                    this.initializationLock.resolve();
                }
                createIconLabel(e) {
                    let t = window.require("react");
                    return t.createElement(
                        "span",
                        null,
                        t.createElement("img", {
                            src: e.iconPath,
                            height: "10px",
                            width: "9px",
                            style: { "margin-left": "6px" },
                        }),
                        " ",
                        e.name,
                    );
                }
                async refresh() {
                    var e, t;
                    await this.initializationLock.promise;
                    let n = this.getGlobal("ZoteroPane").itemsView;
                    if (!n) return;
                    n._columnsId = null;
                    let s =
                        (e = n.tree) === null || e === void 0
                            ? void 0
                            : e._columns;
                    if (!s) {
                        this.log("ItemTree is still loading. Refresh skipped.");
                        return;
                    }
                    (t = document.querySelector(`.${s._styleKey}`)) === null ||
                        t === void 0 ||
                        t.remove(),
                        await n.refreshAndMaintainSelection(),
                        (n.tree._columns = new s.__proto__.constructor(n.tree)),
                        await n.refreshAndMaintainSelection();
                }
            };
        He.ItemTreeManager = $r;
    });
    var Dn = v((me) => {
        "use strict";
        var sl =
            (me && me.__importDefault) ||
            function (r) {
                return r && r.__esModule ? r : { default: r };
            };
        Object.defineProperty(me, "__esModule", { value: !0 });
        me.PromptManager = me.Prompt = void 0;
        var ol = x(),
            al = x(),
            ll = te(),
            cl = sl(pe()),
            Bt = class {
                get document() {
                    return this.base.getGlobal("document");
                }
                constructor() {
                    (this.lastInputText = ""),
                        (this.defaultText = {
                            placeholder: "Select a command...",
                            empty: "No commands found.",
                        }),
                        (this.maxLineNum = 12),
                        (this.maxSuggestionNum = 100),
                        (this.commands = []),
                        (this.base = new ol.BasicTool()),
                        (this.ui = new ll.UITool()),
                        this.initializeUI();
                }
                initializeUI() {
                    this.addStyle(),
                        this.createHTML(),
                        this.initInputEvents(),
                        this.registerShortcut();
                }
                createHTML() {
                    (this.promptNode = this.ui.createElement(
                        this.document,
                        "div",
                        {
                            styles: { display: "none" },
                            children: [
                                {
                                    tag: "div",
                                    styles: {
                                        position: "fixed",
                                        left: "0",
                                        top: "0",
                                        backgroundColor: "transparent",
                                        width: "100%",
                                        height: "100%",
                                    },
                                    listeners: [
                                        {
                                            type: "click",
                                            listener: () => {
                                                this.promptNode.style.display =
                                                    "none";
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    )),
                        this.promptNode.appendChild(
                            this.ui.createElement(this.document, "div", {
                                id: "zotero-plugin-toolkit-prompt",
                                classList: ["prompt-container"],
                                children: [
                                    {
                                        tag: "div",
                                        classList: ["input-container"],
                                        children: [
                                            {
                                                tag: "input",
                                                classList: ["prompt-input"],
                                                attributes: {
                                                    type: "text",
                                                    placeholder:
                                                        this.defaultText
                                                            .placeholder,
                                                },
                                            },
                                            { tag: "div", classList: ["cta"] },
                                        ],
                                    },
                                    {
                                        tag: "div",
                                        classList: ["commands-containers"],
                                    },
                                    {
                                        tag: "div",
                                        classList: ["instructions"],
                                        children: [
                                            {
                                                tag: "div",
                                                classList: ["instruction"],
                                                children: [
                                                    {
                                                        tag: "span",
                                                        classList: ["key"],
                                                        properties: {
                                                            innerText:
                                                                "\u2191\u2193",
                                                        },
                                                    },
                                                    {
                                                        tag: "span",
                                                        properties: {
                                                            innerText:
                                                                "to navigate",
                                                        },
                                                    },
                                                ],
                                            },
                                            {
                                                tag: "div",
                                                classList: ["instruction"],
                                                children: [
                                                    {
                                                        tag: "span",
                                                        classList: ["key"],
                                                        properties: {
                                                            innerText: "enter",
                                                        },
                                                    },
                                                    {
                                                        tag: "span",
                                                        properties: {
                                                            innerText:
                                                                "to trigger",
                                                        },
                                                    },
                                                ],
                                            },
                                            {
                                                tag: "div",
                                                classList: ["instruction"],
                                                children: [
                                                    {
                                                        tag: "span",
                                                        classList: ["key"],
                                                        properties: {
                                                            innerText: "esc",
                                                        },
                                                    },
                                                    {
                                                        tag: "span",
                                                        properties: {
                                                            innerText:
                                                                "to exit",
                                                        },
                                                    },
                                                ],
                                            },
                                        ],
                                    },
                                ],
                            }),
                        ),
                        (this.inputNode =
                            this.promptNode.querySelector("input")),
                        this.document.documentElement.appendChild(
                            this.promptNode,
                        );
                }
                showCommands(e, t = !1) {
                    t &&
                        this.promptNode
                            .querySelectorAll(".commands-container")
                            .forEach((n) => n.remove()),
                        (this.inputNode.placeholder =
                            this.defaultText.placeholder);
                    let i = this.createCommandsContainer();
                    for (let n of e) {
                        try {
                            if (!n.name || (n.when && !n.when())) continue;
                        } catch {
                            continue;
                        }
                        i.appendChild(this.createCommandNode(n));
                    }
                }
                createCommandsContainer() {
                    let e = this.ui.createElement(this.document, "div", {
                        classList: ["commands-container"],
                    });
                    return (
                        this.promptNode
                            .querySelectorAll(".commands-container")
                            .forEach((t) => {
                                t.style.display = "none";
                            }),
                        this.promptNode
                            .querySelector(".commands-containers")
                            .appendChild(e),
                        e
                    );
                }
                getCommandsContainer() {
                    return [
                        ...Array.from(
                            this.promptNode.querySelectorAll(
                                ".commands-container",
                            ),
                        ),
                    ].find((e) => e.style.display != "none");
                }
                createCommandNode(e) {
                    let t = this.ui.createElement(this.document, "div", {
                        classList: ["command"],
                        children: [
                            {
                                tag: "div",
                                classList: ["content"],
                                children: [
                                    {
                                        tag: "div",
                                        classList: ["name"],
                                        children: [
                                            {
                                                tag: "span",
                                                properties: {
                                                    innerText: e.name,
                                                },
                                            },
                                        ],
                                    },
                                    {
                                        tag: "div",
                                        classList: ["aux"],
                                        children: e.label
                                            ? [
                                                  {
                                                      tag: "span",
                                                      classList: ["label"],
                                                      properties: {
                                                          innerText: e.label,
                                                      },
                                                  },
                                              ]
                                            : [],
                                    },
                                ],
                            },
                        ],
                        listeners: [
                            {
                                type: "mousemove",
                                listener: () => {
                                    this.selectItem(t);
                                },
                            },
                            {
                                type: "click",
                                listener: async () => {
                                    await this.execCallback(e.callback);
                                },
                            },
                        ],
                    });
                    return (t.command = e), t;
                }
                trigger() {
                    [
                        ...Array.from(
                            this.promptNode.querySelectorAll(
                                ".commands-container",
                            ),
                        ),
                    ]
                        .find((e) => e.style.display != "none")
                        .querySelector(".selected")
                        .click();
                }
                exit() {
                    if (
                        ((this.inputNode.placeholder =
                            this.defaultText.placeholder),
                        this.promptNode.querySelectorAll(
                            ".commands-containers .commands-container",
                        ).length >= 2)
                    ) {
                        this.promptNode
                            .querySelector(".commands-container:last-child")
                            .remove();
                        let e = this.promptNode.querySelector(
                            ".commands-container:last-child",
                        );
                        (e.style.display = ""),
                            e
                                .querySelectorAll(".commands")
                                .forEach((t) => (t.style.display = "flex")),
                            this.inputNode.focus();
                    } else this.promptNode.style.display = "none";
                }
                async execCallback(e) {
                    Array.isArray(e) ? this.showCommands(e) : await e(this);
                }
                async showSuggestions(e) {
                    var t =
                            /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/,
                        i = /\s/,
                        n =
                            /[\u0F00-\u0FFF\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/;
                    function s(h, f, p, g) {
                        if (h.length === 0) return 0;
                        var b = 0;
                        (b -= Math.max(0, h.length - 1)), (b -= g / 10);
                        var m = h[0][0];
                        return (
                            (b -= (h[h.length - 1][1] - m + 1 - f) / 100),
                            (b -= m / 1e3),
                            (b -= p / 1e4)
                        );
                    }
                    function o(h, f, p, g) {
                        if (h.length === 0) return null;
                        for (
                            var b = p.toLowerCase(),
                                m = 0,
                                S = 0,
                                E = [],
                                P = 0;
                            P < h.length;
                            P++
                        ) {
                            var Z = h[P],
                                T = b.indexOf(Z, S);
                            if (T === -1) return null;
                            var C = p.charAt(T);
                            if (T > 0 && !t.test(C) && !n.test(C)) {
                                var ye = p.charAt(T - 1);
                                if (
                                    (C.toLowerCase() !== C &&
                                        ye.toLowerCase() !== ye) ||
                                    (C.toUpperCase() !== C &&
                                        !t.test(ye) &&
                                        !i.test(ye) &&
                                        !n.test(ye))
                                )
                                    if (g) {
                                        if (T !== S) {
                                            (S += Z.length), P--;
                                            continue;
                                        }
                                    } else m += 1;
                            }
                            if (E.length === 0) E.push([T, T + Z.length]);
                            else {
                                var ne = E[E.length - 1];
                                ne[1] < T
                                    ? E.push([T, T + Z.length])
                                    : (ne[1] = T + Z.length);
                            }
                            S = T + Z.length;
                        }
                        return {
                            matches: E,
                            score: s(E, f.length, b.length, m),
                        };
                    }
                    function a(h) {
                        for (
                            var f = h.toLowerCase(), p = [], g = 0, b = 0;
                            b < f.length;
                            b++
                        ) {
                            var m = f.charAt(b);
                            i.test(m)
                                ? (g !== b && p.push(f.substring(g, b)),
                                  (g = b + 1))
                                : (t.test(m) || n.test(m)) &&
                                  (g !== b && p.push(f.substring(g, b)),
                                  p.push(m),
                                  (g = b + 1));
                        }
                        return (
                            g !== f.length && p.push(f.substring(g, f.length)),
                            { query: h, tokens: p, fuzzy: f.split("") }
                        );
                    }
                    function c(h, f) {
                        if (h.query === "") return { score: 0, matches: [] };
                        var p = o(h.tokens, h.query, f, !1);
                        return p || o(h.fuzzy, h.query, f, !0);
                    }
                    var l = a(e);
                    let d = this.getCommandsContainer();
                    if (
                        (d.classList.contains("suggestions") && this.exit(),
                        e.trim() == "")
                    )
                        return !0;
                    let u = [];
                    if (
                        (this.getCommandsContainer()
                            .querySelectorAll(".command")
                            .forEach((h) => {
                                let p = h.querySelector(".name span").innerText,
                                    g = c(l, p);
                                if (g) {
                                    h = this.createCommandNode(h.command);
                                    let b = "",
                                        m = 0;
                                    for (let S = 0; S < g.matches.length; S++) {
                                        let [E, P] = g.matches[S];
                                        E > m && (b += p.slice(m, E)),
                                            (b += `<span class="highlight">${p.slice(E, P)}</span>`),
                                            (m = P);
                                    }
                                    m < p.length && (b += p.slice(m, p.length)),
                                        (h.querySelector(
                                            ".name span",
                                        ).innerHTML = b),
                                        u.push({
                                            score: g.score,
                                            commandNode: h,
                                        });
                                }
                            }),
                        u.length > 0)
                    )
                        return (
                            u
                                .sort((h, f) => f.score - h.score)
                                .slice(this.maxSuggestionNum),
                            (d = this.createCommandsContainer()),
                            d.classList.add("suggestions"),
                            u.forEach((h) => {
                                d.appendChild(h.commandNode);
                            }),
                            !0
                        );
                    {
                        let h = this.commands.find(
                            (f) => !f.name && (!f.when || f.when()),
                        );
                        return (
                            h
                                ? await this.execCallback(h.callback)
                                : this.showTip(this.defaultText.empty),
                            !1
                        );
                    }
                }
                initInputEvents() {
                    this.promptNode.addEventListener("keydown", (e) => {
                        if (["ArrowUp", "ArrowDown"].indexOf(e.key) != -1) {
                            e.preventDefault();
                            let t,
                                i = [
                                    ...Array.from(
                                        this.getCommandsContainer().querySelectorAll(
                                            ".command",
                                        ),
                                    ),
                                ].filter((s) => s.style.display != "none");
                            (t = i.findIndex((s) =>
                                s.classList.contains("selected"),
                            )),
                                t != -1
                                    ? (i[t].classList.remove("selected"),
                                      (t += e.key == "ArrowUp" ? -1 : 1))
                                    : e.key == "ArrowUp"
                                      ? (t = i.length - 1)
                                      : (t = 0),
                                t == -1
                                    ? (t = i.length - 1)
                                    : t == i.length && (t = 0),
                                i[t].classList.add("selected");
                            let n = this.getCommandsContainer();
                            n.scrollTo(
                                0,
                                n.querySelector(".selected").offsetTop -
                                    n.offsetHeight +
                                    7.5,
                            ),
                                i[t].classList.add("selected");
                        }
                    }),
                        this.promptNode.addEventListener("keyup", async (e) => {
                            if (e.key == "Enter") this.trigger();
                            else if (e.key == "Escape")
                                this.inputNode.value.length > 0
                                    ? (this.inputNode.value = "")
                                    : this.exit();
                            else if (
                                ["ArrowUp", "ArrowDown"].indexOf(e.key) != -1
                            )
                                return;
                            let t = this.inputNode.value;
                            t != this.lastInputText &&
                                ((this.lastInputText = t),
                                window.setTimeout(async () => {
                                    await this.showSuggestions(t);
                                }));
                        });
                }
                showTip(e) {
                    let t = this.ui.createElement(this.document, "div", {
                            classList: ["tip"],
                            properties: { innerText: e },
                        }),
                        i = this.createCommandsContainer();
                    return i.classList.add("suggestions"), i.appendChild(t), t;
                }
                selectItem(e) {
                    this.getCommandsContainer()
                        .querySelectorAll(".command")
                        .forEach((t) => t.classList.remove("selected")),
                        e.classList.add("selected");
                }
                addStyle() {
                    let e = this.ui.createElement(this.document, "style", {
                        namespace: "html",
                        id: "prompt-style",
                    });
                    (e.innerText = `
      .prompt-container * {
        box-sizing: border-box;
      }
      .prompt-container {
        ---radius---: 10px;
        position: fixed;
        left: 25%;
        top: 10%;
        width: 50%;
        border-radius: var(---radius---);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 18px;
        box-shadow: 0px 1.8px 7.3px rgba(0, 0, 0, 0.071),
                    0px 6.3px 24.7px rgba(0, 0, 0, 0.112),
                    0px 30px 90px rgba(0, 0, 0, 0.2);
        font-family: ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Microsoft YaHei Light", sans-serif;
        background-color: var(--material-background) !important;
        border: var(--material-border-quarternary) !important;
      }
      
      /* input */
      .prompt-container .input-container  {
        width: 100%;
      }

      .input-container input {
        width: -moz-available;
        height: 40px;
        padding: 24px;
        border: none;
        outline: none;
        font-size: 18px;
        margin: 0 !important;
        border-radius: var(---radius---);
        background-color: var(--material-background);
      }
      
      .input-container .cta {
        border-bottom: var(--material-border-quarternary);
        margin: 5px auto;
      }
      
      /* results */
      .commands-containers {
        width: 100%;
        height: 100%;
      }
      .commands-container {
        max-height: calc(${this.maxLineNum} * 35.5px);
        width: calc(100% - 12px);
        margin-left: 12px;
        margin-right: 0%;
        overflow-y: auto;
        overflow-x: hidden;
      }
      
      .commands-container .command {
        display: flex;
        align-content: baseline;
        justify-content: space-between;
        border-radius: 5px;
        padding: 6px 12px;
        margin-right: 12px;
        margin-top: 2px;
        margin-bottom: 2px;
      }
      .commands-container .command .content {
        display: flex;
        width: 100%;
        justify-content: space-between;
        flex-direction: row;
        overflow: hidden;
      }
      .commands-container .command .content .name {
        white-space: nowrap; 
        text-overflow: ellipsis;
        overflow: hidden;
      }
      .commands-container .command .content .aux {
        display: flex;
        align-items: center;
        align-self: center;
        flex-shrink: 0;
      }
      
      .commands-container .command .content .aux .label {
        font-size: 15px;
        color: var(--fill-primary);
        padding: 2px 6px;
        background-color: var(--color-background);
        border-radius: 5px;
      }
      
      .commands-container .selected {
          background-color: var(--material-mix-quinary);
      }

      .commands-container .highlight {
        font-weight: bold;
      }

      .tip {
        color: var(--fill-primary);
        text-align: center;
        padding: 12px 12px;
        font-size: 18px;
      }

      /* instructions */
      .instructions {
        display: flex;
        align-content: center;
        justify-content: center;
        font-size: 15px;
        height: 2.5em;
        width: 100%;
        border-top: var(--material-border-quarternary);
        color: var(--fill-secondary);
        margin-top: 5px;
      }
      
      .instructions .instruction {
        margin: auto .5em;  
      }
      
      .instructions .key {
        margin-right: .2em;
        font-weight: 600;
      }
    `),
                        this.document.documentElement.appendChild(e);
                }
                registerShortcut() {
                    this.document.addEventListener(
                        "keydown",
                        (e) => {
                            if (e.shiftKey && e.key.toLowerCase() == "p") {
                                if (
                                    e.originalTarget.isContentEditable ||
                                    "value" in e.originalTarget ||
                                    this.commands.length == 0
                                )
                                    return;
                                e.preventDefault(),
                                    e.stopPropagation(),
                                    this.promptNode.style.display == "none"
                                        ? ((this.promptNode.style.display =
                                              "flex"),
                                          this.promptNode.querySelectorAll(
                                              ".commands-container",
                                          ).length == 1 &&
                                              this.showCommands(
                                                  this.commands,
                                                  !0,
                                              ),
                                          this.promptNode.focus(),
                                          this.inputNode.focus())
                                        : (this.promptNode.style.display =
                                              "none");
                            }
                        },
                        !0,
                    );
                }
            };
        me.Prompt = Bt;
        var Xr = class extends al.ManagerTool {
            constructor(e) {
                super(e), (this.commands = []);
                let t = cl.default.getInstance().prompt;
                t._ready || ((t._ready = !0), (t.instance = new Bt())),
                    (this.prompt = t.instance);
            }
            register(e) {
                e.forEach((t) => {
                    var i;
                    return (i = t.id) !== null && i !== void 0
                        ? i
                        : (t.id = t.name);
                }),
                    (this.prompt.commands = [...this.prompt.commands, ...e]),
                    (this.commands = [...this.commands, ...e]),
                    this.prompt.showCommands(this.commands, !0);
            }
            unregister(e) {
                (this.prompt.commands = this.prompt.commands.filter(
                    (t) => t.id != e,
                )),
                    (this.commands = this.commands.filter((t) => t.id != e));
            }
            unregisterAll() {
                (this.prompt.commands = this.prompt.commands.filter((e) =>
                    this.commands.every((t) => t.id != e.id),
                )),
                    (this.commands = []);
            }
        };
        me.PromptManager = Xr;
    });
    var Vn = v((Ft) => {
        "use strict";
        Object.defineProperty(Ft, "__esModule", { value: !0 });
        Ft.LibraryTabPanelManager = void 0;
        var ul = te(),
            dl = x(),
            Yr = class extends dl.ManagerTool {
                constructor(e) {
                    super(e),
                        (this.ui = new ul.UITool(this)),
                        (this.libraryTabCache = { optionsList: [] });
                }
                register(e, t, i) {
                    i = i || {
                        tabId: void 0,
                        panelId: void 0,
                        targetIndex: -1,
                        selectPanel: !1,
                    };
                    let n = this.getGlobal("window"),
                        s = n.document.querySelector("#zotero-view-tabbox"),
                        o = `${Zotero.Utilities.randomString()}-${new Date().getTime()}`,
                        a = i.tabId || `toolkit-readertab-${o}`,
                        c = i.panelId || `toolkit-readertabpanel-${o}`,
                        l = this.ui.createElement(n.document, "tab", {
                            id: a,
                            classList: [`toolkit-ui-tabs-${a}`],
                            attributes: { label: e },
                            ignoreIfExists: !0,
                        }),
                        d = this.ui.createElement(n.document, "tabpanel", {
                            id: c,
                            classList: [`toolkit-ui-tabs-${a}`],
                            ignoreIfExists: !0,
                        }),
                        u = s.querySelector("tabs"),
                        h = s.querySelector("tabpanels"),
                        f =
                            typeof i.targetIndex == "number"
                                ? i.targetIndex
                                : -1;
                    return (
                        f >= 0
                            ? (u.querySelectorAll("tab")[f].before(l),
                              h.querySelectorAll("tabpanel")[f].before(d))
                            : (u.appendChild(l), h.appendChild(d)),
                        i.selectPanel && (s.selectedTab = l),
                        this.libraryTabCache.optionsList.push({
                            tabId: a,
                            tabLabel: e,
                            panelId: c,
                            renderPanelHook: t,
                            targetIndex: f,
                            selectPanel: i.selectPanel,
                        }),
                        t(d, n),
                        a
                    );
                }
                unregister(e) {
                    let t = this.libraryTabCache.optionsList.findIndex(
                        (i) => i.tabId === e,
                    );
                    t >= 0 && this.libraryTabCache.optionsList.splice(t, 1),
                        this.removeTabPanel(e);
                }
                unregisterAll() {
                    this.libraryTabCache.optionsList
                        .map((t) => t.tabId)
                        .forEach(this.unregister.bind(this));
                }
                removeTabPanel(e) {
                    let t = this.getGlobal("document");
                    Array.prototype.forEach.call(
                        t.querySelectorAll(`.toolkit-ui-tabs-${e}`),
                        (i) => {
                            i.remove();
                        },
                    );
                }
            };
        Ft.LibraryTabPanelManager = Yr;
    });
    var Kn = v((Dt) => {
        "use strict";
        Object.defineProperty(Dt, "__esModule", { value: !0 });
        Dt.ReaderTabPanelManager = void 0;
        var hl = te(),
            pl = Kr(),
            fl = x(),
            ei = class extends fl.ManagerTool {
                constructor(e) {
                    super(e),
                        (this.ui = new hl.UITool(this)),
                        (this.readerTool = new pl.ReaderTool(this)),
                        (this.readerTabCache = {
                            optionsList: [],
                            observer: void 0,
                            initializeLock: void 0,
                        });
                }
                async register(e, t, i) {
                    var n;
                    (i = i || {
                        tabId: void 0,
                        panelId: void 0,
                        targetIndex: -1,
                        selectPanel: !1,
                    }),
                        typeof this.readerTabCache.initializeLock > "u" &&
                            (await this.initializeReaderTabObserver()),
                        await ((n = this.readerTabCache.initializeLock) ===
                            null || n === void 0
                            ? void 0
                            : n.promise);
                    let s = `${Zotero.Utilities.randomString()}-${new Date().getTime()}`,
                        o = i.tabId || `toolkit-readertab-${s}`,
                        a = i.panelId || `toolkit-readertabpanel-${s}`,
                        c =
                            typeof i.targetIndex == "number"
                                ? i.targetIndex
                                : -1;
                    return (
                        this.readerTabCache.optionsList.push({
                            tabId: o,
                            tabLabel: e,
                            panelId: a,
                            renderPanelHook: t,
                            targetIndex: c,
                            selectPanel: i.selectPanel,
                        }),
                        await this.addReaderTabPanel(),
                        o
                    );
                }
                unregister(e) {
                    var t;
                    let i = this.readerTabCache.optionsList.findIndex(
                        (n) => n.tabId === e,
                    );
                    i >= 0 && this.readerTabCache.optionsList.splice(i, 1),
                        this.readerTabCache.optionsList.length === 0 &&
                            ((t = this.readerTabCache.observer) === null ||
                                t === void 0 ||
                                t.disconnect(),
                            (this.readerTabCache = {
                                optionsList: [],
                                observer: void 0,
                                initializeLock: void 0,
                            })),
                        this.removeTabPanel(e);
                }
                unregisterAll() {
                    this.readerTabCache.optionsList
                        .map((t) => t.tabId)
                        .forEach(this.unregister.bind(this));
                }
                changeTabPanel(e, t) {
                    let i = this.readerTabCache.optionsList.findIndex(
                        (n) => n.tabId === e,
                    );
                    i >= 0 &&
                        Object.assign(this.readerTabCache.optionsList[i], t);
                }
                removeTabPanel(e) {
                    let t = this.getGlobal("document");
                    Array.prototype.forEach.call(
                        t.querySelectorAll(`.toolkit-ui-tabs-${e}`),
                        (i) => {
                            i.remove();
                        },
                    );
                }
                async initializeReaderTabObserver() {
                    (this.readerTabCache.initializeLock =
                        this.getGlobal("Zotero").Promise.defer()),
                        await Promise.all([
                            Zotero.initializationPromise,
                            Zotero.unlockPromise,
                            Zotero.uiReadyPromise,
                        ]);
                    let e = Zotero.Promise.defer();
                    e.resolve();
                    let t = await this.readerTool.addReaderTabPanelDeckObserver(
                        async () => {
                            await e.promise, (e = Zotero.Promise.defer());
                            try {
                                this.addReaderTabPanel();
                            } catch {}
                            e.resolve();
                        },
                    );
                    (this.readerTabCache.observer = t),
                        this.readerTabCache.initializeLock.resolve();
                }
                async addReaderTabPanel() {
                    var e, t;
                    let i = this.getGlobal("window"),
                        n = this.readerTool.getReaderTabPanelDeck(),
                        s = await this.readerTool.getReader();
                    if (!s) return;
                    if (
                        ((e = n.selectedPanel) === null || e === void 0
                            ? void 0
                            : e.children[0].tagName) === "vbox"
                    ) {
                        let l = n.selectedPanel;
                        (l.innerHTML = ""),
                            this.ui.appendElement(
                                {
                                    tag: "tabbox",
                                    classList: ["zotero-view-tabbox"],
                                    attributes: { flex: "1" },
                                    enableElementRecord: !1,
                                    children: [
                                        {
                                            tag: "tabs",
                                            classList: ["zotero-editpane-tabs"],
                                            attributes: {
                                                orient: "horizontal",
                                            },
                                            enableElementRecord: !1,
                                        },
                                        {
                                            tag: "tabpanels",
                                            classList: ["zotero-view-item"],
                                            attributes: { flex: "1" },
                                            enableElementRecord: !1,
                                        },
                                    ],
                                },
                                l,
                            );
                    }
                    let o =
                        (t = n.selectedPanel) === null || t === void 0
                            ? void 0
                            : t.querySelector("tabbox");
                    if (!o) return;
                    let a = o.querySelector("tabs"),
                        c = o.querySelector("tabpanels");
                    this.readerTabCache.optionsList.forEach((l) => {
                        let d = `${l.tabId}-${s._instanceID}`,
                            u = `toolkit-ui-tabs-${l.tabId}`;
                        if (a?.querySelector(`.${u}`)) return;
                        let h = this.ui.createElement(i.document, "tab", {
                                id: d,
                                classList: [u],
                                attributes: { label: l.tabLabel },
                                ignoreIfExists: !0,
                            }),
                            f = this.ui.createElement(i.document, "tabpanel", {
                                id: `${l.panelId}-${s._instanceID}`,
                                classList: [u],
                                ignoreIfExists: !0,
                            });
                        l.targetIndex >= 0
                            ? (a
                                  ?.querySelectorAll("tab")
                                  [l.targetIndex].before(h),
                              c
                                  ?.querySelectorAll("tabpanel")
                                  [l.targetIndex].before(f),
                              o.getAttribute("toolkit-select-fixed") !==
                                  "true" &&
                                  (o.tabpanels.addEventListener(
                                      "select",
                                      () => {
                                          this.getGlobal("setTimeout")(() => {
                                              o.tabpanels.selectedPanel =
                                                  o.tabs.getRelatedElement(
                                                      o?.tabs.selectedItem,
                                                  );
                                          }, 0);
                                      },
                                  ),
                                  o.setAttribute(
                                      "toolkit-select-fixed",
                                      "true",
                                  )))
                            : (a?.appendChild(h), c?.appendChild(f)),
                            l.selectPanel && (o.selectedTab = h),
                            l.renderPanelHook(f, n, i, s);
                    });
                }
            };
        Dt.ReaderTabPanelManager = ei;
    });
    var Zn = v((Vt) => {
        "use strict";
        Object.defineProperty(Vt, "__esModule", { value: !0 });
        Vt.MenuManager = void 0;
        var ml = te(),
            gl = x(),
            ti = class extends gl.ManagerTool {
                constructor(e) {
                    super(e), (this.ui = new ml.UITool(this));
                }
                register(e, t, i = "after", n) {
                    let s;
                    if (
                        (typeof e == "string"
                            ? (s = this.getGlobal("document").querySelector(
                                  ri[e],
                              ))
                            : (s = e),
                        !s)
                    )
                        return !1;
                    let o = s.ownerDocument,
                        a = (d) => {
                            var u;
                            let h = {
                                tag: d.tag,
                                id: d.id,
                                namespace: "xul",
                                attributes: {
                                    label: d.label || "",
                                    hidden: !!d.hidden,
                                    disaled: !!d.disabled,
                                    class: d.class || "",
                                    oncommand: d.oncommand || "",
                                },
                                classList: d.classList,
                                styles: d.styles || {},
                                listeners: [],
                                children: [],
                            };
                            return (
                                d.icon &&
                                    (this.getGlobal("Zotero").isMac ||
                                        (d.tag === "menu"
                                            ? (h.attributes.class +=
                                                  " menu-iconic")
                                            : (h.attributes.class +=
                                                  " menuitem-iconic")),
                                    (h.styles["list-style-image"] =
                                        `url(${d.icon})`)),
                                d.tag === "menu" &&
                                    h.children.push({
                                        tag: "menupopup",
                                        id: d.popupId,
                                        attributes: {
                                            onpopupshowing:
                                                d.onpopupshowing || "",
                                        },
                                        children: (
                                            d.children ||
                                            d.subElementOptions ||
                                            []
                                        ).map(a),
                                    }),
                                d.commandListener &&
                                    ((u = h.listeners) === null ||
                                        u === void 0 ||
                                        u.push({
                                            type: "command",
                                            listener: d.commandListener,
                                        })),
                                h
                            );
                        },
                        c = a(t),
                        l = this.ui.createElement(o, t.tag, c);
                    n ||
                        (n =
                            i === "after"
                                ? s.lastElementChild
                                : s.firstElementChild),
                        n[i](l),
                        t.getVisibility &&
                            s.addEventListener("popupshowing", (d) => {
                                t.getVisibility(l, d)
                                    ? l.removeAttribute("hidden")
                                    : l.setAttribute("hidden", "true");
                            });
                }
                unregister(e) {
                    var t;
                    (t = this.getGlobal("document").querySelector(`#${e}`)) ===
                        null ||
                        t === void 0 ||
                        t.remove();
                }
                unregisterAll() {
                    this.ui.unregisterAll();
                }
            };
        Vt.MenuManager = ti;
        var ri;
        (function (r) {
            (r.menuFile = "#menu_FilePopup"),
                (r.menuEdit = "#menu_EditPopup"),
                (r.menuView = "#menu_viewPopup"),
                (r.menuGo = "#menu_goPopup"),
                (r.menuTools = "#menu_ToolsPopup"),
                (r.menuHelp = "#menu_HelpPopup"),
                (r.collection = "#zotero-collectionmenu"),
                (r.item = "#zotero-itemmenu");
        })(ri || (ri = {}));
    });
    var ni = v((Kt) => {
        "use strict";
        Object.defineProperty(Kt, "__esModule", { value: !0 });
        Kt.PreferencePaneManager = void 0;
        var bl = te(),
            vl = x(),
            ii = class extends vl.ManagerTool {
                constructor(e) {
                    super(e),
                        (this.alive = !0),
                        (this.ui = new bl.UITool(this)),
                        (this.prefPaneCache = { win: void 0, listeners: {} });
                }
                register(e) {
                    if (this.isZotero7()) {
                        this.getGlobal("Zotero").PreferencePanes.register(e);
                        return;
                    }
                    let t = (n) => {
                            var s;
                            let o = new Map(),
                                a = this.getGlobal("Zotero"),
                                c = n.ownerGlobal,
                                l = (p) =>
                                    (p instanceof c.HTMLInputElement &&
                                        p.type == "checkbox") ||
                                    p.tagName == "checkbox",
                                d = (p, g) => {
                                    let b = a.Prefs.get(g, !0);
                                    l(p) ? (p.checked = b) : (p.value = b),
                                        p.dispatchEvent(
                                            new c.Event("syncfrompreference"),
                                        );
                                },
                                u = (p) => {
                                    let g = p.currentTarget;
                                    if (g?.getAttribute("preference")) {
                                        let b = l(g) ? g.checked : g.value;
                                        a.Prefs.set(
                                            g.getAttribute("preference") || "",
                                            b,
                                            !0,
                                        ),
                                            g.dispatchEvent(
                                                new c.Event("synctopreference"),
                                            );
                                    }
                                },
                                h = (p, g) => {
                                    a.debug(
                                        `Attaching <${p.tagName}> element to ${g}`,
                                    );
                                    let b = a.Prefs.registerObserver(
                                        g,
                                        () => d(p, g),
                                        !0,
                                    );
                                    o.set(p, b);
                                },
                                f = (p) => {
                                    o.has(p) &&
                                        (a.debug(
                                            `Detaching <${p.tagName}> element from preference`,
                                        ),
                                        a.Prefs.unregisterObserver(
                                            this._observerSymbols.get(p),
                                        ),
                                        o.delete(p));
                                };
                            for (let p of Array.from(
                                n.querySelectorAll("[preference]"),
                            )) {
                                let g = p.getAttribute("preference");
                                n.querySelector(
                                    "preferences > preference#" + g,
                                ) &&
                                    (this.log(
                                        "<preference> is deprecated -- `preference` attribute values should be full preference keys, not <preference> IDs",
                                    ),
                                    (g =
                                        (s = n.querySelector(
                                            "preferences > preference#" + g,
                                        )) === null || s === void 0
                                            ? void 0
                                            : s.getAttribute("name"))),
                                    h(p, g),
                                    p.addEventListener(
                                        this.isXULElement(p)
                                            ? "command"
                                            : "input",
                                        u,
                                    ),
                                    c.setTimeout(() => {
                                        d(p, g);
                                    });
                            }
                            new c.MutationObserver((p) => {
                                for (let g of p)
                                    if (g.type == "attributes") {
                                        let b = g.target;
                                        f(b),
                                            b.hasAttribute("preference") &&
                                                (h(
                                                    b,
                                                    b.getAttribute(
                                                        "preference",
                                                    ) || "",
                                                ),
                                                b.addEventListener(
                                                    this.isXULElement(b)
                                                        ? "command"
                                                        : "input",
                                                    u,
                                                ));
                                    } else if (g.type == "childList") {
                                        for (let b of Array.from(
                                            g.removedNodes,
                                        ))
                                            f(b);
                                        for (let b of Array.from(g.addedNodes))
                                            b.nodeType == c.Node.ELEMENT_NODE &&
                                                b.hasAttribute("preference") &&
                                                (h(
                                                    b,
                                                    b.getAttribute(
                                                        "preference",
                                                    ) || "",
                                                ),
                                                b.addEventListener(
                                                    this.isXULElement(b)
                                                        ? "command"
                                                        : "input",
                                                    u,
                                                ));
                                    }
                            }).observe(n, {
                                childList: !0,
                                subtree: !0,
                                attributeFilter: ["preference"],
                            });
                            for (let p of Array.from(
                                n.querySelectorAll("[oncommand]"),
                            ))
                                p.oncommand = p.getAttribute("oncommand");
                            for (let p of Array.from(n.children))
                                p.dispatchEvent(new c.Event("load"));
                        },
                        i = {
                            onOpenWindow: (n) => {
                                if (!this.alive) return;
                                let s = n
                                    .QueryInterface(
                                        Components.interfaces
                                            .nsIInterfaceRequestor,
                                    )
                                    .getInterface(
                                        Components.interfaces.nsIDOMWindow,
                                    );
                                s.addEventListener(
                                    "load",
                                    async () => {
                                        var o;
                                        if (
                                            s.location.href ===
                                            "chrome://zotero/content/preferences/preferences.xul"
                                        ) {
                                            this.log(
                                                "registerPrefPane:detected",
                                                e,
                                            );
                                            let a = this.getGlobal("Zotero");
                                            e.id ||
                                                (e.id = `plugin-${a.Utilities.randomString()}-${new Date().getTime()}`);
                                            let c =
                                                    await a.File.getContentsAsync(
                                                        e.src,
                                                    ),
                                                l =
                                                    typeof c == "string"
                                                        ? c
                                                        : c.response,
                                                d = `<prefpane xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul" id="${e.id}" insertafter="zotero-prefpane-advanced" label="${e.label || e.pluginID}" image="${e.image || ""}">
                ${l}
                </prefpane>`,
                                                u =
                                                    this.ui.parseXHTMLToFragment(
                                                        d,
                                                        e.extraDTD,
                                                        e.defaultXUL,
                                                    );
                                            this.log(u);
                                            let h =
                                                s.document.querySelector(
                                                    "prefwindow",
                                                );
                                            h.appendChild(u);
                                            let f = s.document.querySelector(
                                                `#${e.id}`,
                                            );
                                            h.addPane(f);
                                            let p =
                                                s.document.getAnonymousNodes(
                                                    s.document.querySelector(
                                                        `#${e.id}`,
                                                    ),
                                                )[0];
                                            (p.style.overflowY = "scroll"),
                                                (p.style.height = "440px"),
                                                s.sizeToContent(),
                                                p.scrollHeight ===
                                                    p.clientHeight &&
                                                    (p.style.overflowY =
                                                        "hidden"),
                                                (this.prefPaneCache.win = s),
                                                (this.prefPaneCache.listeners[
                                                    e.id
                                                ] = i),
                                                t(f),
                                                !(
                                                    (o = e.scripts) === null ||
                                                    o === void 0
                                                ) &&
                                                    o.length &&
                                                    e.scripts.forEach((g) =>
                                                        Services.scriptloader.loadSubScript(
                                                            g,
                                                            s,
                                                        ),
                                                    ),
                                                e.onload && e.onload(s);
                                        }
                                    },
                                    !1,
                                );
                            },
                        };
                    Services.wm.addListener(i);
                }
                unregister(e) {
                    var t;
                    if (
                        Object.keys(this.prefPaneCache.listeners).indexOf(e) < 0
                    )
                        return !1;
                    let n = this.prefPaneCache.listeners[e];
                    Services.wm.removeListener(n), (n.onOpenWindow = void 0);
                    let s = this.prefPaneCache.win;
                    return (
                        s &&
                            !s.closed &&
                            ((t = s.document.querySelector(`#${e}`)) === null ||
                                t === void 0 ||
                                t.remove()),
                        delete this.prefPaneCache.listeners[e],
                        !0
                    );
                }
                unregisterAll() {
                    this.alive = !1;
                    for (let e in this.prefPaneCache.listeners)
                        this.unregister(e);
                }
            };
        Kt.PreferencePaneManager = ii;
    });
    var Wn = v((Be) => {
        "use strict";
        var yl =
            (Be && Be.__importDefault) ||
            function (r) {
                return r && r.__esModule ? r : { default: r };
            };
        Object.defineProperty(Be, "__esModule", { value: !0 });
        Be.ShortcutManager = void 0;
        var z = x(),
            _l = te(),
            kl = x(),
            wl = yl(pe()),
            si = class extends kl.ManagerTool {
                constructor(e) {
                    super(e),
                        (this.ui = new _l.UITool(this)),
                        (this.creatorId = `${Zotero.Utilities.randomString()}-${new Date().getTime()}`),
                        this.initializeGlobal();
                }
                register(e, t) {
                    let i = t;
                    switch (((i.type = e), i.type)) {
                        case "event":
                            return this.registerEventKey(i), !0;
                        case "element":
                            return this.registerElementKey(i), !0;
                        case "prefs":
                            return (
                                this.getGlobal("Zotero").Prefs.set(
                                    i.id,
                                    i.key || "",
                                ),
                                !0
                            );
                        default:
                            try {
                                return i.register ? i.register(i) : !1;
                            } catch (n) {
                                return this.log(n), !1;
                            }
                    }
                }
                getAll() {
                    return Array.prototype.concat(
                        this.getMainWindowElementKeys(),
                        this.getEventKeys(),
                        this.getPrefsKeys(),
                        this.getBuiltinKeys(),
                    );
                }
                checkKeyConflicting(
                    e,
                    t = { includeEmpty: !1, customKeys: [] },
                ) {
                    var i;
                    e.modifiers = new we(e.modifiers || "").getRaw();
                    let n = this.getAll();
                    return (
                        !((i = t.customKeys) === null || i === void 0) &&
                            i.length &&
                            (n = n.concat(t.customKeys)),
                        t.includeEmpty || (n = n.filter((s) => s.key)),
                        n.filter((s) => {
                            var o, a;
                            return (
                                s.id !== e.id &&
                                ((o = s.key) === null || o === void 0
                                    ? void 0
                                    : o.toLowerCase()) ===
                                    ((a = e.key) === null || a === void 0
                                        ? void 0
                                        : a.toLowerCase()) &&
                                s.modifiers === e.modifiers
                            );
                        })
                    );
                }
                checkAllKeyConflicting(
                    e = { includeEmpty: !1, customKeys: [] },
                ) {
                    var t;
                    let i = this.getAll();
                    !((t = e.customKeys) === null || t === void 0) &&
                        t.length &&
                        (i = i.concat(e.customKeys)),
                        e.includeEmpty || (i = i.filter((s) => s.key));
                    let n = [];
                    for (; i.length > 0; ) {
                        let s = i.pop(),
                            o = i.filter((a) => {
                                var c, l;
                                return (
                                    ((c = a.key) === null || c === void 0
                                        ? void 0
                                        : c.toLowerCase()) ===
                                        ((l = s.key) === null || l === void 0
                                            ? void 0
                                            : l.toLowerCase()) &&
                                    a.modifiers === s.modifiers
                                );
                            });
                        if (o.length) {
                            o.push(s), n.push(o);
                            let a = o.map((l) => l.id),
                                c = [];
                            i.forEach((l, d) => a.includes(l.id) && c.push(d)),
                                c
                                    .sort((l, d) => d - l)
                                    .forEach((l) => i.splice(l, 1));
                        }
                    }
                    return n;
                }
                async unregister(e) {
                    var t;
                    switch (e.type) {
                        case "element":
                            return (
                                (t = (
                                    e.xulData.document ||
                                    this.getGlobal("document")
                                ).querySelector(`#${e.id}`)) === null ||
                                    t === void 0 ||
                                    t.remove(),
                                !0
                            );
                        case "prefs":
                            return (
                                this.getGlobal("Zotero").Prefs.set(e.id, ""), !0
                            );
                        case "builtin":
                            return !1;
                        case "event":
                            let i = this.globalCache.eventKeys.findIndex(
                                (n) => n.id === e.id,
                            );
                            for (; i >= 0; )
                                this.globalCache.eventKeys.splice(i, 1),
                                    (i = this.globalCache.eventKeys.findIndex(
                                        (n) => n.id === e.id,
                                    ));
                            return !0;
                        default:
                            try {
                                return e.unregister
                                    ? await e.unregister(e)
                                    : !1;
                            } catch (n) {
                                return this.log(n), !1;
                            }
                    }
                }
                unregisterAll() {
                    this.ui.unregisterAll(),
                        this.globalCache.eventKeys
                            .filter((e) => e.creatorId === this.creatorId)
                            .forEach((e) => this.unregister(e));
                }
                initializeGlobal() {
                    let e = this.getGlobal("Zotero"),
                        t = this.getGlobal("window");
                    (this.globalCache = wl.default.getInstance().shortcut),
                        this.globalCache._ready ||
                            ((this.globalCache._ready = !0),
                            t.addEventListener("keypress", (i) => {
                                let n = [],
                                    s = [];
                                i.altKey && (n.push("alt"), s.push("alt")),
                                    i.shiftKey &&
                                        (n.push("shift"), s.push("shift")),
                                    i.metaKey &&
                                        (n.push("meta"),
                                        e.isMac && s.push("accel")),
                                    i.ctrlKey &&
                                        (n.push("control"),
                                        !e.isMac && s.push("accel"));
                                let o = new we(n.join(",")).getRaw(),
                                    a = new we(n.join(",")).getRaw();
                                this.globalCache.eventKeys.forEach((c) => {
                                    var l;
                                    if (c.disabled) return;
                                    let d = new we(c.modifiers || "").getRaw();
                                    (d === o || d === a) &&
                                        ((l = c.key) === null || l === void 0
                                            ? void 0
                                            : l.toLowerCase()) ===
                                            i.key.toLowerCase() &&
                                        c.callback();
                                });
                            }));
                }
                registerEventKey(e) {
                    (e.creatorId = this.creatorId),
                        this.globalCache.eventKeys.push(e);
                }
                registerElementCommandset(e) {
                    var t;
                    (t = e.document.querySelector("window")) === null ||
                        t === void 0 ||
                        t.appendChild(
                            this.ui.createElement(e.document, "commandset", {
                                id: e.id,
                                skipIfExists: !0,
                                children: e.commands.map((i) => ({
                                    tag: "command",
                                    id: i.id,
                                    attributes: {
                                        oncommand: i.oncommand,
                                        disabled: i.disabled,
                                        label: i.label,
                                    },
                                })),
                            }),
                        );
                }
                registerElementCommand(e) {
                    var t;
                    e._parentId &&
                        this.registerElementCommandset({
                            id: e._parentId,
                            document: e.document,
                            commands: [],
                        }),
                        (t = e.document.querySelector(
                            `commandset#${e._parentId}`,
                        )) === null ||
                            t === void 0 ||
                            t.appendChild(
                                this.ui.createElement(e.document, "command", {
                                    id: e.id,
                                    skipIfExists: !0,
                                    attributes: {
                                        oncommand: e.oncommand,
                                        disabled: e.disabled,
                                        label: e.label,
                                    },
                                }),
                            );
                }
                registerElementKeyset(e) {
                    var t;
                    (t = e.document.querySelector("window")) === null ||
                        t === void 0 ||
                        t.appendChild(
                            this.ui.createElement(e.document, "keyset", {
                                id: e.id,
                                skipIfExists: !0,
                                children: e.keys.map((i) => ({
                                    tag: "key",
                                    id: i.id,
                                    attributes: {
                                        oncommand: i.xulData.oncommand || "//",
                                        command: i.xulData.command,
                                        modifiers: i.modifiers,
                                        key: this.getXULKey(i.key),
                                        keycode: this.getXULKeyCode(i.key),
                                        disabled: i.disabled,
                                    },
                                })),
                            }),
                        );
                }
                registerElementKey(e) {
                    var t;
                    let i = e.xulData.document || this.getGlobal("document");
                    e.xulData._parentId &&
                        this.registerElementKeyset({
                            id: e.xulData._parentId,
                            document: i,
                            keys: [],
                        }),
                        (t = i.querySelector(
                            `keyset#${e.xulData._parentId}`,
                        )) === null ||
                            t === void 0 ||
                            t.appendChild(
                                this.ui.createElement(i, "key", {
                                    id: e.id,
                                    skipIfExists: !0,
                                    attributes: {
                                        oncommand: e.xulData.oncommand || "//",
                                        command: e.xulData.command,
                                        modifiers: e.modifiers,
                                        key: this.getXULKey(e.key),
                                        keycode: this.getXULKeyCode(e.key),
                                        disabled: e.disabled,
                                    },
                                }),
                            ),
                        e.xulData._commandOptions &&
                            this.registerElementCommand(
                                e.xulData._commandOptions,
                            );
                }
                getXULKey(e) {
                    if (e.length === 1) return e;
                }
                getXULKeyCode(e) {
                    let t = Object.values(ze).findIndex((i) => i === e);
                    if (t >= 0) return Object.values(ze)[t];
                }
                getStandardKey(e, t) {
                    return t && Object.keys(ze).includes(t) ? ze[t] : e;
                }
                getElementCommandSets(e) {
                    return Array.from(
                        (e || this.getGlobal("document")).querySelectorAll(
                            "commandset",
                        ),
                    ).map((t) => ({
                        id: t.id,
                        commands: Array.from(t.querySelectorAll("command")).map(
                            (i) => ({
                                id: i.id,
                                oncommand: i.getAttribute("oncommand"),
                                disabled: i.getAttribute("disabled") === "true",
                                label: i.getAttribute("label"),
                                _parentId: t.id,
                            }),
                        ),
                    }));
                }
                getElementCommands(e) {
                    return Array.prototype.concat(
                        ...this.getElementCommandSets(e).map((t) => t.commands),
                    );
                }
                getElementKeySets(e) {
                    let t = this.getElementCommands(e);
                    return Array.from(
                        (e || this.getGlobal("document")).querySelectorAll(
                            "keyset",
                        ),
                    ).map((i) => ({
                        id: i.id,
                        document: e,
                        keys: Array.from(i.querySelectorAll("key")).map((n) => {
                            let s = n.getAttribute("oncommand") || "",
                                o = n.getAttribute("command") || "",
                                a = t.find((l) => l.id === o);
                            return {
                                type: "element",
                                id: n.id,
                                key: this.getStandardKey(
                                    n.getAttribute("key") || "",
                                    n.getAttribute("keycode") || "",
                                ),
                                modifiers: new we(
                                    n.getAttribute("modifiers") || "",
                                ).getRaw(),
                                disabled: n.getAttribute("disabled") === "true",
                                xulData: {
                                    document: e,
                                    oncommand: s,
                                    command: o,
                                    _parentId: i.id,
                                    _commandOptions: a,
                                },
                                callback: () => {
                                    let d = e.ownerGlobal.eval;
                                    d(s), d(a?.oncommand || "");
                                },
                            };
                        }),
                    }));
                }
                getElementKeys(e) {
                    return Array.prototype
                        .concat(...this.getElementKeySets(e).map((t) => t.keys))
                        .filter((t) => !Sl.includes(t.id));
                }
                getMainWindowElementKeys() {
                    return this.getElementKeys(this.getGlobal("document"));
                }
                getEventKeys() {
                    return this.globalCache.eventKeys;
                }
                getPrefsKeys() {
                    let e = this.getGlobal("Zotero");
                    return xl.map((t) => ({
                        id: t.id,
                        modifiers: t.modifiers,
                        key: e.Prefs.get(t.id),
                        callback: t.callback,
                        type: "prefs",
                    }));
                }
                getBuiltinKeys() {
                    return Cl.map((e) => ({
                        id: e.id,
                        modifiers: e.modifiers,
                        key: e.key,
                        callback: e.callback,
                        type: "builtin",
                    }));
                }
            };
        Be.ShortcutManager = si;
        var we = class {
                constructor(e) {
                    (e = e || ""),
                        (this.accel = e.includes("accel")),
                        (this.shift = e.includes("shift")),
                        (this.control = e.includes("control")),
                        (this.meta = e.includes("meta")),
                        (this.alt = e.includes("alt"));
                }
                equals(e) {
                    this.accel,
                        e.accel,
                        this.shift,
                        e.shift,
                        this.control,
                        e.control,
                        this.meta,
                        e.meta,
                        this.alt,
                        e.alt;
                }
                getRaw() {
                    let e = [];
                    return (
                        this.accel && e.push("accel"),
                        this.shift && e.push("shift"),
                        this.control && e.push("control"),
                        this.meta && e.push("meta"),
                        this.alt && e.push("alt"),
                        e.join(",")
                    );
                }
            },
            ze;
        (function (r) {
            (r.VK_CANCEL = "Unidentified"),
                (r.VK_BACK = "Backspace"),
                (r.VK_TAB = "Tab"),
                (r.VK_CLEAR = "Clear"),
                (r.VK_RETURN = "Enter"),
                (r.VK_ENTER = "Enter"),
                (r.VK_SHIFT = "Shift"),
                (r.VK_CONTROL = "Control"),
                (r.VK_ALT = "Alt"),
                (r.VK_PAUSE = "Pause"),
                (r.VK_CAPS_LOCK = "CapsLock"),
                (r.VK_ESCAPE = "Escape"),
                (r.VK_SPACE = " "),
                (r.VK_PAGE_UP = "PageUp"),
                (r.VK_PAGE_DOWN = "PageDown"),
                (r.VK_END = "End"),
                (r.VK_HOME = "Home"),
                (r.VK_LEFT = "ArrowLeft"),
                (r.VK_UP = "ArrowUp"),
                (r.VK_RIGHT = "ArrowRight"),
                (r.VK_DOWN = "ArrowDown"),
                (r.VK_PRINTSCREEN = "PrintScreen"),
                (r.VK_INSERT = "Insert"),
                (r.VK_DELETE = "Backspace"),
                (r.VK_0 = "0"),
                (r.VK_1 = "1"),
                (r.VK_2 = "2"),
                (r.VK_3 = "3"),
                (r.VK_4 = "4"),
                (r.VK_5 = "5"),
                (r.VK_6 = "6"),
                (r.VK_7 = "7"),
                (r.VK_8 = "8"),
                (r.VK_9 = "9"),
                (r.VK_A = "A"),
                (r.VK_B = "B"),
                (r.VK_C = "C"),
                (r.VK_D = "D"),
                (r.VK_E = "E"),
                (r.VK_F = "F"),
                (r.VK_G = "G"),
                (r.VK_H = "H"),
                (r.VK_I = "I"),
                (r.VK_J = "J"),
                (r.VK_K = "K"),
                (r.VK_L = "L"),
                (r.VK_M = "M"),
                (r.VK_N = "N"),
                (r.VK_O = "O"),
                (r.VK_P = "P"),
                (r.VK_Q = "Q"),
                (r.VK_R = "R"),
                (r.VK_S = "S"),
                (r.VK_T = "T"),
                (r.VK_U = "U"),
                (r.VK_V = "V"),
                (r.VK_W = "W"),
                (r.VK_X = "X"),
                (r.VK_Y = "Y"),
                (r.VK_Z = "Z"),
                (r.VK_SEMICOLON = "Unidentified"),
                (r.VK_EQUALS = "Unidentified"),
                (r.VK_NUMPAD0 = "0"),
                (r.VK_NUMPAD1 = "1"),
                (r.VK_NUMPAD2 = "2"),
                (r.VK_NUMPAD3 = "3"),
                (r.VK_NUMPAD4 = "4"),
                (r.VK_NUMPAD5 = "5"),
                (r.VK_NUMPAD6 = "6"),
                (r.VK_NUMPAD7 = "7"),
                (r.VK_NUMPAD8 = "8"),
                (r.VK_NUMPAD9 = "9"),
                (r.VK_MULTIPLY = "Multiply"),
                (r.VK_ADD = "Add"),
                (r.VK_SEPARATOR = "Separator"),
                (r.VK_SUBTRACT = "Subtract"),
                (r.VK_DECIMAL = "Decimal"),
                (r.VK_DIVIDE = "Divide"),
                (r.VK_F1 = "F1"),
                (r.VK_F2 = "F2"),
                (r.VK_F3 = "F3"),
                (r.VK_F4 = "F4"),
                (r.VK_F5 = "F5"),
                (r.VK_F6 = "F6"),
                (r.VK_F7 = "F7"),
                (r.VK_F8 = "F8"),
                (r.VK_F9 = "F9"),
                (r.VK_F10 = "F10"),
                (r.VK_F11 = "F11"),
                (r.VK_F12 = "F12"),
                (r.VK_F13 = "F13"),
                (r.VK_F14 = "F14"),
                (r.VK_F15 = "F15"),
                (r.VK_F16 = "F16"),
                (r.VK_F17 = "F17"),
                (r.VK_F18 = "F18"),
                (r.VK_F19 = "F19"),
                (r.VK_F20 = "F20"),
                (r.VK_F21 = "Soft1"),
                (r.VK_F22 = "Soft2"),
                (r.VK_F23 = "Soft3"),
                (r.VK_F24 = "Soft4"),
                (r.VK_NUM_LOCK = "NumLock"),
                (r.VK_SCROLL_LOCK = "ScrollLock"),
                (r.VK_COMMA = ","),
                (r.VK_PERIOD = "."),
                (r.VK_SLASH = "Divide"),
                (r.VK_BACK_QUOTE = "`"),
                (r.VK_OPEN_BRACKET = "["),
                (r.VK_CLOSE_BRACKET = "]"),
                (r.VK_QUOTE = "\\"),
                (r.VK_HELP = "Help");
        })(ze || (ze = {}));
        function Gn(r) {
            return function () {
                var e;
                let t = z.BasicTool.getZotero().getMainWindow(),
                    i = t.document.querySelector(`#${r}`);
                if (!i) return function () {};
                let n = t.eval;
                n(i.getAttribute("oncommand") || "//");
                let s = i.getAttribute("command");
                s &&
                    n(
                        ((e = t.document.querySelector(`#${s}`)) === null ||
                        e === void 0
                            ? void 0
                            : e.getAttribute("oncommand")) || "//",
                    );
            };
        }
        function ge(r) {
            return function () {
                let e = z.BasicTool.getZotero();
                e.getActiveZoteroPane().handleKeyPress({
                    metaKey: !0,
                    ctrlKey: !0,
                    shiftKey: !0,
                    originalTarget: { id: "" },
                    preventDefault: () => {},
                    key: e.Prefs.get(`extensions.zotero.keys.${r}`, !0),
                });
            };
        }
        var Sl = ["key_copyCitation", "key_copyBibliography"],
            xl = [
                {
                    id: "extensions.zotero.keys.copySelectedItemCitationsToClipboard",
                    modifiers: "accel,shift",
                    elemId: "key_copyCitation",
                    callback: Gn("key_copyCitation"),
                },
                {
                    id: "extensions.zotero.keys.copySelectedItemsToClipboard",
                    modifiers: "accel,shift",
                    elemId: "key_copyBibliography",
                    callback: Gn("key_copyBibliography"),
                },
                {
                    id: "extensions.zotero.keys.library",
                    modifiers: "accel,shift",
                    callback: ge("library"),
                },
                {
                    id: "extensions.zotero.keys.newItem",
                    modifiers: "accel,shift",
                    callback: ge("newItem"),
                },
                {
                    id: "extensions.zotero.keys.newNote",
                    modifiers: "accel,shift",
                    callback: ge("newNote"),
                },
                {
                    id: "extensions.zotero.keys.quicksearch",
                    modifiers: "accel,shift",
                    callback: ge("quicksearch"),
                },
                {
                    id: "extensions.zotero.keys.saveToZotero",
                    modifiers: "accel,shift",
                    callback: ge("saveToZotero"),
                },
                {
                    id: "extensions.zotero.keys.sync",
                    modifiers: "accel,shift",
                    callback: ge("sync"),
                },
                {
                    id: "extensions.zotero.keys.toggleAllRead",
                    modifiers: "accel,shift",
                    callback: ge("toggleAllRead"),
                },
                {
                    id: "extensions.zotero.keys.toggleRead",
                    modifiers: "accel,shift",
                    callback: ge("toggleRead"),
                },
            ],
            Cl = [
                {
                    id: "showItemCollection",
                    modifiers: "",
                    key: "Ctrl",
                    callback: () => {
                        let r = z.BasicTool.getZotero(),
                            e = r.getActiveZoteroPane();
                        e.handleKeyUp({
                            originalTarget: {
                                id: e.itemsView ? e.itemsView.id : "",
                            },
                            keyCode: r.isWin ? 17 : 18,
                        });
                    },
                },
                {
                    id: "closeSelectedTab",
                    modifiers: "accel",
                    key: "W",
                    callback: () => {
                        let r =
                            z.BasicTool.getZotero().getMainWindow().Zotero_Tabs;
                        r.selectedIndex > 0 && r.close("");
                    },
                },
                {
                    id: "undoCloseTab",
                    modifiers: "accel,shift",
                    key: "T",
                    callback: () => {
                        z.BasicTool.getZotero()
                            .getMainWindow()
                            .Zotero_Tabs.undoClose();
                    },
                },
                {
                    id: "selectNextTab",
                    modifiers: "control",
                    key: "Tab",
                    callback: () => {
                        z.BasicTool.getZotero()
                            .getMainWindow()
                            .Zotero_Tabs.selectPrev();
                    },
                },
                {
                    id: "selectPreviousTab",
                    modifiers: "control,shift",
                    key: "Tab",
                    callback: () => {
                        z.BasicTool.getZotero()
                            .getMainWindow()
                            .Zotero_Tabs.selectNext();
                    },
                },
                {
                    id: "selectTab1",
                    modifiers: "accel",
                    key: "1",
                    callback: () => {
                        z.BasicTool.getZotero()
                            .getMainWindow()
                            .Zotero_Tabs.jump(0);
                    },
                },
                {
                    id: "selectTab2",
                    modifiers: "accel",
                    key: "2",
                    callback: () => {
                        z.BasicTool.getZotero()
                            .getMainWindow()
                            .Zotero_Tabs.jump(1);
                    },
                },
                {
                    id: "selectTab3",
                    modifiers: "accel",
                    key: "3",
                    callback: () => {
                        z.BasicTool.getZotero()
                            .getMainWindow()
                            .Zotero_Tabs.jump(2);
                    },
                },
                {
                    id: "selectTab4",
                    modifiers: "accel",
                    key: "4",
                    callback: () => {
                        z.BasicTool.getZotero()
                            .getMainWindow()
                            .Zotero_Tabs.jump(3);
                    },
                },
                {
                    id: "selectTab5",
                    modifiers: "accel",
                    key: "5",
                    callback: () => {
                        z.BasicTool.getZotero()
                            .getMainWindow()
                            .Zotero_Tabs.jump(4);
                    },
                },
                {
                    id: "selectTab6",
                    modifiers: "accel",
                    key: "6",
                    callback: () => {
                        z.BasicTool.getZotero()
                            .getMainWindow()
                            .Zotero_Tabs.jump(5);
                    },
                },
                {
                    id: "selectTab7",
                    modifiers: "accel",
                    key: "7",
                    callback: () => {
                        z.BasicTool.getZotero()
                            .getMainWindow()
                            .Zotero_Tabs.jump(6);
                    },
                },
                {
                    id: "selectTab8",
                    modifiers: "accel",
                    key: "8",
                    callback: () => {
                        z.BasicTool.getZotero()
                            .getMainWindow()
                            .Zotero_Tabs.jump(7);
                    },
                },
                {
                    id: "selectTabLast",
                    modifiers: "accel",
                    key: "9",
                    callback: () => {
                        z.BasicTool.getZotero()
                            .getMainWindow()
                            .Zotero_Tabs.selectLast();
                    },
                },
            ];
    });
    var jn = v((Zt) => {
        "use strict";
        Object.defineProperty(Zt, "__esModule", { value: !0 });
        Zt.ClipboardHelper = void 0;
        var Ll = x(),
            oi = class extends Ll.BasicTool {
                constructor() {
                    super(),
                        (this.filePath = ""),
                        (this.transferable = Components.classes[
                            "@mozilla.org/widget/transferable;1"
                        ].createInstance(
                            Components.interfaces.nsITransferable,
                        )),
                        (this.clipboardService = Components.classes[
                            "@mozilla.org/widget/clipboard;1"
                        ].getService(Components.interfaces.nsIClipboard)),
                        this.transferable.init(null);
                }
                addText(e, t = "text/plain") {
                    let i = Components.classes[
                        "@mozilla.org/supports-string;1"
                    ].createInstance(Components.interfaces.nsISupportsString);
                    return (
                        (i.data = e),
                        this.isFX115() &&
                            t === "text/unicode" &&
                            (t = "text/plain"),
                        this.transferable.addDataFlavor(t),
                        this.transferable.setTransferData(t, i, e.length * 2),
                        this
                    );
                }
                addImage(e) {
                    let t = e.split(",");
                    if (!t[0].includes("base64")) return this;
                    let i = t[0].match(/:(.*?);/)[1],
                        n = this.getGlobal("window").atob(t[1]),
                        s = n.length,
                        o = new Uint8Array(s);
                    for (; s--; ) o[s] = n.charCodeAt(s);
                    let a = Components.classes[
                            "@mozilla.org/image/tools;1"
                        ].getService(Components.interfaces.imgITools),
                        c,
                        l;
                    return (
                        this.getGlobal("Zotero").platformMajorVersion >= 102
                            ? ((l = a.decodeImageFromArrayBuffer(o.buffer, i)),
                              (c = "application/x-moz-nativeimage"))
                            : ((c = "image/png"),
                              (l = Components.classes[
                                  "@mozilla.org/supports-interface-pointer;1"
                              ].createInstance(
                                  Components.interfaces
                                      .nsISupportsInterfacePointer,
                              )),
                              (l.data = a.decodeImageFromArrayBuffer(
                                  o.buffer,
                                  c,
                              ))),
                        this.transferable.addDataFlavor(c),
                        this.transferable.setTransferData(c, l, 0),
                        this
                    );
                }
                addFile(e) {
                    let t = Components.classes[
                        "@mozilla.org/file/local;1"
                    ].createInstance(Components.interfaces.nsIFile);
                    return (
                        t.initWithPath(e),
                        this.transferable.addDataFlavor(
                            "application/x-moz-file",
                        ),
                        this.transferable.setTransferData(
                            "application/x-moz-file",
                            t,
                        ),
                        (this.filePath = e),
                        this
                    );
                }
                copy() {
                    try {
                        this.clipboardService.setData(
                            this.transferable,
                            null,
                            Components.interfaces.nsIClipboard.kGlobalClipboard,
                        );
                    } catch (e) {
                        if (this.filePath && Zotero.isMac)
                            Zotero.Utilities.Internal.exec(
                                "/usr/bin/osascript",
                                [
                                    "-e",
                                    `set the clipboard to POSIX file "${this.filePath}"`,
                                ],
                            );
                        else throw e;
                    }
                    return this;
                }
            };
        Zt.ClipboardHelper = oi;
    });
    var Un = v((Gt) => {
        "use strict";
        Object.defineProperty(Gt, "__esModule", { value: !0 });
        Gt.FilePickerHelper = void 0;
        var Pl = x(),
            ai = class extends Pl.BasicTool {
                constructor(e, t, i, n, s, o) {
                    super(),
                        (this.title = e),
                        (this.mode = t),
                        (this.filters = i),
                        (this.suggestion = n),
                        (this.window = s),
                        (this.filterMask = o);
                }
                async open() {
                    let e;
                    Zotero.platformMajorVersion >= 115
                        ? (e = ChromeUtils.importESModule(
                              "chrome://zotero/content/modules/filePicker.mjs",
                          ).FilePicker)
                        : (e = this.getGlobal("require")(
                              "zotero/modules/filePicker",
                          ).default);
                    let t = new e();
                    t.init(
                        this.window || this.getGlobal("window"),
                        this.title,
                        this.getMode(t),
                    );
                    for (let [n, s] of this.filters || []) t.appendFilter(n, s);
                    switch (
                        (this.filterMask &&
                            t.appendFilters(this.getFilterMask(t)),
                        this.suggestion && (t.defaultString = this.suggestion),
                        await t.show())
                    ) {
                        case t.returnOK:
                        case t.returnReplace:
                            return this.mode === "multiple" ? t.files : t.file;
                        default:
                            return !1;
                    }
                }
                getMode(e) {
                    switch (this.mode) {
                        case "open":
                            return e.modeOpen;
                        case "save":
                            return e.modeSave;
                        case "folder":
                            return e.modeGetFolder;
                        case "multiple":
                            return e.modeOpenMultiple;
                        default:
                            return 0;
                    }
                }
                getFilterMask(e) {
                    switch (this.filterMask) {
                        case "all":
                            return e.filterAll;
                        case "html":
                            return e.filterHTML;
                        case "text":
                            return e.filterText;
                        case "images":
                            return e.filterImages;
                        case "xml":
                            return e.filterXML;
                        case "apps":
                            return e.filterApps;
                        case "urls":
                            return e.filterAllowURLs;
                        case "audio":
                            return e.filterAudio;
                        case "video":
                            return e.filterVideo;
                        default:
                            return 1;
                    }
                }
            };
        Gt.FilePickerHelper = ai;
    });
    var Jn = v((Wt) => {
        "use strict";
        Object.defineProperty(Wt, "__esModule", { value: !0 });
        Wt.ProgressWindowHelper = void 0;
        var Tl = x(),
            ci = class extends Zotero.ProgressWindow {
                constructor(e, t = { closeOnClick: !0, closeTime: 5e3 }) {
                    super(t),
                        (this.lines = []),
                        (this.closeTime = t.closeTime || 5e3),
                        this.changeHeadline(e),
                        (this.originalShow = this.show),
                        (this.show = this.showWithTimer),
                        t.closeOtherProgressWindows &&
                            Tl.BasicTool.getZotero().ProgressWindowSet.closeAll();
                }
                createLine(e) {
                    let t = this.getIcon(e.type, e.icon),
                        i = new this.ItemProgress(t || "", e.text || "");
                    return (
                        typeof e.progress == "number" &&
                            i.setProgress(e.progress),
                        this.lines.push(i),
                        this
                    );
                }
                changeLine(e) {
                    var t;
                    if (
                        ((t = this.lines) === null || t === void 0
                            ? void 0
                            : t.length) === 0
                    )
                        return this;
                    let i =
                            typeof e.idx < "u" &&
                            e.idx >= 0 &&
                            e.idx < this.lines.length
                                ? e.idx
                                : 0,
                        n = this.getIcon(e.type, e.icon);
                    return (
                        e.text && this.lines[i].setText(e.text),
                        n && this.lines[i].setIcon(n),
                        typeof e.progress == "number" &&
                            this.lines[i].setProgress(e.progress),
                        this
                    );
                }
                showWithTimer(e = void 0) {
                    return (
                        this.originalShow(),
                        typeof e < "u" && (this.closeTime = e),
                        this.closeTime &&
                            this.closeTime > 0 &&
                            this.startCloseTimer(this.closeTime),
                        this
                    );
                }
                static setIconURI(e, t) {
                    li[e] = t;
                }
                getIcon(e, t) {
                    return e && e in li ? li[e] : t;
                }
            };
        Wt.ProgressWindowHelper = ci;
        var li = {
            success: "chrome://zotero/skin/tick.png",
            fail: "chrome://zotero/skin/cross.png",
        };
    });
    var Qn = v((jt) => {
        "use strict";
        Object.defineProperty(jt, "__esModule", { value: !0 });
        jt.VirtualizedTableHelper = void 0;
        var Il = x(),
            ui = class extends Il.BasicTool {
                constructor(e) {
                    super(), (this.window = e);
                    let t = this.getGlobal("Zotero"),
                        i = e.require;
                    (this.React = i("react")),
                        (this.ReactDOM = i("react-dom")),
                        (this.VirtualizedTable = i(
                            "components/virtualized-table",
                        )),
                        (this.IntlProvider = i("react-intl").IntlProvider),
                        (this.props = {
                            id: `${t.Utilities.randomString()}-${new Date().getTime()}`,
                            getRowCount: () => 0,
                        }),
                        (this.localeStrings = t.Intl.strings);
                }
                setProp(...e) {
                    return (
                        e.length === 1
                            ? Object.assign(this.props, e[0])
                            : e.length === 2 && (this.props[e[0]] = e[1]),
                        this
                    );
                }
                setLocale(e) {
                    return Object.assign(this.localeStrings, e), this;
                }
                setContainerId(e) {
                    return (this.containerId = e), this;
                }
                render(e, t, i) {
                    let n = () => {
                        this.treeInstance.invalidate(),
                            typeof e < "u" && e >= 0
                                ? this.treeInstance.selection.select(e)
                                : this.treeInstance.selection.clearSelection();
                    };
                    if (this.treeInstance) n();
                    else {
                        let s = Object.assign({}, this.props, {
                            ref: (c) => (this.treeInstance = c),
                        });
                        s.getRowData &&
                            !s.renderItem &&
                            Object.assign(s, {
                                renderItem:
                                    this.VirtualizedTable.makeRowRenderer(
                                        s.getRowData,
                                    ),
                            });
                        let o = this.React.createElement(
                                this.IntlProvider,
                                {
                                    locale: Zotero.locale,
                                    messages: Zotero.Intl.strings,
                                },
                                this.React.createElement(
                                    this.VirtualizedTable,
                                    s,
                                ),
                            ),
                            a = this.window.document.getElementById(
                                this.containerId,
                            );
                        new Promise((c) => this.ReactDOM.render(o, a, c))
                            .then(() => {
                                this.getGlobal("setTimeout")(() => {
                                    n();
                                });
                            })
                            .then(t, i);
                    }
                    return this;
                }
            };
        jt.VirtualizedTableHelper = ui;
    });
    var Xn = v((Ut) => {
        "use strict";
        Object.defineProperty(Ut, "__esModule", { value: !0 });
        Ut.DialogHelper = void 0;
        var El = te(),
            di = class extends El.UITool {
                constructor(e, t) {
                    if ((super(), e <= 0 || t <= 0))
                        throw Error(
                            "row and column must be positive integers.",
                        );
                    this.elementProps = {
                        tag: "vbox",
                        attributes: { flex: 1 },
                        styles: { width: "100%", height: "100%" },
                        children: [],
                    };
                    for (let i = 0; i < Math.max(e, 1); i++) {
                        this.elementProps.children.push({
                            tag: "hbox",
                            attributes: { flex: 1 },
                            children: [],
                        });
                        for (let n = 0; n < Math.max(t, 1); n++)
                            this.elementProps.children[i].children.push({
                                tag: "vbox",
                                attributes: { flex: 1 },
                                children: [],
                            });
                    }
                    this.elementProps.children.push({
                        tag: "hbox",
                        attributes: { flex: 0, pack: "end" },
                        children: [],
                    }),
                        (this.dialogData = {});
                }
                addCell(e, t, i, n = !0) {
                    if (
                        e >= this.elementProps.children.length ||
                        t >= this.elementProps.children[e].children.length
                    )
                        throw Error(
                            `Cell index (${e}, ${t}) is invalid, maximum (${this.elementProps.children.length}, ${this.elementProps.children[0].children.length})`,
                        );
                    return (
                        (this.elementProps.children[e].children[t].children = [
                            i,
                        ]),
                        (this.elementProps.children[e].children[
                            t
                        ].attributes.flex = n ? 1 : 0),
                        this
                    );
                }
                addButton(e, t, i = {}) {
                    return (
                        (t =
                            t ||
                            `${Zotero.Utilities.randomString()}-${new Date().getTime()}`),
                        this.elementProps.children[
                            this.elementProps.children.length - 1
                        ].children.push({
                            tag: "vbox",
                            styles: { margin: "10px" },
                            children: [
                                {
                                    tag: "button",
                                    namespace: "html",
                                    id: t,
                                    attributes: {
                                        type: "button",
                                        "data-l10n-id": e,
                                    },
                                    properties: { innerHTML: e },
                                    listeners: [
                                        {
                                            type: "click",
                                            listener: (n) => {
                                                (this.dialogData._lastButtonId =
                                                    t),
                                                    i.callback && i.callback(n),
                                                    i.noClose ||
                                                        this.window.close();
                                            },
                                        },
                                    ],
                                },
                            ],
                        }),
                        this
                    );
                }
                setDialogData(e) {
                    return (this.dialogData = e), this;
                }
                open(
                    e,
                    t = { centerscreen: !0, resizable: !0, fitContent: !0 },
                ) {
                    return (
                        (this.window = Ml(
                            this,
                            `${Zotero.Utilities.randomString()}-${new Date().getTime()}`,
                            e,
                            this.elementProps,
                            this.dialogData,
                            t,
                        )),
                        this
                    );
                }
            };
        Ut.DialogHelper = di;
        function Ml(
            r,
            e,
            t,
            i,
            n,
            s = { centerscreen: !0, resizable: !0, fitContent: !0 },
        ) {
            var o, a, c;
            let l = r.getGlobal("Zotero");
            (n = n || {}),
                n.loadLock || (n.loadLock = l.Promise.defer()),
                n.unloadLock || (n.unloadLock = l.Promise.defer());
            let d = `resizable=${s.resizable ? "yes" : "no"},`;
            (s.width || s.height) &&
                (d += `width=${s.width || 100},height=${s.height || 100},`),
                s.left && (d += `left=${s.left},`),
                s.top && (d += `top=${s.top},`),
                s.centerscreen && (d += "centerscreen,"),
                s.noDialogMode && (d += "dialog=no,"),
                s.alwaysRaised && (d += "alwaysRaised=yes,");
            let u = r.getGlobal("openDialog")(
                "about:blank",
                e || "_blank",
                d,
                n,
            );
            return (
                (o = n.loadLock) === null ||
                    o === void 0 ||
                    o.promise
                        .then(() => {
                            u.document.head.appendChild(
                                r.createElement(u.document, "title", {
                                    properties: { innerText: t },
                                    attributes: { "data-l10n-id": t },
                                }),
                            );
                            let h = n.l10nFiles || [];
                            typeof h == "string" && (h = [h]),
                                h.forEach((f) => {
                                    u.document.head.appendChild(
                                        r.createElement(u.document, "link", {
                                            properties: {
                                                rel: "localization",
                                                href: f,
                                            },
                                        }),
                                    );
                                }),
                                u.document.head.appendChild(
                                    r.createElement(u.document, "style", {
                                        properties: { innerHTML: Al },
                                    }),
                                ),
                                $n(i, r),
                                u.document.body.appendChild(
                                    r.createElement(u.document, "fragment", {
                                        children: [i],
                                    }),
                                ),
                                Array.from(
                                    u.document.querySelectorAll("*[data-bind]"),
                                ).forEach((f) => {
                                    let p = f.getAttribute("data-bind"),
                                        g = f.getAttribute("data-attr"),
                                        b = f.getAttribute("data-prop");
                                    p &&
                                        n &&
                                        n[p] &&
                                        (b
                                            ? (f[b] = n[p])
                                            : f.setAttribute(
                                                  g || "value",
                                                  n[p],
                                              ));
                                }),
                                s.fitContent &&
                                    setTimeout(() => {
                                        u.sizeToContent();
                                    }, 300),
                                u.focus();
                        })
                        .then(() => {
                            n?.loadCallback && n.loadCallback();
                        }),
                n.unloadLock.promise.then(() => {
                    n?.unloadCallback && n.unloadCallback();
                }),
                u.addEventListener(
                    "DOMContentLoaded",
                    function h(f) {
                        var p, g;
                        (g =
                            (p = u.arguments[0]) === null || p === void 0
                                ? void 0
                                : p.loadLock) === null ||
                            g === void 0 ||
                            g.resolve(),
                            u.removeEventListener("DOMContentLoaded", h, !1);
                    },
                    !1,
                ),
                u.addEventListener("beforeunload", function h(f) {
                    Array.from(
                        u.document.querySelectorAll("*[data-bind]"),
                    ).forEach((p) => {
                        let g = this.window.arguments[0],
                            b = p.getAttribute("data-bind"),
                            m = p.getAttribute("data-attr"),
                            S = p.getAttribute("data-prop");
                        b &&
                            g &&
                            (S
                                ? (g[b] = p[S])
                                : (g[b] = p.getAttribute(m || "value")));
                    }),
                        this.window.removeEventListener("beforeunload", h, !1),
                        n?.beforeUnloadCallback && n.beforeUnloadCallback();
                }),
                u.addEventListener("unload", function h(f) {
                    var p, g, b;
                    (!(
                        (p = this.window.arguments[0]) === null || p === void 0
                    ) &&
                        p.loadLock.promise.isPending()) ||
                        ((b =
                            (g = this.window.arguments[0]) === null ||
                            g === void 0
                                ? void 0
                                : g.unloadLock) === null ||
                            b === void 0 ||
                            b.resolve(),
                        this.window.removeEventListener("unload", h, !1));
                }),
                u.document.readyState === "complete" &&
                    ((c =
                        (a = u.arguments[0]) === null || a === void 0
                            ? void 0
                            : a.loadLock) === null ||
                        c === void 0 ||
                        c.resolve()),
                u
            );
        }
        function $n(r, e) {
            var t, i, n, s, o, a, c;
            let l = !0;
            if (r.tag === "select" && e.isZotero7()) {
                l = !1;
                let d = {
                    tag: "div",
                    classList: ["dropdown"],
                    listeners: [
                        {
                            type: "mouseleave",
                            listener: (u) => {
                                let h = u.target.querySelector("select");
                                h?.blur();
                            },
                        },
                    ],
                    children: [
                        Object.assign({}, r, {
                            tag: "select",
                            listeners: [
                                {
                                    type: "focus",
                                    listener: (u) => {
                                        var h;
                                        let f = u.target,
                                            p =
                                                (h = f.parentElement) ===
                                                    null || h === void 0
                                                    ? void 0
                                                    : h.querySelector(
                                                          ".dropdown-content",
                                                      );
                                        p && (p.style.display = "block"),
                                            f.setAttribute("focus", "true");
                                    },
                                },
                                {
                                    type: "blur",
                                    listener: (u) => {
                                        var h;
                                        let f = u.target,
                                            p =
                                                (h = f.parentElement) ===
                                                    null || h === void 0
                                                    ? void 0
                                                    : h.querySelector(
                                                          ".dropdown-content",
                                                      );
                                        p && (p.style.display = "none"),
                                            f.removeAttribute("focus");
                                    },
                                },
                            ],
                        }),
                        {
                            tag: "div",
                            classList: ["dropdown-content"],
                            children:
                                (t = r.children) === null || t === void 0
                                    ? void 0
                                    : t.map((u) => {
                                          var h, f, p;
                                          return {
                                              tag: "p",
                                              attributes: {
                                                  value:
                                                      (h = u.properties) ===
                                                          null || h === void 0
                                                          ? void 0
                                                          : h.value,
                                              },
                                              properties: {
                                                  innerHTML:
                                                      ((f = u.properties) ===
                                                          null || f === void 0
                                                          ? void 0
                                                          : f.innerHTML) ||
                                                      ((p = u.properties) ===
                                                          null || p === void 0
                                                          ? void 0
                                                          : p.innerText),
                                              },
                                              classList: ["dropdown-item"],
                                              listeners: [
                                                  {
                                                      type: "click",
                                                      listener: (g) => {
                                                          var b;
                                                          let m =
                                                              (b =
                                                                  g.target
                                                                      .parentElement) ===
                                                                  null ||
                                                              b === void 0
                                                                  ? void 0
                                                                  : b.previousElementSibling;
                                                          m &&
                                                              (m.value =
                                                                  g.target.getAttribute(
                                                                      "value",
                                                                  ) || ""),
                                                              m?.blur();
                                                      },
                                                  },
                                              ],
                                          };
                                      }),
                        },
                    ],
                };
                for (let u in r) delete r[u];
                Object.assign(r, d);
            } else if (r.tag === "a") {
                let d =
                    ((i = r?.properties) === null || i === void 0
                        ? void 0
                        : i.href) || "";
                ((n = r.properties) !== null && n !== void 0) ||
                    (r.properties = {}),
                    (r.properties.href = "javascript:void(0);"),
                    ((s = r.attributes) !== null && s !== void 0) ||
                        (r.attributes = {}),
                    (r.attributes["zotero-href"] = d),
                    ((o = r.listeners) !== null && o !== void 0) ||
                        (r.listeners = []),
                    r.listeners.push({
                        type: "click",
                        listener: (u) => {
                            var h;
                            let f =
                                (h = u.target) === null || h === void 0
                                    ? void 0
                                    : h.getAttribute("zotero-href");
                            f && e.getGlobal("Zotero").launchURL(f);
                        },
                    }),
                    ((a = r.classList) !== null && a !== void 0) ||
                        (r.classList = []),
                    r.classList.push("zotero-text-link");
            }
            l &&
                ((c = r.children) === null ||
                    c === void 0 ||
                    c.forEach((d) => $n(d, e)));
        }
        var Al = `
html,
body {
  font-size: calc(12px * 1);
  font-family: initial;
}
@media (prefers-color-scheme: light) {
  html,
  body {
    background-color: #ffffff;
    color: #000000;
  }
}
@media (prefers-color-scheme: dark) {
  html,
  body {
    background-color: #1e1e1e;
    color: #ffffff;
  }
}
.zotero-text-link {
  -moz-user-focus: normal;
  color: -moz-nativehyperlinktext;
  text-decoration: underline;
  border: 1px solid transparent;
  cursor: pointer;
}
.dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9fb;
  min-width: 160px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  padding: 5px 0 5px 0;
  z-index: 999;
}
.dropdown-item {
  margin: 0px;
  padding: 5px 10px 5px 10px;
}
.dropdown-item:hover {
  background-color: #efeff3;
}
`;
    });
    var Yn = v((Fe) => {
        "use strict";
        var Rl =
            (Fe && Fe.__importDefault) ||
            function (r) {
                return r && r.__esModule ? r : { default: r };
            };
        Object.defineProperty(Fe, "__esModule", { value: !0 });
        Fe.ReaderInstanceManager = void 0;
        var Nl = x(),
            ql = Rl(pe()),
            hi = class extends Nl.ManagerTool {
                constructor(e) {
                    super(e),
                        (this.cachedHookIds = []),
                        this.initializeGlobal();
                }
                register(e, t, i) {
                    let n = this.getGlobal("Zotero");
                    switch (e) {
                        case "initialized":
                            (this.globalCache.initializedHooks[t] = i),
                                n.Reader._readers.forEach(i);
                            break;
                        default:
                            break;
                    }
                    this.cachedHookIds.push(t);
                }
                unregister(e) {
                    delete this.globalCache.initializedHooks[e];
                }
                unregisterAll() {
                    this.cachedHookIds.forEach((e) => this.unregister(e));
                }
                initializeGlobal() {
                    if (
                        ((this.globalCache =
                            ql.default.getInstance().readerInstance),
                        !this.globalCache._ready)
                    ) {
                        this.globalCache._ready = !0;
                        let e = this.getGlobal("Zotero"),
                            t = this;
                        e.Reader._readers = new (this.getGlobal("Proxy"))(
                            e.Reader._readers,
                            {
                                set(i, n, s, o) {
                                    return (
                                        (i[n] = s),
                                        isNaN(Number(n)) ||
                                            Object.values(
                                                t.globalCache.initializedHooks,
                                            ).forEach((a) => {
                                                try {
                                                    a(s);
                                                } catch (c) {
                                                    t.log(c);
                                                }
                                            }),
                                        !0
                                    );
                                },
                            },
                        );
                    }
                }
            };
        Fe.ReaderInstanceManager = hi;
    });
    var es = v((De) => {
        "use strict";
        var Ol =
            (De && De.__importDefault) ||
            function (r) {
                return r && r.__esModule ? r : { default: r };
            };
        Object.defineProperty(De, "__esModule", { value: !0 });
        De.ItemBoxManager = void 0;
        var Hl = x(),
            zl = Ht(),
            Bl = Qr(),
            Fl = Ol(pe()),
            pi = class extends Hl.ManagerTool {
                constructor(e) {
                    super(e),
                        (this.initializationLock =
                            this.getGlobal("Zotero").Promise.defer()),
                        (this.localCache = []),
                        (this.fieldHooks = new zl.FieldHookManager()),
                        (this.patcherManager = new Bl.PatcherManager()),
                        this.initializeGlobal();
                }
                async register(e, t, i, n = {}) {
                    this.fieldHooks.register("isFieldOfBase", e, () => !1),
                        i && this.fieldHooks.register("getField", e, i),
                        n.editable &&
                            n.setFieldHook &&
                            this.fieldHooks.register(
                                "setField",
                                e,
                                n.setFieldHook,
                            ),
                        (this.globalCache.fieldOptions[e] = {
                            field: e,
                            displayName: t,
                            editable: n.editable || !1,
                            index: n.index || -1,
                            multiline: n.multiline || !1,
                            collapsible: n.collapsible || !1,
                        }),
                        this.localCache.push(e),
                        await this.initializationLock.promise,
                        this.refresh();
                }
                unregister(e, t = {}) {
                    delete this.globalCache.fieldOptions[e],
                        t.skipIsFieldOfBase ||
                            this.fieldHooks.unregister("isFieldOfBase", e),
                        t.skipGetField ||
                            this.fieldHooks.unregister("getField", e),
                        t.skipSetField ||
                            this.fieldHooks.unregister("setField", e);
                    let i = this.localCache.indexOf(e);
                    i > -1 && this.localCache.splice(i, 1),
                        t.skipRefresh || this.refresh();
                }
                unregisterAll() {
                    [...this.localCache].forEach((e) =>
                        this.unregister(e, {
                            skipGetField: !0,
                            skipSetField: !0,
                            skipIsFieldOfBase: !0,
                            skipRefresh: !0,
                        }),
                    ),
                        this.fieldHooks.unregisterAll(),
                        this.refresh();
                }
                refresh() {
                    try {
                        Array.from(
                            this.getGlobal("document").querySelectorAll(
                                this.isZotero7() ? "item-box" : "zoteroitembox",
                            ),
                        ).forEach((e) => e.refresh());
                    } catch (e) {
                        this.log(e);
                    }
                }
                async initializeGlobal() {
                    let e = this.getGlobal("Zotero");
                    await e.uiReadyPromise;
                    let t = this.getGlobal("window");
                    this.globalCache = Fl.default.getInstance().itemBox;
                    let i = this.globalCache,
                        n = this.isZotero7();
                    if (!i._ready) {
                        i._ready = !0;
                        let s;
                        if (n)
                            s = new (this.getGlobal("customElements").get(
                                "item-box",
                            ))();
                        else {
                            s = t.document.querySelector(
                                "#zotero-editpane-item-box",
                            );
                            let o = 5e3,
                                a = 0;
                            for (; !s && a < o; )
                                (s = t.document.querySelector(
                                    "#zotero-editpane-item-box",
                                )),
                                    await e.Promise.delay(10),
                                    (a += 10);
                            if (!s) {
                                (i._ready = !1),
                                    this.log("ItemBox initialization failed");
                                return;
                            }
                        }
                        this.patcherManager.register(
                            s.__proto__,
                            "refresh",
                            (o) =>
                                function () {
                                    let a = this;
                                    o.apply(a, arguments);
                                    for (let c of Object.values(
                                        i.fieldOptions,
                                    )) {
                                        let l = document.createElement(
                                            n ? "th" : "label",
                                        );
                                        l.setAttribute("fieldname", c.field);
                                        let d = `extensions.zotero.pluginToolkit.fieldCollapsed.${c.field}`,
                                            u =
                                                c.multiline &&
                                                c.collapsible &&
                                                e.Prefs.get(d, !0),
                                            h = c.displayName;
                                        if ((u && (h = `(...)${h}`), n)) {
                                            let m =
                                                document.createElement("label");
                                            (m.className = "key"),
                                                (m.textContent = h),
                                                l.appendChild(m);
                                        } else l.setAttribute("value", h);
                                        let f = a.clickable;
                                        a.clickable = c.editable;
                                        let p = a.createValueElement(
                                            a.item.getField(c.field),
                                            c.field,
                                            1099,
                                        );
                                        (a.clickable = f),
                                            c.multiline && !e.Prefs.get(d, !0)
                                                ? p.classList.add("multiline")
                                                : n ||
                                                  (p.setAttribute(
                                                      "crop",
                                                      "end",
                                                  ),
                                                  p.setAttribute(
                                                      "value",
                                                      p.innerHTML,
                                                  ),
                                                  (p.innerHTML = "")),
                                            c.collapsible &&
                                                l.addEventListener(
                                                    "click",
                                                    function (m) {
                                                        e.Prefs.set(
                                                            d,
                                                            !e.Prefs.get(d, !0),
                                                            !0,
                                                        ),
                                                            a.refresh();
                                                    },
                                                ),
                                            l.addEventListener(
                                                "click",
                                                n
                                                    ? function (m) {
                                                          var S;
                                                          let E =
                                                              (S =
                                                                  m
                                                                      .currentTarget
                                                                      .nextElementSibling) ===
                                                                  null ||
                                                              S === void 0
                                                                  ? void 0
                                                                  : S.querySelector(
                                                                        "input, textarea",
                                                                    );
                                                          E && E.blur();
                                                      }
                                                    : function (m) {
                                                          var S;
                                                          let E =
                                                              (S =
                                                                  m
                                                                      .currentTarget
                                                                      .nextElementSibling) ===
                                                                  null ||
                                                              S === void 0
                                                                  ? void 0
                                                                  : S.inputField;
                                                          E && E.blur();
                                                      },
                                            );
                                        let g = n
                                                ? a._infoTable
                                                : a._dynamicFields,
                                            b = c.index;
                                        b === 0 && (b = 1),
                                            b && b >= 0 && b < g.children.length
                                                ? ((a._beforeRow =
                                                      g.children[b]),
                                                  a.addDynamicRow(l, p, !0))
                                                : a.addDynamicRow(l, p);
                                    }
                                },
                        );
                    }
                    this.initializationLock.resolve();
                }
            };
        De.ItemBoxManager = pi;
    });
    var rs = v((Jt) => {
        "use strict";
        Object.defineProperty(Jt, "__esModule", { value: !0 });
        Jt.LargePrefHelper = void 0;
        var Dl = x(),
            fi = class extends Dl.BasicTool {
                constructor(e, t, i = "default") {
                    super(),
                        (this.keyPref = e),
                        (this.valuePrefPrefix = t),
                        i === "default"
                            ? (this.hooks = ts)
                            : i === "parser"
                              ? (this.hooks = Vl)
                              : (this.hooks = Object.assign(
                                    Object.assign({}, ts),
                                    i,
                                )),
                        (this.innerObj = {});
                }
                asObject() {
                    return this.constructTempObj();
                }
                asMapLike() {
                    let e = {
                        get: (t) => this.getValue(t),
                        set: (t, i) => (this.setValue(t, i), e),
                        has: (t) => this.hasKey(t),
                        delete: (t) => this.deleteKey(t),
                        clear: () => {
                            for (let t of this.getKeys()) this.deleteKey(t);
                        },
                        forEach: (t) => this.constructTempMap().forEach(t),
                        get size() {
                            return this._this.getKeys().length;
                        },
                        entries: () => this.constructTempMap().values(),
                        keys: () => this.getKeys()[Symbol.iterator](),
                        values: () => this.constructTempMap().values(),
                        [Symbol.iterator]: () =>
                            this.constructTempMap()[Symbol.iterator](),
                        [Symbol.toStringTag]: "MapLike",
                        _this: this,
                    };
                    return e;
                }
                getKeys() {
                    let e = Zotero.Prefs.get(this.keyPref, !0),
                        t = e ? JSON.parse(e) : [];
                    for (let i of t) {
                        let n = "placeholder";
                        this.innerObj[i] = n;
                    }
                    return t;
                }
                setKeys(e) {
                    (e = [...new Set(e.filter((t) => t))]),
                        Zotero.Prefs.set(this.keyPref, JSON.stringify(e), !0);
                    for (let t of e) {
                        let i = "placeholder";
                        this.innerObj[t] = i;
                    }
                }
                getValue(e) {
                    let t = Zotero.Prefs.get(`${this.valuePrefPrefix}${e}`, !0);
                    if (typeof t > "u") return;
                    let { value: i } = this.hooks.afterGetValue({ value: t });
                    return (this.innerObj[e] = i), i;
                }
                setValue(e, t) {
                    let { key: i, value: n } = this.hooks.beforeSetValue({
                        key: e,
                        value: t,
                    });
                    this.setKey(i),
                        Zotero.Prefs.set(`${this.valuePrefPrefix}${i}`, n, !0),
                        (this.innerObj[i] = n);
                }
                hasKey(e) {
                    return this.getKeys().includes(e);
                }
                setKey(e) {
                    let t = this.getKeys();
                    t.includes(e) || (t.push(e), this.setKeys(t));
                }
                deleteKey(e) {
                    let t = this.getKeys(),
                        i = t.indexOf(e);
                    return (
                        i > -1 &&
                            (t.splice(i, 1),
                            delete this.innerObj[e],
                            this.setKeys(t)),
                        Zotero.Prefs.clear(`${this.valuePrefPrefix}${e}`, !0),
                        !0
                    );
                }
                constructTempObj() {
                    return new Proxy(this.innerObj, {
                        get: (e, t, i) => (
                            this.getKeys(),
                            typeof t == "string" && t in e && this.getValue(t),
                            Reflect.get(e, t, i)
                        ),
                        set: (e, t, i, n) =>
                            typeof t == "string"
                                ? i === void 0
                                    ? (this.deleteKey(t), !0)
                                    : (this.setValue(t, i), !0)
                                : Reflect.set(e, t, i, n),
                        has: (e, t) => (this.getKeys(), Reflect.has(e, t)),
                        deleteProperty: (e, t) =>
                            typeof t == "string"
                                ? (this.deleteKey(t), !0)
                                : Reflect.deleteProperty(e, t),
                    });
                }
                constructTempMap() {
                    let e = new Map();
                    for (let t of this.getKeys()) e.set(t, this.getValue(t));
                    return e;
                }
            };
        Jt.LargePrefHelper = fi;
        var ts = {
                afterGetValue: ({ value: r }) => ({ value: r }),
                beforeSetValue: ({ key: r, value: e }) => ({
                    key: r,
                    value: e,
                }),
            },
            Vl = {
                afterGetValue: ({ value: r }) => {
                    try {
                        r = JSON.parse(r);
                    } catch {
                        return { value: r };
                    }
                    return { value: r };
                },
                beforeSetValue: ({ key: r, value: e }) => (
                    (e = JSON.stringify(e)), { key: r, value: e }
                ),
            };
    });
    var is = v((Ke) => {
        "use strict";
        Object.defineProperty(Ke, "__esModule", { value: !0 });
        Ke.KeyModifier = Ke.KeyboardManager = void 0;
        var Kl = x(),
            Zl = Dr(),
            mi = class extends Kl.ManagerTool {
                constructor(e) {
                    super(e),
                        (this._keyboardCallbacks = new Set()),
                        (this.initKeyboardListener =
                            this._initKeyboardListener.bind(this)),
                        (this.unInitKeyboardListener =
                            this._unInitKeyboardListener.bind(this)),
                        (this.triggerKeydown = (t) => {
                            this._cachedKey
                                ? this._cachedKey.merge(new Ve(t), {
                                      allowOverwrite: !1,
                                  })
                                : (this._cachedKey = new Ve(t)),
                                this.dispatchCallback(t, { type: "keydown" });
                        }),
                        (this.triggerKeyup = async (t) => {
                            if (!this._cachedKey) return;
                            let i = new Ve(this._cachedKey);
                            (this._cachedKey = void 0),
                                this.dispatchCallback(t, {
                                    keyboard: i,
                                    type: "keyup",
                                });
                        }),
                        (this.id = Zotero.Utilities.randomString()),
                        this._ensureAutoUnregisterAll(),
                        this.addListenerCallback(
                            "onMainWindowLoad",
                            this.initKeyboardListener,
                        ),
                        this.addListenerCallback(
                            "onMainWindowUnload",
                            this.unInitKeyboardListener,
                        ),
                        this.initReaderKeyboardListener();
                    for (let t of Zotero.getMainWindows())
                        this.initKeyboardListener(t);
                }
                register(e) {
                    this._keyboardCallbacks.add(e);
                }
                unregister(e) {
                    this._keyboardCallbacks.delete(e);
                }
                unregisterAll() {
                    this._keyboardCallbacks.clear(),
                        this.removeListenerCallback(
                            "onMainWindowLoad",
                            this.initKeyboardListener,
                        ),
                        this.removeListenerCallback(
                            "onMainWindowUnload",
                            this.unInitKeyboardListener,
                        );
                    for (let e of Zotero.getMainWindows())
                        this.unInitKeyboardListener(e);
                }
                initReaderKeyboardListener() {
                    Zotero.Reader.registerEventListener(
                        "renderToolbar",
                        (e) => this.addReaderKeyboardCallback(e),
                        this._basicOptions.api.pluginID,
                    ),
                        Zotero.Reader._readers.forEach((e) =>
                            this.addReaderKeyboardCallback({ reader: e }),
                        );
                }
                addReaderKeyboardCallback(e) {
                    let t = e.reader,
                        i = `_ztoolkitKeyboard${this.id}Initialized`;
                    t._iframeWindow[i] ||
                        (this._initKeyboardListener(t._iframeWindow),
                        (0, Zl.waitUntil)(
                            () => {
                                var n, s;
                                return (
                                    !Components.utils.isDeadWrapper(
                                        t._internalReader,
                                    ) &&
                                    ((s =
                                        (n = t._internalReader) === null ||
                                        n === void 0
                                            ? void 0
                                            : n._primaryView) === null ||
                                    s === void 0
                                        ? void 0
                                        : s._iframeWindow)
                                );
                            },
                            () => {
                                var n;
                                return this._initKeyboardListener(
                                    (n = t._internalReader._primaryView) ===
                                        null || n === void 0
                                        ? void 0
                                        : n._iframeWindow,
                                );
                            },
                        ),
                        (t._iframeWindow[i] = !0));
                }
                _initKeyboardListener(e) {
                    e &&
                        (e.addEventListener("keydown", this.triggerKeydown),
                        e.addEventListener("keyup", this.triggerKeyup));
                }
                _unInitKeyboardListener(e) {
                    e &&
                        (e.removeEventListener("keydown", this.triggerKeydown),
                        e.removeEventListener("keyup", this.triggerKeyup));
                }
                dispatchCallback(...e) {
                    this._keyboardCallbacks.forEach((t) => t(...e));
                }
            };
        Ke.KeyboardManager = mi;
        var Ve = class r {
            constructor(e, t) {
                (this.accel = !1),
                    (this.shift = !1),
                    (this.control = !1),
                    (this.meta = !1),
                    (this.alt = !1),
                    (this.key = ""),
                    (this.useAccel = !1),
                    (this.useAccel = t?.useAccel || !1),
                    !(typeof e > "u") &&
                        (typeof e == "string"
                            ? ((e = e || ""),
                              (e = this.unLocalized(e)),
                              (this.accel = e.includes("accel")),
                              (this.shift = e.includes("shift")),
                              (this.control = e.includes("control")),
                              (this.meta = e.includes("meta")),
                              (this.alt = e.includes("alt")),
                              (this.key = e
                                  .replace(
                                      /(accel|shift|control|meta|alt| |,|-)/g,
                                      "",
                                  )
                                  .toLocaleLowerCase()))
                            : e instanceof r
                              ? this.merge(e, { allowOverwrite: !0 })
                              : (t?.useAccel &&
                                    (Zotero.isMac
                                        ? (this.accel = e.metaKey)
                                        : (this.accel = e.ctrlKey)),
                                (this.shift = e.shiftKey),
                                (this.control = e.ctrlKey),
                                (this.meta = e.metaKey),
                                (this.alt = e.altKey),
                                [
                                    "Shift",
                                    "Meta",
                                    "Ctrl",
                                    "Alt",
                                    "Control",
                                ].includes(e.key) || (this.key = e.key)));
            }
            merge(e, t) {
                let i = t?.allowOverwrite || !1;
                return (
                    this.mergeAttribute("accel", e.accel, i),
                    this.mergeAttribute("shift", e.shift, i),
                    this.mergeAttribute("control", e.control, i),
                    this.mergeAttribute("meta", e.meta, i),
                    this.mergeAttribute("alt", e.alt, i),
                    this.mergeAttribute("key", e.key, i),
                    this
                );
            }
            equals(e) {
                if (
                    (typeof e == "string" && (e = new r(e)),
                    this.shift !== e.shift ||
                        this.alt !== e.alt ||
                        this.key.toLowerCase() !== e.key.toLowerCase())
                )
                    return !1;
                if (this.accel || e.accel) {
                    if (Zotero.isMac) {
                        if (
                            (this.accel || this.meta) !== (e.accel || e.meta) ||
                            this.control !== e.control
                        )
                            return !1;
                    } else if (
                        (this.accel || this.control) !==
                            (e.accel || e.control) ||
                        this.meta !== e.meta
                    )
                        return !1;
                } else if (this.control !== e.control || this.meta !== e.meta)
                    return !1;
                return !0;
            }
            getRaw() {
                let e = [];
                return (
                    this.accel && e.push("accel"),
                    this.shift && e.push("shift"),
                    this.control && e.push("control"),
                    this.meta && e.push("meta"),
                    this.alt && e.push("alt"),
                    this.key && e.push(this.key),
                    e.join(",")
                );
            }
            getLocalized() {
                let e = this.getRaw();
                return Zotero.isMac
                    ? e
                          .replaceAll("control", "\u2303")
                          .replaceAll("alt", "\u2325")
                          .replaceAll("shift", "\u21E7")
                          .replaceAll("meta", "\u2318")
                    : e
                          .replaceAll("control", "Ctrl")
                          .replaceAll("alt", "Alt")
                          .replaceAll("shift", "Shift")
                          .replaceAll("meta", "Win");
            }
            unLocalized(e) {
                return Zotero.isMac
                    ? e
                          .replaceAll("\u2303", "control")
                          .replaceAll("\u2325", "alt")
                          .replaceAll("\u21E7", "shift")
                          .replaceAll("\u2318", "meta")
                    : e
                          .replaceAll("Ctrl", "control")
                          .replaceAll("Alt", "alt")
                          .replaceAll("Shift", "shift")
                          .replaceAll("Win", "meta");
            }
            mergeAttribute(e, t, i) {
                (i || !this[e]) && (this[e] = t);
            }
        };
        Ke.KeyModifier = Ve;
    });
    var gi = v((at) => {
        "use strict";
        Object.defineProperty(at, "__esModule", { value: !0 });
        at.ZoteroToolkit = void 0;
        var oe = x(),
            Gl = te(),
            Wl = Kr(),
            jl = Bn(),
            Ul = Fn(),
            Jl = Dn(),
            Ql = Vn(),
            $l = Kn(),
            Xl = Zn(),
            Yl = ni(),
            ec = Wn(),
            tc = jn(),
            rc = Un(),
            ic = Jn(),
            nc = Qn(),
            sc = Xn(),
            oc = Yn(),
            ac = Ht(),
            lc = es(),
            cc = rs(),
            uc = is(),
            dc = Wr(),
            Qt = class extends oe.BasicTool {
                constructor() {
                    super(),
                        (this.UI = new Gl.UITool(this)),
                        (this.Reader = new Wl.ReaderTool(this)),
                        (this.ExtraField = new jl.ExtraFieldTool(this)),
                        (this.FieldHooks = new ac.FieldHookManager(this)),
                        (this.ItemTree = new Ul.ItemTreeManager(this)),
                        (this.ItemBox = new lc.ItemBoxManager(this)),
                        (this.Keyboard = new uc.KeyboardManager(this)),
                        (this.Prompt = new Jl.PromptManager(this)),
                        (this.LibraryTabPanel = new Ql.LibraryTabPanelManager(
                            this,
                        )),
                        (this.ReaderTabPanel = new $l.ReaderTabPanelManager(
                            this,
                        )),
                        (this.ReaderInstance = new oc.ReaderInstanceManager(
                            this,
                        )),
                        (this.Menu = new Xl.MenuManager(this)),
                        (this.PreferencePane = new Yl.PreferencePaneManager(
                            this,
                        )),
                        (this.Shortcut = new ec.ShortcutManager(this)),
                        (this.Clipboard = (0, oe.makeHelperTool)(
                            tc.ClipboardHelper,
                            this,
                        )),
                        (this.FilePicker = (0, oe.makeHelperTool)(
                            rc.FilePickerHelper,
                            this,
                        )),
                        (this.Patch = (0, oe.makeHelperTool)(
                            dc.PatchHelper,
                            this,
                        )),
                        (this.ProgressWindow = (0, oe.makeHelperTool)(
                            ic.ProgressWindowHelper,
                            this,
                        )),
                        (this.VirtualizedTable = (0, oe.makeHelperTool)(
                            nc.VirtualizedTableHelper,
                            this,
                        )),
                        (this.Dialog = (0, oe.makeHelperTool)(
                            sc.DialogHelper,
                            this,
                        )),
                        (this.LargePrefObject = (0, oe.makeHelperTool)(
                            cc.LargePrefHelper,
                            this,
                        ));
                }
                unregisterAll() {
                    (0, oe.unregister)(this);
                }
            };
        at.ZoteroToolkit = Qt;
        at.default = Qt;
    });
    var F = v((V) => {
        "use strict";
        V.__esModule = !0;
        V.extend = os;
        V.indexOf = gc;
        V.escapeExpression = bc;
        V.isEmpty = vc;
        V.createFrame = yc;
        V.blockParams = _c;
        V.appendContextPath = kc;
        var hc = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;",
                "=": "&#x3D;",
            },
            pc = /[&<>"'`=]/g,
            fc = /[&<>"'`=]/;
        function mc(r) {
            return hc[r];
        }
        function os(r) {
            for (var e = 1; e < arguments.length; e++)
                for (var t in arguments[e])
                    Object.prototype.hasOwnProperty.call(arguments[e], t) &&
                        (r[t] = arguments[e][t]);
            return r;
        }
        var yi = Object.prototype.toString;
        V.toString = yi;
        var vi = function (e) {
            return typeof e == "function";
        };
        vi(/x/) &&
            (V.isFunction = vi =
                function (r) {
                    return (
                        typeof r == "function" &&
                        yi.call(r) === "[object Function]"
                    );
                });
        V.isFunction = vi;
        var as =
            Array.isArray ||
            function (r) {
                return r && typeof r == "object"
                    ? yi.call(r) === "[object Array]"
                    : !1;
            };
        V.isArray = as;
        function gc(r, e) {
            for (var t = 0, i = r.length; t < i; t++) if (r[t] === e) return t;
            return -1;
        }
        function bc(r) {
            if (typeof r != "string") {
                if (r && r.toHTML) return r.toHTML();
                if (r == null) return "";
                if (!r) return r + "";
                r = "" + r;
            }
            return fc.test(r) ? r.replace(pc, mc) : r;
        }
        function vc(r) {
            return !r && r !== 0 ? !0 : !!(as(r) && r.length === 0);
        }
        function yc(r) {
            var e = os({}, r);
            return (e._parent = r), e;
        }
        function _c(r, e) {
            return (r.path = e), r;
        }
        function kc(r, e) {
            return (r ? r + "." : "") + e;
        }
    });
    var J = v(($t, ls) => {
        "use strict";
        $t.__esModule = !0;
        var _i = [
            "description",
            "fileName",
            "lineNumber",
            "endLineNumber",
            "message",
            "name",
            "number",
            "stack",
        ];
        function ki(r, e) {
            var t = e && e.loc,
                i = void 0,
                n = void 0,
                s = void 0,
                o = void 0;
            t &&
                ((i = t.start.line),
                (n = t.end.line),
                (s = t.start.column),
                (o = t.end.column),
                (r += " - " + i + ":" + s));
            for (
                var a = Error.prototype.constructor.call(this, r), c = 0;
                c < _i.length;
                c++
            )
                this[_i[c]] = a[_i[c]];
            Error.captureStackTrace && Error.captureStackTrace(this, ki);
            try {
                t &&
                    ((this.lineNumber = i),
                    (this.endLineNumber = n),
                    Object.defineProperty
                        ? (Object.defineProperty(this, "column", {
                              value: s,
                              enumerable: !0,
                          }),
                          Object.defineProperty(this, "endColumn", {
                              value: o,
                              enumerable: !0,
                          }))
                        : ((this.column = s), (this.endColumn = o)));
            } catch {}
        }
        ki.prototype = new Error();
        $t.default = ki;
        ls.exports = $t.default;
    });
    var us = v((Xt, cs) => {
        "use strict";
        Xt.__esModule = !0;
        var wi = F();
        Xt.default = function (r) {
            r.registerHelper("blockHelperMissing", function (e, t) {
                var i = t.inverse,
                    n = t.fn;
                if (e === !0) return n(this);
                if (e === !1 || e == null) return i(this);
                if (wi.isArray(e))
                    return e.length > 0
                        ? (t.ids && (t.ids = [t.name]), r.helpers.each(e, t))
                        : i(this);
                if (t.data && t.ids) {
                    var s = wi.createFrame(t.data);
                    (s.contextPath = wi.appendContextPath(
                        t.data.contextPath,
                        t.name,
                    )),
                        (t = { data: s });
                }
                return n(e, t);
            });
        };
        cs.exports = Xt.default;
    });
    var hs = v((Yt, ds) => {
        "use strict";
        Yt.__esModule = !0;
        function wc(r) {
            return r && r.__esModule ? r : { default: r };
        }
        var lt = F(),
            Sc = J(),
            xc = wc(Sc);
        Yt.default = function (r) {
            r.registerHelper("each", function (e, t) {
                if (!t) throw new xc.default("Must pass iterator to #each");
                var i = t.fn,
                    n = t.inverse,
                    s = 0,
                    o = "",
                    a = void 0,
                    c = void 0;
                t.data &&
                    t.ids &&
                    (c =
                        lt.appendContextPath(t.data.contextPath, t.ids[0]) +
                        "."),
                    lt.isFunction(e) && (e = e.call(this)),
                    t.data && (a = lt.createFrame(t.data));
                function l(p, g, b) {
                    a &&
                        ((a.key = p),
                        (a.index = g),
                        (a.first = g === 0),
                        (a.last = !!b),
                        c && (a.contextPath = c + p)),
                        (o =
                            o +
                            i(e[p], {
                                data: a,
                                blockParams: lt.blockParams(
                                    [e[p], p],
                                    [c + p, null],
                                ),
                            }));
                }
                if (e && typeof e == "object")
                    if (lt.isArray(e))
                        for (var d = e.length; s < d; s++)
                            s in e && l(s, s, s === e.length - 1);
                    else if (
                        typeof Symbol == "function" &&
                        e[Symbol.iterator]
                    ) {
                        for (
                            var u = [], h = e[Symbol.iterator](), f = h.next();
                            !f.done;
                            f = h.next()
                        )
                            u.push(f.value);
                        e = u;
                        for (var d = e.length; s < d; s++)
                            l(s, s, s === e.length - 1);
                    } else
                        (function () {
                            var p = void 0;
                            Object.keys(e).forEach(function (g) {
                                p !== void 0 && l(p, s - 1), (p = g), s++;
                            }),
                                p !== void 0 && l(p, s - 1, !0);
                        })();
                return s === 0 && (o = n(this)), o;
            });
        };
        ds.exports = Yt.default;
    });
    var fs = v((er, ps) => {
        "use strict";
        er.__esModule = !0;
        function Cc(r) {
            return r && r.__esModule ? r : { default: r };
        }
        var Lc = J(),
            Pc = Cc(Lc);
        er.default = function (r) {
            r.registerHelper("helperMissing", function () {
                if (arguments.length !== 1)
                    throw new Pc.default(
                        'Missing helper: "' +
                            arguments[arguments.length - 1].name +
                            '"',
                    );
            });
        };
        ps.exports = er.default;
    });
    var vs = v((tr, bs) => {
        "use strict";
        tr.__esModule = !0;
        function Tc(r) {
            return r && r.__esModule ? r : { default: r };
        }
        var ms = F(),
            Ic = J(),
            gs = Tc(Ic);
        tr.default = function (r) {
            r.registerHelper("if", function (e, t) {
                if (arguments.length != 2)
                    throw new gs.default("#if requires exactly one argument");
                return (
                    ms.isFunction(e) && (e = e.call(this)),
                    (!t.hash.includeZero && !e) || ms.isEmpty(e)
                        ? t.inverse(this)
                        : t.fn(this)
                );
            }),
                r.registerHelper("unless", function (e, t) {
                    if (arguments.length != 2)
                        throw new gs.default(
                            "#unless requires exactly one argument",
                        );
                    return r.helpers.if.call(this, e, {
                        fn: t.inverse,
                        inverse: t.fn,
                        hash: t.hash,
                    });
                });
        };
        bs.exports = tr.default;
    });
    var _s = v((rr, ys) => {
        "use strict";
        rr.__esModule = !0;
        rr.default = function (r) {
            r.registerHelper("log", function () {
                for (
                    var e = [void 0],
                        t = arguments[arguments.length - 1],
                        i = 0;
                    i < arguments.length - 1;
                    i++
                )
                    e.push(arguments[i]);
                var n = 1;
                t.hash.level != null
                    ? (n = t.hash.level)
                    : t.data && t.data.level != null && (n = t.data.level),
                    (e[0] = n),
                    r.log.apply(r, e);
            });
        };
        ys.exports = rr.default;
    });
    var ws = v((ir, ks) => {
        "use strict";
        ir.__esModule = !0;
        ir.default = function (r) {
            r.registerHelper("lookup", function (e, t, i) {
                return e && i.lookupProperty(e, t);
            });
        };
        ks.exports = ir.default;
    });
    var xs = v((nr, Ss) => {
        "use strict";
        nr.__esModule = !0;
        function Ec(r) {
            return r && r.__esModule ? r : { default: r };
        }
        var ct = F(),
            Mc = J(),
            Ac = Ec(Mc);
        nr.default = function (r) {
            r.registerHelper("with", function (e, t) {
                if (arguments.length != 2)
                    throw new Ac.default("#with requires exactly one argument");
                ct.isFunction(e) && (e = e.call(this));
                var i = t.fn;
                if (ct.isEmpty(e)) return t.inverse(this);
                var n = t.data;
                return (
                    t.data &&
                        t.ids &&
                        ((n = ct.createFrame(t.data)),
                        (n.contextPath = ct.appendContextPath(
                            t.data.contextPath,
                            t.ids[0],
                        ))),
                    i(e, {
                        data: n,
                        blockParams: ct.blockParams([e], [n && n.contextPath]),
                    })
                );
            });
        };
        Ss.exports = nr.default;
    });
    var Si = v((sr) => {
        "use strict";
        sr.__esModule = !0;
        sr.registerDefaultHelpers = jc;
        sr.moveHelperToHooks = Uc;
        function Se(r) {
            return r && r.__esModule ? r : { default: r };
        }
        var Rc = us(),
            Nc = Se(Rc),
            qc = hs(),
            Oc = Se(qc),
            Hc = fs(),
            zc = Se(Hc),
            Bc = vs(),
            Fc = Se(Bc),
            Dc = _s(),
            Vc = Se(Dc),
            Kc = ws(),
            Zc = Se(Kc),
            Gc = xs(),
            Wc = Se(Gc);
        function jc(r) {
            Nc.default(r),
                Oc.default(r),
                zc.default(r),
                Fc.default(r),
                Vc.default(r),
                Zc.default(r),
                Wc.default(r);
        }
        function Uc(r, e, t) {
            r.helpers[e] &&
                ((r.hooks[e] = r.helpers[e]), t || delete r.helpers[e]);
        }
    });
    var Ls = v((or, Cs) => {
        "use strict";
        or.__esModule = !0;
        var Jc = F();
        or.default = function (r) {
            r.registerDecorator("inline", function (e, t, i, n) {
                var s = e;
                return (
                    t.partials ||
                        ((t.partials = {}),
                        (s = function (o, a) {
                            var c = i.partials;
                            i.partials = Jc.extend({}, c, t.partials);
                            var l = e(o, a);
                            return (i.partials = c), l;
                        })),
                    (t.partials[n.args[0]] = n.fn),
                    s
                );
            });
        };
        Cs.exports = or.default;
    });
    var Ps = v((xi) => {
        "use strict";
        xi.__esModule = !0;
        xi.registerDefaultDecorators = Yc;
        function Qc(r) {
            return r && r.__esModule ? r : { default: r };
        }
        var $c = Ls(),
            Xc = Qc($c);
        function Yc(r) {
            Xc.default(r);
        }
    });
    var Ci = v((ar, Ts) => {
        "use strict";
        ar.__esModule = !0;
        var eu = F(),
            Ze = {
                methodMap: ["debug", "info", "warn", "error"],
                level: "info",
                lookupLevel: function (e) {
                    if (typeof e == "string") {
                        var t = eu.indexOf(Ze.methodMap, e.toLowerCase());
                        t >= 0 ? (e = t) : (e = parseInt(e, 10));
                    }
                    return e;
                },
                log: function (e) {
                    if (
                        ((e = Ze.lookupLevel(e)),
                        typeof console < "u" && Ze.lookupLevel(Ze.level) <= e)
                    ) {
                        var t = Ze.methodMap[e];
                        console[t] || (t = "log");
                        for (
                            var i = arguments.length,
                                n = Array(i > 1 ? i - 1 : 0),
                                s = 1;
                            s < i;
                            s++
                        )
                            n[s - 1] = arguments[s];
                        console[t].apply(console, n);
                    }
                },
            };
        ar.default = Ze;
        Ts.exports = ar.default;
    });
    var Is = v((Li) => {
        "use strict";
        Li.__esModule = !0;
        Li.createNewLookupObject = ru;
        var tu = F();
        function ru() {
            for (var r = arguments.length, e = Array(r), t = 0; t < r; t++)
                e[t] = arguments[t];
            return tu.extend.apply(void 0, [Object.create(null)].concat(e));
        }
    });
    var Pi = v((ut) => {
        "use strict";
        ut.__esModule = !0;
        ut.createProtoAccessControl = ou;
        ut.resultIsAllowed = au;
        ut.resetLoggedProperties = cu;
        function iu(r) {
            return r && r.__esModule ? r : { default: r };
        }
        var Es = Is(),
            nu = Ci(),
            su = iu(nu),
            lr = Object.create(null);
        function ou(r) {
            var e = Object.create(null);
            (e.constructor = !1),
                (e.__defineGetter__ = !1),
                (e.__defineSetter__ = !1),
                (e.__lookupGetter__ = !1);
            var t = Object.create(null);
            return (
                (t.__proto__ = !1),
                {
                    properties: {
                        whitelist: Es.createNewLookupObject(
                            t,
                            r.allowedProtoProperties,
                        ),
                        defaultValue: r.allowProtoPropertiesByDefault,
                    },
                    methods: {
                        whitelist: Es.createNewLookupObject(
                            e,
                            r.allowedProtoMethods,
                        ),
                        defaultValue: r.allowProtoMethodsByDefault,
                    },
                }
            );
        }
        function au(r, e, t) {
            return Ms(typeof r == "function" ? e.methods : e.properties, t);
        }
        function Ms(r, e) {
            return r.whitelist[e] !== void 0
                ? r.whitelist[e] === !0
                : r.defaultValue !== void 0
                  ? r.defaultValue
                  : (lu(e), !1);
        }
        function lu(r) {
            lr[r] !== !0 &&
                ((lr[r] = !0),
                su.default.log(
                    "error",
                    'Handlebars: Access has been denied to resolve the property "' +
                        r +
                        `" because it is not an "own property" of its parent.
You can add a runtime option to disable the check or this warning:
See https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details`,
                ));
        }
        function cu() {
            Object.keys(lr).forEach(function (r) {
                delete lr[r];
            });
        }
    });
    var ur = v((re) => {
        "use strict";
        re.__esModule = !0;
        re.HandlebarsEnvironment = Ei;
        function As(r) {
            return r && r.__esModule ? r : { default: r };
        }
        var xe = F(),
            uu = J(),
            Ti = As(uu),
            du = Si(),
            hu = Ps(),
            pu = Ci(),
            cr = As(pu),
            fu = Pi(),
            mu = "4.7.8";
        re.VERSION = mu;
        var gu = 8;
        re.COMPILER_REVISION = gu;
        var bu = 7;
        re.LAST_COMPATIBLE_COMPILER_REVISION = bu;
        var vu = {
            1: "<= 1.0.rc.2",
            2: "== 1.0.0-rc.3",
            3: "== 1.0.0-rc.4",
            4: "== 1.x.x",
            5: "== 2.0.0-alpha.x",
            6: ">= 2.0.0-beta.1",
            7: ">= 4.0.0 <4.3.0",
            8: ">= 4.3.0",
        };
        re.REVISION_CHANGES = vu;
        var Ii = "[object Object]";
        function Ei(r, e, t) {
            (this.helpers = r || {}),
                (this.partials = e || {}),
                (this.decorators = t || {}),
                du.registerDefaultHelpers(this),
                hu.registerDefaultDecorators(this);
        }
        Ei.prototype = {
            constructor: Ei,
            logger: cr.default,
            log: cr.default.log,
            registerHelper: function (e, t) {
                if (xe.toString.call(e) === Ii) {
                    if (t)
                        throw new Ti.default(
                            "Arg not supported with multiple helpers",
                        );
                    xe.extend(this.helpers, e);
                } else this.helpers[e] = t;
            },
            unregisterHelper: function (e) {
                delete this.helpers[e];
            },
            registerPartial: function (e, t) {
                if (xe.toString.call(e) === Ii) xe.extend(this.partials, e);
                else {
                    if (typeof t > "u")
                        throw new Ti.default(
                            'Attempting to register a partial called "' +
                                e +
                                '" as undefined',
                        );
                    this.partials[e] = t;
                }
            },
            unregisterPartial: function (e) {
                delete this.partials[e];
            },
            registerDecorator: function (e, t) {
                if (xe.toString.call(e) === Ii) {
                    if (t)
                        throw new Ti.default(
                            "Arg not supported with multiple decorators",
                        );
                    xe.extend(this.decorators, e);
                } else this.decorators[e] = t;
            },
            unregisterDecorator: function (e) {
                delete this.decorators[e];
            },
            resetLoggedPropertyAccesses: function () {
                fu.resetLoggedProperties();
            },
        };
        var yu = cr.default.log;
        re.log = yu;
        re.createFrame = xe.createFrame;
        re.logger = cr.default;
    });
    var Ns = v((dr, Rs) => {
        "use strict";
        dr.__esModule = !0;
        function Mi(r) {
            this.string = r;
        }
        Mi.prototype.toString = Mi.prototype.toHTML = function () {
            return "" + this.string;
        };
        dr.default = Mi;
        Rs.exports = dr.default;
    });
    var qs = v((Ai) => {
        "use strict";
        Ai.__esModule = !0;
        Ai.wrapHelper = _u;
        function _u(r, e) {
            if (typeof r != "function") return r;
            var t = function () {
                var n = arguments[arguments.length - 1];
                return (
                    (arguments[arguments.length - 1] = e(n)),
                    r.apply(this, arguments)
                );
            };
            return t;
        }
    });
    var Fs = v((be) => {
        "use strict";
        be.__esModule = !0;
        be.checkRevision = Lu;
        be.template = Pu;
        be.wrapProgram = hr;
        be.resolvePartial = Tu;
        be.invokePartial = Iu;
        be.noop = zs;
        function ku(r) {
            return r && r.__esModule ? r : { default: r };
        }
        function wu(r) {
            if (r && r.__esModule) return r;
            var e = {};
            if (r != null)
                for (var t in r)
                    Object.prototype.hasOwnProperty.call(r, t) && (e[t] = r[t]);
            return (e.default = r), e;
        }
        var Su = F(),
            ae = wu(Su),
            xu = J(),
            le = ku(xu),
            ce = ur(),
            Os = Si(),
            Cu = qs(),
            Hs = Pi();
        function Lu(r) {
            var e = (r && r[0]) || 1,
                t = ce.COMPILER_REVISION;
            if (
                !(
                    e >= ce.LAST_COMPATIBLE_COMPILER_REVISION &&
                    e <= ce.COMPILER_REVISION
                )
            )
                if (e < ce.LAST_COMPATIBLE_COMPILER_REVISION) {
                    var i = ce.REVISION_CHANGES[t],
                        n = ce.REVISION_CHANGES[e];
                    throw new le.default(
                        "Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" +
                            i +
                            ") or downgrade your runtime to an older version (" +
                            n +
                            ").",
                    );
                } else
                    throw new le.default(
                        "Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" +
                            r[1] +
                            ").",
                    );
        }
        function Pu(r, e) {
            if (!e) throw new le.default("No environment passed to template");
            if (!r || !r.main)
                throw new le.default("Unknown template object: " + typeof r);
            (r.main.decorator = r.main_d), e.VM.checkRevision(r.compiler);
            var t = r.compiler && r.compiler[0] === 7;
            function i(o, a, c) {
                c.hash &&
                    ((a = ae.extend({}, a, c.hash)), c.ids && (c.ids[0] = !0)),
                    (o = e.VM.resolvePartial.call(this, o, a, c));
                var l = ae.extend({}, c, {
                        hooks: this.hooks,
                        protoAccessControl: this.protoAccessControl,
                    }),
                    d = e.VM.invokePartial.call(this, o, a, l);
                if (
                    (d == null &&
                        e.compile &&
                        ((c.partials[c.name] = e.compile(
                            o,
                            r.compilerOptions,
                            e,
                        )),
                        (d = c.partials[c.name](a, l))),
                    d != null)
                ) {
                    if (c.indent) {
                        for (
                            var u = d.split(`
`),
                                h = 0,
                                f = u.length;
                            h < f && !(!u[h] && h + 1 === f);
                            h++
                        )
                            u[h] = c.indent + u[h];
                        d = u.join(`
`);
                    }
                    return d;
                } else
                    throw new le.default(
                        "The partial " +
                            c.name +
                            " could not be compiled when running in runtime-only mode",
                    );
            }
            var n = {
                strict: function (a, c, l) {
                    if (!a || !(c in a))
                        throw new le.default(
                            '"' + c + '" not defined in ' + a,
                            { loc: l },
                        );
                    return n.lookupProperty(a, c);
                },
                lookupProperty: function (a, c) {
                    var l = a[c];
                    if (
                        l == null ||
                        Object.prototype.hasOwnProperty.call(a, c) ||
                        Hs.resultIsAllowed(l, n.protoAccessControl, c)
                    )
                        return l;
                },
                lookup: function (a, c) {
                    for (var l = a.length, d = 0; d < l; d++) {
                        var u = a[d] && n.lookupProperty(a[d], c);
                        if (u != null) return a[d][c];
                    }
                },
                lambda: function (a, c) {
                    return typeof a == "function" ? a.call(c) : a;
                },
                escapeExpression: ae.escapeExpression,
                invokePartial: i,
                fn: function (a) {
                    var c = r[a];
                    return (c.decorator = r[a + "_d"]), c;
                },
                programs: [],
                program: function (a, c, l, d, u) {
                    var h = this.programs[a],
                        f = this.fn(a);
                    return (
                        c || u || d || l
                            ? (h = hr(this, a, f, c, l, d, u))
                            : h || (h = this.programs[a] = hr(this, a, f)),
                        h
                    );
                },
                data: function (a, c) {
                    for (; a && c--; ) a = a._parent;
                    return a;
                },
                mergeIfNeeded: function (a, c) {
                    var l = a || c;
                    return a && c && a !== c && (l = ae.extend({}, c, a)), l;
                },
                nullContext: Object.seal({}),
                noop: e.VM.noop,
                compilerInfo: r.compiler,
            };
            function s(o) {
                var a =
                        arguments.length <= 1 || arguments[1] === void 0
                            ? {}
                            : arguments[1],
                    c = a.data;
                s._setup(a), !a.partial && r.useData && (c = Eu(o, c));
                var l = void 0,
                    d = r.useBlockParams ? [] : void 0;
                r.useDepths &&
                    (a.depths
                        ? (l =
                              o != a.depths[0]
                                  ? [o].concat(a.depths)
                                  : a.depths)
                        : (l = [o]));
                function u(h) {
                    return "" + r.main(n, h, n.helpers, n.partials, c, d, l);
                }
                return (u = Bs(r.main, u, n, a.depths || [], c, d)), u(o, a);
            }
            return (
                (s.isTop = !0),
                (s._setup = function (o) {
                    if (o.partial)
                        (n.protoAccessControl = o.protoAccessControl),
                            (n.helpers = o.helpers),
                            (n.partials = o.partials),
                            (n.decorators = o.decorators),
                            (n.hooks = o.hooks);
                    else {
                        var a = ae.extend({}, e.helpers, o.helpers);
                        Mu(a, n),
                            (n.helpers = a),
                            r.usePartial &&
                                (n.partials = n.mergeIfNeeded(
                                    o.partials,
                                    e.partials,
                                )),
                            (r.usePartial || r.useDecorators) &&
                                (n.decorators = ae.extend(
                                    {},
                                    e.decorators,
                                    o.decorators,
                                )),
                            (n.hooks = {}),
                            (n.protoAccessControl =
                                Hs.createProtoAccessControl(o));
                        var c = o.allowCallsToHelperMissing || t;
                        Os.moveHelperToHooks(n, "helperMissing", c),
                            Os.moveHelperToHooks(n, "blockHelperMissing", c);
                    }
                }),
                (s._child = function (o, a, c, l) {
                    if (r.useBlockParams && !c)
                        throw new le.default("must pass block params");
                    if (r.useDepths && !l)
                        throw new le.default("must pass parent depths");
                    return hr(n, o, r[o], a, 0, c, l);
                }),
                s
            );
        }
        function hr(r, e, t, i, n, s, o) {
            function a(c) {
                var l =
                        arguments.length <= 1 || arguments[1] === void 0
                            ? {}
                            : arguments[1],
                    d = o;
                return (
                    o &&
                        c != o[0] &&
                        !(c === r.nullContext && o[0] === null) &&
                        (d = [c].concat(o)),
                    t(
                        r,
                        c,
                        r.helpers,
                        r.partials,
                        l.data || i,
                        s && [l.blockParams].concat(s),
                        d,
                    )
                );
            }
            return (
                (a = Bs(t, a, r, o, i, s)),
                (a.program = e),
                (a.depth = o ? o.length : 0),
                (a.blockParams = n || 0),
                a
            );
        }
        function Tu(r, e, t) {
            return (
                r
                    ? !r.call && !t.name && ((t.name = r), (r = t.partials[r]))
                    : t.name === "@partial-block"
                      ? (r = t.data["partial-block"])
                      : (r = t.partials[t.name]),
                r
            );
        }
        function Iu(r, e, t) {
            var i = t.data && t.data["partial-block"];
            (t.partial = !0),
                t.ids && (t.data.contextPath = t.ids[0] || t.data.contextPath);
            var n = void 0;
            if (
                (t.fn &&
                    t.fn !== zs &&
                    (function () {
                        t.data = ce.createFrame(t.data);
                        var s = t.fn;
                        (n = t.data["partial-block"] =
                            function (a) {
                                var c =
                                    arguments.length <= 1 ||
                                    arguments[1] === void 0
                                        ? {}
                                        : arguments[1];
                                return (
                                    (c.data = ce.createFrame(c.data)),
                                    (c.data["partial-block"] = i),
                                    s(a, c)
                                );
                            }),
                            s.partials &&
                                (t.partials = ae.extend(
                                    {},
                                    t.partials,
                                    s.partials,
                                ));
                    })(),
                r === void 0 && n && (r = n),
                r === void 0)
            )
                throw new le.default(
                    "The partial " + t.name + " could not be found",
                );
            if (r instanceof Function) return r(e, t);
        }
        function zs() {
            return "";
        }
        function Eu(r, e) {
            return (
                (!e || !("root" in e)) &&
                    ((e = e ? ce.createFrame(e) : {}), (e.root = r)),
                e
            );
        }
        function Bs(r, e, t, i, n, s) {
            if (r.decorator) {
                var o = {};
                (e = r.decorator(e, o, t, i && i[0], n, s, i)), ae.extend(e, o);
            }
            return e;
        }
        function Mu(r, e) {
            Object.keys(r).forEach(function (t) {
                var i = r[t];
                r[t] = Au(i, e);
            });
        }
        function Au(r, e) {
            var t = e.lookupProperty;
            return Cu.wrapHelper(r, function (i) {
                return ae.extend({ lookupProperty: t }, i);
            });
        }
    });
    var Ri = v((pr, Ds) => {
        "use strict";
        pr.__esModule = !0;
        pr.default = function (r) {
            (function () {
                typeof globalThis != "object" &&
                    (Object.prototype.__defineGetter__(
                        "__magic__",
                        function () {
                            return this;
                        },
                    ),
                    (__magic__.globalThis = __magic__),
                    delete Object.prototype.__magic__);
            })();
            var e = globalThis.Handlebars;
            r.noConflict = function () {
                return (
                    globalThis.Handlebars === r && (globalThis.Handlebars = e),
                    r
                );
            };
        };
        Ds.exports = pr.default;
    });
    var Ws = v((fr, Gs) => {
        "use strict";
        fr.__esModule = !0;
        function qi(r) {
            return r && r.__esModule ? r : { default: r };
        }
        function Oi(r) {
            if (r && r.__esModule) return r;
            var e = {};
            if (r != null)
                for (var t in r)
                    Object.prototype.hasOwnProperty.call(r, t) && (e[t] = r[t]);
            return (e.default = r), e;
        }
        var Ru = ur(),
            Vs = Oi(Ru),
            Nu = Ns(),
            qu = qi(Nu),
            Ou = J(),
            Hu = qi(Ou),
            zu = F(),
            Ni = Oi(zu),
            Bu = Fs(),
            Ks = Oi(Bu),
            Fu = Ri(),
            Du = qi(Fu);
        function Zs() {
            var r = new Vs.HandlebarsEnvironment();
            return (
                Ni.extend(r, Vs),
                (r.SafeString = qu.default),
                (r.Exception = Hu.default),
                (r.Utils = Ni),
                (r.escapeExpression = Ni.escapeExpression),
                (r.VM = Ks),
                (r.template = function (e) {
                    return Ks.template(e, r);
                }),
                r
            );
        }
        var dt = Zs();
        dt.create = Zs;
        Du.default(dt);
        dt.default = dt;
        fr.default = dt;
        Gs.exports = fr.default;
    });
    var Hi = v((mr, Us) => {
        "use strict";
        mr.__esModule = !0;
        var js = {
            helpers: {
                helperExpression: function (e) {
                    return (
                        e.type === "SubExpression" ||
                        ((e.type === "MustacheStatement" ||
                            e.type === "BlockStatement") &&
                            !!((e.params && e.params.length) || e.hash))
                    );
                },
                scopedId: function (e) {
                    return /^\.|this\b/.test(e.original);
                },
                simpleId: function (e) {
                    return (
                        e.parts.length === 1 &&
                        !js.helpers.scopedId(e) &&
                        !e.depth
                    );
                },
            },
        };
        mr.default = js;
        Us.exports = mr.default;
    });
    var Qs = v((gr, Js) => {
        "use strict";
        gr.__esModule = !0;
        var Vu = (function () {
            var r = {
                    trace: function () {},
                    yy: {},
                    symbols_: {
                        error: 2,
                        root: 3,
                        program: 4,
                        EOF: 5,
                        program_repetition0: 6,
                        statement: 7,
                        mustache: 8,
                        block: 9,
                        rawBlock: 10,
                        partial: 11,
                        partialBlock: 12,
                        content: 13,
                        COMMENT: 14,
                        CONTENT: 15,
                        openRawBlock: 16,
                        rawBlock_repetition0: 17,
                        END_RAW_BLOCK: 18,
                        OPEN_RAW_BLOCK: 19,
                        helperName: 20,
                        openRawBlock_repetition0: 21,
                        openRawBlock_option0: 22,
                        CLOSE_RAW_BLOCK: 23,
                        openBlock: 24,
                        block_option0: 25,
                        closeBlock: 26,
                        openInverse: 27,
                        block_option1: 28,
                        OPEN_BLOCK: 29,
                        openBlock_repetition0: 30,
                        openBlock_option0: 31,
                        openBlock_option1: 32,
                        CLOSE: 33,
                        OPEN_INVERSE: 34,
                        openInverse_repetition0: 35,
                        openInverse_option0: 36,
                        openInverse_option1: 37,
                        openInverseChain: 38,
                        OPEN_INVERSE_CHAIN: 39,
                        openInverseChain_repetition0: 40,
                        openInverseChain_option0: 41,
                        openInverseChain_option1: 42,
                        inverseAndProgram: 43,
                        INVERSE: 44,
                        inverseChain: 45,
                        inverseChain_option0: 46,
                        OPEN_ENDBLOCK: 47,
                        OPEN: 48,
                        mustache_repetition0: 49,
                        mustache_option0: 50,
                        OPEN_UNESCAPED: 51,
                        mustache_repetition1: 52,
                        mustache_option1: 53,
                        CLOSE_UNESCAPED: 54,
                        OPEN_PARTIAL: 55,
                        partialName: 56,
                        partial_repetition0: 57,
                        partial_option0: 58,
                        openPartialBlock: 59,
                        OPEN_PARTIAL_BLOCK: 60,
                        openPartialBlock_repetition0: 61,
                        openPartialBlock_option0: 62,
                        param: 63,
                        sexpr: 64,
                        OPEN_SEXPR: 65,
                        sexpr_repetition0: 66,
                        sexpr_option0: 67,
                        CLOSE_SEXPR: 68,
                        hash: 69,
                        hash_repetition_plus0: 70,
                        hashSegment: 71,
                        ID: 72,
                        EQUALS: 73,
                        blockParams: 74,
                        OPEN_BLOCK_PARAMS: 75,
                        blockParams_repetition_plus0: 76,
                        CLOSE_BLOCK_PARAMS: 77,
                        path: 78,
                        dataName: 79,
                        STRING: 80,
                        NUMBER: 81,
                        BOOLEAN: 82,
                        UNDEFINED: 83,
                        NULL: 84,
                        DATA: 85,
                        pathSegments: 86,
                        SEP: 87,
                        $accept: 0,
                        $end: 1,
                    },
                    terminals_: {
                        2: "error",
                        5: "EOF",
                        14: "COMMENT",
                        15: "CONTENT",
                        18: "END_RAW_BLOCK",
                        19: "OPEN_RAW_BLOCK",
                        23: "CLOSE_RAW_BLOCK",
                        29: "OPEN_BLOCK",
                        33: "CLOSE",
                        34: "OPEN_INVERSE",
                        39: "OPEN_INVERSE_CHAIN",
                        44: "INVERSE",
                        47: "OPEN_ENDBLOCK",
                        48: "OPEN",
                        51: "OPEN_UNESCAPED",
                        54: "CLOSE_UNESCAPED",
                        55: "OPEN_PARTIAL",
                        60: "OPEN_PARTIAL_BLOCK",
                        65: "OPEN_SEXPR",
                        68: "CLOSE_SEXPR",
                        72: "ID",
                        73: "EQUALS",
                        75: "OPEN_BLOCK_PARAMS",
                        77: "CLOSE_BLOCK_PARAMS",
                        80: "STRING",
                        81: "NUMBER",
                        82: "BOOLEAN",
                        83: "UNDEFINED",
                        84: "NULL",
                        85: "DATA",
                        87: "SEP",
                    },
                    productions_: [
                        0,
                        [3, 2],
                        [4, 1],
                        [7, 1],
                        [7, 1],
                        [7, 1],
                        [7, 1],
                        [7, 1],
                        [7, 1],
                        [7, 1],
                        [13, 1],
                        [10, 3],
                        [16, 5],
                        [9, 4],
                        [9, 4],
                        [24, 6],
                        [27, 6],
                        [38, 6],
                        [43, 2],
                        [45, 3],
                        [45, 1],
                        [26, 3],
                        [8, 5],
                        [8, 5],
                        [11, 5],
                        [12, 3],
                        [59, 5],
                        [63, 1],
                        [63, 1],
                        [64, 5],
                        [69, 1],
                        [71, 3],
                        [74, 3],
                        [20, 1],
                        [20, 1],
                        [20, 1],
                        [20, 1],
                        [20, 1],
                        [20, 1],
                        [20, 1],
                        [56, 1],
                        [56, 1],
                        [79, 2],
                        [78, 1],
                        [86, 3],
                        [86, 1],
                        [6, 0],
                        [6, 2],
                        [17, 0],
                        [17, 2],
                        [21, 0],
                        [21, 2],
                        [22, 0],
                        [22, 1],
                        [25, 0],
                        [25, 1],
                        [28, 0],
                        [28, 1],
                        [30, 0],
                        [30, 2],
                        [31, 0],
                        [31, 1],
                        [32, 0],
                        [32, 1],
                        [35, 0],
                        [35, 2],
                        [36, 0],
                        [36, 1],
                        [37, 0],
                        [37, 1],
                        [40, 0],
                        [40, 2],
                        [41, 0],
                        [41, 1],
                        [42, 0],
                        [42, 1],
                        [46, 0],
                        [46, 1],
                        [49, 0],
                        [49, 2],
                        [50, 0],
                        [50, 1],
                        [52, 0],
                        [52, 2],
                        [53, 0],
                        [53, 1],
                        [57, 0],
                        [57, 2],
                        [58, 0],
                        [58, 1],
                        [61, 0],
                        [61, 2],
                        [62, 0],
                        [62, 1],
                        [66, 0],
                        [66, 2],
                        [67, 0],
                        [67, 1],
                        [70, 1],
                        [70, 2],
                        [76, 1],
                        [76, 2],
                    ],
                    performAction: function (n, s, o, a, c, l, d) {
                        var u = l.length - 1;
                        switch (c) {
                            case 1:
                                return l[u - 1];
                            case 2:
                                this.$ = a.prepareProgram(l[u]);
                                break;
                            case 3:
                                this.$ = l[u];
                                break;
                            case 4:
                                this.$ = l[u];
                                break;
                            case 5:
                                this.$ = l[u];
                                break;
                            case 6:
                                this.$ = l[u];
                                break;
                            case 7:
                                this.$ = l[u];
                                break;
                            case 8:
                                this.$ = l[u];
                                break;
                            case 9:
                                this.$ = {
                                    type: "CommentStatement",
                                    value: a.stripComment(l[u]),
                                    strip: a.stripFlags(l[u], l[u]),
                                    loc: a.locInfo(this._$),
                                };
                                break;
                            case 10:
                                this.$ = {
                                    type: "ContentStatement",
                                    original: l[u],
                                    value: l[u],
                                    loc: a.locInfo(this._$),
                                };
                                break;
                            case 11:
                                this.$ = a.prepareRawBlock(
                                    l[u - 2],
                                    l[u - 1],
                                    l[u],
                                    this._$,
                                );
                                break;
                            case 12:
                                this.$ = {
                                    path: l[u - 3],
                                    params: l[u - 2],
                                    hash: l[u - 1],
                                };
                                break;
                            case 13:
                                this.$ = a.prepareBlock(
                                    l[u - 3],
                                    l[u - 2],
                                    l[u - 1],
                                    l[u],
                                    !1,
                                    this._$,
                                );
                                break;
                            case 14:
                                this.$ = a.prepareBlock(
                                    l[u - 3],
                                    l[u - 2],
                                    l[u - 1],
                                    l[u],
                                    !0,
                                    this._$,
                                );
                                break;
                            case 15:
                                this.$ = {
                                    open: l[u - 5],
                                    path: l[u - 4],
                                    params: l[u - 3],
                                    hash: l[u - 2],
                                    blockParams: l[u - 1],
                                    strip: a.stripFlags(l[u - 5], l[u]),
                                };
                                break;
                            case 16:
                                this.$ = {
                                    path: l[u - 4],
                                    params: l[u - 3],
                                    hash: l[u - 2],
                                    blockParams: l[u - 1],
                                    strip: a.stripFlags(l[u - 5], l[u]),
                                };
                                break;
                            case 17:
                                this.$ = {
                                    path: l[u - 4],
                                    params: l[u - 3],
                                    hash: l[u - 2],
                                    blockParams: l[u - 1],
                                    strip: a.stripFlags(l[u - 5], l[u]),
                                };
                                break;
                            case 18:
                                this.$ = {
                                    strip: a.stripFlags(l[u - 1], l[u - 1]),
                                    program: l[u],
                                };
                                break;
                            case 19:
                                var h = a.prepareBlock(
                                        l[u - 2],
                                        l[u - 1],
                                        l[u],
                                        l[u],
                                        !1,
                                        this._$,
                                    ),
                                    f = a.prepareProgram([h], l[u - 1].loc);
                                (f.chained = !0),
                                    (this.$ = {
                                        strip: l[u - 2].strip,
                                        program: f,
                                        chain: !0,
                                    });
                                break;
                            case 20:
                                this.$ = l[u];
                                break;
                            case 21:
                                this.$ = {
                                    path: l[u - 1],
                                    strip: a.stripFlags(l[u - 2], l[u]),
                                };
                                break;
                            case 22:
                                this.$ = a.prepareMustache(
                                    l[u - 3],
                                    l[u - 2],
                                    l[u - 1],
                                    l[u - 4],
                                    a.stripFlags(l[u - 4], l[u]),
                                    this._$,
                                );
                                break;
                            case 23:
                                this.$ = a.prepareMustache(
                                    l[u - 3],
                                    l[u - 2],
                                    l[u - 1],
                                    l[u - 4],
                                    a.stripFlags(l[u - 4], l[u]),
                                    this._$,
                                );
                                break;
                            case 24:
                                this.$ = {
                                    type: "PartialStatement",
                                    name: l[u - 3],
                                    params: l[u - 2],
                                    hash: l[u - 1],
                                    indent: "",
                                    strip: a.stripFlags(l[u - 4], l[u]),
                                    loc: a.locInfo(this._$),
                                };
                                break;
                            case 25:
                                this.$ = a.preparePartialBlock(
                                    l[u - 2],
                                    l[u - 1],
                                    l[u],
                                    this._$,
                                );
                                break;
                            case 26:
                                this.$ = {
                                    path: l[u - 3],
                                    params: l[u - 2],
                                    hash: l[u - 1],
                                    strip: a.stripFlags(l[u - 4], l[u]),
                                };
                                break;
                            case 27:
                                this.$ = l[u];
                                break;
                            case 28:
                                this.$ = l[u];
                                break;
                            case 29:
                                this.$ = {
                                    type: "SubExpression",
                                    path: l[u - 3],
                                    params: l[u - 2],
                                    hash: l[u - 1],
                                    loc: a.locInfo(this._$),
                                };
                                break;
                            case 30:
                                this.$ = {
                                    type: "Hash",
                                    pairs: l[u],
                                    loc: a.locInfo(this._$),
                                };
                                break;
                            case 31:
                                this.$ = {
                                    type: "HashPair",
                                    key: a.id(l[u - 2]),
                                    value: l[u],
                                    loc: a.locInfo(this._$),
                                };
                                break;
                            case 32:
                                this.$ = a.id(l[u - 1]);
                                break;
                            case 33:
                                this.$ = l[u];
                                break;
                            case 34:
                                this.$ = l[u];
                                break;
                            case 35:
                                this.$ = {
                                    type: "StringLiteral",
                                    value: l[u],
                                    original: l[u],
                                    loc: a.locInfo(this._$),
                                };
                                break;
                            case 36:
                                this.$ = {
                                    type: "NumberLiteral",
                                    value: Number(l[u]),
                                    original: Number(l[u]),
                                    loc: a.locInfo(this._$),
                                };
                                break;
                            case 37:
                                this.$ = {
                                    type: "BooleanLiteral",
                                    value: l[u] === "true",
                                    original: l[u] === "true",
                                    loc: a.locInfo(this._$),
                                };
                                break;
                            case 38:
                                this.$ = {
                                    type: "UndefinedLiteral",
                                    original: void 0,
                                    value: void 0,
                                    loc: a.locInfo(this._$),
                                };
                                break;
                            case 39:
                                this.$ = {
                                    type: "NullLiteral",
                                    original: null,
                                    value: null,
                                    loc: a.locInfo(this._$),
                                };
                                break;
                            case 40:
                                this.$ = l[u];
                                break;
                            case 41:
                                this.$ = l[u];
                                break;
                            case 42:
                                this.$ = a.preparePath(!0, l[u], this._$);
                                break;
                            case 43:
                                this.$ = a.preparePath(!1, l[u], this._$);
                                break;
                            case 44:
                                l[u - 2].push({
                                    part: a.id(l[u]),
                                    original: l[u],
                                    separator: l[u - 1],
                                }),
                                    (this.$ = l[u - 2]);
                                break;
                            case 45:
                                this.$ = [{ part: a.id(l[u]), original: l[u] }];
                                break;
                            case 46:
                                this.$ = [];
                                break;
                            case 47:
                                l[u - 1].push(l[u]);
                                break;
                            case 48:
                                this.$ = [];
                                break;
                            case 49:
                                l[u - 1].push(l[u]);
                                break;
                            case 50:
                                this.$ = [];
                                break;
                            case 51:
                                l[u - 1].push(l[u]);
                                break;
                            case 58:
                                this.$ = [];
                                break;
                            case 59:
                                l[u - 1].push(l[u]);
                                break;
                            case 64:
                                this.$ = [];
                                break;
                            case 65:
                                l[u - 1].push(l[u]);
                                break;
                            case 70:
                                this.$ = [];
                                break;
                            case 71:
                                l[u - 1].push(l[u]);
                                break;
                            case 78:
                                this.$ = [];
                                break;
                            case 79:
                                l[u - 1].push(l[u]);
                                break;
                            case 82:
                                this.$ = [];
                                break;
                            case 83:
                                l[u - 1].push(l[u]);
                                break;
                            case 86:
                                this.$ = [];
                                break;
                            case 87:
                                l[u - 1].push(l[u]);
                                break;
                            case 90:
                                this.$ = [];
                                break;
                            case 91:
                                l[u - 1].push(l[u]);
                                break;
                            case 94:
                                this.$ = [];
                                break;
                            case 95:
                                l[u - 1].push(l[u]);
                                break;
                            case 98:
                                this.$ = [l[u]];
                                break;
                            case 99:
                                l[u - 1].push(l[u]);
                                break;
                            case 100:
                                this.$ = [l[u]];
                                break;
                            case 101:
                                l[u - 1].push(l[u]);
                                break;
                        }
                    },
                    table: [
                        {
                            3: 1,
                            4: 2,
                            5: [2, 46],
                            6: 3,
                            14: [2, 46],
                            15: [2, 46],
                            19: [2, 46],
                            29: [2, 46],
                            34: [2, 46],
                            48: [2, 46],
                            51: [2, 46],
                            55: [2, 46],
                            60: [2, 46],
                        },
                        { 1: [3] },
                        { 5: [1, 4] },
                        {
                            5: [2, 2],
                            7: 5,
                            8: 6,
                            9: 7,
                            10: 8,
                            11: 9,
                            12: 10,
                            13: 11,
                            14: [1, 12],
                            15: [1, 20],
                            16: 17,
                            19: [1, 23],
                            24: 15,
                            27: 16,
                            29: [1, 21],
                            34: [1, 22],
                            39: [2, 2],
                            44: [2, 2],
                            47: [2, 2],
                            48: [1, 13],
                            51: [1, 14],
                            55: [1, 18],
                            59: 19,
                            60: [1, 24],
                        },
                        { 1: [2, 1] },
                        {
                            5: [2, 47],
                            14: [2, 47],
                            15: [2, 47],
                            19: [2, 47],
                            29: [2, 47],
                            34: [2, 47],
                            39: [2, 47],
                            44: [2, 47],
                            47: [2, 47],
                            48: [2, 47],
                            51: [2, 47],
                            55: [2, 47],
                            60: [2, 47],
                        },
                        {
                            5: [2, 3],
                            14: [2, 3],
                            15: [2, 3],
                            19: [2, 3],
                            29: [2, 3],
                            34: [2, 3],
                            39: [2, 3],
                            44: [2, 3],
                            47: [2, 3],
                            48: [2, 3],
                            51: [2, 3],
                            55: [2, 3],
                            60: [2, 3],
                        },
                        {
                            5: [2, 4],
                            14: [2, 4],
                            15: [2, 4],
                            19: [2, 4],
                            29: [2, 4],
                            34: [2, 4],
                            39: [2, 4],
                            44: [2, 4],
                            47: [2, 4],
                            48: [2, 4],
                            51: [2, 4],
                            55: [2, 4],
                            60: [2, 4],
                        },
                        {
                            5: [2, 5],
                            14: [2, 5],
                            15: [2, 5],
                            19: [2, 5],
                            29: [2, 5],
                            34: [2, 5],
                            39: [2, 5],
                            44: [2, 5],
                            47: [2, 5],
                            48: [2, 5],
                            51: [2, 5],
                            55: [2, 5],
                            60: [2, 5],
                        },
                        {
                            5: [2, 6],
                            14: [2, 6],
                            15: [2, 6],
                            19: [2, 6],
                            29: [2, 6],
                            34: [2, 6],
                            39: [2, 6],
                            44: [2, 6],
                            47: [2, 6],
                            48: [2, 6],
                            51: [2, 6],
                            55: [2, 6],
                            60: [2, 6],
                        },
                        {
                            5: [2, 7],
                            14: [2, 7],
                            15: [2, 7],
                            19: [2, 7],
                            29: [2, 7],
                            34: [2, 7],
                            39: [2, 7],
                            44: [2, 7],
                            47: [2, 7],
                            48: [2, 7],
                            51: [2, 7],
                            55: [2, 7],
                            60: [2, 7],
                        },
                        {
                            5: [2, 8],
                            14: [2, 8],
                            15: [2, 8],
                            19: [2, 8],
                            29: [2, 8],
                            34: [2, 8],
                            39: [2, 8],
                            44: [2, 8],
                            47: [2, 8],
                            48: [2, 8],
                            51: [2, 8],
                            55: [2, 8],
                            60: [2, 8],
                        },
                        {
                            5: [2, 9],
                            14: [2, 9],
                            15: [2, 9],
                            19: [2, 9],
                            29: [2, 9],
                            34: [2, 9],
                            39: [2, 9],
                            44: [2, 9],
                            47: [2, 9],
                            48: [2, 9],
                            51: [2, 9],
                            55: [2, 9],
                            60: [2, 9],
                        },
                        {
                            20: 25,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33,
                        },
                        {
                            20: 36,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33,
                        },
                        {
                            4: 37,
                            6: 3,
                            14: [2, 46],
                            15: [2, 46],
                            19: [2, 46],
                            29: [2, 46],
                            34: [2, 46],
                            39: [2, 46],
                            44: [2, 46],
                            47: [2, 46],
                            48: [2, 46],
                            51: [2, 46],
                            55: [2, 46],
                            60: [2, 46],
                        },
                        {
                            4: 38,
                            6: 3,
                            14: [2, 46],
                            15: [2, 46],
                            19: [2, 46],
                            29: [2, 46],
                            34: [2, 46],
                            44: [2, 46],
                            47: [2, 46],
                            48: [2, 46],
                            51: [2, 46],
                            55: [2, 46],
                            60: [2, 46],
                        },
                        { 15: [2, 48], 17: 39, 18: [2, 48] },
                        {
                            20: 41,
                            56: 40,
                            64: 42,
                            65: [1, 43],
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33,
                        },
                        {
                            4: 44,
                            6: 3,
                            14: [2, 46],
                            15: [2, 46],
                            19: [2, 46],
                            29: [2, 46],
                            34: [2, 46],
                            47: [2, 46],
                            48: [2, 46],
                            51: [2, 46],
                            55: [2, 46],
                            60: [2, 46],
                        },
                        {
                            5: [2, 10],
                            14: [2, 10],
                            15: [2, 10],
                            18: [2, 10],
                            19: [2, 10],
                            29: [2, 10],
                            34: [2, 10],
                            39: [2, 10],
                            44: [2, 10],
                            47: [2, 10],
                            48: [2, 10],
                            51: [2, 10],
                            55: [2, 10],
                            60: [2, 10],
                        },
                        {
                            20: 45,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33,
                        },
                        {
                            20: 46,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33,
                        },
                        {
                            20: 47,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33,
                        },
                        {
                            20: 41,
                            56: 48,
                            64: 42,
                            65: [1, 43],
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33,
                        },
                        {
                            33: [2, 78],
                            49: 49,
                            65: [2, 78],
                            72: [2, 78],
                            80: [2, 78],
                            81: [2, 78],
                            82: [2, 78],
                            83: [2, 78],
                            84: [2, 78],
                            85: [2, 78],
                        },
                        {
                            23: [2, 33],
                            33: [2, 33],
                            54: [2, 33],
                            65: [2, 33],
                            68: [2, 33],
                            72: [2, 33],
                            75: [2, 33],
                            80: [2, 33],
                            81: [2, 33],
                            82: [2, 33],
                            83: [2, 33],
                            84: [2, 33],
                            85: [2, 33],
                        },
                        {
                            23: [2, 34],
                            33: [2, 34],
                            54: [2, 34],
                            65: [2, 34],
                            68: [2, 34],
                            72: [2, 34],
                            75: [2, 34],
                            80: [2, 34],
                            81: [2, 34],
                            82: [2, 34],
                            83: [2, 34],
                            84: [2, 34],
                            85: [2, 34],
                        },
                        {
                            23: [2, 35],
                            33: [2, 35],
                            54: [2, 35],
                            65: [2, 35],
                            68: [2, 35],
                            72: [2, 35],
                            75: [2, 35],
                            80: [2, 35],
                            81: [2, 35],
                            82: [2, 35],
                            83: [2, 35],
                            84: [2, 35],
                            85: [2, 35],
                        },
                        {
                            23: [2, 36],
                            33: [2, 36],
                            54: [2, 36],
                            65: [2, 36],
                            68: [2, 36],
                            72: [2, 36],
                            75: [2, 36],
                            80: [2, 36],
                            81: [2, 36],
                            82: [2, 36],
                            83: [2, 36],
                            84: [2, 36],
                            85: [2, 36],
                        },
                        {
                            23: [2, 37],
                            33: [2, 37],
                            54: [2, 37],
                            65: [2, 37],
                            68: [2, 37],
                            72: [2, 37],
                            75: [2, 37],
                            80: [2, 37],
                            81: [2, 37],
                            82: [2, 37],
                            83: [2, 37],
                            84: [2, 37],
                            85: [2, 37],
                        },
                        {
                            23: [2, 38],
                            33: [2, 38],
                            54: [2, 38],
                            65: [2, 38],
                            68: [2, 38],
                            72: [2, 38],
                            75: [2, 38],
                            80: [2, 38],
                            81: [2, 38],
                            82: [2, 38],
                            83: [2, 38],
                            84: [2, 38],
                            85: [2, 38],
                        },
                        {
                            23: [2, 39],
                            33: [2, 39],
                            54: [2, 39],
                            65: [2, 39],
                            68: [2, 39],
                            72: [2, 39],
                            75: [2, 39],
                            80: [2, 39],
                            81: [2, 39],
                            82: [2, 39],
                            83: [2, 39],
                            84: [2, 39],
                            85: [2, 39],
                        },
                        {
                            23: [2, 43],
                            33: [2, 43],
                            54: [2, 43],
                            65: [2, 43],
                            68: [2, 43],
                            72: [2, 43],
                            75: [2, 43],
                            80: [2, 43],
                            81: [2, 43],
                            82: [2, 43],
                            83: [2, 43],
                            84: [2, 43],
                            85: [2, 43],
                            87: [1, 50],
                        },
                        { 72: [1, 35], 86: 51 },
                        {
                            23: [2, 45],
                            33: [2, 45],
                            54: [2, 45],
                            65: [2, 45],
                            68: [2, 45],
                            72: [2, 45],
                            75: [2, 45],
                            80: [2, 45],
                            81: [2, 45],
                            82: [2, 45],
                            83: [2, 45],
                            84: [2, 45],
                            85: [2, 45],
                            87: [2, 45],
                        },
                        {
                            52: 52,
                            54: [2, 82],
                            65: [2, 82],
                            72: [2, 82],
                            80: [2, 82],
                            81: [2, 82],
                            82: [2, 82],
                            83: [2, 82],
                            84: [2, 82],
                            85: [2, 82],
                        },
                        {
                            25: 53,
                            38: 55,
                            39: [1, 57],
                            43: 56,
                            44: [1, 58],
                            45: 54,
                            47: [2, 54],
                        },
                        { 28: 59, 43: 60, 44: [1, 58], 47: [2, 56] },
                        { 13: 62, 15: [1, 20], 18: [1, 61] },
                        {
                            33: [2, 86],
                            57: 63,
                            65: [2, 86],
                            72: [2, 86],
                            80: [2, 86],
                            81: [2, 86],
                            82: [2, 86],
                            83: [2, 86],
                            84: [2, 86],
                            85: [2, 86],
                        },
                        {
                            33: [2, 40],
                            65: [2, 40],
                            72: [2, 40],
                            80: [2, 40],
                            81: [2, 40],
                            82: [2, 40],
                            83: [2, 40],
                            84: [2, 40],
                            85: [2, 40],
                        },
                        {
                            33: [2, 41],
                            65: [2, 41],
                            72: [2, 41],
                            80: [2, 41],
                            81: [2, 41],
                            82: [2, 41],
                            83: [2, 41],
                            84: [2, 41],
                            85: [2, 41],
                        },
                        {
                            20: 64,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33,
                        },
                        { 26: 65, 47: [1, 66] },
                        {
                            30: 67,
                            33: [2, 58],
                            65: [2, 58],
                            72: [2, 58],
                            75: [2, 58],
                            80: [2, 58],
                            81: [2, 58],
                            82: [2, 58],
                            83: [2, 58],
                            84: [2, 58],
                            85: [2, 58],
                        },
                        {
                            33: [2, 64],
                            35: 68,
                            65: [2, 64],
                            72: [2, 64],
                            75: [2, 64],
                            80: [2, 64],
                            81: [2, 64],
                            82: [2, 64],
                            83: [2, 64],
                            84: [2, 64],
                            85: [2, 64],
                        },
                        {
                            21: 69,
                            23: [2, 50],
                            65: [2, 50],
                            72: [2, 50],
                            80: [2, 50],
                            81: [2, 50],
                            82: [2, 50],
                            83: [2, 50],
                            84: [2, 50],
                            85: [2, 50],
                        },
                        {
                            33: [2, 90],
                            61: 70,
                            65: [2, 90],
                            72: [2, 90],
                            80: [2, 90],
                            81: [2, 90],
                            82: [2, 90],
                            83: [2, 90],
                            84: [2, 90],
                            85: [2, 90],
                        },
                        {
                            20: 74,
                            33: [2, 80],
                            50: 71,
                            63: 72,
                            64: 75,
                            65: [1, 43],
                            69: 73,
                            70: 76,
                            71: 77,
                            72: [1, 78],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33,
                        },
                        { 72: [1, 79] },
                        {
                            23: [2, 42],
                            33: [2, 42],
                            54: [2, 42],
                            65: [2, 42],
                            68: [2, 42],
                            72: [2, 42],
                            75: [2, 42],
                            80: [2, 42],
                            81: [2, 42],
                            82: [2, 42],
                            83: [2, 42],
                            84: [2, 42],
                            85: [2, 42],
                            87: [1, 50],
                        },
                        {
                            20: 74,
                            53: 80,
                            54: [2, 84],
                            63: 81,
                            64: 75,
                            65: [1, 43],
                            69: 82,
                            70: 76,
                            71: 77,
                            72: [1, 78],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33,
                        },
                        { 26: 83, 47: [1, 66] },
                        { 47: [2, 55] },
                        {
                            4: 84,
                            6: 3,
                            14: [2, 46],
                            15: [2, 46],
                            19: [2, 46],
                            29: [2, 46],
                            34: [2, 46],
                            39: [2, 46],
                            44: [2, 46],
                            47: [2, 46],
                            48: [2, 46],
                            51: [2, 46],
                            55: [2, 46],
                            60: [2, 46],
                        },
                        { 47: [2, 20] },
                        {
                            20: 85,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33,
                        },
                        {
                            4: 86,
                            6: 3,
                            14: [2, 46],
                            15: [2, 46],
                            19: [2, 46],
                            29: [2, 46],
                            34: [2, 46],
                            47: [2, 46],
                            48: [2, 46],
                            51: [2, 46],
                            55: [2, 46],
                            60: [2, 46],
                        },
                        { 26: 87, 47: [1, 66] },
                        { 47: [2, 57] },
                        {
                            5: [2, 11],
                            14: [2, 11],
                            15: [2, 11],
                            19: [2, 11],
                            29: [2, 11],
                            34: [2, 11],
                            39: [2, 11],
                            44: [2, 11],
                            47: [2, 11],
                            48: [2, 11],
                            51: [2, 11],
                            55: [2, 11],
                            60: [2, 11],
                        },
                        { 15: [2, 49], 18: [2, 49] },
                        {
                            20: 74,
                            33: [2, 88],
                            58: 88,
                            63: 89,
                            64: 75,
                            65: [1, 43],
                            69: 90,
                            70: 76,
                            71: 77,
                            72: [1, 78],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33,
                        },
                        {
                            65: [2, 94],
                            66: 91,
                            68: [2, 94],
                            72: [2, 94],
                            80: [2, 94],
                            81: [2, 94],
                            82: [2, 94],
                            83: [2, 94],
                            84: [2, 94],
                            85: [2, 94],
                        },
                        {
                            5: [2, 25],
                            14: [2, 25],
                            15: [2, 25],
                            19: [2, 25],
                            29: [2, 25],
                            34: [2, 25],
                            39: [2, 25],
                            44: [2, 25],
                            47: [2, 25],
                            48: [2, 25],
                            51: [2, 25],
                            55: [2, 25],
                            60: [2, 25],
                        },
                        {
                            20: 92,
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33,
                        },
                        {
                            20: 74,
                            31: 93,
                            33: [2, 60],
                            63: 94,
                            64: 75,
                            65: [1, 43],
                            69: 95,
                            70: 76,
                            71: 77,
                            72: [1, 78],
                            75: [2, 60],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33,
                        },
                        {
                            20: 74,
                            33: [2, 66],
                            36: 96,
                            63: 97,
                            64: 75,
                            65: [1, 43],
                            69: 98,
                            70: 76,
                            71: 77,
                            72: [1, 78],
                            75: [2, 66],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33,
                        },
                        {
                            20: 74,
                            22: 99,
                            23: [2, 52],
                            63: 100,
                            64: 75,
                            65: [1, 43],
                            69: 101,
                            70: 76,
                            71: 77,
                            72: [1, 78],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33,
                        },
                        {
                            20: 74,
                            33: [2, 92],
                            62: 102,
                            63: 103,
                            64: 75,
                            65: [1, 43],
                            69: 104,
                            70: 76,
                            71: 77,
                            72: [1, 78],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33,
                        },
                        { 33: [1, 105] },
                        {
                            33: [2, 79],
                            65: [2, 79],
                            72: [2, 79],
                            80: [2, 79],
                            81: [2, 79],
                            82: [2, 79],
                            83: [2, 79],
                            84: [2, 79],
                            85: [2, 79],
                        },
                        { 33: [2, 81] },
                        {
                            23: [2, 27],
                            33: [2, 27],
                            54: [2, 27],
                            65: [2, 27],
                            68: [2, 27],
                            72: [2, 27],
                            75: [2, 27],
                            80: [2, 27],
                            81: [2, 27],
                            82: [2, 27],
                            83: [2, 27],
                            84: [2, 27],
                            85: [2, 27],
                        },
                        {
                            23: [2, 28],
                            33: [2, 28],
                            54: [2, 28],
                            65: [2, 28],
                            68: [2, 28],
                            72: [2, 28],
                            75: [2, 28],
                            80: [2, 28],
                            81: [2, 28],
                            82: [2, 28],
                            83: [2, 28],
                            84: [2, 28],
                            85: [2, 28],
                        },
                        {
                            23: [2, 30],
                            33: [2, 30],
                            54: [2, 30],
                            68: [2, 30],
                            71: 106,
                            72: [1, 107],
                            75: [2, 30],
                        },
                        {
                            23: [2, 98],
                            33: [2, 98],
                            54: [2, 98],
                            68: [2, 98],
                            72: [2, 98],
                            75: [2, 98],
                        },
                        {
                            23: [2, 45],
                            33: [2, 45],
                            54: [2, 45],
                            65: [2, 45],
                            68: [2, 45],
                            72: [2, 45],
                            73: [1, 108],
                            75: [2, 45],
                            80: [2, 45],
                            81: [2, 45],
                            82: [2, 45],
                            83: [2, 45],
                            84: [2, 45],
                            85: [2, 45],
                            87: [2, 45],
                        },
                        {
                            23: [2, 44],
                            33: [2, 44],
                            54: [2, 44],
                            65: [2, 44],
                            68: [2, 44],
                            72: [2, 44],
                            75: [2, 44],
                            80: [2, 44],
                            81: [2, 44],
                            82: [2, 44],
                            83: [2, 44],
                            84: [2, 44],
                            85: [2, 44],
                            87: [2, 44],
                        },
                        { 54: [1, 109] },
                        {
                            54: [2, 83],
                            65: [2, 83],
                            72: [2, 83],
                            80: [2, 83],
                            81: [2, 83],
                            82: [2, 83],
                            83: [2, 83],
                            84: [2, 83],
                            85: [2, 83],
                        },
                        { 54: [2, 85] },
                        {
                            5: [2, 13],
                            14: [2, 13],
                            15: [2, 13],
                            19: [2, 13],
                            29: [2, 13],
                            34: [2, 13],
                            39: [2, 13],
                            44: [2, 13],
                            47: [2, 13],
                            48: [2, 13],
                            51: [2, 13],
                            55: [2, 13],
                            60: [2, 13],
                        },
                        {
                            38: 55,
                            39: [1, 57],
                            43: 56,
                            44: [1, 58],
                            45: 111,
                            46: 110,
                            47: [2, 76],
                        },
                        {
                            33: [2, 70],
                            40: 112,
                            65: [2, 70],
                            72: [2, 70],
                            75: [2, 70],
                            80: [2, 70],
                            81: [2, 70],
                            82: [2, 70],
                            83: [2, 70],
                            84: [2, 70],
                            85: [2, 70],
                        },
                        { 47: [2, 18] },
                        {
                            5: [2, 14],
                            14: [2, 14],
                            15: [2, 14],
                            19: [2, 14],
                            29: [2, 14],
                            34: [2, 14],
                            39: [2, 14],
                            44: [2, 14],
                            47: [2, 14],
                            48: [2, 14],
                            51: [2, 14],
                            55: [2, 14],
                            60: [2, 14],
                        },
                        { 33: [1, 113] },
                        {
                            33: [2, 87],
                            65: [2, 87],
                            72: [2, 87],
                            80: [2, 87],
                            81: [2, 87],
                            82: [2, 87],
                            83: [2, 87],
                            84: [2, 87],
                            85: [2, 87],
                        },
                        { 33: [2, 89] },
                        {
                            20: 74,
                            63: 115,
                            64: 75,
                            65: [1, 43],
                            67: 114,
                            68: [2, 96],
                            69: 116,
                            70: 76,
                            71: 77,
                            72: [1, 78],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33,
                        },
                        { 33: [1, 117] },
                        { 32: 118, 33: [2, 62], 74: 119, 75: [1, 120] },
                        {
                            33: [2, 59],
                            65: [2, 59],
                            72: [2, 59],
                            75: [2, 59],
                            80: [2, 59],
                            81: [2, 59],
                            82: [2, 59],
                            83: [2, 59],
                            84: [2, 59],
                            85: [2, 59],
                        },
                        { 33: [2, 61], 75: [2, 61] },
                        { 33: [2, 68], 37: 121, 74: 122, 75: [1, 120] },
                        {
                            33: [2, 65],
                            65: [2, 65],
                            72: [2, 65],
                            75: [2, 65],
                            80: [2, 65],
                            81: [2, 65],
                            82: [2, 65],
                            83: [2, 65],
                            84: [2, 65],
                            85: [2, 65],
                        },
                        { 33: [2, 67], 75: [2, 67] },
                        { 23: [1, 123] },
                        {
                            23: [2, 51],
                            65: [2, 51],
                            72: [2, 51],
                            80: [2, 51],
                            81: [2, 51],
                            82: [2, 51],
                            83: [2, 51],
                            84: [2, 51],
                            85: [2, 51],
                        },
                        { 23: [2, 53] },
                        { 33: [1, 124] },
                        {
                            33: [2, 91],
                            65: [2, 91],
                            72: [2, 91],
                            80: [2, 91],
                            81: [2, 91],
                            82: [2, 91],
                            83: [2, 91],
                            84: [2, 91],
                            85: [2, 91],
                        },
                        { 33: [2, 93] },
                        {
                            5: [2, 22],
                            14: [2, 22],
                            15: [2, 22],
                            19: [2, 22],
                            29: [2, 22],
                            34: [2, 22],
                            39: [2, 22],
                            44: [2, 22],
                            47: [2, 22],
                            48: [2, 22],
                            51: [2, 22],
                            55: [2, 22],
                            60: [2, 22],
                        },
                        {
                            23: [2, 99],
                            33: [2, 99],
                            54: [2, 99],
                            68: [2, 99],
                            72: [2, 99],
                            75: [2, 99],
                        },
                        { 73: [1, 108] },
                        {
                            20: 74,
                            63: 125,
                            64: 75,
                            65: [1, 43],
                            72: [1, 35],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33,
                        },
                        {
                            5: [2, 23],
                            14: [2, 23],
                            15: [2, 23],
                            19: [2, 23],
                            29: [2, 23],
                            34: [2, 23],
                            39: [2, 23],
                            44: [2, 23],
                            47: [2, 23],
                            48: [2, 23],
                            51: [2, 23],
                            55: [2, 23],
                            60: [2, 23],
                        },
                        { 47: [2, 19] },
                        { 47: [2, 77] },
                        {
                            20: 74,
                            33: [2, 72],
                            41: 126,
                            63: 127,
                            64: 75,
                            65: [1, 43],
                            69: 128,
                            70: 76,
                            71: 77,
                            72: [1, 78],
                            75: [2, 72],
                            78: 26,
                            79: 27,
                            80: [1, 28],
                            81: [1, 29],
                            82: [1, 30],
                            83: [1, 31],
                            84: [1, 32],
                            85: [1, 34],
                            86: 33,
                        },
                        {
                            5: [2, 24],
                            14: [2, 24],
                            15: [2, 24],
                            19: [2, 24],
                            29: [2, 24],
                            34: [2, 24],
                            39: [2, 24],
                            44: [2, 24],
                            47: [2, 24],
                            48: [2, 24],
                            51: [2, 24],
                            55: [2, 24],
                            60: [2, 24],
                        },
                        { 68: [1, 129] },
                        {
                            65: [2, 95],
                            68: [2, 95],
                            72: [2, 95],
                            80: [2, 95],
                            81: [2, 95],
                            82: [2, 95],
                            83: [2, 95],
                            84: [2, 95],
                            85: [2, 95],
                        },
                        { 68: [2, 97] },
                        {
                            5: [2, 21],
                            14: [2, 21],
                            15: [2, 21],
                            19: [2, 21],
                            29: [2, 21],
                            34: [2, 21],
                            39: [2, 21],
                            44: [2, 21],
                            47: [2, 21],
                            48: [2, 21],
                            51: [2, 21],
                            55: [2, 21],
                            60: [2, 21],
                        },
                        { 33: [1, 130] },
                        { 33: [2, 63] },
                        { 72: [1, 132], 76: 131 },
                        { 33: [1, 133] },
                        { 33: [2, 69] },
                        { 15: [2, 12], 18: [2, 12] },
                        {
                            14: [2, 26],
                            15: [2, 26],
                            19: [2, 26],
                            29: [2, 26],
                            34: [2, 26],
                            47: [2, 26],
                            48: [2, 26],
                            51: [2, 26],
                            55: [2, 26],
                            60: [2, 26],
                        },
                        {
                            23: [2, 31],
                            33: [2, 31],
                            54: [2, 31],
                            68: [2, 31],
                            72: [2, 31],
                            75: [2, 31],
                        },
                        { 33: [2, 74], 42: 134, 74: 135, 75: [1, 120] },
                        {
                            33: [2, 71],
                            65: [2, 71],
                            72: [2, 71],
                            75: [2, 71],
                            80: [2, 71],
                            81: [2, 71],
                            82: [2, 71],
                            83: [2, 71],
                            84: [2, 71],
                            85: [2, 71],
                        },
                        { 33: [2, 73], 75: [2, 73] },
                        {
                            23: [2, 29],
                            33: [2, 29],
                            54: [2, 29],
                            65: [2, 29],
                            68: [2, 29],
                            72: [2, 29],
                            75: [2, 29],
                            80: [2, 29],
                            81: [2, 29],
                            82: [2, 29],
                            83: [2, 29],
                            84: [2, 29],
                            85: [2, 29],
                        },
                        {
                            14: [2, 15],
                            15: [2, 15],
                            19: [2, 15],
                            29: [2, 15],
                            34: [2, 15],
                            39: [2, 15],
                            44: [2, 15],
                            47: [2, 15],
                            48: [2, 15],
                            51: [2, 15],
                            55: [2, 15],
                            60: [2, 15],
                        },
                        { 72: [1, 137], 77: [1, 136] },
                        { 72: [2, 100], 77: [2, 100] },
                        {
                            14: [2, 16],
                            15: [2, 16],
                            19: [2, 16],
                            29: [2, 16],
                            34: [2, 16],
                            44: [2, 16],
                            47: [2, 16],
                            48: [2, 16],
                            51: [2, 16],
                            55: [2, 16],
                            60: [2, 16],
                        },
                        { 33: [1, 138] },
                        { 33: [2, 75] },
                        { 33: [2, 32] },
                        { 72: [2, 101], 77: [2, 101] },
                        {
                            14: [2, 17],
                            15: [2, 17],
                            19: [2, 17],
                            29: [2, 17],
                            34: [2, 17],
                            39: [2, 17],
                            44: [2, 17],
                            47: [2, 17],
                            48: [2, 17],
                            51: [2, 17],
                            55: [2, 17],
                            60: [2, 17],
                        },
                    ],
                    defaultActions: {
                        4: [2, 1],
                        54: [2, 55],
                        56: [2, 20],
                        60: [2, 57],
                        73: [2, 81],
                        82: [2, 85],
                        86: [2, 18],
                        90: [2, 89],
                        101: [2, 53],
                        104: [2, 93],
                        110: [2, 19],
                        111: [2, 77],
                        116: [2, 97],
                        119: [2, 63],
                        122: [2, 69],
                        135: [2, 75],
                        136: [2, 32],
                    },
                    parseError: function (n, s) {
                        throw new Error(n);
                    },
                    parse: function (n) {
                        var s = this,
                            o = [0],
                            a = [null],
                            c = [],
                            l = this.table,
                            d = "",
                            u = 0,
                            h = 0,
                            f = 0,
                            p = 2,
                            g = 1;
                        this.lexer.setInput(n),
                            (this.lexer.yy = this.yy),
                            (this.yy.lexer = this.lexer),
                            (this.yy.parser = this),
                            typeof this.lexer.yylloc > "u" &&
                                (this.lexer.yylloc = {});
                        var b = this.lexer.yylloc;
                        c.push(b);
                        var m = this.lexer.options && this.lexer.options.ranges;
                        typeof this.yy.parseError == "function" &&
                            (this.parseError = this.yy.parseError);
                        function S(W) {
                            (o.length = o.length - 2 * W),
                                (a.length = a.length - W),
                                (c.length = c.length - W);
                        }
                        function E() {
                            var W;
                            return (
                                (W = s.lexer.lex() || 1),
                                typeof W != "number" &&
                                    (W = s.symbols_[W] || W),
                                W
                            );
                        }
                        for (
                            var P, Z, T, C, ye, ne, he = {}, _e, G, tt, ke;
                            ;

                        ) {
                            if (
                                ((T = o[o.length - 1]),
                                this.defaultActions[T]
                                    ? (C = this.defaultActions[T])
                                    : ((P === null || typeof P > "u") &&
                                          (P = E()),
                                      (C = l[T] && l[T][P])),
                                typeof C > "u" || !C.length || !C[0])
                            ) {
                                var Ie = "";
                                if (!f) {
                                    ke = [];
                                    for (_e in l[T])
                                        this.terminals_[_e] &&
                                            _e > 2 &&
                                            ke.push(
                                                "'" + this.terminals_[_e] + "'",
                                            );
                                    this.lexer.showPosition
                                        ? (Ie =
                                              "Parse error on line " +
                                              (u + 1) +
                                              `:
` +
                                              this.lexer.showPosition() +
                                              `
Expecting ` +
                                              ke.join(", ") +
                                              ", got '" +
                                              (this.terminals_[P] || P) +
                                              "'")
                                        : (Ie =
                                              "Parse error on line " +
                                              (u + 1) +
                                              ": Unexpected " +
                                              (P == 1
                                                  ? "end of input"
                                                  : "'" +
                                                    (this.terminals_[P] || P) +
                                                    "'")),
                                        this.parseError(Ie, {
                                            text: this.lexer.match,
                                            token: this.terminals_[P] || P,
                                            line: this.lexer.yylineno,
                                            loc: b,
                                            expected: ke,
                                        });
                                }
                            }
                            if (C[0] instanceof Array && C.length > 1)
                                throw new Error(
                                    "Parse Error: multiple actions possible at state: " +
                                        T +
                                        ", token: " +
                                        P,
                                );
                            switch (C[0]) {
                                case 1:
                                    o.push(P),
                                        a.push(this.lexer.yytext),
                                        c.push(this.lexer.yylloc),
                                        o.push(C[1]),
                                        (P = null),
                                        Z
                                            ? ((P = Z), (Z = null))
                                            : ((h = this.lexer.yyleng),
                                              (d = this.lexer.yytext),
                                              (u = this.lexer.yylineno),
                                              (b = this.lexer.yylloc),
                                              f > 0 && f--);
                                    break;
                                case 2:
                                    if (
                                        ((G = this.productions_[C[1]][1]),
                                        (he.$ = a[a.length - G]),
                                        (he._$ = {
                                            first_line:
                                                c[c.length - (G || 1)]
                                                    .first_line,
                                            last_line:
                                                c[c.length - 1].last_line,
                                            first_column:
                                                c[c.length - (G || 1)]
                                                    .first_column,
                                            last_column:
                                                c[c.length - 1].last_column,
                                        }),
                                        m &&
                                            (he._$.range = [
                                                c[c.length - (G || 1)].range[0],
                                                c[c.length - 1].range[1],
                                            ]),
                                        (ne = this.performAction.call(
                                            he,
                                            d,
                                            h,
                                            u,
                                            this.yy,
                                            C[1],
                                            a,
                                            c,
                                        )),
                                        typeof ne < "u")
                                    )
                                        return ne;
                                    G &&
                                        ((o = o.slice(0, -1 * G * 2)),
                                        (a = a.slice(0, -1 * G)),
                                        (c = c.slice(0, -1 * G))),
                                        o.push(this.productions_[C[1]][0]),
                                        a.push(he.$),
                                        c.push(he._$),
                                        (tt =
                                            l[o[o.length - 2]][
                                                o[o.length - 1]
                                            ]),
                                        o.push(tt);
                                    break;
                                case 3:
                                    return !0;
                            }
                        }
                        return !0;
                    },
                },
                e = (function () {
                    var i = {
                        EOF: 1,
                        parseError: function (s, o) {
                            if (this.yy.parser) this.yy.parser.parseError(s, o);
                            else throw new Error(s);
                        },
                        setInput: function (s) {
                            return (
                                (this._input = s),
                                (this._more = this._less = this.done = !1),
                                (this.yylineno = this.yyleng = 0),
                                (this.yytext = this.matched = this.match = ""),
                                (this.conditionStack = ["INITIAL"]),
                                (this.yylloc = {
                                    first_line: 1,
                                    first_column: 0,
                                    last_line: 1,
                                    last_column: 0,
                                }),
                                this.options.ranges &&
                                    (this.yylloc.range = [0, 0]),
                                (this.offset = 0),
                                this
                            );
                        },
                        input: function () {
                            var s = this._input[0];
                            (this.yytext += s),
                                this.yyleng++,
                                this.offset++,
                                (this.match += s),
                                (this.matched += s);
                            var o = s.match(/(?:\r\n?|\n).*/g);
                            return (
                                o
                                    ? (this.yylineno++, this.yylloc.last_line++)
                                    : this.yylloc.last_column++,
                                this.options.ranges && this.yylloc.range[1]++,
                                (this._input = this._input.slice(1)),
                                s
                            );
                        },
                        unput: function (s) {
                            var o = s.length,
                                a = s.split(/(?:\r\n?|\n)/g);
                            (this._input = s + this._input),
                                (this.yytext = this.yytext.substr(
                                    0,
                                    this.yytext.length - o - 1,
                                )),
                                (this.offset -= o);
                            var c = this.match.split(/(?:\r\n?|\n)/g);
                            (this.match = this.match.substr(
                                0,
                                this.match.length - 1,
                            )),
                                (this.matched = this.matched.substr(
                                    0,
                                    this.matched.length - 1,
                                )),
                                a.length - 1 && (this.yylineno -= a.length - 1);
                            var l = this.yylloc.range;
                            return (
                                (this.yylloc = {
                                    first_line: this.yylloc.first_line,
                                    last_line: this.yylineno + 1,
                                    first_column: this.yylloc.first_column,
                                    last_column: a
                                        ? (a.length === c.length
                                              ? this.yylloc.first_column
                                              : 0) +
                                          c[c.length - a.length].length -
                                          a[0].length
                                        : this.yylloc.first_column - o,
                                }),
                                this.options.ranges &&
                                    (this.yylloc.range = [
                                        l[0],
                                        l[0] + this.yyleng - o,
                                    ]),
                                this
                            );
                        },
                        more: function () {
                            return (this._more = !0), this;
                        },
                        less: function (s) {
                            this.unput(this.match.slice(s));
                        },
                        pastInput: function () {
                            var s = this.matched.substr(
                                0,
                                this.matched.length - this.match.length,
                            );
                            return (
                                (s.length > 20 ? "..." : "") +
                                s.substr(-20).replace(/\n/g, "")
                            );
                        },
                        upcomingInput: function () {
                            var s = this.match;
                            return (
                                s.length < 20 &&
                                    (s += this._input.substr(0, 20 - s.length)),
                                (
                                    s.substr(0, 20) +
                                    (s.length > 20 ? "..." : "")
                                ).replace(/\n/g, "")
                            );
                        },
                        showPosition: function () {
                            var s = this.pastInput(),
                                o = new Array(s.length + 1).join("-");
                            return (
                                s +
                                this.upcomingInput() +
                                `
` +
                                o +
                                "^"
                            );
                        },
                        next: function () {
                            if (this.done) return this.EOF;
                            this._input || (this.done = !0);
                            var s, o, a, c, l, d;
                            this._more ||
                                ((this.yytext = ""), (this.match = ""));
                            for (
                                var u = this._currentRules(), h = 0;
                                h < u.length &&
                                ((a = this._input.match(this.rules[u[h]])),
                                !(
                                    a &&
                                    (!o || a[0].length > o[0].length) &&
                                    ((o = a), (c = h), !this.options.flex)
                                ));
                                h++
                            );
                            return o
                                ? ((d = o[0].match(/(?:\r\n?|\n).*/g)),
                                  d && (this.yylineno += d.length),
                                  (this.yylloc = {
                                      first_line: this.yylloc.last_line,
                                      last_line: this.yylineno + 1,
                                      first_column: this.yylloc.last_column,
                                      last_column: d
                                          ? d[d.length - 1].length -
                                            d[d.length - 1].match(/\r?\n?/)[0]
                                                .length
                                          : this.yylloc.last_column +
                                            o[0].length,
                                  }),
                                  (this.yytext += o[0]),
                                  (this.match += o[0]),
                                  (this.matches = o),
                                  (this.yyleng = this.yytext.length),
                                  this.options.ranges &&
                                      (this.yylloc.range = [
                                          this.offset,
                                          (this.offset += this.yyleng),
                                      ]),
                                  (this._more = !1),
                                  (this._input = this._input.slice(
                                      o[0].length,
                                  )),
                                  (this.matched += o[0]),
                                  (s = this.performAction.call(
                                      this,
                                      this.yy,
                                      this,
                                      u[c],
                                      this.conditionStack[
                                          this.conditionStack.length - 1
                                      ],
                                  )),
                                  this.done && this._input && (this.done = !1),
                                  s || void 0)
                                : this._input === ""
                                  ? this.EOF
                                  : this.parseError(
                                        "Lexical error on line " +
                                            (this.yylineno + 1) +
                                            `. Unrecognized text.
` +
                                            this.showPosition(),
                                        {
                                            text: "",
                                            token: null,
                                            line: this.yylineno,
                                        },
                                    );
                        },
                        lex: function () {
                            var s = this.next();
                            return typeof s < "u" ? s : this.lex();
                        },
                        begin: function (s) {
                            this.conditionStack.push(s);
                        },
                        popState: function () {
                            return this.conditionStack.pop();
                        },
                        _currentRules: function () {
                            return this.conditions[
                                this.conditionStack[
                                    this.conditionStack.length - 1
                                ]
                            ].rules;
                        },
                        topState: function () {
                            return this.conditionStack[
                                this.conditionStack.length - 2
                            ];
                        },
                        pushState: function (s) {
                            this.begin(s);
                        },
                    };
                    return (
                        (i.options = {}),
                        (i.performAction = function (s, o, a, c) {
                            function l(u, h) {
                                return (o.yytext = o.yytext.substring(
                                    u,
                                    o.yyleng - h + u,
                                ));
                            }
                            var d = c;
                            switch (a) {
                                case 0:
                                    if (
                                        (o.yytext.slice(-2) === "\\\\"
                                            ? (l(0, 1), this.begin("mu"))
                                            : o.yytext.slice(-1) === "\\"
                                              ? (l(0, 1), this.begin("emu"))
                                              : this.begin("mu"),
                                        o.yytext)
                                    )
                                        return 15;
                                    break;
                                case 1:
                                    return 15;
                                case 2:
                                    return this.popState(), 15;
                                    break;
                                case 3:
                                    return this.begin("raw"), 15;
                                    break;
                                case 4:
                                    return (
                                        this.popState(),
                                        this.conditionStack[
                                            this.conditionStack.length - 1
                                        ] === "raw"
                                            ? 15
                                            : (l(5, 9), "END_RAW_BLOCK")
                                    );
                                case 5:
                                    return 15;
                                case 6:
                                    return this.popState(), 14;
                                    break;
                                case 7:
                                    return 65;
                                case 8:
                                    return 68;
                                case 9:
                                    return 19;
                                case 10:
                                    return (
                                        this.popState(), this.begin("raw"), 23
                                    );
                                    break;
                                case 11:
                                    return 55;
                                case 12:
                                    return 60;
                                case 13:
                                    return 29;
                                case 14:
                                    return 47;
                                case 15:
                                    return this.popState(), 44;
                                    break;
                                case 16:
                                    return this.popState(), 44;
                                    break;
                                case 17:
                                    return 34;
                                case 18:
                                    return 39;
                                case 19:
                                    return 51;
                                case 20:
                                    return 48;
                                case 21:
                                    this.unput(o.yytext),
                                        this.popState(),
                                        this.begin("com");
                                    break;
                                case 22:
                                    return this.popState(), 14;
                                    break;
                                case 23:
                                    return 48;
                                case 24:
                                    return 73;
                                case 25:
                                    return 72;
                                case 26:
                                    return 72;
                                case 27:
                                    return 87;
                                case 28:
                                    break;
                                case 29:
                                    return this.popState(), 54;
                                    break;
                                case 30:
                                    return this.popState(), 33;
                                    break;
                                case 31:
                                    return (
                                        (o.yytext = l(1, 2).replace(
                                            /\\"/g,
                                            '"',
                                        )),
                                        80
                                    );
                                    break;
                                case 32:
                                    return (
                                        (o.yytext = l(1, 2).replace(
                                            /\\'/g,
                                            "'",
                                        )),
                                        80
                                    );
                                    break;
                                case 33:
                                    return 85;
                                case 34:
                                    return 82;
                                case 35:
                                    return 82;
                                case 36:
                                    return 83;
                                case 37:
                                    return 84;
                                case 38:
                                    return 81;
                                case 39:
                                    return 75;
                                case 40:
                                    return 77;
                                case 41:
                                    return 72;
                                case 42:
                                    return (
                                        (o.yytext = o.yytext.replace(
                                            /\\([\\\]])/g,
                                            "$1",
                                        )),
                                        72
                                    );
                                    break;
                                case 43:
                                    return "INVALID";
                                case 44:
                                    return 5;
                            }
                        }),
                        (i.rules = [
                            /^(?:[^\x00]*?(?=(\{\{)))/,
                            /^(?:[^\x00]+)/,
                            /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,
                            /^(?:\{\{\{\{(?=[^/]))/,
                            /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/,
                            /^(?:[^\x00]+?(?=(\{\{\{\{)))/,
                            /^(?:[\s\S]*?--(~)?\}\})/,
                            /^(?:\()/,
                            /^(?:\))/,
                            /^(?:\{\{\{\{)/,
                            /^(?:\}\}\}\})/,
                            /^(?:\{\{(~)?>)/,
                            /^(?:\{\{(~)?#>)/,
                            /^(?:\{\{(~)?#\*?)/,
                            /^(?:\{\{(~)?\/)/,
                            /^(?:\{\{(~)?\^\s*(~)?\}\})/,
                            /^(?:\{\{(~)?\s*else\s*(~)?\}\})/,
                            /^(?:\{\{(~)?\^)/,
                            /^(?:\{\{(~)?\s*else\b)/,
                            /^(?:\{\{(~)?\{)/,
                            /^(?:\{\{(~)?&)/,
                            /^(?:\{\{(~)?!--)/,
                            /^(?:\{\{(~)?![\s\S]*?\}\})/,
                            /^(?:\{\{(~)?\*?)/,
                            /^(?:=)/,
                            /^(?:\.\.)/,
                            /^(?:\.(?=([=~}\s\/.)|])))/,
                            /^(?:[\/.])/,
                            /^(?:\s+)/,
                            /^(?:\}(~)?\}\})/,
                            /^(?:(~)?\}\})/,
                            /^(?:"(\\["]|[^"])*")/,
                            /^(?:'(\\[']|[^'])*')/,
                            /^(?:@)/,
                            /^(?:true(?=([~}\s)])))/,
                            /^(?:false(?=([~}\s)])))/,
                            /^(?:undefined(?=([~}\s)])))/,
                            /^(?:null(?=([~}\s)])))/,
                            /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/,
                            /^(?:as\s+\|)/,
                            /^(?:\|)/,
                            /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/,
                            /^(?:\[(\\\]|[^\]])*\])/,
                            /^(?:.)/,
                            /^(?:$)/,
                        ]),
                        (i.conditions = {
                            mu: {
                                rules: [
                                    7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                                    19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
                                    30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
                                    41, 42, 43, 44,
                                ],
                                inclusive: !1,
                            },
                            emu: { rules: [2], inclusive: !1 },
                            com: { rules: [6], inclusive: !1 },
                            raw: { rules: [3, 4, 5], inclusive: !1 },
                            INITIAL: { rules: [0, 1, 44], inclusive: !0 },
                        }),
                        i
                    );
                })();
            r.lexer = e;
            function t() {
                this.yy = {};
            }
            return (t.prototype = r), (r.Parser = t), new t();
        })();
        gr.default = Vu;
        Js.exports = gr.default;
    });
    var Bi = v((yr, Ys) => {
        "use strict";
        yr.__esModule = !0;
        function Ku(r) {
            return r && r.__esModule ? r : { default: r };
        }
        var Zu = J(),
            zi = Ku(Zu);
        function br() {
            this.parents = [];
        }
        br.prototype = {
            constructor: br,
            mutating: !1,
            acceptKey: function (e, t) {
                var i = this.accept(e[t]);
                if (this.mutating) {
                    if (i && !br.prototype[i.type])
                        throw new zi.default(
                            'Unexpected node type "' +
                                i.type +
                                '" found when accepting ' +
                                t +
                                " on " +
                                e.type,
                        );
                    e[t] = i;
                }
            },
            acceptRequired: function (e, t) {
                if ((this.acceptKey(e, t), !e[t]))
                    throw new zi.default(e.type + " requires " + t);
            },
            acceptArray: function (e) {
                for (var t = 0, i = e.length; t < i; t++)
                    this.acceptKey(e, t), e[t] || (e.splice(t, 1), t--, i--);
            },
            accept: function (e) {
                if (e) {
                    if (!this[e.type])
                        throw new zi.default("Unknown type: " + e.type, e);
                    this.current && this.parents.unshift(this.current),
                        (this.current = e);
                    var t = this[e.type](e);
                    if (
                        ((this.current = this.parents.shift()),
                        !this.mutating || t)
                    )
                        return t;
                    if (t !== !1) return e;
                }
            },
            Program: function (e) {
                this.acceptArray(e.body);
            },
            MustacheStatement: vr,
            Decorator: vr,
            BlockStatement: $s,
            DecoratorBlock: $s,
            PartialStatement: Xs,
            PartialBlockStatement: function (e) {
                Xs.call(this, e), this.acceptKey(e, "program");
            },
            ContentStatement: function () {},
            CommentStatement: function () {},
            SubExpression: vr,
            PathExpression: function () {},
            StringLiteral: function () {},
            NumberLiteral: function () {},
            BooleanLiteral: function () {},
            UndefinedLiteral: function () {},
            NullLiteral: function () {},
            Hash: function (e) {
                this.acceptArray(e.pairs);
            },
            HashPair: function (e) {
                this.acceptRequired(e, "value");
            },
        };
        function vr(r) {
            this.acceptRequired(r, "path"),
                this.acceptArray(r.params),
                this.acceptKey(r, "hash");
        }
        function $s(r) {
            vr.call(this, r),
                this.acceptKey(r, "program"),
                this.acceptKey(r, "inverse");
        }
        function Xs(r) {
            this.acceptRequired(r, "name"),
                this.acceptArray(r.params),
                this.acceptKey(r, "hash");
        }
        yr.default = br;
        Ys.exports = yr.default;
    });
    var to = v((_r, eo) => {
        "use strict";
        _r.__esModule = !0;
        function Gu(r) {
            return r && r.__esModule ? r : { default: r };
        }
        var Wu = Bi(),
            ju = Gu(Wu);
        function ie() {
            var r =
                arguments.length <= 0 || arguments[0] === void 0
                    ? {}
                    : arguments[0];
            this.options = r;
        }
        ie.prototype = new ju.default();
        ie.prototype.Program = function (r) {
            var e = !this.options.ignoreStandalone,
                t = !this.isRootSeen;
            this.isRootSeen = !0;
            for (var i = r.body, n = 0, s = i.length; n < s; n++) {
                var o = i[n],
                    a = this.accept(o);
                if (a) {
                    var c = Fi(i, n, t),
                        l = Di(i, n, t),
                        d = a.openStandalone && c,
                        u = a.closeStandalone && l,
                        h = a.inlineStandalone && c && l;
                    a.close && Ce(i, n, !0),
                        a.open && ve(i, n, !0),
                        e &&
                            h &&
                            (Ce(i, n),
                            ve(i, n) &&
                                o.type === "PartialStatement" &&
                                (o.indent = /([ \t]+$)/.exec(
                                    i[n - 1].original,
                                )[1])),
                        e && d && (Ce((o.program || o.inverse).body), ve(i, n)),
                        e && u && (Ce(i, n), ve((o.inverse || o.program).body));
                }
            }
            return r;
        };
        ie.prototype.BlockStatement =
            ie.prototype.DecoratorBlock =
            ie.prototype.PartialBlockStatement =
                function (r) {
                    this.accept(r.program), this.accept(r.inverse);
                    var e = r.program || r.inverse,
                        t = r.program && r.inverse,
                        i = t,
                        n = t;
                    if (t && t.chained)
                        for (i = t.body[0].program; n.chained; )
                            n = n.body[n.body.length - 1].program;
                    var s = {
                        open: r.openStrip.open,
                        close: r.closeStrip.close,
                        openStandalone: Di(e.body),
                        closeStandalone: Fi((i || e).body),
                    };
                    if ((r.openStrip.close && Ce(e.body, null, !0), t)) {
                        var o = r.inverseStrip;
                        o.open && ve(e.body, null, !0),
                            o.close && Ce(i.body, null, !0),
                            r.closeStrip.open && ve(n.body, null, !0),
                            !this.options.ignoreStandalone &&
                                Fi(e.body) &&
                                Di(i.body) &&
                                (ve(e.body), Ce(i.body));
                    } else r.closeStrip.open && ve(e.body, null, !0);
                    return s;
                };
        ie.prototype.Decorator = ie.prototype.MustacheStatement = function (r) {
            return r.strip;
        };
        ie.prototype.PartialStatement = ie.prototype.CommentStatement =
            function (r) {
                var e = r.strip || {};
                return { inlineStandalone: !0, open: e.open, close: e.close };
            };
        function Fi(r, e, t) {
            e === void 0 && (e = r.length);
            var i = r[e - 1],
                n = r[e - 2];
            if (!i) return t;
            if (i.type === "ContentStatement")
                return (n || !t ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(
                    i.original,
                );
        }
        function Di(r, e, t) {
            e === void 0 && (e = -1);
            var i = r[e + 1],
                n = r[e + 2];
            if (!i) return t;
            if (i.type === "ContentStatement")
                return (n || !t ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(
                    i.original,
                );
        }
        function Ce(r, e, t) {
            var i = r[e == null ? 0 : e + 1];
            if (
                !(
                    !i ||
                    i.type !== "ContentStatement" ||
                    (!t && i.rightStripped)
                )
            ) {
                var n = i.value;
                (i.value = i.value.replace(t ? /^\s+/ : /^[ \t]*\r?\n?/, "")),
                    (i.rightStripped = i.value !== n);
            }
        }
        function ve(r, e, t) {
            var i = r[e == null ? r.length - 1 : e - 1];
            if (
                !(!i || i.type !== "ContentStatement" || (!t && i.leftStripped))
            ) {
                var n = i.value;
                return (
                    (i.value = i.value.replace(t ? /\s+$/ : /[ \t]+$/, "")),
                    (i.leftStripped = i.value !== n),
                    i.leftStripped
                );
            }
        }
        _r.default = ie;
        eo.exports = _r.default;
    });
    var ro = v((Q) => {
        "use strict";
        Q.__esModule = !0;
        Q.SourceLocation = Qu;
        Q.id = $u;
        Q.stripFlags = Xu;
        Q.stripComment = Yu;
        Q.preparePath = ed;
        Q.prepareMustache = td;
        Q.prepareRawBlock = rd;
        Q.prepareBlock = id;
        Q.prepareProgram = nd;
        Q.preparePartialBlock = sd;
        function Uu(r) {
            return r && r.__esModule ? r : { default: r };
        }
        var Ju = J(),
            Vi = Uu(Ju);
        function Ki(r, e) {
            if (((e = e.path ? e.path.original : e), r.path.original !== e)) {
                var t = { loc: r.path.loc };
                throw new Vi.default(
                    r.path.original + " doesn't match " + e,
                    t,
                );
            }
        }
        function Qu(r, e) {
            (this.source = r),
                (this.start = { line: e.first_line, column: e.first_column }),
                (this.end = { line: e.last_line, column: e.last_column });
        }
        function $u(r) {
            return /^\[.*\]$/.test(r) ? r.substring(1, r.length - 1) : r;
        }
        function Xu(r, e) {
            return {
                open: r.charAt(2) === "~",
                close: e.charAt(e.length - 3) === "~",
            };
        }
        function Yu(r) {
            return r.replace(/^\{\{~?!-?-?/, "").replace(/-?-?~?\}\}$/, "");
        }
        function ed(r, e, t) {
            t = this.locInfo(t);
            for (
                var i = r ? "@" : "", n = [], s = 0, o = 0, a = e.length;
                o < a;
                o++
            ) {
                var c = e[o].part,
                    l = e[o].original !== c;
                if (
                    ((i += (e[o].separator || "") + c),
                    !l && (c === ".." || c === "." || c === "this"))
                ) {
                    if (n.length > 0)
                        throw new Vi.default("Invalid path: " + i, { loc: t });
                    c === ".." && s++;
                } else n.push(c);
            }
            return {
                type: "PathExpression",
                data: r,
                depth: s,
                parts: n,
                original: i,
                loc: t,
            };
        }
        function td(r, e, t, i, n, s) {
            var o = i.charAt(3) || i.charAt(2),
                a = o !== "{" && o !== "&",
                c = /\*/.test(i);
            return {
                type: c ? "Decorator" : "MustacheStatement",
                path: r,
                params: e,
                hash: t,
                escaped: a,
                strip: n,
                loc: this.locInfo(s),
            };
        }
        function rd(r, e, t, i) {
            Ki(r, t), (i = this.locInfo(i));
            var n = { type: "Program", body: e, strip: {}, loc: i };
            return {
                type: "BlockStatement",
                path: r.path,
                params: r.params,
                hash: r.hash,
                program: n,
                openStrip: {},
                inverseStrip: {},
                closeStrip: {},
                loc: i,
            };
        }
        function id(r, e, t, i, n, s) {
            i && i.path && Ki(r, i);
            var o = /\*/.test(r.open);
            e.blockParams = r.blockParams;
            var a = void 0,
                c = void 0;
            if (t) {
                if (o)
                    throw new Vi.default(
                        "Unexpected inverse block on decorator",
                        t,
                    );
                t.chain && (t.program.body[0].closeStrip = i.strip),
                    (c = t.strip),
                    (a = t.program);
            }
            return (
                n && ((n = a), (a = e), (e = n)),
                {
                    type: o ? "DecoratorBlock" : "BlockStatement",
                    path: r.path,
                    params: r.params,
                    hash: r.hash,
                    program: e,
                    inverse: a,
                    openStrip: r.strip,
                    inverseStrip: c,
                    closeStrip: i && i.strip,
                    loc: this.locInfo(s),
                }
            );
        }
        function nd(r, e) {
            if (!e && r.length) {
                var t = r[0].loc,
                    i = r[r.length - 1].loc;
                t &&
                    i &&
                    (e = {
                        source: t.source,
                        start: { line: t.start.line, column: t.start.column },
                        end: { line: i.end.line, column: i.end.column },
                    });
            }
            return { type: "Program", body: r, strip: {}, loc: e };
        }
        function sd(r, e, t, i) {
            return (
                Ki(r, t),
                {
                    type: "PartialBlockStatement",
                    name: r.path,
                    params: r.params,
                    hash: r.hash,
                    program: e,
                    openStrip: r.strip,
                    closeStrip: t && t.strip,
                    loc: this.locInfo(i),
                }
            );
        }
    });
    var so = v((ht) => {
        "use strict";
        ht.__esModule = !0;
        ht.parseWithoutProcessing = no;
        ht.parse = pd;
        function od(r) {
            if (r && r.__esModule) return r;
            var e = {};
            if (r != null)
                for (var t in r)
                    Object.prototype.hasOwnProperty.call(r, t) && (e[t] = r[t]);
            return (e.default = r), e;
        }
        function io(r) {
            return r && r.__esModule ? r : { default: r };
        }
        var ad = Qs(),
            Zi = io(ad),
            ld = to(),
            cd = io(ld),
            ud = ro(),
            dd = od(ud),
            hd = F();
        ht.parser = Zi.default;
        var kr = {};
        hd.extend(kr, dd);
        function no(r, e) {
            if (r.type === "Program") return r;
            (Zi.default.yy = kr),
                (kr.locInfo = function (i) {
                    return new kr.SourceLocation(e && e.srcName, i);
                });
            var t = Zi.default.parse(r);
            return t;
        }
        function pd(r, e) {
            var t = no(r, e),
                i = new cd.default(e);
            return i.accept(t);
        }
    });
    var co = v((gt) => {
        "use strict";
        gt.__esModule = !0;
        gt.Compiler = Gi;
        gt.precompile = bd;
        gt.compile = vd;
        function ao(r) {
            return r && r.__esModule ? r : { default: r };
        }
        var fd = J(),
            ft = ao(fd),
            mt = F(),
            md = Hi(),
            pt = ao(md),
            gd = [].slice;
        function Gi() {}
        Gi.prototype = {
            compiler: Gi,
            equals: function (e) {
                var t = this.opcodes.length;
                if (e.opcodes.length !== t) return !1;
                for (var i = 0; i < t; i++) {
                    var n = this.opcodes[i],
                        s = e.opcodes[i];
                    if (n.opcode !== s.opcode || !lo(n.args, s.args)) return !1;
                }
                t = this.children.length;
                for (var i = 0; i < t; i++)
                    if (!this.children[i].equals(e.children[i])) return !1;
                return !0;
            },
            guid: 0,
            compile: function (e, t) {
                return (
                    (this.sourceNode = []),
                    (this.opcodes = []),
                    (this.children = []),
                    (this.options = t),
                    (this.stringParams = t.stringParams),
                    (this.trackIds = t.trackIds),
                    (t.blockParams = t.blockParams || []),
                    (t.knownHelpers = mt.extend(
                        Object.create(null),
                        {
                            helperMissing: !0,
                            blockHelperMissing: !0,
                            each: !0,
                            if: !0,
                            unless: !0,
                            with: !0,
                            log: !0,
                            lookup: !0,
                        },
                        t.knownHelpers,
                    )),
                    this.accept(e)
                );
            },
            compileProgram: function (e) {
                var t = new this.compiler(),
                    i = t.compile(e, this.options),
                    n = this.guid++;
                return (
                    (this.usePartial = this.usePartial || i.usePartial),
                    (this.children[n] = i),
                    (this.useDepths = this.useDepths || i.useDepths),
                    n
                );
            },
            accept: function (e) {
                if (!this[e.type])
                    throw new ft.default("Unknown type: " + e.type, e);
                this.sourceNode.unshift(e);
                var t = this[e.type](e);
                return this.sourceNode.shift(), t;
            },
            Program: function (e) {
                this.options.blockParams.unshift(e.blockParams);
                for (var t = e.body, i = t.length, n = 0; n < i; n++)
                    this.accept(t[n]);
                return (
                    this.options.blockParams.shift(),
                    (this.isSimple = i === 1),
                    (this.blockParams = e.blockParams
                        ? e.blockParams.length
                        : 0),
                    this
                );
            },
            BlockStatement: function (e) {
                oo(e);
                var t = e.program,
                    i = e.inverse;
                (t = t && this.compileProgram(t)),
                    (i = i && this.compileProgram(i));
                var n = this.classifySexpr(e);
                n === "helper"
                    ? this.helperSexpr(e, t, i)
                    : n === "simple"
                      ? (this.simpleSexpr(e),
                        this.opcode("pushProgram", t),
                        this.opcode("pushProgram", i),
                        this.opcode("emptyHash"),
                        this.opcode("blockValue", e.path.original))
                      : (this.ambiguousSexpr(e, t, i),
                        this.opcode("pushProgram", t),
                        this.opcode("pushProgram", i),
                        this.opcode("emptyHash"),
                        this.opcode("ambiguousBlockValue")),
                    this.opcode("append");
            },
            DecoratorBlock: function (e) {
                var t = e.program && this.compileProgram(e.program),
                    i = this.setupFullMustacheParams(e, t, void 0),
                    n = e.path;
                (this.useDecorators = !0),
                    this.opcode("registerDecorator", i.length, n.original);
            },
            PartialStatement: function (e) {
                this.usePartial = !0;
                var t = e.program;
                t && (t = this.compileProgram(e.program));
                var i = e.params;
                if (i.length > 1)
                    throw new ft.default(
                        "Unsupported number of partial arguments: " + i.length,
                        e,
                    );
                i.length ||
                    (this.options.explicitPartialContext
                        ? this.opcode("pushLiteral", "undefined")
                        : i.push({
                              type: "PathExpression",
                              parts: [],
                              depth: 0,
                          }));
                var n = e.name.original,
                    s = e.name.type === "SubExpression";
                s && this.accept(e.name),
                    this.setupFullMustacheParams(e, t, void 0, !0);
                var o = e.indent || "";
                this.options.preventIndent &&
                    o &&
                    (this.opcode("appendContent", o), (o = "")),
                    this.opcode("invokePartial", s, n, o),
                    this.opcode("append");
            },
            PartialBlockStatement: function (e) {
                this.PartialStatement(e);
            },
            MustacheStatement: function (e) {
                this.SubExpression(e),
                    e.escaped && !this.options.noEscape
                        ? this.opcode("appendEscaped")
                        : this.opcode("append");
            },
            Decorator: function (e) {
                this.DecoratorBlock(e);
            },
            ContentStatement: function (e) {
                e.value && this.opcode("appendContent", e.value);
            },
            CommentStatement: function () {},
            SubExpression: function (e) {
                oo(e);
                var t = this.classifySexpr(e);
                t === "simple"
                    ? this.simpleSexpr(e)
                    : t === "helper"
                      ? this.helperSexpr(e)
                      : this.ambiguousSexpr(e);
            },
            ambiguousSexpr: function (e, t, i) {
                var n = e.path,
                    s = n.parts[0],
                    o = t != null || i != null;
                this.opcode("getContext", n.depth),
                    this.opcode("pushProgram", t),
                    this.opcode("pushProgram", i),
                    (n.strict = !0),
                    this.accept(n),
                    this.opcode("invokeAmbiguous", s, o);
            },
            simpleSexpr: function (e) {
                var t = e.path;
                (t.strict = !0),
                    this.accept(t),
                    this.opcode("resolvePossibleLambda");
            },
            helperSexpr: function (e, t, i) {
                var n = this.setupFullMustacheParams(e, t, i),
                    s = e.path,
                    o = s.parts[0];
                if (this.options.knownHelpers[o])
                    this.opcode("invokeKnownHelper", n.length, o);
                else {
                    if (this.options.knownHelpersOnly)
                        throw new ft.default(
                            "You specified knownHelpersOnly, but used the unknown helper " +
                                o,
                            e,
                        );
                    (s.strict = !0),
                        (s.falsy = !0),
                        this.accept(s),
                        this.opcode(
                            "invokeHelper",
                            n.length,
                            s.original,
                            pt.default.helpers.simpleId(s),
                        );
                }
            },
            PathExpression: function (e) {
                this.addDepth(e.depth), this.opcode("getContext", e.depth);
                var t = e.parts[0],
                    i = pt.default.helpers.scopedId(e),
                    n = !e.depth && !i && this.blockParamIndex(t);
                n
                    ? this.opcode("lookupBlockParam", n, e.parts)
                    : t
                      ? e.data
                          ? ((this.options.data = !0),
                            this.opcode(
                                "lookupData",
                                e.depth,
                                e.parts,
                                e.strict,
                            ))
                          : this.opcode(
                                "lookupOnContext",
                                e.parts,
                                e.falsy,
                                e.strict,
                                i,
                            )
                      : this.opcode("pushContext");
            },
            StringLiteral: function (e) {
                this.opcode("pushString", e.value);
            },
            NumberLiteral: function (e) {
                this.opcode("pushLiteral", e.value);
            },
            BooleanLiteral: function (e) {
                this.opcode("pushLiteral", e.value);
            },
            UndefinedLiteral: function () {
                this.opcode("pushLiteral", "undefined");
            },
            NullLiteral: function () {
                this.opcode("pushLiteral", "null");
            },
            Hash: function (e) {
                var t = e.pairs,
                    i = 0,
                    n = t.length;
                for (this.opcode("pushHash"); i < n; i++)
                    this.pushParam(t[i].value);
                for (; i--; ) this.opcode("assignToHash", t[i].key);
                this.opcode("popHash");
            },
            opcode: function (e) {
                this.opcodes.push({
                    opcode: e,
                    args: gd.call(arguments, 1),
                    loc: this.sourceNode[0].loc,
                });
            },
            addDepth: function (e) {
                e && (this.useDepths = !0);
            },
            classifySexpr: function (e) {
                var t = pt.default.helpers.simpleId(e.path),
                    i = t && !!this.blockParamIndex(e.path.parts[0]),
                    n = !i && pt.default.helpers.helperExpression(e),
                    s = !i && (n || t);
                if (s && !n) {
                    var o = e.path.parts[0],
                        a = this.options;
                    a.knownHelpers[o]
                        ? (n = !0)
                        : a.knownHelpersOnly && (s = !1);
                }
                return n ? "helper" : s ? "ambiguous" : "simple";
            },
            pushParams: function (e) {
                for (var t = 0, i = e.length; t < i; t++) this.pushParam(e[t]);
            },
            pushParam: function (e) {
                var t = e.value != null ? e.value : e.original || "";
                if (this.stringParams)
                    t.replace &&
                        (t = t.replace(/^(\.?\.\/)*/g, "").replace(/\//g, ".")),
                        e.depth && this.addDepth(e.depth),
                        this.opcode("getContext", e.depth || 0),
                        this.opcode("pushStringParam", t, e.type),
                        e.type === "SubExpression" && this.accept(e);
                else {
                    if (this.trackIds) {
                        var i = void 0;
                        if (
                            (e.parts &&
                                !pt.default.helpers.scopedId(e) &&
                                !e.depth &&
                                (i = this.blockParamIndex(e.parts[0])),
                            i)
                        ) {
                            var n = e.parts.slice(1).join(".");
                            this.opcode("pushId", "BlockParam", i, n);
                        } else
                            (t = e.original || t),
                                t.replace &&
                                    (t = t
                                        .replace(/^this(?:\.|$)/, "")
                                        .replace(/^\.\//, "")
                                        .replace(/^\.$/, "")),
                                this.opcode("pushId", e.type, t);
                    }
                    this.accept(e);
                }
            },
            setupFullMustacheParams: function (e, t, i, n) {
                var s = e.params;
                return (
                    this.pushParams(s),
                    this.opcode("pushProgram", t),
                    this.opcode("pushProgram", i),
                    e.hash ? this.accept(e.hash) : this.opcode("emptyHash", n),
                    s
                );
            },
            blockParamIndex: function (e) {
                for (
                    var t = 0, i = this.options.blockParams.length;
                    t < i;
                    t++
                ) {
                    var n = this.options.blockParams[t],
                        s = n && mt.indexOf(n, e);
                    if (n && s >= 0) return [t, s];
                }
            },
        };
        function bd(r, e, t) {
            if (r == null || (typeof r != "string" && r.type !== "Program"))
                throw new ft.default(
                    "You must pass a string or Handlebars AST to Handlebars.precompile. You passed " +
                        r,
                );
            (e = e || {}),
                "data" in e || (e.data = !0),
                e.compat && (e.useDepths = !0);
            var i = t.parse(r, e),
                n = new t.Compiler().compile(i, e);
            return new t.JavaScriptCompiler().compile(n, e);
        }
        function vd(r, e, t) {
            if (
                (e === void 0 && (e = {}),
                r == null || (typeof r != "string" && r.type !== "Program"))
            )
                throw new ft.default(
                    "You must pass a string or Handlebars AST to Handlebars.compile. You passed " +
                        r,
                );
            (e = mt.extend({}, e)),
                "data" in e || (e.data = !0),
                e.compat && (e.useDepths = !0);
            var i = void 0;
            function n() {
                var o = t.parse(r, e),
                    a = new t.Compiler().compile(o, e),
                    c = new t.JavaScriptCompiler().compile(a, e, void 0, !0);
                return t.template(c);
            }
            function s(o, a) {
                return i || (i = n()), i.call(this, o, a);
            }
            return (
                (s._setup = function (o) {
                    return i || (i = n()), i._setup(o);
                }),
                (s._child = function (o, a, c, l) {
                    return i || (i = n()), i._child(o, a, c, l);
                }),
                s
            );
        }
        function lo(r, e) {
            if (r === e) return !0;
            if (mt.isArray(r) && mt.isArray(e) && r.length === e.length) {
                for (var t = 0; t < r.length; t++)
                    if (!lo(r[t], e[t])) return !1;
                return !0;
            }
        }
        function oo(r) {
            if (!r.path.parts) {
                var e = r.path;
                r.path = {
                    type: "PathExpression",
                    data: !1,
                    depth: 0,
                    parts: [e.original + ""],
                    original: e.original + "",
                    loc: e.loc,
                };
            }
        }
    });
    var ho = v((Wi) => {
        var uo =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(
                "",
            );
        Wi.encode = function (r) {
            if (0 <= r && r < uo.length) return uo[r];
            throw new TypeError("Must be between 0 and 63: " + r);
        };
        Wi.decode = function (r) {
            var e = 65,
                t = 90,
                i = 97,
                n = 122,
                s = 48,
                o = 57,
                a = 43,
                c = 47,
                l = 26,
                d = 52;
            return e <= r && r <= t
                ? r - e
                : i <= r && r <= n
                  ? r - i + l
                  : s <= r && r <= o
                    ? r - s + d
                    : r == a
                      ? 62
                      : r == c
                        ? 63
                        : -1;
        };
    });
    var Ji = v((Ui) => {
        var po = ho(),
            ji = 5,
            fo = 1 << ji,
            mo = fo - 1,
            go = fo;
        function yd(r) {
            return r < 0 ? (-r << 1) + 1 : (r << 1) + 0;
        }
        function _d(r) {
            var e = (r & 1) === 1,
                t = r >> 1;
            return e ? -t : t;
        }
        Ui.encode = function (e) {
            var t = "",
                i,
                n = yd(e);
            do
                (i = n & mo),
                    (n >>>= ji),
                    n > 0 && (i |= go),
                    (t += po.encode(i));
            while (n > 0);
            return t;
        };
        Ui.decode = function (e, t, i) {
            var n = e.length,
                s = 0,
                o = 0,
                a,
                c;
            do {
                if (t >= n)
                    throw new Error(
                        "Expected more digits in base 64 VLQ value.",
                    );
                if (((c = po.decode(e.charCodeAt(t++))), c === -1))
                    throw new Error("Invalid base64 digit: " + e.charAt(t - 1));
                (a = !!(c & go)), (c &= mo), (s = s + (c << o)), (o += ji);
            } while (a);
            (i.value = _d(s)), (i.rest = t);
        };
    });
    var je = v((B) => {
        function kd(r, e, t) {
            if (e in r) return r[e];
            if (arguments.length === 3) return t;
            throw new Error('"' + e + '" is a required argument.');
        }
        B.getArg = kd;
        var bo =
                /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,
            wd = /^data:.+\,.+$/;
        function bt(r) {
            var e = r.match(bo);
            return e
                ? {
                      scheme: e[1],
                      auth: e[2],
                      host: e[3],
                      port: e[4],
                      path: e[5],
                  }
                : null;
        }
        B.urlParse = bt;
        function Ge(r) {
            var e = "";
            return (
                r.scheme && (e += r.scheme + ":"),
                (e += "//"),
                r.auth && (e += r.auth + "@"),
                r.host && (e += r.host),
                r.port && (e += ":" + r.port),
                r.path && (e += r.path),
                e
            );
        }
        B.urlGenerate = Ge;
        function Qi(r) {
            var e = r,
                t = bt(r);
            if (t) {
                if (!t.path) return r;
                e = t.path;
            }
            for (
                var i = B.isAbsolute(e),
                    n = e.split(/\/+/),
                    s,
                    o = 0,
                    a = n.length - 1;
                a >= 0;
                a--
            )
                (s = n[a]),
                    s === "."
                        ? n.splice(a, 1)
                        : s === ".."
                          ? o++
                          : o > 0 &&
                            (s === ""
                                ? (n.splice(a + 1, o), (o = 0))
                                : (n.splice(a, 2), o--));
            return (
                (e = n.join("/")),
                e === "" && (e = i ? "/" : "."),
                t ? ((t.path = e), Ge(t)) : e
            );
        }
        B.normalize = Qi;
        function vo(r, e) {
            r === "" && (r = "."), e === "" && (e = ".");
            var t = bt(e),
                i = bt(r);
            if ((i && (r = i.path || "/"), t && !t.scheme))
                return i && (t.scheme = i.scheme), Ge(t);
            if (t || e.match(wd)) return e;
            if (i && !i.host && !i.path) return (i.host = e), Ge(i);
            var n =
                e.charAt(0) === "/" ? e : Qi(r.replace(/\/+$/, "") + "/" + e);
            return i ? ((i.path = n), Ge(i)) : n;
        }
        B.join = vo;
        B.isAbsolute = function (r) {
            return r.charAt(0) === "/" || bo.test(r);
        };
        function Sd(r, e) {
            r === "" && (r = "."), (r = r.replace(/\/$/, ""));
            for (var t = 0; e.indexOf(r + "/") !== 0; ) {
                var i = r.lastIndexOf("/");
                if (
                    i < 0 ||
                    ((r = r.slice(0, i)), r.match(/^([^\/]+:\/)?\/*$/))
                )
                    return e;
                ++t;
            }
            return Array(t + 1).join("../") + e.substr(r.length + 1);
        }
        B.relative = Sd;
        var yo = (function () {
            var r = Object.create(null);
            return !("__proto__" in r);
        })();
        function _o(r) {
            return r;
        }
        function xd(r) {
            return ko(r) ? "$" + r : r;
        }
        B.toSetString = yo ? _o : xd;
        function Cd(r) {
            return ko(r) ? r.slice(1) : r;
        }
        B.fromSetString = yo ? _o : Cd;
        function ko(r) {
            if (!r) return !1;
            var e = r.length;
            if (
                e < 9 ||
                r.charCodeAt(e - 1) !== 95 ||
                r.charCodeAt(e - 2) !== 95 ||
                r.charCodeAt(e - 3) !== 111 ||
                r.charCodeAt(e - 4) !== 116 ||
                r.charCodeAt(e - 5) !== 111 ||
                r.charCodeAt(e - 6) !== 114 ||
                r.charCodeAt(e - 7) !== 112 ||
                r.charCodeAt(e - 8) !== 95 ||
                r.charCodeAt(e - 9) !== 95
            )
                return !1;
            for (var t = e - 10; t >= 0; t--)
                if (r.charCodeAt(t) !== 36) return !1;
            return !0;
        }
        function Ld(r, e, t) {
            var i = We(r.source, e.source);
            return i !== 0 ||
                ((i = r.originalLine - e.originalLine), i !== 0) ||
                ((i = r.originalColumn - e.originalColumn), i !== 0 || t) ||
                ((i = r.generatedColumn - e.generatedColumn), i !== 0) ||
                ((i = r.generatedLine - e.generatedLine), i !== 0)
                ? i
                : We(r.name, e.name);
        }
        B.compareByOriginalPositions = Ld;
        function Pd(r, e, t) {
            var i = r.generatedLine - e.generatedLine;
            return i !== 0 ||
                ((i = r.generatedColumn - e.generatedColumn), i !== 0 || t) ||
                ((i = We(r.source, e.source)), i !== 0) ||
                ((i = r.originalLine - e.originalLine), i !== 0) ||
                ((i = r.originalColumn - e.originalColumn), i !== 0)
                ? i
                : We(r.name, e.name);
        }
        B.compareByGeneratedPositionsDeflated = Pd;
        function We(r, e) {
            return r === e
                ? 0
                : r === null
                  ? 1
                  : e === null
                    ? -1
                    : r > e
                      ? 1
                      : -1;
        }
        function Td(r, e) {
            var t = r.generatedLine - e.generatedLine;
            return t !== 0 ||
                ((t = r.generatedColumn - e.generatedColumn), t !== 0) ||
                ((t = We(r.source, e.source)), t !== 0) ||
                ((t = r.originalLine - e.originalLine), t !== 0) ||
                ((t = r.originalColumn - e.originalColumn), t !== 0)
                ? t
                : We(r.name, e.name);
        }
        B.compareByGeneratedPositionsInflated = Td;
        function Id(r) {
            return JSON.parse(r.replace(/^\)]}'[^\n]*\n/, ""));
        }
        B.parseSourceMapInput = Id;
        function Ed(r, e, t) {
            if (
                ((e = e || ""),
                r &&
                    (r[r.length - 1] !== "/" && e[0] !== "/" && (r += "/"),
                    (e = r + e)),
                t)
            ) {
                var i = bt(t);
                if (!i) throw new Error("sourceMapURL could not be parsed");
                if (i.path) {
                    var n = i.path.lastIndexOf("/");
                    n >= 0 && (i.path = i.path.substring(0, n + 1));
                }
                e = vo(Ge(i), e);
            }
            return Qi(e);
        }
        B.computeSourceURL = Ed;
    });
    var Yi = v((wo) => {
        var $i = je(),
            Xi = Object.prototype.hasOwnProperty,
            Le = typeof Map < "u";
        function ue() {
            (this._array = []),
                (this._set = Le ? new Map() : Object.create(null));
        }
        ue.fromArray = function (e, t) {
            for (var i = new ue(), n = 0, s = e.length; n < s; n++)
                i.add(e[n], t);
            return i;
        };
        ue.prototype.size = function () {
            return Le
                ? this._set.size
                : Object.getOwnPropertyNames(this._set).length;
        };
        ue.prototype.add = function (e, t) {
            var i = Le ? e : $i.toSetString(e),
                n = Le ? this.has(e) : Xi.call(this._set, i),
                s = this._array.length;
            (!n || t) && this._array.push(e),
                n || (Le ? this._set.set(e, s) : (this._set[i] = s));
        };
        ue.prototype.has = function (e) {
            if (Le) return this._set.has(e);
            var t = $i.toSetString(e);
            return Xi.call(this._set, t);
        };
        ue.prototype.indexOf = function (e) {
            if (Le) {
                var t = this._set.get(e);
                if (t >= 0) return t;
            } else {
                var i = $i.toSetString(e);
                if (Xi.call(this._set, i)) return this._set[i];
            }
            throw new Error('"' + e + '" is not in the set.');
        };
        ue.prototype.at = function (e) {
            if (e >= 0 && e < this._array.length) return this._array[e];
            throw new Error("No element indexed by " + e);
        };
        ue.prototype.toArray = function () {
            return this._array.slice();
        };
        wo.ArraySet = ue;
    });
    var Co = v((xo) => {
        var So = je();
        function Md(r, e) {
            var t = r.generatedLine,
                i = e.generatedLine,
                n = r.generatedColumn,
                s = e.generatedColumn;
            return (
                i > t ||
                (i == t && s >= n) ||
                So.compareByGeneratedPositionsInflated(r, e) <= 0
            );
        }
        function wr() {
            (this._array = []),
                (this._sorted = !0),
                (this._last = { generatedLine: -1, generatedColumn: 0 });
        }
        wr.prototype.unsortedForEach = function (e, t) {
            this._array.forEach(e, t);
        };
        wr.prototype.add = function (e) {
            Md(this._last, e)
                ? ((this._last = e), this._array.push(e))
                : ((this._sorted = !1), this._array.push(e));
        };
        wr.prototype.toArray = function () {
            return (
                this._sorted ||
                    (this._array.sort(So.compareByGeneratedPositionsInflated),
                    (this._sorted = !0)),
                this._array
            );
        };
        xo.MappingList = wr;
    });
    var en = v((Lo) => {
        var vt = Ji(),
            N = je(),
            Sr = Yi().ArraySet,
            Ad = Co().MappingList;
        function $(r) {
            r || (r = {}),
                (this._file = N.getArg(r, "file", null)),
                (this._sourceRoot = N.getArg(r, "sourceRoot", null)),
                (this._skipValidation = N.getArg(r, "skipValidation", !1)),
                (this._sources = new Sr()),
                (this._names = new Sr()),
                (this._mappings = new Ad()),
                (this._sourcesContents = null);
        }
        $.prototype._version = 3;
        $.fromSourceMap = function (e) {
            var t = e.sourceRoot,
                i = new $({ file: e.file, sourceRoot: t });
            return (
                e.eachMapping(function (n) {
                    var s = {
                        generated: {
                            line: n.generatedLine,
                            column: n.generatedColumn,
                        },
                    };
                    n.source != null &&
                        ((s.source = n.source),
                        t != null && (s.source = N.relative(t, s.source)),
                        (s.original = {
                            line: n.originalLine,
                            column: n.originalColumn,
                        }),
                        n.name != null && (s.name = n.name)),
                        i.addMapping(s);
                }),
                e.sources.forEach(function (n) {
                    var s = n;
                    t !== null && (s = N.relative(t, n)),
                        i._sources.has(s) || i._sources.add(s);
                    var o = e.sourceContentFor(n);
                    o != null && i.setSourceContent(n, o);
                }),
                i
            );
        };
        $.prototype.addMapping = function (e) {
            var t = N.getArg(e, "generated"),
                i = N.getArg(e, "original", null),
                n = N.getArg(e, "source", null),
                s = N.getArg(e, "name", null);
            this._skipValidation || this._validateMapping(t, i, n, s),
                n != null &&
                    ((n = String(n)),
                    this._sources.has(n) || this._sources.add(n)),
                s != null &&
                    ((s = String(s)), this._names.has(s) || this._names.add(s)),
                this._mappings.add({
                    generatedLine: t.line,
                    generatedColumn: t.column,
                    originalLine: i != null && i.line,
                    originalColumn: i != null && i.column,
                    source: n,
                    name: s,
                });
        };
        $.prototype.setSourceContent = function (e, t) {
            var i = e;
            this._sourceRoot != null && (i = N.relative(this._sourceRoot, i)),
                t != null
                    ? (this._sourcesContents ||
                          (this._sourcesContents = Object.create(null)),
                      (this._sourcesContents[N.toSetString(i)] = t))
                    : this._sourcesContents &&
                      (delete this._sourcesContents[N.toSetString(i)],
                      Object.keys(this._sourcesContents).length === 0 &&
                          (this._sourcesContents = null));
        };
        $.prototype.applySourceMap = function (e, t, i) {
            var n = t;
            if (t == null) {
                if (e.file == null)
                    throw new Error(
                        `SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`,
                    );
                n = e.file;
            }
            var s = this._sourceRoot;
            s != null && (n = N.relative(s, n));
            var o = new Sr(),
                a = new Sr();
            this._mappings.unsortedForEach(function (c) {
                if (c.source === n && c.originalLine != null) {
                    var l = e.originalPositionFor({
                        line: c.originalLine,
                        column: c.originalColumn,
                    });
                    l.source != null &&
                        ((c.source = l.source),
                        i != null && (c.source = N.join(i, c.source)),
                        s != null && (c.source = N.relative(s, c.source)),
                        (c.originalLine = l.line),
                        (c.originalColumn = l.column),
                        l.name != null && (c.name = l.name));
                }
                var d = c.source;
                d != null && !o.has(d) && o.add(d);
                var u = c.name;
                u != null && !a.has(u) && a.add(u);
            }, this),
                (this._sources = o),
                (this._names = a),
                e.sources.forEach(function (c) {
                    var l = e.sourceContentFor(c);
                    l != null &&
                        (i != null && (c = N.join(i, c)),
                        s != null && (c = N.relative(s, c)),
                        this.setSourceContent(c, l));
                }, this);
        };
        $.prototype._validateMapping = function (e, t, i, n) {
            if (t && typeof t.line != "number" && typeof t.column != "number")
                throw new Error(
                    "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.",
                );
            if (
                !(
                    e &&
                    "line" in e &&
                    "column" in e &&
                    e.line > 0 &&
                    e.column >= 0 &&
                    !t &&
                    !i &&
                    !n
                )
            ) {
                if (
                    e &&
                    "line" in e &&
                    "column" in e &&
                    t &&
                    "line" in t &&
                    "column" in t &&
                    e.line > 0 &&
                    e.column >= 0 &&
                    t.line > 0 &&
                    t.column >= 0 &&
                    i
                )
                    return;
                throw new Error(
                    "Invalid mapping: " +
                        JSON.stringify({
                            generated: e,
                            source: i,
                            original: t,
                            name: n,
                        }),
                );
            }
        };
        $.prototype._serializeMappings = function () {
            for (
                var e = 0,
                    t = 1,
                    i = 0,
                    n = 0,
                    s = 0,
                    o = 0,
                    a = "",
                    c,
                    l,
                    d,
                    u,
                    h = this._mappings.toArray(),
                    f = 0,
                    p = h.length;
                f < p;
                f++
            ) {
                if (((l = h[f]), (c = ""), l.generatedLine !== t))
                    for (e = 0; l.generatedLine !== t; ) (c += ";"), t++;
                else if (f > 0) {
                    if (!N.compareByGeneratedPositionsInflated(l, h[f - 1]))
                        continue;
                    c += ",";
                }
                (c += vt.encode(l.generatedColumn - e)),
                    (e = l.generatedColumn),
                    l.source != null &&
                        ((u = this._sources.indexOf(l.source)),
                        (c += vt.encode(u - o)),
                        (o = u),
                        (c += vt.encode(l.originalLine - 1 - n)),
                        (n = l.originalLine - 1),
                        (c += vt.encode(l.originalColumn - i)),
                        (i = l.originalColumn),
                        l.name != null &&
                            ((d = this._names.indexOf(l.name)),
                            (c += vt.encode(d - s)),
                            (s = d))),
                    (a += c);
            }
            return a;
        };
        $.prototype._generateSourcesContent = function (e, t) {
            return e.map(function (i) {
                if (!this._sourcesContents) return null;
                t != null && (i = N.relative(t, i));
                var n = N.toSetString(i);
                return Object.prototype.hasOwnProperty.call(
                    this._sourcesContents,
                    n,
                )
                    ? this._sourcesContents[n]
                    : null;
            }, this);
        };
        $.prototype.toJSON = function () {
            var e = {
                version: this._version,
                sources: this._sources.toArray(),
                names: this._names.toArray(),
                mappings: this._serializeMappings(),
            };
            return (
                this._file != null && (e.file = this._file),
                this._sourceRoot != null && (e.sourceRoot = this._sourceRoot),
                this._sourcesContents &&
                    (e.sourcesContent = this._generateSourcesContent(
                        e.sources,
                        e.sourceRoot,
                    )),
                e
            );
        };
        $.prototype.toString = function () {
            return JSON.stringify(this.toJSON());
        };
        Lo.SourceMapGenerator = $;
    });
    var Po = v((Pe) => {
        Pe.GREATEST_LOWER_BOUND = 1;
        Pe.LEAST_UPPER_BOUND = 2;
        function tn(r, e, t, i, n, s) {
            var o = Math.floor((e - r) / 2) + r,
                a = n(t, i[o], !0);
            return a === 0
                ? o
                : a > 0
                  ? e - o > 1
                      ? tn(o, e, t, i, n, s)
                      : s == Pe.LEAST_UPPER_BOUND
                        ? e < i.length
                            ? e
                            : -1
                        : o
                  : o - r > 1
                    ? tn(r, o, t, i, n, s)
                    : s == Pe.LEAST_UPPER_BOUND
                      ? o
                      : r < 0
                        ? -1
                        : r;
        }
        Pe.search = function (e, t, i, n) {
            if (t.length === 0) return -1;
            var s = tn(-1, t.length, e, t, i, n || Pe.GREATEST_LOWER_BOUND);
            if (s < 0) return -1;
            for (; s - 1 >= 0 && i(t[s], t[s - 1], !0) === 0; ) --s;
            return s;
        };
    });
    var Io = v((To) => {
        function rn(r, e, t) {
            var i = r[e];
            (r[e] = r[t]), (r[t] = i);
        }
        function Rd(r, e) {
            return Math.round(r + Math.random() * (e - r));
        }
        function nn(r, e, t, i) {
            if (t < i) {
                var n = Rd(t, i),
                    s = t - 1;
                rn(r, n, i);
                for (var o = r[i], a = t; a < i; a++)
                    e(r[a], o) <= 0 && ((s += 1), rn(r, s, a));
                rn(r, s + 1, a);
                var c = s + 1;
                nn(r, e, t, c - 1), nn(r, e, c + 1, i);
            }
        }
        To.quickSort = function (r, e) {
            nn(r, e, 0, r.length - 1);
        };
    });
    var Mo = v((xr) => {
        var y = je(),
            sn = Po(),
            Ue = Yi().ArraySet,
            Nd = Ji(),
            yt = Io().quickSort;
        function R(r, e) {
            var t = r;
            return (
                typeof r == "string" && (t = y.parseSourceMapInput(r)),
                t.sections != null ? new ee(t, e) : new O(t, e)
            );
        }
        R.fromSourceMap = function (r, e) {
            return O.fromSourceMap(r, e);
        };
        R.prototype._version = 3;
        R.prototype.__generatedMappings = null;
        Object.defineProperty(R.prototype, "_generatedMappings", {
            configurable: !0,
            enumerable: !0,
            get: function () {
                return (
                    this.__generatedMappings ||
                        this._parseMappings(this._mappings, this.sourceRoot),
                    this.__generatedMappings
                );
            },
        });
        R.prototype.__originalMappings = null;
        Object.defineProperty(R.prototype, "_originalMappings", {
            configurable: !0,
            enumerable: !0,
            get: function () {
                return (
                    this.__originalMappings ||
                        this._parseMappings(this._mappings, this.sourceRoot),
                    this.__originalMappings
                );
            },
        });
        R.prototype._charIsMappingSeparator = function (e, t) {
            var i = e.charAt(t);
            return i === ";" || i === ",";
        };
        R.prototype._parseMappings = function (e, t) {
            throw new Error("Subclasses must implement _parseMappings");
        };
        R.GENERATED_ORDER = 1;
        R.ORIGINAL_ORDER = 2;
        R.GREATEST_LOWER_BOUND = 1;
        R.LEAST_UPPER_BOUND = 2;
        R.prototype.eachMapping = function (e, t, i) {
            var n = t || null,
                s = i || R.GENERATED_ORDER,
                o;
            switch (s) {
                case R.GENERATED_ORDER:
                    o = this._generatedMappings;
                    break;
                case R.ORIGINAL_ORDER:
                    o = this._originalMappings;
                    break;
                default:
                    throw new Error("Unknown order of iteration.");
            }
            var a = this.sourceRoot;
            o.map(function (c) {
                var l = c.source === null ? null : this._sources.at(c.source);
                return (
                    (l = y.computeSourceURL(a, l, this._sourceMapURL)),
                    {
                        source: l,
                        generatedLine: c.generatedLine,
                        generatedColumn: c.generatedColumn,
                        originalLine: c.originalLine,
                        originalColumn: c.originalColumn,
                        name: c.name === null ? null : this._names.at(c.name),
                    }
                );
            }, this).forEach(e, n);
        };
        R.prototype.allGeneratedPositionsFor = function (e) {
            var t = y.getArg(e, "line"),
                i = {
                    source: y.getArg(e, "source"),
                    originalLine: t,
                    originalColumn: y.getArg(e, "column", 0),
                };
            if (((i.source = this._findSourceIndex(i.source)), i.source < 0))
                return [];
            var n = [],
                s = this._findMapping(
                    i,
                    this._originalMappings,
                    "originalLine",
                    "originalColumn",
                    y.compareByOriginalPositions,
                    sn.LEAST_UPPER_BOUND,
                );
            if (s >= 0) {
                var o = this._originalMappings[s];
                if (e.column === void 0)
                    for (var a = o.originalLine; o && o.originalLine === a; )
                        n.push({
                            line: y.getArg(o, "generatedLine", null),
                            column: y.getArg(o, "generatedColumn", null),
                            lastColumn: y.getArg(
                                o,
                                "lastGeneratedColumn",
                                null,
                            ),
                        }),
                            (o = this._originalMappings[++s]);
                else
                    for (
                        var c = o.originalColumn;
                        o && o.originalLine === t && o.originalColumn == c;

                    )
                        n.push({
                            line: y.getArg(o, "generatedLine", null),
                            column: y.getArg(o, "generatedColumn", null),
                            lastColumn: y.getArg(
                                o,
                                "lastGeneratedColumn",
                                null,
                            ),
                        }),
                            (o = this._originalMappings[++s]);
            }
            return n;
        };
        xr.SourceMapConsumer = R;
        function O(r, e) {
            var t = r;
            typeof r == "string" && (t = y.parseSourceMapInput(r));
            var i = y.getArg(t, "version"),
                n = y.getArg(t, "sources"),
                s = y.getArg(t, "names", []),
                o = y.getArg(t, "sourceRoot", null),
                a = y.getArg(t, "sourcesContent", null),
                c = y.getArg(t, "mappings"),
                l = y.getArg(t, "file", null);
            if (i != this._version)
                throw new Error("Unsupported version: " + i);
            o && (o = y.normalize(o)),
                (n = n
                    .map(String)
                    .map(y.normalize)
                    .map(function (d) {
                        return o && y.isAbsolute(o) && y.isAbsolute(d)
                            ? y.relative(o, d)
                            : d;
                    })),
                (this._names = Ue.fromArray(s.map(String), !0)),
                (this._sources = Ue.fromArray(n, !0)),
                (this._absoluteSources = this._sources
                    .toArray()
                    .map(function (d) {
                        return y.computeSourceURL(o, d, e);
                    })),
                (this.sourceRoot = o),
                (this.sourcesContent = a),
                (this._mappings = c),
                (this._sourceMapURL = e),
                (this.file = l);
        }
        O.prototype = Object.create(R.prototype);
        O.prototype.consumer = R;
        O.prototype._findSourceIndex = function (r) {
            var e = r;
            if (
                (this.sourceRoot != null &&
                    (e = y.relative(this.sourceRoot, e)),
                this._sources.has(e))
            )
                return this._sources.indexOf(e);
            var t;
            for (t = 0; t < this._absoluteSources.length; ++t)
                if (this._absoluteSources[t] == r) return t;
            return -1;
        };
        O.fromSourceMap = function (e, t) {
            var i = Object.create(O.prototype),
                n = (i._names = Ue.fromArray(e._names.toArray(), !0)),
                s = (i._sources = Ue.fromArray(e._sources.toArray(), !0));
            (i.sourceRoot = e._sourceRoot),
                (i.sourcesContent = e._generateSourcesContent(
                    i._sources.toArray(),
                    i.sourceRoot,
                )),
                (i.file = e._file),
                (i._sourceMapURL = t),
                (i._absoluteSources = i._sources.toArray().map(function (f) {
                    return y.computeSourceURL(i.sourceRoot, f, t);
                }));
            for (
                var o = e._mappings.toArray().slice(),
                    a = (i.__generatedMappings = []),
                    c = (i.__originalMappings = []),
                    l = 0,
                    d = o.length;
                l < d;
                l++
            ) {
                var u = o[l],
                    h = new Eo();
                (h.generatedLine = u.generatedLine),
                    (h.generatedColumn = u.generatedColumn),
                    u.source &&
                        ((h.source = s.indexOf(u.source)),
                        (h.originalLine = u.originalLine),
                        (h.originalColumn = u.originalColumn),
                        u.name && (h.name = n.indexOf(u.name)),
                        c.push(h)),
                    a.push(h);
            }
            return yt(i.__originalMappings, y.compareByOriginalPositions), i;
        };
        O.prototype._version = 3;
        Object.defineProperty(O.prototype, "sources", {
            get: function () {
                return this._absoluteSources.slice();
            },
        });
        function Eo() {
            (this.generatedLine = 0),
                (this.generatedColumn = 0),
                (this.source = null),
                (this.originalLine = null),
                (this.originalColumn = null),
                (this.name = null);
        }
        O.prototype._parseMappings = function (e, t) {
            for (
                var i = 1,
                    n = 0,
                    s = 0,
                    o = 0,
                    a = 0,
                    c = 0,
                    l = e.length,
                    d = 0,
                    u = {},
                    h = {},
                    f = [],
                    p = [],
                    g,
                    b,
                    m,
                    S,
                    E;
                d < l;

            )
                if (e.charAt(d) === ";") i++, d++, (n = 0);
                else if (e.charAt(d) === ",") d++;
                else {
                    for (
                        g = new Eo(), g.generatedLine = i, S = d;
                        S < l && !this._charIsMappingSeparator(e, S);
                        S++
                    );
                    if (((b = e.slice(d, S)), (m = u[b]), m)) d += b.length;
                    else {
                        for (m = []; d < S; )
                            Nd.decode(e, d, h),
                                (E = h.value),
                                (d = h.rest),
                                m.push(E);
                        if (m.length === 2)
                            throw new Error(
                                "Found a source, but no line and column",
                            );
                        if (m.length === 3)
                            throw new Error(
                                "Found a source and line, but no column",
                            );
                        u[b] = m;
                    }
                    (g.generatedColumn = n + m[0]),
                        (n = g.generatedColumn),
                        m.length > 1 &&
                            ((g.source = a + m[1]),
                            (a += m[1]),
                            (g.originalLine = s + m[2]),
                            (s = g.originalLine),
                            (g.originalLine += 1),
                            (g.originalColumn = o + m[3]),
                            (o = g.originalColumn),
                            m.length > 4 && ((g.name = c + m[4]), (c += m[4]))),
                        p.push(g),
                        typeof g.originalLine == "number" && f.push(g);
                }
            yt(p, y.compareByGeneratedPositionsDeflated),
                (this.__generatedMappings = p),
                yt(f, y.compareByOriginalPositions),
                (this.__originalMappings = f);
        };
        O.prototype._findMapping = function (e, t, i, n, s, o) {
            if (e[i] <= 0)
                throw new TypeError(
                    "Line must be greater than or equal to 1, got " + e[i],
                );
            if (e[n] < 0)
                throw new TypeError(
                    "Column must be greater than or equal to 0, got " + e[n],
                );
            return sn.search(e, t, s, o);
        };
        O.prototype.computeColumnSpans = function () {
            for (var e = 0; e < this._generatedMappings.length; ++e) {
                var t = this._generatedMappings[e];
                if (e + 1 < this._generatedMappings.length) {
                    var i = this._generatedMappings[e + 1];
                    if (t.generatedLine === i.generatedLine) {
                        t.lastGeneratedColumn = i.generatedColumn - 1;
                        continue;
                    }
                }
                t.lastGeneratedColumn = 1 / 0;
            }
        };
        O.prototype.originalPositionFor = function (e) {
            var t = {
                    generatedLine: y.getArg(e, "line"),
                    generatedColumn: y.getArg(e, "column"),
                },
                i = this._findMapping(
                    t,
                    this._generatedMappings,
                    "generatedLine",
                    "generatedColumn",
                    y.compareByGeneratedPositionsDeflated,
                    y.getArg(e, "bias", R.GREATEST_LOWER_BOUND),
                );
            if (i >= 0) {
                var n = this._generatedMappings[i];
                if (n.generatedLine === t.generatedLine) {
                    var s = y.getArg(n, "source", null);
                    s !== null &&
                        ((s = this._sources.at(s)),
                        (s = y.computeSourceURL(
                            this.sourceRoot,
                            s,
                            this._sourceMapURL,
                        )));
                    var o = y.getArg(n, "name", null);
                    return (
                        o !== null && (o = this._names.at(o)),
                        {
                            source: s,
                            line: y.getArg(n, "originalLine", null),
                            column: y.getArg(n, "originalColumn", null),
                            name: o,
                        }
                    );
                }
            }
            return { source: null, line: null, column: null, name: null };
        };
        O.prototype.hasContentsOfAllSources = function () {
            return this.sourcesContent
                ? this.sourcesContent.length >= this._sources.size() &&
                      !this.sourcesContent.some(function (e) {
                          return e == null;
                      })
                : !1;
        };
        O.prototype.sourceContentFor = function (e, t) {
            if (!this.sourcesContent) return null;
            var i = this._findSourceIndex(e);
            if (i >= 0) return this.sourcesContent[i];
            var n = e;
            this.sourceRoot != null && (n = y.relative(this.sourceRoot, n));
            var s;
            if (this.sourceRoot != null && (s = y.urlParse(this.sourceRoot))) {
                var o = n.replace(/^file:\/\//, "");
                if (s.scheme == "file" && this._sources.has(o))
                    return this.sourcesContent[this._sources.indexOf(o)];
                if ((!s.path || s.path == "/") && this._sources.has("/" + n))
                    return this.sourcesContent[this._sources.indexOf("/" + n)];
            }
            if (t) return null;
            throw new Error('"' + n + '" is not in the SourceMap.');
        };
        O.prototype.generatedPositionFor = function (e) {
            var t = y.getArg(e, "source");
            if (((t = this._findSourceIndex(t)), t < 0))
                return { line: null, column: null, lastColumn: null };
            var i = {
                    source: t,
                    originalLine: y.getArg(e, "line"),
                    originalColumn: y.getArg(e, "column"),
                },
                n = this._findMapping(
                    i,
                    this._originalMappings,
                    "originalLine",
                    "originalColumn",
                    y.compareByOriginalPositions,
                    y.getArg(e, "bias", R.GREATEST_LOWER_BOUND),
                );
            if (n >= 0) {
                var s = this._originalMappings[n];
                if (s.source === i.source)
                    return {
                        line: y.getArg(s, "generatedLine", null),
                        column: y.getArg(s, "generatedColumn", null),
                        lastColumn: y.getArg(s, "lastGeneratedColumn", null),
                    };
            }
            return { line: null, column: null, lastColumn: null };
        };
        xr.BasicSourceMapConsumer = O;
        function ee(r, e) {
            var t = r;
            typeof r == "string" && (t = y.parseSourceMapInput(r));
            var i = y.getArg(t, "version"),
                n = y.getArg(t, "sections");
            if (i != this._version)
                throw new Error("Unsupported version: " + i);
            (this._sources = new Ue()), (this._names = new Ue());
            var s = { line: -1, column: 0 };
            this._sections = n.map(function (o) {
                if (o.url)
                    throw new Error(
                        "Support for url field in sections not implemented.",
                    );
                var a = y.getArg(o, "offset"),
                    c = y.getArg(a, "line"),
                    l = y.getArg(a, "column");
                if (c < s.line || (c === s.line && l < s.column))
                    throw new Error(
                        "Section offsets must be ordered and non-overlapping.",
                    );
                return (
                    (s = a),
                    {
                        generatedOffset: {
                            generatedLine: c + 1,
                            generatedColumn: l + 1,
                        },
                        consumer: new R(y.getArg(o, "map"), e),
                    }
                );
            });
        }
        ee.prototype = Object.create(R.prototype);
        ee.prototype.constructor = R;
        ee.prototype._version = 3;
        Object.defineProperty(ee.prototype, "sources", {
            get: function () {
                for (var r = [], e = 0; e < this._sections.length; e++)
                    for (
                        var t = 0;
                        t < this._sections[e].consumer.sources.length;
                        t++
                    )
                        r.push(this._sections[e].consumer.sources[t]);
                return r;
            },
        });
        ee.prototype.originalPositionFor = function (e) {
            var t = {
                    generatedLine: y.getArg(e, "line"),
                    generatedColumn: y.getArg(e, "column"),
                },
                i = sn.search(t, this._sections, function (s, o) {
                    var a = s.generatedLine - o.generatedOffset.generatedLine;
                    return (
                        a ||
                        s.generatedColumn - o.generatedOffset.generatedColumn
                    );
                }),
                n = this._sections[i];
            return n
                ? n.consumer.originalPositionFor({
                      line:
                          t.generatedLine -
                          (n.generatedOffset.generatedLine - 1),
                      column:
                          t.generatedColumn -
                          (n.generatedOffset.generatedLine === t.generatedLine
                              ? n.generatedOffset.generatedColumn - 1
                              : 0),
                      bias: e.bias,
                  })
                : { source: null, line: null, column: null, name: null };
        };
        ee.prototype.hasContentsOfAllSources = function () {
            return this._sections.every(function (e) {
                return e.consumer.hasContentsOfAllSources();
            });
        };
        ee.prototype.sourceContentFor = function (e, t) {
            for (var i = 0; i < this._sections.length; i++) {
                var n = this._sections[i],
                    s = n.consumer.sourceContentFor(e, !0);
                if (s) return s;
            }
            if (t) return null;
            throw new Error('"' + e + '" is not in the SourceMap.');
        };
        ee.prototype.generatedPositionFor = function (e) {
            for (var t = 0; t < this._sections.length; t++) {
                var i = this._sections[t];
                if (i.consumer._findSourceIndex(y.getArg(e, "source")) !== -1) {
                    var n = i.consumer.generatedPositionFor(e);
                    if (n) {
                        var s = {
                            line:
                                n.line + (i.generatedOffset.generatedLine - 1),
                            column:
                                n.column +
                                (i.generatedOffset.generatedLine === n.line
                                    ? i.generatedOffset.generatedColumn - 1
                                    : 0),
                        };
                        return s;
                    }
                }
            }
            return { line: null, column: null };
        };
        ee.prototype._parseMappings = function (e, t) {
            (this.__generatedMappings = []), (this.__originalMappings = []);
            for (var i = 0; i < this._sections.length; i++)
                for (
                    var n = this._sections[i],
                        s = n.consumer._generatedMappings,
                        o = 0;
                    o < s.length;
                    o++
                ) {
                    var a = s[o],
                        c = n.consumer._sources.at(a.source);
                    (c = y.computeSourceURL(
                        n.consumer.sourceRoot,
                        c,
                        this._sourceMapURL,
                    )),
                        this._sources.add(c),
                        (c = this._sources.indexOf(c));
                    var l = null;
                    a.name &&
                        ((l = n.consumer._names.at(a.name)),
                        this._names.add(l),
                        (l = this._names.indexOf(l)));
                    var d = {
                        source: c,
                        generatedLine:
                            a.generatedLine +
                            (n.generatedOffset.generatedLine - 1),
                        generatedColumn:
                            a.generatedColumn +
                            (n.generatedOffset.generatedLine === a.generatedLine
                                ? n.generatedOffset.generatedColumn - 1
                                : 0),
                        originalLine: a.originalLine,
                        originalColumn: a.originalColumn,
                        name: l,
                    };
                    this.__generatedMappings.push(d),
                        typeof d.originalLine == "number" &&
                            this.__originalMappings.push(d);
                }
            yt(this.__generatedMappings, y.compareByGeneratedPositionsDeflated),
                yt(this.__originalMappings, y.compareByOriginalPositions);
        };
        xr.IndexedSourceMapConsumer = ee;
    });
    var Ro = v((Ao) => {
        var qd = en().SourceMapGenerator,
            Cr = je(),
            Od = /(\r?\n)/,
            Hd = 10,
            Je = "$$$isSourceNode$$$";
        function K(r, e, t, i, n) {
            (this.children = []),
                (this.sourceContents = {}),
                (this.line = r ?? null),
                (this.column = e ?? null),
                (this.source = t ?? null),
                (this.name = n ?? null),
                (this[Je] = !0),
                i != null && this.add(i);
        }
        K.fromStringWithSourceMap = function (e, t, i) {
            var n = new K(),
                s = e.split(Od),
                o = 0,
                a = function () {
                    var h = p(),
                        f = p() || "";
                    return h + f;
                    function p() {
                        return o < s.length ? s[o++] : void 0;
                    }
                },
                c = 1,
                l = 0,
                d = null;
            return (
                t.eachMapping(function (h) {
                    if (d !== null)
                        if (c < h.generatedLine) u(d, a()), c++, (l = 0);
                        else {
                            var f = s[o] || "",
                                p = f.substr(0, h.generatedColumn - l);
                            (s[o] = f.substr(h.generatedColumn - l)),
                                (l = h.generatedColumn),
                                u(d, p),
                                (d = h);
                            return;
                        }
                    for (; c < h.generatedLine; ) n.add(a()), c++;
                    if (l < h.generatedColumn) {
                        var f = s[o] || "";
                        n.add(f.substr(0, h.generatedColumn)),
                            (s[o] = f.substr(h.generatedColumn)),
                            (l = h.generatedColumn);
                    }
                    d = h;
                }, this),
                o < s.length && (d && u(d, a()), n.add(s.splice(o).join(""))),
                t.sources.forEach(function (h) {
                    var f = t.sourceContentFor(h);
                    f != null &&
                        (i != null && (h = Cr.join(i, h)),
                        n.setSourceContent(h, f));
                }),
                n
            );
            function u(h, f) {
                if (h === null || h.source === void 0) n.add(f);
                else {
                    var p = i ? Cr.join(i, h.source) : h.source;
                    n.add(
                        new K(h.originalLine, h.originalColumn, p, f, h.name),
                    );
                }
            }
        };
        K.prototype.add = function (e) {
            if (Array.isArray(e))
                e.forEach(function (t) {
                    this.add(t);
                }, this);
            else if (e[Je] || typeof e == "string") e && this.children.push(e);
            else
                throw new TypeError(
                    "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " +
                        e,
                );
            return this;
        };
        K.prototype.prepend = function (e) {
            if (Array.isArray(e))
                for (var t = e.length - 1; t >= 0; t--) this.prepend(e[t]);
            else if (e[Je] || typeof e == "string") this.children.unshift(e);
            else
                throw new TypeError(
                    "Expected a SourceNode, string, or an array of SourceNodes and strings. Got " +
                        e,
                );
            return this;
        };
        K.prototype.walk = function (e) {
            for (var t, i = 0, n = this.children.length; i < n; i++)
                (t = this.children[i]),
                    t[Je]
                        ? t.walk(e)
                        : t !== "" &&
                          e(t, {
                              source: this.source,
                              line: this.line,
                              column: this.column,
                              name: this.name,
                          });
        };
        K.prototype.join = function (e) {
            var t,
                i,
                n = this.children.length;
            if (n > 0) {
                for (t = [], i = 0; i < n - 1; i++)
                    t.push(this.children[i]), t.push(e);
                t.push(this.children[i]), (this.children = t);
            }
            return this;
        };
        K.prototype.replaceRight = function (e, t) {
            var i = this.children[this.children.length - 1];
            return (
                i[Je]
                    ? i.replaceRight(e, t)
                    : typeof i == "string"
                      ? (this.children[this.children.length - 1] = i.replace(
                            e,
                            t,
                        ))
                      : this.children.push("".replace(e, t)),
                this
            );
        };
        K.prototype.setSourceContent = function (e, t) {
            this.sourceContents[Cr.toSetString(e)] = t;
        };
        K.prototype.walkSourceContents = function (e) {
            for (var t = 0, i = this.children.length; t < i; t++)
                this.children[t][Je] && this.children[t].walkSourceContents(e);
            for (
                var n = Object.keys(this.sourceContents), t = 0, i = n.length;
                t < i;
                t++
            )
                e(Cr.fromSetString(n[t]), this.sourceContents[n[t]]);
        };
        K.prototype.toString = function () {
            var e = "";
            return (
                this.walk(function (t) {
                    e += t;
                }),
                e
            );
        };
        K.prototype.toStringWithSourceMap = function (e) {
            var t = { code: "", line: 1, column: 0 },
                i = new qd(e),
                n = !1,
                s = null,
                o = null,
                a = null,
                c = null;
            return (
                this.walk(function (l, d) {
                    (t.code += l),
                        d.source !== null &&
                        d.line !== null &&
                        d.column !== null
                            ? ((s !== d.source ||
                                  o !== d.line ||
                                  a !== d.column ||
                                  c !== d.name) &&
                                  i.addMapping({
                                      source: d.source,
                                      original: {
                                          line: d.line,
                                          column: d.column,
                                      },
                                      generated: {
                                          line: t.line,
                                          column: t.column,
                                      },
                                      name: d.name,
                                  }),
                              (s = d.source),
                              (o = d.line),
                              (a = d.column),
                              (c = d.name),
                              (n = !0))
                            : n &&
                              (i.addMapping({
                                  generated: { line: t.line, column: t.column },
                              }),
                              (s = null),
                              (n = !1));
                    for (var u = 0, h = l.length; u < h; u++)
                        l.charCodeAt(u) === Hd
                            ? (t.line++,
                              (t.column = 0),
                              u + 1 === h
                                  ? ((s = null), (n = !1))
                                  : n &&
                                    i.addMapping({
                                        source: d.source,
                                        original: {
                                            line: d.line,
                                            column: d.column,
                                        },
                                        generated: {
                                            line: t.line,
                                            column: t.column,
                                        },
                                        name: d.name,
                                    }))
                            : t.column++;
                }),
                this.walkSourceContents(function (l, d) {
                    i.setSourceContent(l, d);
                }),
                { code: t.code, map: i }
            );
        };
        Ao.SourceNode = K;
    });
    var No = v((Lr) => {
        Lr.SourceMapGenerator = en().SourceMapGenerator;
        Lr.SourceMapConsumer = Mo().SourceMapConsumer;
        Lr.SourceNode = Ro().SourceNode;
    });
    var zo = v((Pr, Ho) => {
        "use strict";
        Pr.__esModule = !0;
        var an = F(),
            Te = void 0;
        try {
            (typeof define != "function" || !define.amd) &&
                ((qo = No()), (Te = qo.SourceNode));
        } catch {}
        var qo;
        Te ||
            ((Te = function (r, e, t, i) {
                (this.src = ""), i && this.add(i);
            }),
            (Te.prototype = {
                add: function (e) {
                    an.isArray(e) && (e = e.join("")), (this.src += e);
                },
                prepend: function (e) {
                    an.isArray(e) && (e = e.join("")),
                        (this.src = e + this.src);
                },
                toStringWithSourceMap: function () {
                    return { code: this.toString() };
                },
                toString: function () {
                    return this.src;
                },
            }));
        function on(r, e, t) {
            if (an.isArray(r)) {
                for (var i = [], n = 0, s = r.length; n < s; n++)
                    i.push(e.wrap(r[n], t));
                return i;
            } else if (typeof r == "boolean" || typeof r == "number")
                return r + "";
            return r;
        }
        function Oo(r) {
            (this.srcFile = r), (this.source = []);
        }
        Oo.prototype = {
            isEmpty: function () {
                return !this.source.length;
            },
            prepend: function (e, t) {
                this.source.unshift(this.wrap(e, t));
            },
            push: function (e, t) {
                this.source.push(this.wrap(e, t));
            },
            merge: function () {
                var e = this.empty();
                return (
                    this.each(function (t) {
                        e.add([
                            "  ",
                            t,
                            `
`,
                        ]);
                    }),
                    e
                );
            },
            each: function (e) {
                for (var t = 0, i = this.source.length; t < i; t++)
                    e(this.source[t]);
            },
            empty: function () {
                var e = this.currentLocation || { start: {} };
                return new Te(e.start.line, e.start.column, this.srcFile);
            },
            wrap: function (e) {
                var t =
                    arguments.length <= 1 || arguments[1] === void 0
                        ? this.currentLocation || { start: {} }
                        : arguments[1];
                return e instanceof Te
                    ? e
                    : ((e = on(e, this, t)),
                      new Te(t.start.line, t.start.column, this.srcFile, e));
            },
            functionCall: function (e, t, i) {
                return (
                    (i = this.generateList(i)),
                    this.wrap([e, t ? "." + t + "(" : "(", i, ")"])
                );
            },
            quotedString: function (e) {
                return (
                    '"' +
                    (e + "")
                        .replace(/\\/g, "\\\\")
                        .replace(/"/g, '\\"')
                        .replace(/\n/g, "\\n")
                        .replace(/\r/g, "\\r")
                        .replace(/\u2028/g, "\\u2028")
                        .replace(/\u2029/g, "\\u2029") +
                    '"'
                );
            },
            objectLiteral: function (e) {
                var t = this,
                    i = [];
                Object.keys(e).forEach(function (s) {
                    var o = on(e[s], t);
                    o !== "undefined" && i.push([t.quotedString(s), ":", o]);
                });
                var n = this.generateList(i);
                return n.prepend("{"), n.add("}"), n;
            },
            generateList: function (e) {
                for (var t = this.empty(), i = 0, n = e.length; i < n; i++)
                    i && t.add(","), t.add(on(e[i], this));
                return t;
            },
            generateArray: function (e) {
                var t = this.generateList(e);
                return t.prepend("["), t.add("]"), t;
            },
        };
        Pr.default = Oo;
        Ho.exports = Pr.default;
    });
    var Ko = v((Tr, Vo) => {
        "use strict";
        Tr.__esModule = !0;
        function Do(r) {
            return r && r.__esModule ? r : { default: r };
        }
        var Bo = ur(),
            zd = J(),
            ln = Do(zd),
            Bd = F(),
            Fd = zo(),
            Fo = Do(Fd);
        function Qe(r) {
            this.value = r;
        }
        function $e() {}
        $e.prototype = {
            nameLookup: function (e, t) {
                return this.internalNameLookup(e, t);
            },
            depthedLookup: function (e) {
                return [
                    this.aliasable("container.lookup"),
                    "(depths, ",
                    JSON.stringify(e),
                    ")",
                ];
            },
            compilerInfo: function () {
                var e = Bo.COMPILER_REVISION,
                    t = Bo.REVISION_CHANGES[e];
                return [e, t];
            },
            appendToBuffer: function (e, t, i) {
                return (
                    Bd.isArray(e) || (e = [e]),
                    (e = this.source.wrap(e, t)),
                    this.environment.isSimple
                        ? ["return ", e, ";"]
                        : i
                          ? ["buffer += ", e, ";"]
                          : ((e.appendToBuffer = !0), e)
                );
            },
            initializeBuffer: function () {
                return this.quotedString("");
            },
            internalNameLookup: function (e, t) {
                return (
                    (this.lookupPropertyFunctionIsUsed = !0),
                    ["lookupProperty(", e, ",", JSON.stringify(t), ")"]
                );
            },
            lookupPropertyFunctionIsUsed: !1,
            compile: function (e, t, i, n) {
                (this.environment = e),
                    (this.options = t),
                    (this.stringParams = this.options.stringParams),
                    (this.trackIds = this.options.trackIds),
                    (this.precompile = !n),
                    (this.name = this.environment.name),
                    (this.isChild = !!i),
                    (this.context = i || {
                        decorators: [],
                        programs: [],
                        environments: [],
                    }),
                    this.preamble(),
                    (this.stackSlot = 0),
                    (this.stackVars = []),
                    (this.aliases = {}),
                    (this.registers = { list: [] }),
                    (this.hashes = []),
                    (this.compileStack = []),
                    (this.inlineStack = []),
                    (this.blockParams = []),
                    this.compileChildren(e, t),
                    (this.useDepths =
                        this.useDepths ||
                        e.useDepths ||
                        e.useDecorators ||
                        this.options.compat),
                    (this.useBlockParams =
                        this.useBlockParams || e.useBlockParams);
                var s = e.opcodes,
                    o = void 0,
                    a = void 0,
                    c = void 0,
                    l = void 0;
                for (c = 0, l = s.length; c < l; c++)
                    (o = s[c]),
                        (this.source.currentLocation = o.loc),
                        (a = a || o.loc),
                        this[o.opcode].apply(this, o.args);
                if (
                    ((this.source.currentLocation = a),
                    this.pushSource(""),
                    this.stackSlot ||
                        this.inlineStack.length ||
                        this.compileStack.length)
                )
                    throw new ln.default(
                        "Compile completed with content left on stack",
                    );
                this.decorators.isEmpty()
                    ? (this.decorators = void 0)
                    : ((this.useDecorators = !0),
                      this.decorators.prepend([
                          "var decorators = container.decorators, ",
                          this.lookupPropertyFunctionVarDeclaration(),
                          `;
`,
                      ]),
                      this.decorators.push("return fn;"),
                      n
                          ? (this.decorators = Function.apply(this, [
                                "fn",
                                "props",
                                "container",
                                "depth0",
                                "data",
                                "blockParams",
                                "depths",
                                this.decorators.merge(),
                            ]))
                          : (this.decorators
                                .prepend(`function(fn, props, container, depth0, data, blockParams, depths) {
`),
                            this.decorators.push(`}
`),
                            (this.decorators = this.decorators.merge())));
                var d = this.createFunctionContext(n);
                if (this.isChild) return d;
                var u = { compiler: this.compilerInfo(), main: d };
                this.decorators &&
                    ((u.main_d = this.decorators), (u.useDecorators = !0));
                var h = this.context,
                    f = h.programs,
                    p = h.decorators;
                for (c = 0, l = f.length; c < l; c++)
                    f[c] &&
                        ((u[c] = f[c]),
                        p[c] && ((u[c + "_d"] = p[c]), (u.useDecorators = !0)));
                return (
                    this.environment.usePartial && (u.usePartial = !0),
                    this.options.data && (u.useData = !0),
                    this.useDepths && (u.useDepths = !0),
                    this.useBlockParams && (u.useBlockParams = !0),
                    this.options.compat && (u.compat = !0),
                    n
                        ? (u.compilerOptions = this.options)
                        : ((u.compiler = JSON.stringify(u.compiler)),
                          (this.source.currentLocation = {
                              start: { line: 1, column: 0 },
                          }),
                          (u = this.objectLiteral(u)),
                          t.srcName
                              ? ((u = u.toStringWithSourceMap({
                                    file: t.destName,
                                })),
                                (u.map = u.map && u.map.toString()))
                              : (u = u.toString())),
                    u
                );
            },
            preamble: function () {
                (this.lastContext = 0),
                    (this.source = new Fo.default(this.options.srcName)),
                    (this.decorators = new Fo.default(this.options.srcName));
            },
            createFunctionContext: function (e) {
                var t = this,
                    i = "",
                    n = this.stackVars.concat(this.registers.list);
                n.length > 0 && (i += ", " + n.join(", "));
                var s = 0;
                Object.keys(this.aliases).forEach(function (c) {
                    var l = t.aliases[c];
                    l.children &&
                        l.referenceCount > 1 &&
                        ((i += ", alias" + ++s + "=" + c),
                        (l.children[0] = "alias" + s));
                }),
                    this.lookupPropertyFunctionIsUsed &&
                        (i +=
                            ", " + this.lookupPropertyFunctionVarDeclaration());
                var o = ["container", "depth0", "helpers", "partials", "data"];
                (this.useBlockParams || this.useDepths) &&
                    o.push("blockParams"),
                    this.useDepths && o.push("depths");
                var a = this.mergeSource(i);
                return e
                    ? (o.push(a), Function.apply(this, o))
                    : this.source.wrap([
                          "function(",
                          o.join(","),
                          `) {
  `,
                          a,
                          "}",
                      ]);
            },
            mergeSource: function (e) {
                var t = this.environment.isSimple,
                    i = !this.forceBuffer,
                    n = void 0,
                    s = void 0,
                    o = void 0,
                    a = void 0;
                return (
                    this.source.each(function (c) {
                        c.appendToBuffer
                            ? (o ? c.prepend("  + ") : (o = c), (a = c))
                            : (o &&
                                  (s ? o.prepend("buffer += ") : (n = !0),
                                  a.add(";"),
                                  (o = a = void 0)),
                              (s = !0),
                              t || (i = !1));
                    }),
                    i
                        ? o
                            ? (o.prepend("return "), a.add(";"))
                            : s || this.source.push('return "";')
                        : ((e +=
                              ", buffer = " +
                              (n ? "" : this.initializeBuffer())),
                          o
                              ? (o.prepend("return buffer + "), a.add(";"))
                              : this.source.push("return buffer;")),
                    e &&
                        this.source.prepend(
                            "var " +
                                e.substring(2) +
                                (n
                                    ? ""
                                    : `;
`),
                        ),
                    this.source.merge()
                );
            },
            lookupPropertyFunctionVarDeclaration: function () {
                return `
      lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    }
    `.trim();
            },
            blockValue: function (e) {
                var t = this.aliasable("container.hooks.blockHelperMissing"),
                    i = [this.contextName(0)];
                this.setupHelperArgs(e, 0, i);
                var n = this.popStack();
                i.splice(1, 0, n),
                    this.push(this.source.functionCall(t, "call", i));
            },
            ambiguousBlockValue: function () {
                var e = this.aliasable("container.hooks.blockHelperMissing"),
                    t = [this.contextName(0)];
                this.setupHelperArgs("", 0, t, !0), this.flushInline();
                var i = this.topStack();
                t.splice(1, 0, i),
                    this.pushSource([
                        "if (!",
                        this.lastHelper,
                        ") { ",
                        i,
                        " = ",
                        this.source.functionCall(e, "call", t),
                        "}",
                    ]);
            },
            appendContent: function (e) {
                this.pendingContent
                    ? (e = this.pendingContent + e)
                    : (this.pendingLocation = this.source.currentLocation),
                    (this.pendingContent = e);
            },
            append: function () {
                if (this.isInline())
                    this.replaceStack(function (t) {
                        return [" != null ? ", t, ' : ""'];
                    }),
                        this.pushSource(this.appendToBuffer(this.popStack()));
                else {
                    var e = this.popStack();
                    this.pushSource([
                        "if (",
                        e,
                        " != null) { ",
                        this.appendToBuffer(e, void 0, !0),
                        " }",
                    ]),
                        this.environment.isSimple &&
                            this.pushSource([
                                "else { ",
                                this.appendToBuffer("''", void 0, !0),
                                " }",
                            ]);
                }
            },
            appendEscaped: function () {
                this.pushSource(
                    this.appendToBuffer([
                        this.aliasable("container.escapeExpression"),
                        "(",
                        this.popStack(),
                        ")",
                    ]),
                );
            },
            getContext: function (e) {
                this.lastContext = e;
            },
            pushContext: function () {
                this.pushStackLiteral(this.contextName(this.lastContext));
            },
            lookupOnContext: function (e, t, i, n) {
                var s = 0;
                !n && this.options.compat && !this.lastContext
                    ? this.push(this.depthedLookup(e[s++]))
                    : this.pushContext(),
                    this.resolvePath("context", e, s, t, i);
            },
            lookupBlockParam: function (e, t) {
                (this.useBlockParams = !0),
                    this.push(["blockParams[", e[0], "][", e[1], "]"]),
                    this.resolvePath("context", t, 1);
            },
            lookupData: function (e, t, i) {
                e
                    ? this.pushStackLiteral("container.data(data, " + e + ")")
                    : this.pushStackLiteral("data"),
                    this.resolvePath("data", t, 0, !0, i);
            },
            resolvePath: function (e, t, i, n, s) {
                var o = this;
                if (this.options.strict || this.options.assumeObjects) {
                    this.push(Dd(this.options.strict && s, this, t, i, e));
                    return;
                }
                for (var a = t.length; i < a; i++)
                    this.replaceStack(function (c) {
                        var l = o.nameLookup(c, t[i], e);
                        return n ? [" && ", l] : [" != null ? ", l, " : ", c];
                    });
            },
            resolvePossibleLambda: function () {
                this.push([
                    this.aliasable("container.lambda"),
                    "(",
                    this.popStack(),
                    ", ",
                    this.contextName(0),
                    ")",
                ]);
            },
            pushStringParam: function (e, t) {
                this.pushContext(),
                    this.pushString(t),
                    t !== "SubExpression" &&
                        (typeof e == "string"
                            ? this.pushString(e)
                            : this.pushStackLiteral(e));
            },
            emptyHash: function (e) {
                this.trackIds && this.push("{}"),
                    this.stringParams && (this.push("{}"), this.push("{}")),
                    this.pushStackLiteral(e ? "undefined" : "{}");
            },
            pushHash: function () {
                this.hash && this.hashes.push(this.hash),
                    (this.hash = {
                        values: {},
                        types: [],
                        contexts: [],
                        ids: [],
                    });
            },
            popHash: function () {
                var e = this.hash;
                (this.hash = this.hashes.pop()),
                    this.trackIds && this.push(this.objectLiteral(e.ids)),
                    this.stringParams &&
                        (this.push(this.objectLiteral(e.contexts)),
                        this.push(this.objectLiteral(e.types))),
                    this.push(this.objectLiteral(e.values));
            },
            pushString: function (e) {
                this.pushStackLiteral(this.quotedString(e));
            },
            pushLiteral: function (e) {
                this.pushStackLiteral(e);
            },
            pushProgram: function (e) {
                e != null
                    ? this.pushStackLiteral(this.programExpression(e))
                    : this.pushStackLiteral(null);
            },
            registerDecorator: function (e, t) {
                var i = this.nameLookup("decorators", t, "decorator"),
                    n = this.setupHelperArgs(t, e);
                this.decorators.push([
                    "fn = ",
                    this.decorators.functionCall(i, "", [
                        "fn",
                        "props",
                        "container",
                        n,
                    ]),
                    " || fn;",
                ]);
            },
            invokeHelper: function (e, t, i) {
                var n = this.popStack(),
                    s = this.setupHelper(e, t),
                    o = [];
                i && o.push(s.name),
                    o.push(n),
                    this.options.strict ||
                        o.push(this.aliasable("container.hooks.helperMissing"));
                var a = ["(", this.itemsSeparatedBy(o, "||"), ")"],
                    c = this.source.functionCall(a, "call", s.callParams);
                this.push(c);
            },
            itemsSeparatedBy: function (e, t) {
                var i = [];
                i.push(e[0]);
                for (var n = 1; n < e.length; n++) i.push(t, e[n]);
                return i;
            },
            invokeKnownHelper: function (e, t) {
                var i = this.setupHelper(e, t);
                this.push(
                    this.source.functionCall(i.name, "call", i.callParams),
                );
            },
            invokeAmbiguous: function (e, t) {
                this.useRegister("helper");
                var i = this.popStack();
                this.emptyHash();
                var n = this.setupHelper(0, e, t),
                    s = (this.lastHelper = this.nameLookup(
                        "helpers",
                        e,
                        "helper",
                    )),
                    o = ["(", "(helper = ", s, " || ", i, ")"];
                this.options.strict ||
                    ((o[0] = "(helper = "),
                    o.push(
                        " != null ? helper : ",
                        this.aliasable("container.hooks.helperMissing"),
                    )),
                    this.push([
                        "(",
                        o,
                        n.paramsInit ? ["),(", n.paramsInit] : [],
                        "),",
                        "(typeof helper === ",
                        this.aliasable('"function"'),
                        " ? ",
                        this.source.functionCall(
                            "helper",
                            "call",
                            n.callParams,
                        ),
                        " : helper))",
                    ]);
            },
            invokePartial: function (e, t, i) {
                var n = [],
                    s = this.setupParams(t, 1, n);
                e && ((t = this.popStack()), delete s.name),
                    i && (s.indent = JSON.stringify(i)),
                    (s.helpers = "helpers"),
                    (s.partials = "partials"),
                    (s.decorators = "container.decorators"),
                    e
                        ? n.unshift(t)
                        : n.unshift(this.nameLookup("partials", t, "partial")),
                    this.options.compat && (s.depths = "depths"),
                    (s = this.objectLiteral(s)),
                    n.push(s),
                    this.push(
                        this.source.functionCall(
                            "container.invokePartial",
                            "",
                            n,
                        ),
                    );
            },
            assignToHash: function (e) {
                var t = this.popStack(),
                    i = void 0,
                    n = void 0,
                    s = void 0;
                this.trackIds && (s = this.popStack()),
                    this.stringParams &&
                        ((n = this.popStack()), (i = this.popStack()));
                var o = this.hash;
                i && (o.contexts[e] = i),
                    n && (o.types[e] = n),
                    s && (o.ids[e] = s),
                    (o.values[e] = t);
            },
            pushId: function (e, t, i) {
                e === "BlockParam"
                    ? this.pushStackLiteral(
                          "blockParams[" +
                              t[0] +
                              "].path[" +
                              t[1] +
                              "]" +
                              (i ? " + " + JSON.stringify("." + i) : ""),
                      )
                    : e === "PathExpression"
                      ? this.pushString(t)
                      : e === "SubExpression"
                        ? this.pushStackLiteral("true")
                        : this.pushStackLiteral("null");
            },
            compiler: $e,
            compileChildren: function (e, t) {
                for (
                    var i = e.children,
                        n = void 0,
                        s = void 0,
                        o = 0,
                        a = i.length;
                    o < a;
                    o++
                ) {
                    (n = i[o]), (s = new this.compiler());
                    var c = this.matchExistingProgram(n);
                    if (c == null) {
                        this.context.programs.push("");
                        var l = this.context.programs.length;
                        (n.index = l),
                            (n.name = "program" + l),
                            (this.context.programs[l] = s.compile(
                                n,
                                t,
                                this.context,
                                !this.precompile,
                            )),
                            (this.context.decorators[l] = s.decorators),
                            (this.context.environments[l] = n),
                            (this.useDepths = this.useDepths || s.useDepths),
                            (this.useBlockParams =
                                this.useBlockParams || s.useBlockParams),
                            (n.useDepths = this.useDepths),
                            (n.useBlockParams = this.useBlockParams);
                    } else
                        (n.index = c.index),
                            (n.name = "program" + c.index),
                            (this.useDepths = this.useDepths || c.useDepths),
                            (this.useBlockParams =
                                this.useBlockParams || c.useBlockParams);
                }
            },
            matchExistingProgram: function (e) {
                for (
                    var t = 0, i = this.context.environments.length;
                    t < i;
                    t++
                ) {
                    var n = this.context.environments[t];
                    if (n && n.equals(e)) return n;
                }
            },
            programExpression: function (e) {
                var t = this.environment.children[e],
                    i = [t.index, "data", t.blockParams];
                return (
                    (this.useBlockParams || this.useDepths) &&
                        i.push("blockParams"),
                    this.useDepths && i.push("depths"),
                    "container.program(" + i.join(", ") + ")"
                );
            },
            useRegister: function (e) {
                this.registers[e] ||
                    ((this.registers[e] = !0), this.registers.list.push(e));
            },
            push: function (e) {
                return (
                    e instanceof Qe || (e = this.source.wrap(e)),
                    this.inlineStack.push(e),
                    e
                );
            },
            pushStackLiteral: function (e) {
                this.push(new Qe(e));
            },
            pushSource: function (e) {
                this.pendingContent &&
                    (this.source.push(
                        this.appendToBuffer(
                            this.source.quotedString(this.pendingContent),
                            this.pendingLocation,
                        ),
                    ),
                    (this.pendingContent = void 0)),
                    e && this.source.push(e);
            },
            replaceStack: function (e) {
                var t = ["("],
                    i = void 0,
                    n = void 0,
                    s = void 0;
                if (!this.isInline())
                    throw new ln.default("replaceStack on non-inline");
                var o = this.popStack(!0);
                if (o instanceof Qe) (i = [o.value]), (t = ["(", i]), (s = !0);
                else {
                    n = !0;
                    var a = this.incrStack();
                    (t = ["((", this.push(a), " = ", o, ")"]),
                        (i = this.topStack());
                }
                var c = e.call(this, i);
                s || this.popStack(),
                    n && this.stackSlot--,
                    this.push(t.concat(c, ")"));
            },
            incrStack: function () {
                return (
                    this.stackSlot++,
                    this.stackSlot > this.stackVars.length &&
                        this.stackVars.push("stack" + this.stackSlot),
                    this.topStackName()
                );
            },
            topStackName: function () {
                return "stack" + this.stackSlot;
            },
            flushInline: function () {
                var e = this.inlineStack;
                this.inlineStack = [];
                for (var t = 0, i = e.length; t < i; t++) {
                    var n = e[t];
                    if (n instanceof Qe) this.compileStack.push(n);
                    else {
                        var s = this.incrStack();
                        this.pushSource([s, " = ", n, ";"]),
                            this.compileStack.push(s);
                    }
                }
            },
            isInline: function () {
                return this.inlineStack.length;
            },
            popStack: function (e) {
                var t = this.isInline(),
                    i = (t ? this.inlineStack : this.compileStack).pop();
                if (!e && i instanceof Qe) return i.value;
                if (!t) {
                    if (!this.stackSlot)
                        throw new ln.default("Invalid stack pop");
                    this.stackSlot--;
                }
                return i;
            },
            topStack: function () {
                var e = this.isInline() ? this.inlineStack : this.compileStack,
                    t = e[e.length - 1];
                return t instanceof Qe ? t.value : t;
            },
            contextName: function (e) {
                return this.useDepths && e ? "depths[" + e + "]" : "depth" + e;
            },
            quotedString: function (e) {
                return this.source.quotedString(e);
            },
            objectLiteral: function (e) {
                return this.source.objectLiteral(e);
            },
            aliasable: function (e) {
                var t = this.aliases[e];
                return t
                    ? (t.referenceCount++, t)
                    : ((t = this.aliases[e] = this.source.wrap(e)),
                      (t.aliasable = !0),
                      (t.referenceCount = 1),
                      t);
            },
            setupHelper: function (e, t, i) {
                var n = [],
                    s = this.setupHelperArgs(t, e, n, i),
                    o = this.nameLookup("helpers", t, "helper"),
                    a = this.aliasable(
                        this.contextName(0) +
                            " != null ? " +
                            this.contextName(0) +
                            " : (container.nullContext || {})",
                    );
                return {
                    params: n,
                    paramsInit: s,
                    name: o,
                    callParams: [a].concat(n),
                };
            },
            setupParams: function (e, t, i) {
                var n = {},
                    s = [],
                    o = [],
                    a = [],
                    c = !i,
                    l = void 0;
                c && (i = []),
                    (n.name = this.quotedString(e)),
                    (n.hash = this.popStack()),
                    this.trackIds && (n.hashIds = this.popStack()),
                    this.stringParams &&
                        ((n.hashTypes = this.popStack()),
                        (n.hashContexts = this.popStack()));
                var d = this.popStack(),
                    u = this.popStack();
                (u || d) &&
                    ((n.fn = u || "container.noop"),
                    (n.inverse = d || "container.noop"));
                for (var h = t; h--; )
                    (l = this.popStack()),
                        (i[h] = l),
                        this.trackIds && (a[h] = this.popStack()),
                        this.stringParams &&
                            ((o[h] = this.popStack()),
                            (s[h] = this.popStack()));
                return (
                    c && (n.args = this.source.generateArray(i)),
                    this.trackIds && (n.ids = this.source.generateArray(a)),
                    this.stringParams &&
                        ((n.types = this.source.generateArray(o)),
                        (n.contexts = this.source.generateArray(s))),
                    this.options.data && (n.data = "data"),
                    this.useBlockParams && (n.blockParams = "blockParams"),
                    n
                );
            },
            setupHelperArgs: function (e, t, i, n) {
                var s = this.setupParams(e, t, i);
                return (
                    (s.loc = JSON.stringify(this.source.currentLocation)),
                    (s = this.objectLiteral(s)),
                    n
                        ? (this.useRegister("options"),
                          i.push("options"),
                          ["options=", s])
                        : i
                          ? (i.push(s), "")
                          : s
                );
            },
        };
        (function () {
            for (
                var r =
                        "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(
                            " ",
                        ),
                    e = ($e.RESERVED_WORDS = {}),
                    t = 0,
                    i = r.length;
                t < i;
                t++
            )
                e[r[t]] = !0;
        })();
        $e.isValidJavaScriptVariableName = function (r) {
            return (
                !$e.RESERVED_WORDS[r] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(r)
            );
        };
        function Dd(r, e, t, i, n) {
            var s = e.popStack(),
                o = t.length;
            for (r && o--; i < o; i++) s = e.nameLookup(s, t[i], n);
            return r
                ? [
                      e.aliasable("container.strict"),
                      "(",
                      s,
                      ", ",
                      e.quotedString(t[i]),
                      ", ",
                      JSON.stringify(e.source.currentLocation),
                      " )",
                  ]
                : s;
        }
        Tr.default = $e;
        Vo.exports = Tr.default;
    });
    var Wo = v((Ir, Go) => {
        "use strict";
        Ir.__esModule = !0;
        function _t(r) {
            return r && r.__esModule ? r : { default: r };
        }
        var Vd = Ws(),
            Kd = _t(Vd),
            Zd = Hi(),
            Gd = _t(Zd),
            cn = so(),
            un = co(),
            Wd = Ko(),
            jd = _t(Wd),
            Ud = Bi(),
            Jd = _t(Ud),
            Qd = Ri(),
            $d = _t(Qd),
            Xd = Kd.default.create;
        function Zo() {
            var r = Xd();
            return (
                (r.compile = function (e, t) {
                    return un.compile(e, t, r);
                }),
                (r.precompile = function (e, t) {
                    return un.precompile(e, t, r);
                }),
                (r.AST = Gd.default),
                (r.Compiler = un.Compiler),
                (r.JavaScriptCompiler = jd.default),
                (r.Parser = cn.parser),
                (r.parse = cn.parse),
                (r.parseWithoutProcessing = cn.parseWithoutProcessing),
                r
            );
        }
        var Xe = Zo();
        Xe.create = Zo;
        $d.default(Xe);
        Xe.Visitor = Jd.default;
        Xe.default = Xe;
        Ir.default = Xe;
        Go.exports = Ir.default;
    });
    var ua = Me(x());
    var L = {
        addonName: "Zotero Article Status",
        addonID: "zoteroarticlestatus@alima-webdev.com",
        addonRef: "zoteroarticlestatus",
        addonInstance: "ZoteroArticleStatus",
        prefsPrefix: "extensions.zoteroarticlestatus",
        releasePage:
            "https://github.com/alima-webdev/zotero-article-status/releases",
        updateJSON:
            "https://raw.githubusercontent.com/alima-webdev/zotero-article-status/main/update.json",
    };
    function Pn() {
        ztoolkit.log("Fn: initLocale");
        let r = new (
            typeof Localization > "u"
                ? ztoolkit.getGlobal("Localization")
                : Localization
        )([`${L.addonRef}-addon.ftl`], !0);
        ztoolkit.log(r), (addon.data.locale = { current: r });
    }
    function A(...r) {
        if (r.length === 1) return qr(r[0]);
        if (r.length === 2)
            return typeof r[1] == "string"
                ? qr(r[0], { branch: r[1] })
                : qr(r[0], r[1]);
        throw new Error("Invalid arguments");
    }
    function qr(r, e = {}) {
        let t = `${L.addonRef}-${r}`,
            { branch: i, args: n } = e,
            s = addon.data.locale?.current.formatMessagesSync([
                { id: t, args: n },
            ])[0];
        return s
            ? i && s.attributes
                ? s.attributes[i] || t
                : s.value || t
            : t;
    }
    function Tt(r, e, t) {
        let i = t.value;
        return (
            (t.value = function (...n) {
                try {
                    return (
                        ztoolkit.log(`Calling module ${r.name}.${String(e)}`),
                        i.apply(this, n)
                    );
                } catch (s) {
                    throw (
                        (ztoolkit.log(
                            `Error in module ${r.name}.${String(e)}`,
                            s,
                        ),
                        s)
                    );
                }
            }),
            t
        );
    }
    var qa = { alt: "\u2325", ctrl: "\u2303", meta: "\u2318", shift: "\u21E7" },
        Oa = { alt: "Alt", ctrl: "Ctrl", meta: "Windows", shift: "Shift" },
        Ha = { alt: "Alt", ctrl: "Ctrl", meta: "Super", shift: "Shift" };
    function za() {
        if (Zotero.isMac) return qa;
        if (Zotero.isWin) return Oa;
        if (Zotero.isLinux) return Ha;
    }
    var fe = za(),
        ot = class r {
            constructor() {
                this.modifiers = { alt: !1, ctrl: !1, meta: !1, shift: !1 };
                this.key = "";
            }
            static fromString(e) {
                let t = new r();
                return (
                    (t.modifiers.alt = !!e.includes(fe?.alt || "Alt")),
                    (t.modifiers.ctrl = !!e.includes(fe?.ctrl || "Control")),
                    (t.modifiers.meta = !!e.includes(fe?.meta || "Meta")),
                    (t.modifiers.shift = !!e.includes(fe?.shift || "Shift")),
                    (t.key = e.split("").at(-1) || ""),
                    t
                );
            }
            toString() {
                let e = "";
                this.modifiers.alt && (e += fe?.alt + " "),
                    this.modifiers.ctrl && (e += fe?.ctrl + " "),
                    this.modifiers.meta && (e += fe?.meta + " "),
                    this.modifiers.shift && (e += fe?.shift + " ");
                let t = e + this.key;
                return ztoolkit.log(this.key), t;
            }
            toJSON() {
                let e = { modifiers: this.modifiers, key: this.key };
                return JSON.stringify(e);
            }
        },
        Ba = [
            "Shift",
            "Alt",
            "Control",
            "Meta",
            "ContextMenu",
            "NumLock",
            "ScrollLock",
            "VolumeMute",
            "VolumeDown",
            "VolumeUp",
            "MediaSelect",
            "LaunchApp1",
            "LaunchApp2",
        ];
    function Fa(r) {
        let e = !0;
        return Ba.includes(r) && (e = !1), e;
    }
    var Or = class {
        constructor(e) {
            (this.input = e), this.bindEvents();
        }
        bindEvents() {
            this.input.addEventListener(
                "keydown",
                this.handleKeyDownEvent.bind(this),
            ),
                this.input.addEventListener(
                    "keyup",
                    this.handleKeyUpEvent.bind(this),
                ),
                this.input.addEventListener(
                    "keypress",
                    this.bypassEvent.bind(this),
                );
        }
        bypassEvent(e) {
            e.preventDefault();
        }
        handleKeyUpEvent(e) {
            this.input.blur(), e.preventDefault();
        }
        handleKeyDownEvent(e) {
            if (e.repeat) return;
            let t = Fa(e.key) ? e.key : "",
                i = e.altKey,
                n = e.ctrlKey,
                s = e.metaKey,
                o = e.shiftKey,
                a = new ot();
            return (
                (a.modifiers = { alt: i, ctrl: n, meta: s, shift: o }),
                (a.key = t),
                (this.input.value = a.toString()),
                (this.input.keystrokeValue = a),
                e.preventDefault(),
                !1
            );
        }
    };
    function Tn(r) {
        return new Or(r);
    }
    function Y(r) {
        return Zotero.Prefs.get(`${L.prefsPrefix}.${r}`, !0);
    }
    function It(r, e) {
        let t = Zotero.Prefs.set(`${L.prefsPrefix}.${r}`, e, !0);
        return Et.onPrefsEvent("change", {}), t;
    }
    var q = JSON.parse(String(Y("statuses"))),
        Ne = String(Y("status-tag-prefix")),
        se = Ne + String(Y("reason-tag-prefix"));
    function In() {
        ztoolkit.log("Fn: reloadPrefs"), Hr();
    }
    function Hr() {
        ztoolkit.log("Fn: loadPrefs"),
            (q = JSON.parse(String(Y("statuses")))),
            q.map(
                (r) => ((r.keystroke = ot.fromString(r.keyboardShortcut)), r),
            ),
            (Ne = String(Y("status-tag-prefix"))),
            (se = Ne + String(Y("reason-tag-prefix")));
    }
    function En(r) {
        return r.getTags().filter((i) => i.tag.includes(Ne));
    }
    function Mn(r) {
        let e = q.find((t) => t.default == !0);
        for (let t of q) r.hasTag(t.tag) && (e = t);
        return e;
    }
    function zr(r) {
        return r
            .filter((e) => e.tag.includes(se))
            .map((e) => {
                let t = e.tag.replace(se, "");
                return { label: t, value: t };
            });
    }
    function Br(r) {
        return q.find((t) => t.tag == r);
    }
    function An(r) {
        r.getTags().map((e) => {
            e.tag.includes(Ne) && r.removeTag(e.tag);
        });
    }
    function Rn(r) {
        return (
            "data:image/svg+xml;base64," +
            window.btoa(
                `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="${r}"><circle cx="12" cy="12" r="12" /></svg>`,
            )
        );
    }
    function Nn(r) {
        return Zotero.File.getContentsFromURL(r);
    }
    function Mt(r) {
        let t = new DOMParser().parseFromString(r, "text/html");
        if (t.documentElement.localName === "parsererror")
            throw new Error("not well-formed XHTML");
        let i = t.createRange();
        return (
            i.selectNodeContents(t.querySelector("div")), i.extractContents()
        );
    }
    function qn() {
        let r = "status",
            e = (s, o, a, c) => {
                let l = Mn(c);
                return String(l?.tag);
            };
        function t(s, o, a) {
            let c = document.createElement("span");
            c.className = `cell ${a.className} review-container`;
            let l = document.createElement("div");
            l.classList.add("review");
            let d = Br(o);
            return (
                (l.style.backgroundColor = d?.color ?? ""),
                (l.textContent = d?.label ?? ""),
                c.appendChild(l),
                c
            );
        }
        let i = { renderCell: t },
            n = A("status-column-header");
        ztoolkit.ItemTree.register(r, n, e, i);
    }
    function On() {
        return q.map((r) => ({
            tag: "menuitem",
            label: r.label == "" ? "Clear" : r.label,
            icon: Rn(r.color),
            oncommand: `document.setReviewStatus('${r.tag}')`,
        }));
    }
    function Hn(r) {
        for (let e of q)
            r.altKey == e.keystroke.modifiers.alt &&
                r.ctrlKey == e.keystroke.modifiers.ctrl &&
                r.metaKey == e.keystroke.modifiers.meta &&
                r.shiftKey == e.keystroke.modifiers.shift &&
                r.key == e.keystroke.key &&
                ztoolkit.getGlobal("document").setReviewStatus(e.tag);
    }
    function zn() {
        ztoolkit.getGlobal("document").setReviewStatus = (r) => {
            let e = ztoolkit.getGlobal("ZoteroPane").getSelectedItems();
            if (e.length == 0) return;
            for (let i of e) An(i), r != "" && i.addTag(r), i.saveTx();
            Br(r)?.askForReason && document.setStatusReason();
        };
    }
    var ns = Me(gi());
    function bi(r) {
        let e = r.document || document,
            t = r.container || e.createElement("div"),
            i = r.preventSubmit || 0;
        t.id = t.id || "autocomplete-" + S();
        let n = t.style,
            s = r.debounceWaitMs || 0,
            o = r.disableAutoSelect || !1,
            a = t.parentElement,
            c = [],
            l = "",
            d = 2,
            u = r.showOnFocus,
            h,
            f = 0,
            p,
            g = !1,
            b = !1;
        if ((r.minLength !== void 0 && (d = r.minLength), !r.input))
            throw new Error("input undefined");
        let m = r.input;
        (t.className = "autocomplete " + (r.className || "")),
            t.setAttribute("role", "listbox"),
            m.setAttribute("role", "combobox"),
            m.setAttribute("aria-expanded", "false"),
            m.setAttribute("aria-autocomplete", "list"),
            m.setAttribute("aria-controls", t.id),
            m.setAttribute("aria-owns", t.id),
            m.setAttribute("aria-activedescendant", ""),
            m.setAttribute("aria-haspopup", "listbox"),
            (n.position = "absolute");
        function S() {
            return (
                Date.now().toString(36) +
                Math.random().toString(36).substring(2)
            );
        }
        function E() {
            let k = t.parentNode;
            k && k.removeChild(t);
        }
        function P() {
            p && window.clearTimeout(p);
        }
        function Z() {
            t.parentNode || (a || e.body).appendChild(t);
        }
        function T() {
            return !!t.parentNode;
        }
        function C() {
            f++,
                (c = []),
                (l = ""),
                (h = void 0),
                m.setAttribute("aria-activedescendant", ""),
                m.setAttribute("aria-expanded", "false"),
                E();
        }
        function ye() {
            if (!T()) return;
            m.setAttribute("aria-expanded", "true"),
                (n.height = "auto"),
                (n.width = m.offsetWidth + "px");
            let k = 0,
                w;
            function H() {
                let j = e.documentElement,
                    M = j.clientTop || e.body.clientTop || 0,
                    Ee = j.clientLeft || e.body.clientLeft || 0,
                    D = window.pageYOffset || j.scrollTop,
                    X = window.pageXOffset || j.scrollLeft;
                w = m.getBoundingClientRect();
                let _n = w.top + m.offsetHeight + D - M,
                    kn = w.left + X - Ee;
                (n.top = _n + "px"),
                    (n.left = kn + "px"),
                    (k = window.innerHeight - (w.top + m.offsetHeight)),
                    k < 0 && (k = 0),
                    (n.top = _n + "px"),
                    (n.bottom = ""),
                    (n.left = kn + "px"),
                    (n.maxHeight = k + "px");
            }
            H(), H(), r.customize && w && r.customize(m, w, t, k);
        }
        function ne() {
            (t.textContent = ""), m.setAttribute("aria-activedescendant", "");
            let k = function (M, Ee, D) {
                let X = e.createElement("div");
                return (X.textContent = M.label || ""), X;
            };
            r.render && (k = r.render);
            let w = function (M, Ee) {
                let D = e.createElement("div");
                return (D.textContent = M), D;
            };
            r.renderGroup && (w = r.renderGroup);
            let H = e.createDocumentFragment(),
                j = S();
            if (
                (c.forEach(function (M, Ee) {
                    if (M.group && M.group !== j) {
                        j = M.group;
                        let X = w(M.group, l);
                        X && ((X.className += " group"), H.appendChild(X));
                    }
                    let D = k(M, l, Ee);
                    D &&
                        ((D.id = `${t.id}_${Ee}`),
                        D.setAttribute("role", "option"),
                        D.addEventListener("click", function (X) {
                            b = !0;
                            try {
                                r.onSelect(M, m);
                            } finally {
                                b = !1;
                            }
                            C(), X.preventDefault(), X.stopPropagation();
                        }),
                        M === h &&
                            ((D.className += " selected"),
                            D.setAttribute("aria-selected", "true"),
                            m.setAttribute("aria-activedescendant", D.id)),
                        H.appendChild(D));
                }),
                t.appendChild(H),
                c.length < 1)
            )
                if (r.emptyMsg) {
                    let M = e.createElement("div");
                    (M.id = `${t.id}_${S()}`),
                        (M.className = "empty"),
                        (M.textContent = r.emptyMsg),
                        t.appendChild(M),
                        m.setAttribute("aria-activedescendant", M.id);
                } else {
                    C();
                    return;
                }
            Z(), he(), Ie();
        }
        function he() {
            T() &&
                (m.setAttribute("aria-expanded", "true"),
                (n.height = "auto"),
                (n.width = m.offsetWidth + "px"));
        }
        function _e() {
            T() && ne();
        }
        function G() {
            _e();
        }
        function tt(k) {
            k.target !== t ? _e() : k.preventDefault();
        }
        function ke() {
            b || rt(0);
        }
        function Ie() {
            let k = t.getElementsByClassName("selected");
            if (k.length > 0) {
                let w = k[0],
                    H = w.previousElementSibling;
                if (
                    (H &&
                        H.className.indexOf("group") !== -1 &&
                        !H.previousElementSibling &&
                        (w = H),
                    w.offsetTop < t.scrollTop)
                )
                    t.scrollTop = w.offsetTop;
                else {
                    let j = w.offsetTop + w.offsetHeight,
                        M = t.scrollTop + t.offsetHeight;
                    j > M && (t.scrollTop += j - M);
                }
            }
        }
        function W() {
            let k = c.indexOf(h);
            (h = k === -1 ? void 0 : c[(k + c.length - 1) % c.length]), pn(k);
        }
        function ha() {
            let k = c.indexOf(h);
            (h =
                c.length < 1
                    ? void 0
                    : k === -1
                      ? c[0]
                      : c[(k + 1) % c.length]),
                pn(k);
        }
        function pn(k) {
            if (c.length > 0) {
                fa(k);
                let w = new ns.default();
                pa(c.indexOf(h)), Ie();
            }
        }
        function pa(k) {
            let w = e.getElementById(t.id + "_" + k);
            w &&
                (w.classList.add("selected"),
                w.setAttribute("aria-selected", "true"),
                m.setAttribute("aria-activedescendant", w.id));
        }
        function fa(k) {
            let w = e.getElementById(t.id + "_" + k);
            w &&
                (w.classList.remove("selected"),
                w.removeAttribute("aria-selected"),
                m.removeAttribute("aria-activedescendant"));
        }
        function ma(k, w) {
            let H = T();
            if (w === "Escape") C();
            else {
                if (!H || c.length < 1) return;
                w === "ArrowUp" ? W() : ha();
            }
            k.preventDefault(), H && k.stopPropagation();
        }
        function ga(k) {
            if (h) {
                i === 2 && k.preventDefault(), (b = !0);
                try {
                    r.onSelect(h, m);
                } finally {
                    b = !1;
                }
                C();
            }
            i === 1 && k.preventDefault();
        }
        function fn(k) {
            let w = k.key;
            switch (w) {
                case "ArrowUp":
                case "ArrowDown":
                case "Escape":
                    ma(k, w);
                    break;
                case "Enter":
                    ga(k);
                    break;
                default:
                    break;
            }
        }
        function mn() {
            u && rt(1);
        }
        function rt(k) {
            m.value.length >= d || k === 1
                ? (P(),
                  (p = window.setTimeout(
                      () => gn(m.value, k, m.selectionStart || 0),
                      k === 0 || k === 2 ? s : 0,
                  )))
                : C();
        }
        function gn(k, w, H) {
            if (g) return;
            let j = ++f;
            r.fetch(
                k,
                function (M) {
                    f === j &&
                        M &&
                        ((c = M),
                        (l = k),
                        (h = c.length < 1 || o ? void 0 : c[0]),
                        ne());
                },
                w,
                H,
            );
        }
        function bn(k) {
            if (r.keyup) {
                r.keyup({ event: k, fetch: () => rt(0) });
                return;
            }
            !T() && k.key === "ArrowDown" && rt(0);
        }
        function vn(k) {
            r.click && r.click({ event: k, fetch: () => rt(2) });
        }
        function yn() {
            setTimeout(() => {
                e.activeElement !== m && C();
            }, 200);
        }
        function ba() {
            gn(m.value, 3, m.selectionStart || 0);
        }
        t.addEventListener("mousedown", function (k) {
            k.stopPropagation(), k.preventDefault();
        }),
            t.addEventListener("focus", () => m.focus()),
            E();
        function va() {
            m.removeEventListener("focus", mn),
                m.removeEventListener("keyup", bn),
                m.removeEventListener("click", vn),
                m.removeEventListener("keydown", fn),
                m.removeEventListener("input", ke),
                m.removeEventListener("blur", yn),
                window.removeEventListener("resize", G),
                e.removeEventListener("scroll", tt, !0),
                m.removeAttribute("role"),
                m.removeAttribute("aria-expanded"),
                m.removeAttribute("aria-autocomplete"),
                m.removeAttribute("aria-controls"),
                m.removeAttribute("aria-activedescendant"),
                m.removeAttribute("aria-owns"),
                m.removeAttribute("aria-haspopup"),
                P(),
                C(),
                (g = !0);
        }
        return (
            m.addEventListener("keyup", bn),
            m.addEventListener("click", vn),
            m.addEventListener("keydown", fn),
            m.addEventListener("input", ke),
            m.addEventListener("blur", yn),
            m.addEventListener("focus", mn),
            window.addEventListener("resize", G),
            e.addEventListener("scroll", tt, !0),
            { destroy: va, fetch: ba }
        );
    }
    function ss(r, e) {
        bi({
            document: ztoolkit.getGlobal("document"),
            input: r,
            fetch: function (t, i) {
                t = t.toLowerCase();
                let n = document.allReasons.filter((s) =>
                    s.label.toLowerCase().startsWith(t),
                );
                i(n);
            },
            onSelect: function (t) {
                r.value = t.label ?? "";
            },
            render: function (t, i) {
                let n = document.createElement("div");
                return (n.textContent = t?.label), n;
            },
            container: e,
            preventSubmit: 2,
        });
    }
    var Yd = Wo(),
        eh = Yd.compile(`
        <div class="inner-modal" tabindex="-1">
            <div role="dialog" aria-modal="true" aria-labelledby="{{id}}-title">
                <header>
                    <h2 id="{{id}}-title" class="modal-title">
                        {{title}}
                    </h2>
                    <button aria-label="Close modal"></button>
                </header>
                <div id="{{id}}-content" class="modal-content">
                </div>
            </div>
        </div>
`);
    function Ye(r, e, t) {
        let i = document.createElement("div");
        return (
            i.setAttribute("aria-hidden", "true"),
            (i.id = r),
            (i.className = "modal"),
            (i.innerHTML = eh({ id: r, title: e })),
            i.querySelector(".modal-content")?.appendChild(t),
            new dn(r, i)
        );
    }
    var dn = class {
        constructor(e, t) {
            (this.id = e), (this.element = t);
        }
        appendTo(e) {
            return (
                e.appendChild(this.element),
                this.bindEvents(),
                (this.root = e),
                this
            );
        }
        open() {
            this.element.classList.add("open"),
                this.root?.parentNode?.addEventListener(
                    "keydown",
                    this.closeKeyStroke.bind(this),
                );
        }
        closeKeyStroke(e) {
            e.key === "Escape" && (this.close(), e.preventDefault());
        }
        close() {
            this.element.classList.remove("open"),
                this.root?.parentNode?.removeEventListener(
                    "keydown",
                    this.closeKeyStroke,
                );
        }
        bindEvents() {
            ztoolkit.log(this.element);
            let e = this.element.querySelectorAll("[action=close]");
            for (let t of e)
                t.addEventListener("click", (i) => {
                    this.close();
                });
            this.element.onclick = (t) => {
                t.target == this.element && this.close();
            };
        }
    };
    function jo() {
        let r = "reason",
            e = (n, s, o, a) =>
                En(a)
                    .find((d) => d.tag.includes(se))
                    ?.tag.replace(se, "") ?? "",
            t = {},
            i = A("reason-column-header");
        ztoolkit.ItemTree.register(r, i, e, t);
    }
    function Uo() {
        return [
            { tag: "menuseparator" },
            {
                tag: "menuitem",
                label: "Change Reason",
                oncommand: "document.setStatusReason()",
            },
        ];
    }
    function Jo(r) {
        r.key == "r" && ztoolkit.getGlobal("document").setStatusReason();
    }
    function Qo() {
        ztoolkit.getGlobal("document").setStatusReason = async () => {
            if (ztoolkit.getGlobal("ZoteroPane").getSelectedItems().length == 0)
                return;
            document.allReasons = zr(
                await ztoolkit.getGlobal("Zotero").Tags.getAll(),
            );
            let e = document.reasonModal.element.querySelector("#input-reason");
            (e.value = ""), document.reasonModal.open(), e.focus();
        };
    }
    async function $o() {
        let r = document.createElement("div"),
            e = document.createElement("div");
        (e.textContent = A("reason-dialog-text")), r.appendChild(e);
        let t = document.createElement("form"),
            i = ztoolkit.UI.createElement(document, "input");
        (i.id = "input-reason"), (i.type = "text"), i.classList.add("input");
        let n = document.createElement("div"),
            s = document.createElement("div");
        s.appendChild(i), s.appendChild(n), t.appendChild(s);
        let o = document.createElement("div");
        o.classList.add("btn-container");
        let a = document.createElement("button");
        (a.type = "button"),
            a.setAttribute("action", "close"),
            a.classList.add("btn"),
            (a.textContent = "Cancel");
        let c = document.createElement("button");
        (c.type = "submit"),
            c.classList.add("btn"),
            c.classList.add("btn-primary"),
            (c.textContent = "Submit"),
            o.appendChild(a),
            o.appendChild(c),
            t.appendChild(o),
            r.appendChild(t),
            (t.onsubmit = () => {
                let d = ztoolkit.getGlobal("ZoteroPane").getSelectedItems();
                for (let u of d)
                    u.getTags().map((h) => {
                        h.tag.includes(se) && u.removeTag(h.tag);
                    }),
                        i.value != "" && u.addTag(se + i.value),
                        u.saveTx();
                document.reasonModal.close();
            });
        let l = Ye("reason-modal", A("reason-dialog-title"), r);
        l.appendTo(document.documentElement),
            (document.reasonModal = l),
            (a.onclick = () => {
                (i.value = ""), document.reasonModal.close();
            }),
            (document.allReasons = zr(
                await ztoolkit.getGlobal("Zotero").Tags.getAll(),
            )),
            ss(i, n);
    }
    function Xo() {
        return [
            { tag: "menuseparator" },
            {
                tag: "menuitem",
                label: "Generate Report",
                oncommand: "document.generateReport()",
            },
        ];
    }
    function Yo() {
        ztoolkit.getGlobal("document").generateReport = async () => {
            let r = ztoolkit.getGlobal("ZoteroPane").getSelectedItems();
            if (r.length == 0 || !et) return;
            let e = 0;
            et.innerHTML = "";
            for (let n of q.filter((s) => s.default === !1)) {
                let s = n.label != "" ? n.label : A("status-default-label"),
                    a = r.filter((c) => c.hasTag(n.tag)).length;
                (et.innerHTML += `
            <tr>
                <td>${s}</td>
                <td align="center">${a}</td>
            </tr>
            `),
                    (e += a);
            }
            let t = q.filter((n) => n.default === !0)[0].label;
            t == "" && (t = A("status-blank-label"));
            let i = r.length - e;
            (et.innerHTML += `
      <tr>
        <td>${t}</td>
        <td align="center">${i}</td>
      </tr>
    `),
                (e = r.length),
                (et.innerHTML += `
        <tr class="border-top">
        <td>${A("status-total-label")}</td>
        <td align="center">${e}</td>
        </tr>
        `),
                document.reportModal.open();
        };
    }
    var et;
    async function ea() {
        let r = document.createElement("div"),
            e = document.importNode(
                Mt(`
        <div>
            <table class="table">
                <thead>
                    <tr class="border-bottom">
                        <th>${A("report-dialog-table-status")}</th>
                        <th>${A("report-dialog-table-count")}</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            <br />
            <div class="text-center">
                <button class="btn" action="close">Close</button>
            </div>
        </div>
    `),
                !0,
            );
        r.append(e), (et = r.querySelector("tbody"));
        let t = Ye("report-modal", A("report-dialog-title"), r);
        t.appendTo(document.documentElement), (document.reportModal = t);
    }
    var de = class {
        static registerStyleSheet() {
            let e = ztoolkit.UI.createElement(document, "link", {
                properties: {
                    type: "text/css",
                    rel: "stylesheet",
                    href: `chrome://${L.addonRef}/content/styles/styles.css`,
                    id: `${L.addonRef}-stylesheet`,
                },
            });
            ztoolkit.getGlobal("document").documentElement.appendChild(e);
        }
        static registerExtraColumnWithBindings() {
            qn(), jo();
            let e = On(),
                t = Uo(),
                i = Xo(),
                n = e.concat(t).concat(i);
            ztoolkit.Menu.register("item", { tag: "menuseparator" }),
                ztoolkit.Menu.register("item", {
                    tag: "menu",
                    label: A("context-menu-status"),
                    children: n,
                }),
                ztoolkit
                    .getGlobal("document")
                    .addEventListener("keydown", (s) => {
                        let o = ztoolkit.getGlobal("document").activeElement;
                        ztoolkit
                            .getGlobal("document")
                            .querySelector("#item-tree-main-default")
                            ?.contains(o) && (Hn(s), Jo(s));
                    }),
                zn(),
                Qo(),
                Yo();
        }
        static async registerDOMElements() {
            await $o(), await ea();
        }
    };
    St([Tt], de, "registerStyleSheet", 1),
        St([Tt], de, "registerExtraColumnWithBindings", 1),
        St([Tt], de, "registerDOMElements", 1);
    function ta(r, e, t) {
        if ((ztoolkit.log("Fn: attachColorPicker"), !t)) return !1;
        t.type = "color";
        let i = t.parentNode?.querySelector("label");
        return i
            ? ((i.textContent = t.value),
              (t.updateLabelValue = () => {
                  i.textContent = t.value;
              }),
              t.addEventListener(
                  "input",
                  (n) => {
                      i.textContent = t.value;
                  },
                  !1,
              ),
              !0)
            : !1;
    }
    async function ra(r) {
        await rh(r), await ih(r), lh(r), await Zotero.Promise.delay(500), kt();
    }
    var ia, Er;
    async function rh(r) {
        return new Promise((e, t) => {
            let i = [
                {
                    dataKey: "label",
                    label: A("prefs-table-label"),
                    fixedWidth: !0,
                    width: 100,
                },
                {
                    dataKey: "name",
                    label: A("prefs-table-name"),
                    fixedWidth: !0,
                    width: 100,
                },
                {
                    dataKey: "tag",
                    label: A("prefs-table-tag"),
                    fixedWidth: !0,
                    width: 100,
                },
                { dataKey: "color", label: A("prefs-table-color") },
                {
                    dataKey: "askForReason",
                    label: A("prefs-table-askforreason"),
                },
                { dataKey: "default", label: A("prefs-table-default") },
                {
                    dataKey: "keyboardShortcut",
                    label: A("prefs-table-keyboardshortcut"),
                },
            ];
            ia = new ztoolkit.VirtualizedTable(r)
                .setContainerId(`${L.addonRef}-table-container`)
                .setProp({
                    id: `${L.addonRef}-prefs-table`,
                    columns: i,
                    showHeader: !0,
                    multiSelect: !0,
                    staticColumns: !0,
                    disableFontSizeScaling: !0,
                })
                .setProp("getRowCount", () => q.length || 0)
                .setProp("getRowData", (n) => q[n] || {})
                .setProp("getRowString", (n) => q[n].title || "")
                .setProp("onSelectionChange", (n) => {
                    [Er] = n.selected;
                })
                .setProp("onKeyDown", (n) => {
                    (n.key == "Delete" ||
                        (Zotero.isMac && n.key == "Backspace")) &&
                        na(Er);
                })
                .setProp("onActivate", (n) => {
                    sh(Er);
                })
                .render(-1, () => {
                    e();
                });
        });
    }
    var I;
    async function ih(r) {
        let e = r.document,
            i = e.documentElement.querySelector(`#${L.addonRef}-status-modal`),
            n = e.createElement("div");
        (I = Ye("prefs", "Edit", n)), I.appendTo(i);
        let s = Nn(rootURI + "chrome/content/modal/prefsStatus.xhtml"),
            o = Mt(s),
            a = e.importNode(o, !0);
        n.appendChild(a), I.bindEvents();
        let c = n.querySelector("[type=color]");
        ztoolkit.log("--------------------"),
            ztoolkit.log(r),
            ta(r, r.document, c),
            Tn(n.querySelector(".input-keystroke"));
    }
    function na(r) {
        let e = JSON.parse(Y("statuses"));
        e.splice(r, 1), It("statuses", JSON.stringify(e)), kt();
    }
    function nh() {
        ztoolkit.log("Add Status"),
            (I.element.querySelector(".modal-title").textContent =
                "Add Status"),
            (I.element.querySelector("[name=name]").value = ""),
            (I.element.querySelector("[name=label]").value = ""),
            (I.element.querySelector("[name=tag]").value = ""),
            (I.element.querySelector("[name=color]").value = ""),
            (I.element.querySelector("[name=reason]").checked = !1),
            (I.element.querySelector("[name=default]").checked = !1),
            (I.element.querySelector("[name=keyboardshortcut]").value = "");
        let r = I.element.querySelector("#status-form"),
            e = JSON.parse(Y("statuses"));
        (r.onsubmit = (t) => {
            oh(r, e), t.preventDefault();
        }),
            I.open();
    }
    function sh(r) {
        ztoolkit.log("Edit status (Id: " + r + ")");
        let e = q[r];
        (I.element.querySelector(".modal-title").textContent =
            `Edit Status: ${e.label}`),
            (I.element.querySelector("[name=name]").value = e.name),
            (I.element.querySelector("[name=label]").value = e.label),
            (I.element.querySelector("[name=tag]").value = e.tag),
            (I.element.querySelector("[name=color]").value = e.color),
            I.element.querySelector("[name=color]").updateLabelValue(),
            (I.element.querySelector("[name=reason]").checked = e.askForReason),
            (I.element.querySelector("[name=default]").checked = e.default),
            (I.element.querySelector("[name=keyboardshortcut]").value =
                e.keyboardShortcut);
        let t = I.element.querySelector("#status-form");
        (t.onsubmit = (i) => {
            let n = JSON.parse(Y("statuses"));
            ah(t, n), i.preventDefault();
        }),
            I.open();
    }
    function oh(r, e) {
        let t = {
            name: r?.querySelector("[name=name]")?.value,
            tag: r?.querySelector("[name=tag]")?.value,
            label: r?.querySelector("[name=label]")?.value,
            color: r?.querySelector("[name=color]")?.value,
            askForReason: r?.querySelector("[name=reason]")?.checked,
            default: r?.querySelector("[name=default]")?.checked,
            keyboardShortcut: r?.querySelector("[name=keyboardshortcut]")
                ?.value,
        };
        e.push(t), It("statuses", JSON.stringify(e)), kt(), I.close();
    }
    function ah(r, e) {
        let t = {
            name: r?.querySelector("[name=name]")?.value,
            tag: r?.querySelector("[name=tag]")?.value,
            label: r?.querySelector("[name=label]")?.value,
            color: r?.querySelector("[name=color]")?.value,
            askForReason: r?.querySelector("[name=reason]")?.checked,
            default: r?.querySelector("[name=default]")?.checked,
            keyboardShortcut: r?.querySelector("[name=keyboardshortcut]")
                ?.value,
        };
        ztoolkit.log("--------------------------"), ztoolkit.log(e);
        let i = e.findIndex((n) => n.name == t.name);
        i >= 0 &&
            (ztoolkit.log(i),
            (e[i] = t),
            ztoolkit.log(e),
            It("statuses", JSON.stringify(e))),
            ztoolkit.log("--------------------------"),
            kt(),
            I.close();
    }
    function lh(r) {
        r.document
            .querySelector("#btn-add-status")
            ?.addEventListener("click", (e) => {
                nh();
            }),
            r.document
                .querySelector("#btn-remove-status")
                ?.addEventListener("click", (e) => {
                    na(Er);
                }),
            r.document
                .querySelector(`#zotero-prefpane-${L.addonRef}-enable`)
                ?.addEventListener("command", (e) => {
                    ztoolkit.log(e),
                        _.window.alert(
                            `Successfully changed to ${e.target.checked}!`,
                        );
                }),
            r.document
                .querySelector(`#zotero-prefpane-${L.addonRef}-input`)
                ?.addEventListener("change", (e) => {
                    ztoolkit.log(e),
                        addon.data.prefs.window.alert(
                            `Successfully changed to ${e.target.value}!`,
                        );
                });
    }
    function kt() {
        ztoolkit.log("Fn: updateUI"), ia.render(-1);
    }
    function sa() {
        kt();
    }
    var oa = Me(gi());
    var aa = Me(x()),
        uh = Me(te()),
        dh = Me(ni());
    function Mr() {
        let r = new oa.default();
        return ch(r), r;
    }
    function ch(r) {
        let e = "production";
        (r.basicOptions.log.prefix = `[${L.addonName}]`),
            (r.basicOptions.log.disableConsole = e === "production"),
            (r.UI.basicOptions.ui.enableElementJSONLog = !1),
            (r.UI.basicOptions.ui.enableElementDOMLog = !1),
            (r.basicOptions.debug.disableDebugBridgePassword = !1),
            (r.basicOptions.api.pluginID = L.addonID),
            r.ProgressWindow.setIconURI(
                "default",
                `chrome://${L.addonRef}/content/icons/favicon.png`,
            );
    }
    async function hh() {
        await Promise.all([
            Zotero.initializationPromise,
            Zotero.unlockPromise,
            Zotero.uiReadyPromise,
        ]),
            Pn(),
            Hr(),
            Zotero.PreferencePanes.register({
                pluginID: L.addonID,
                src: rootURI + "chrome/content/preferences.xhtml",
                label: A("prefs-title"),
                image: rootURI + "chrome/content/icons/favicon.svg",
                scripts: [],
                stylesheets: [rootURI + "chrome/content/styles/styles.css"],
            }),
            de.registerExtraColumnWithBindings(),
            await la(window);
    }
    async function la(r) {
        (addon.data.ztoolkit = Mr()),
            de.registerDOMElements(),
            de.registerStyleSheet();
    }
    async function ph(r) {
        ztoolkit
            .getGlobal("document")
            .querySelector(`#${L.addonRef}-stylesheet`)
            ?.remove(),
            ztoolkit.unregisterAll(),
            addon.data.dialog?.window?.close();
    }
    function fh() {
        ztoolkit
            .getGlobal("document")
            .querySelector(`#${L.addonRef}-stylesheet`)
            ?.remove(),
            ztoolkit.unregisterAll(),
            addon.data.dialog?.window?.close(),
            (addon.data.alive = !1),
            delete Zotero[L.addonInstance];
    }
    async function mh(r, e, t, i) {}
    async function gh(r, e) {
        switch (r) {
            case "change":
                In(), sa();
                break;
            case "load":
                ra(e.window);
                break;
            default:
                return;
        }
    }
    function bh(r) {}
    function vh(r) {}
    var Et = {
        onStartup: hh,
        onShutdown: fh,
        onMainWindowLoad: la,
        onMainWindowUnload: ph,
        onNotify: mh,
        onPrefsEvent: gh,
        onShortcuts: bh,
        onDialogEvents: vh,
    };
    var hn = class {
            constructor() {
                (this.data = { alive: !0, env: "production", ztoolkit: Mr() }),
                    (this.hooks = Et),
                    (this.api = {});
            }
        },
        ca = hn;
    var da = new ua.BasicTool();
    da.getGlobal("Zotero")[L.addonInstance] ||
        (wt("window"),
        wt("document"),
        wt("ZoteroPane"),
        wt("Zotero_Tabs"),
        (_globalThis.addon = new ca()),
        wt("ztoolkit", () => _globalThis.addon.data.ztoolkit),
        (Zotero[L.addonInstance] = addon));
    function wt(r, e) {
        Object.defineProperty(_globalThis, r, {
            get() {
                return e ? e() : da.getGlobal(r);
            },
        });
    }
})();
