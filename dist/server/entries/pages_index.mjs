import { onRenderHtml } from "vike-react/__internal/integration/onRenderHtml";
import { jsxs, jsx } from "react/jsx-runtime";
import import3 from "vike-react/__internal/integration/Loading";
/*! pages/index/+Page.jsx [vike:pluginModuleBanner] */
function Page() {
  return /* @__PURE__ */ jsxs("div", { style: { padding: "20px", fontFamily: "Arial, sans-serif" }, children: [
    /* @__PURE__ */ jsx("h1", { children: "Welcome to Vike SSR App" }),
    /* @__PURE__ */ jsx("p", { children: "This is a server-side rendered React application built with Vike and Express." }),
    /* @__PURE__ */ jsxs("nav", { style: { marginTop: "20px" }, children: [
      /* @__PURE__ */ jsx("a", { href: "/", style: { marginRight: "20px", color: "#0066cc" }, children: "Home" }),
      /* @__PURE__ */ jsx("a", { href: "/about", style: { color: "#0066cc" }, children: "About" })
    ] })
  ] });
}
const import2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page
}, Symbol.toStringTag, { value: "Module" }));
/*! virtual:vike:pageConfigLazy:server:/pages/index [vike:pluginModuleBanner] */
const configValuesSerialized = {
  ["isClientRuntimeLoaded"]: {
    type: "computed",
    definedAtData: null,
    valueSerialized: {
      type: "js-serialized",
      value: true
    }
  },
  ["onRenderHtml"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "vike-react/__internal/integration/onRenderHtml", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "pointer-import",
      value: onRenderHtml
    }
  },
  ["Page"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "/pages/index/+Page.jsx", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "plus-file",
      exportValues: import2
    }
  },
  ["passToClient"]: {
    type: "cumulative",
    definedAtData: [{ "filePathToShowToUser": "vike-react/config", "fileExportPathToShowToUser": ["default", "passToClient"] }],
    valueSerialized: [{
      type: "js-serialized",
      value: ["_configFromHook"]
    }]
  },
  ["Loading"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "vike-react/__internal/integration/Loading", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "pointer-import",
      value: import3
    }
  }
};
export {
  configValuesSerialized
};
