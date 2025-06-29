import { onRenderHtml } from "vike-react/__internal/integration/onRenderHtml";
import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as AuthProvider, L as Layout } from "../chunks/chunk-C0vGH5fU.js";
import import5 from "vike-react/__internal/integration/Loading";
/* empty css                       */
/*! pages/about/+Page.jsx [vike:pluginModuleBanner] */
const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem"
  },
  title: {
    fontSize: "2.5rem",
    color: "#2c3e50",
    marginBottom: "2rem",
    textAlign: "center"
  },
  section: {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    marginBottom: "2rem"
  },
  sectionTitle: {
    fontSize: "1.5rem",
    color: "#34495e",
    marginBottom: "1rem"
  },
  techGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
    marginTop: "1rem"
  },
  techItem: {
    padding: "1rem",
    backgroundColor: "#f8f9fa",
    borderRadius: "6px",
    textAlign: "center"
  },
  techName: {
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: "0.5rem"
  },
  techDescription: {
    fontSize: "0.9rem",
    color: "#7f8c8d"
  },
  featureList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1rem",
    marginTop: "1rem"
  },
  featureItem: {
    padding: "1rem",
    backgroundColor: "#f8f9fa",
    borderRadius: "6px"
  },
  featureTitle: {
    fontWeight: "bold",
    color: "#27ae60",
    marginBottom: "0.5rem"
  },
  securityList: {
    listStyle: "none",
    padding: 0
  },
  securityItem: {
    padding: "0.5rem 0",
    borderBottom: "1px solid #ecf0f1"
  },
  securityIcon: {
    color: "#27ae60",
    marginRight: "0.5rem"
  }
};
function Page() {
  return /* @__PURE__ */ jsxs("div", { style: styles.container, children: [
    /* @__PURE__ */ jsx("h1", { style: styles.title, children: "About Vike Todo App" }),
    /* @__PURE__ */ jsxs("div", { style: styles.section, children: [
      /* @__PURE__ */ jsx("h2", { style: styles.sectionTitle, children: "🚀 Technology Stack" }),
      /* @__PURE__ */ jsx("p", { children: "This application is built with modern web technologies for optimal performance and developer experience:" }),
      /* @__PURE__ */ jsxs("div", { style: styles.techGrid, children: [
        /* @__PURE__ */ jsxs("div", { style: styles.techItem, children: [
          /* @__PURE__ */ jsx("div", { style: styles.techName, children: "Vike (Vite SSR)" }),
          /* @__PURE__ */ jsx("div", { style: styles.techDescription, children: "Server-side rendering framework" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: styles.techItem, children: [
          /* @__PURE__ */ jsx("div", { style: styles.techName, children: "React 18" }),
          /* @__PURE__ */ jsx("div", { style: styles.techDescription, children: "Modern UI library with hooks" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: styles.techItem, children: [
          /* @__PURE__ */ jsx("div", { style: styles.techName, children: "Express.js" }),
          /* @__PURE__ */ jsx("div", { style: styles.techDescription, children: "Fast Node.js web framework" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: styles.techItem, children: [
          /* @__PURE__ */ jsx("div", { style: styles.techName, children: "JWT Authentication" }),
          /* @__PURE__ */ jsx("div", { style: styles.techDescription, children: "Secure token-based auth" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: styles.techItem, children: [
          /* @__PURE__ */ jsx("div", { style: styles.techName, children: "bcrypt" }),
          /* @__PURE__ */ jsx("div", { style: styles.techDescription, children: "Password hashing library" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: styles.techItem, children: [
          /* @__PURE__ */ jsx("div", { style: styles.techName, children: "Vite" }),
          /* @__PURE__ */ jsx("div", { style: styles.techDescription, children: "Lightning-fast build tool" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: styles.section, children: [
      /* @__PURE__ */ jsx("h2", { style: styles.sectionTitle, children: "✨ Key Features" }),
      /* @__PURE__ */ jsxs("div", { style: styles.featureList, children: [
        /* @__PURE__ */ jsxs("div", { style: styles.featureItem, children: [
          /* @__PURE__ */ jsx("div", { style: styles.featureTitle, children: "User Authentication" }),
          /* @__PURE__ */ jsx("div", { children: "Secure registration and login with JWT tokens and password hashing" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: styles.featureItem, children: [
          /* @__PURE__ */ jsx("div", { style: styles.featureTitle, children: "Todo Management" }),
          /* @__PURE__ */ jsx("div", { children: "Create, edit, delete, and organize todos with priorities and due dates" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: styles.featureItem, children: [
          /* @__PURE__ */ jsx("div", { style: styles.featureTitle, children: "Real-time Statistics" }),
          /* @__PURE__ */ jsx("div", { children: "Track your productivity with completion rates and overdue items" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: styles.featureItem, children: [
          /* @__PURE__ */ jsx("div", { style: styles.featureTitle, children: "Server-Side Rendering" }),
          /* @__PURE__ */ jsx("div", { children: "Fast initial page loads and SEO-friendly content" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: styles.featureItem, children: [
          /* @__PURE__ */ jsx("div", { style: styles.featureTitle, children: "Responsive Design" }),
          /* @__PURE__ */ jsx("div", { children: "Works seamlessly on desktop, tablet, and mobile devices" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: styles.featureItem, children: [
          /* @__PURE__ */ jsx("div", { style: styles.featureTitle, children: "API-First Architecture" }),
          /* @__PURE__ */ jsx("div", { children: "RESTful API endpoints for easy integration and testing" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: styles.section, children: [
      /* @__PURE__ */ jsx("h2", { style: styles.sectionTitle, children: "🔒 Security Features" }),
      /* @__PURE__ */ jsx("p", { children: "Security is a top priority in this application:" }),
      /* @__PURE__ */ jsxs("ul", { style: styles.securityList, children: [
        /* @__PURE__ */ jsxs("li", { style: styles.securityItem, children: [
          /* @__PURE__ */ jsx("span", { style: styles.securityIcon, children: "✓" }),
          /* @__PURE__ */ jsx("strong", { children: "Password Hashing:" }),
          " bcrypt with salt rounds for secure password storage"
        ] }),
        /* @__PURE__ */ jsxs("li", { style: styles.securityItem, children: [
          /* @__PURE__ */ jsx("span", { style: styles.securityIcon, children: "✓" }),
          /* @__PURE__ */ jsx("strong", { children: "JWT Tokens:" }),
          " Stateless authentication with expiration times"
        ] }),
        /* @__PURE__ */ jsxs("li", { style: styles.securityItem, children: [
          /* @__PURE__ */ jsx("span", { style: styles.securityIcon, children: "✓" }),
          /* @__PURE__ */ jsx("strong", { children: "Input Validation:" }),
          " Server-side validation for all user inputs"
        ] }),
        /* @__PURE__ */ jsxs("li", { style: styles.securityItem, children: [
          /* @__PURE__ */ jsx("span", { style: styles.securityIcon, children: "✓" }),
          /* @__PURE__ */ jsx("strong", { children: "Rate Limiting:" }),
          " Protection against brute force attacks"
        ] }),
        /* @__PURE__ */ jsxs("li", { style: styles.securityItem, children: [
          /* @__PURE__ */ jsx("span", { style: styles.securityIcon, children: "✓" }),
          /* @__PURE__ */ jsx("strong", { children: "CORS Configuration:" }),
          " Proper cross-origin resource sharing setup"
        ] }),
        /* @__PURE__ */ jsxs("li", { style: styles.securityItem, children: [
          /* @__PURE__ */ jsx("span", { style: styles.securityIcon, children: "✓" }),
          /* @__PURE__ */ jsx("strong", { children: "Helmet.js:" }),
          " Security headers for protection against common attacks"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: styles.section, children: [
      /* @__PURE__ */ jsx("h2", { style: styles.sectionTitle, children: "🏗️ Architecture" }),
      /* @__PURE__ */ jsx("p", { children: "The application follows modern web development best practices:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "File-based Routing:" }),
          " Intuitive page organization with Vike"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Component Architecture:" }),
          " Reusable React components with hooks"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "API Layer:" }),
          " Separate authentication and todo management endpoints"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Context Management:" }),
          " React Context for global state management"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Middleware Pattern:" }),
          " Express middleware for authentication and validation"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Error Handling:" }),
          " Comprehensive error handling and user feedback"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: styles.section, children: [
      /* @__PURE__ */ jsx("h2", { style: styles.sectionTitle, children: "🚀 Deployment Ready" }),
      /* @__PURE__ */ jsx("p", { children: "This application is optimized for production deployment:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Plesk Compatible:" }),
          " Ready for Plesk hosting with configuration files"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Production Build:" }),
          " Optimized bundles with code splitting"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Environment Variables:" }),
          " Configurable settings for different environments"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "Static Asset Optimization:" }),
          " Compressed and cached static files"
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("strong", { children: "PM2 Support:" }),
          " Process management for production servers"
        ] })
      ] })
    ] })
  ] });
}
const import2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Page
}, Symbol.toStringTag, { value: "Module" }));
/*! virtual:vike:pageConfigLazy:server:/pages/about [vike:pluginModuleBanner] */
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
    definedAtData: { "filePathToShowToUser": "/pages/about/+Page.jsx", "fileExportPathToShowToUser": [] },
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
