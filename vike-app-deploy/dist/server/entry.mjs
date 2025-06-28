import { setGlobalContext_buildEntry } from "vike/__internal";
/*! virtual:vike:entry:server [vike:pluginModuleBanner] */
const pageFilesLazy = {};
const pageFilesEager = {};
const pageFilesExportNamesLazy = {};
const pageFilesExportNamesEager = {};
const pageFilesList = [];
const neverLoaded = {};
const pageConfigsSerialized = [
  {
    pageId: "/pages/about",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/about", "definedAtLocation": "/pages/about/" },
    loadConfigLazy: () => ({ moduleId: "virtual:vike:pageConfigLazy:server:/pages/about", moduleExports: import("./entries/pages_about.mjs") }),
    configValuesSerialized: {
      ["isClientRuntimeLoaded"]: {
        type: "computed",
        definedAtData: null,
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      },
      ["clientRouting"]: {
        type: "standard",
        definedAtData: { "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "clientRouting"] },
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      }
    }
  },
  {
    pageId: "/pages/index",
    isErrorPage: void 0,
    routeFilesystem: { "routeString": "/", "definedAtLocation": "/pages/index/" },
    loadConfigLazy: () => ({ moduleId: "virtual:vike:pageConfigLazy:server:/pages/index", moduleExports: import("./entries/pages_index.mjs") }),
    configValuesSerialized: {
      ["isClientRuntimeLoaded"]: {
        type: "computed",
        definedAtData: null,
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      },
      ["clientRouting"]: {
        type: "standard",
        definedAtData: { "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "clientRouting"] },
        valueSerialized: {
          type: "js-serialized",
          value: true
        }
      }
    }
  }
];
const pageConfigGlobalSerialized = {
  configValuesSerialized: {}
};
const pageFilesLazyIsomorph1 = /* @__PURE__ */ Object.assign({});
const pageFilesLazyIsomorph = { ...pageFilesLazyIsomorph1 };
pageFilesLazy[".page"] = pageFilesLazyIsomorph;
const pageFilesLazyServer1 = /* @__PURE__ */ Object.assign({});
const pageFilesLazyServer = { ...pageFilesLazyServer1 };
pageFilesLazy[".page.server"] = pageFilesLazyServer;
const pageFilesEagerRoute1 = /* @__PURE__ */ Object.assign({});
const pageFilesEagerRoute = { ...pageFilesEagerRoute1 };
pageFilesEager[".page.route"] = pageFilesEagerRoute;
const pageFilesExportNamesEagerClient1 = /* @__PURE__ */ Object.assign({});
const pageFilesExportNamesEagerClient = { ...pageFilesExportNamesEagerClient1 };
pageFilesExportNamesEager[".page.client"] = pageFilesExportNamesEagerClient;
const virtualFileExports = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  neverLoaded,
  pageConfigGlobalSerialized,
  pageConfigsSerialized,
  pageFilesEager,
  pageFilesExportNamesEager,
  pageFilesExportNamesLazy,
  pageFilesLazy,
  pageFilesList
}, Symbol.toStringTag, { value: "Module" }));
/*! virtual:@brillout/vite-plugin-server-entry:serverEntry [vike:pluginModuleBanner] */
{
  const assetsManifest = {
  "_chunk-!~{004}~.js": {
    "file": "assets/static/vike-react-b64a028b.BcWtY8Ol.css",
    "src": "_chunk-!~{004}~.js"
  },
  "_chunk-D5dLUlHE.js": {
    "file": "assets/chunks/chunk-D5dLUlHE.js",
    "name": "execHook"
  },
  "_chunk-DtUMuJzA.js": {
    "file": "assets/chunks/chunk-DtUMuJzA.js",
    "name": "Loading",
    "imports": [
      "_chunk-D5dLUlHE.js"
    ],
    "css": [
      "assets/static/vike-react-b64a028b.BcWtY8Ol.css"
    ]
  },
  "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js": {
    "file": "assets/entries/entry-client-routing.wEBRgnNt.js",
    "name": "entries/entry-client-routing",
    "src": "node_modules/vike/dist/esm/client/runtime-client-routing/entry.js",
    "isEntry": true,
    "imports": [
      "_chunk-D5dLUlHE.js"
    ],
    "dynamicImports": [
      "virtual:vike:pageConfigLazy:client:/pages/about",
      "virtual:vike:pageConfigLazy:client:/pages/index"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/pages/about": {
    "file": "assets/entries/pages_about.CVFQ3uzD.js",
    "name": "entries/pages/about",
    "src": "virtual:vike:pageConfigLazy:client:/pages/about",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DtUMuJzA.js",
      "_chunk-D5dLUlHE.js"
    ],
    "css": [
      "assets/static/vike-react-b64a028b.BcWtY8Ol.css"
    ]
  },
  "virtual:vike:pageConfigLazy:client:/pages/index": {
    "file": "assets/entries/pages_index.0Uk9IFzB.js",
    "name": "entries/pages/index",
    "src": "virtual:vike:pageConfigLazy:client:/pages/index",
    "isEntry": true,
    "isDynamicEntry": true,
    "imports": [
      "_chunk-DtUMuJzA.js",
      "_chunk-D5dLUlHE.js"
    ],
    "css": [
      "assets/static/vike-react-b64a028b.BcWtY8Ol.css"
    ]
  }
};
  const buildInfo = {
    "versionAtBuildTime": "0.4.235",
    "usesClientRouter": false,
    "viteConfigRuntime": {
      "root": "/workspace/vike-app",
      "build": {
        "outDir": "/workspace/vike-app/dist/"
      },
      "_baseViteOriginal": "/__UNSET__",
      "vitePluginServerEntry": {}
    }
  };
  setGlobalContext_buildEntry({
    virtualFileExports,
    assetsManifest,
    buildInfo
  });
}
