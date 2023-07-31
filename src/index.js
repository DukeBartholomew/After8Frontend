import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ColorSchemeProvider, MantineProvider } from "@mantine/core";



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ColorSchemeProvider>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MantineProvider>
  </ColorSchemeProvider>
);
