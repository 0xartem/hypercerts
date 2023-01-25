import { initPlasmicLoader } from "@plasmicapp/loader-nextjs";
import dynamic from "next/dynamic";
import CircularProgress from "@mui/material/CircularProgress";
import { ClientGrid } from "./components/client-grid";
import { DEFAULT_TEST_DATA } from "./components/dapp-context";
import { HypercertCreateForm } from "./components/hypercert-create";
import {
  FormField,
  FormError,
  FormTextField,
  FormSelect,
  FormDatePicker,
  FormDropZone,
} from "./components/forms";
import { PLASMIC_PROJECT_ID, PLASMIC_PROJECT_API_TOKEN } from "./lib/config";

export const PLASMIC = initPlasmicLoader({
  projects: [
    // Hypercerts DApp
    {
      id: PLASMIC_PROJECT_ID,
      token: PLASMIC_PROJECT_API_TOKEN,
    },
  ],
  // Fetches the latest revisions, whether or not they were unpublished!
  // Disable for production to ensure you render only published changes.
  preview: true,
});

/**
 * Plasmic component registration
 * https://docs.plasmic.app/learn/code-components-ref/
 */

PLASMIC.registerComponent(ClientGrid, {
  name: "ClientGrid",
  description: "Calls a client method and shows the results",
  props: {
    method: {
      type: "choice",
      defaultValue: "getRounds",
      options: ["getRounds"],
    },
    children: {
      type: "slot",
      defaultValue: {
        type: "text",
        value: "Placeholder",
      },
    },
    loadingChildren: {
      type: "slot",
      defaultValue: {
        type: "text",
        value: "Loading...",
      },
    },
    testLoading: "boolean",
    count: "number",
  },
  defaultStyles: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridRowGap: "30px",
    gridColumnGap: "50px",
    padding: "8px",
    maxWidth: "100%",
  },
  providesData: true,
  importPath: "./components/client-grid",
});

PLASMIC.registerComponent(
  dynamic(() => import("./components/dapp-context"), { ssr: false }),
  {
    name: "DappContext",
    description: "This must wrap anything that uses wallet functionality",
    props: {
      children: {
        type: "slot",
        defaultValue: {
          type: "text",
          value: "Placeholder",
        },
      },
      notConnected: {
        type: "slot",
        defaultValue: {
          type: "text",
          value: "Placeholder",
        },
      },
      showIfNotConnected: "boolean",
      testData: {
        type: "object",
        defaultValue: DEFAULT_TEST_DATA,
      },
      useTestData: "boolean",
    },
    providesData: true,
    importPath: "./components/dapp-context",
  }
);

PLASMIC.registerComponent(
  dynamic(() => import("./components/connect-wallet"), { ssr: false }),
  {
    name: "ConnectWallet",
    description: "The connect wallet button",
    props: {},
    importPath: "./components/connect-wallet",
  }
);

PLASMIC.registerComponent(HypercertCreateForm, {
  name: "HypercertCreateForm",
  description: "Create a hypercert",
  props: {
    children: {
      type: "slot",
      defaultValue: {
        type: "text",
        value: "Placeholder",
      },
    },
  },
  providesData: true,
  importPath: "./components/hypercert-create",
});

PLASMIC.registerComponent(FormError, {
  name: "FormError",
  description: "Displays the error associated with fieldName",
  props: {
    fieldName: "string",
  },
  importPath: "./components/forms",
});

PLASMIC.registerComponent(FormField, {
  name: "FormField",
  description: "General purpose form field that accepts an arbitrary input",
  props: {
    fieldName: "string",
    children: "slot",
  },
  importPath: "./components/forms",
});

PLASMIC.registerComponent(FormTextField, {
  name: "FormTextField",
  description: "Textfield for forms",
  props: {
    fieldName: "string",
    label: "string",
    placeholder: "string",
    rows: "number",
  },
  importPath: "./components/forms",
});

PLASMIC.registerComponent(FormSelect, {
  name: "FormSelect",
  description: "Select box for forms",
  props: {
    fieldName: "string",
    label: "string",
    optionValues: {
      type: "object",
      defaultValue: ["a", "b"],
    },
    multiple: "boolean",
  },
  importPath: "./components/forms",
});

PLASMIC.registerComponent(FormDatePicker, {
  name: "FormDatePicker",
  description: "Date picker for forms",
  props: {
    fieldName: "string",
    label: "string",
    showUndefined: "boolean",
    defaultUndefined: "boolean",
  },
  importPath: "./components/forms",
});

PLASMIC.registerComponent(FormDropZone, {
  name: "FormDropZone",
  description: "DropZone for forms",
  props: {
    fieldName: "string",
    children: "slot",
  },
  importPath: "./components/forms",
});

PLASMIC.registerComponent(CircularProgress, {
  name: "CircularProgress",
  description: "Circular loading widget",
  props: {},
  importPath: "@mui/material/CircularProgress",
});
