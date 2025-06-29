import { onRenderHtml } from "vike-react/__internal/integration/onRenderHtml";
import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import "react";
import { u as useAuth, A as AuthProvider, L as Layout } from "../chunks/chunk-C0vGH5fU.js";
import import5 from "vike-react/__internal/integration/Loading";
/* empty css                       */
/*! pages/index/+Page.jsx [vike:pluginModuleBanner] */
const styles = {
  container: {
    textAlign: "center",
    padding: "3rem 2rem"
  },
  hero: {
    marginBottom: "3rem"
  },
  title: {
    fontSize: "3rem",
    color: "#2c3e50",
    marginBottom: "1rem"
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#7f8c8d",
    marginBottom: "2rem"
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "2rem",
    marginBottom: "3rem"
  },
  feature: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
  },
  featureIcon: {
    fontSize: "3rem",
    marginBottom: "1rem"
  },
  featureTitle: {
    fontSize: "1.3rem",
    color: "#2c3e50",
    marginBottom: "1rem"
  },
  featureDescription: {
    color: "#7f8c8d"
  },
  cta: {
    marginTop: "3rem"
  },
  ctaButton: {
    backgroundColor: "#3498db",
    color: "white",
    padding: "1rem 2rem",
    fontSize: "1.1rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    margin: "0 1rem"
  },
  secondaryButton: {
    backgroundColor: "#27ae60",
    color: "white",
    padding: "1rem 2rem",
    fontSize: "1.1rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    textDecoration: "none",
    display: "inline-block",
    margin: "0 1rem"
  }
};
function Page() {
  const { isAuthenticated, user } = useAuth();
  return /* @__PURE__ */ jsxs("div", { style: styles.container, children: [
    /* @__PURE__ */ jsxs("div", { style: styles.hero, children: [
      /* @__PURE__ */ jsx("h1", { style: styles.title, children: isAuthenticated ? `Welcome back, ${user == null ? void 0 : user.name}!` : "Welcome to Vike Product Manager" }),
      /* @__PURE__ */ jsx("p", { style: styles.subtitle, children: isAuthenticated ? "Manage your product inventory efficiently with our powerful product management system" : "A modern, secure product management application built with Vike SSR, React, and Express" })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: styles.features, children: [
      /* @__PURE__ */ jsxs("div", { style: styles.feature, children: [
        /* @__PURE__ */ jsx("div", { style: styles.featureIcon, children: "🔐" }),
        /* @__PURE__ */ jsx("h3", { style: styles.featureTitle, children: "Secure Authentication" }),
        /* @__PURE__ */ jsx("p", { style: styles.featureDescription, children: "JWT-based authentication with bcrypt password hashing for maximum security" })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: styles.feature, children: [
        /* @__PURE__ */ jsx("div", { style: styles.featureIcon, children: "🛍️" }),
        /* @__PURE__ */ jsx("h3", { style: styles.featureTitle, children: "Product Management" }),
        /* @__PURE__ */ jsx("p", { style: styles.featureDescription, children: "Create, edit, delete, and organize your products with images, pricing, and inventory tracking" })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: styles.feature, children: [
        /* @__PURE__ */ jsx("div", { style: styles.featureIcon, children: "⚡" }),
        /* @__PURE__ */ jsx("h3", { style: styles.featureTitle, children: "Server-Side Rendering" }),
        /* @__PURE__ */ jsx("p", { style: styles.featureDescription, children: "Fast initial page loads and SEO-friendly content with Vike SSR" })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: styles.feature, children: [
        /* @__PURE__ */ jsx("div", { style: styles.featureIcon, children: "📊" }),
        /* @__PURE__ */ jsx("h3", { style: styles.featureTitle, children: "Inventory Analytics" }),
        /* @__PURE__ */ jsx("p", { style: styles.featureDescription, children: "Track your inventory with detailed statistics, stock levels, and product insights" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { style: styles.cta, children: isAuthenticated ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("a", { href: "/products", style: styles.ctaButton, children: "Go to My Products" }),
      /* @__PURE__ */ jsx("a", { href: "/about", style: styles.secondaryButton, children: "Learn More" })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("a", { href: "/register", style: styles.ctaButton, children: "Get Started" }),
      /* @__PURE__ */ jsx("a", { href: "/login", style: styles.secondaryButton, children: "Login" })
    ] }) })
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
  ["Layout"]: {
    type: "cumulative",
    definedAtData: [{ "filePathToShowToUser": "/components/Layout.jsx", "fileExportPathToShowToUser": [] }],
    valueSerialized: [{
      type: "pointer-import",
      value: Layout
    }]
  },
  ["Wrapper"]: {
    type: "cumulative",
    definedAtData: [{ "filePathToShowToUser": "/components/AuthContext.jsx", "fileExportPathToShowToUser": ["AuthProvider"] }],
    valueSerialized: [{
      type: "pointer-import",
      value: AuthProvider
    }]
  },
  ["Loading"]: {
    type: "standard",
    definedAtData: { "filePathToShowToUser": "vike-react/__internal/integration/Loading", "fileExportPathToShowToUser": [] },
    valueSerialized: {
      type: "pointer-import",
      value: import5
    }
  }
};
export {
  configValuesSerialized
};
