import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";

/*
 * Theme
 */
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <App />
        </Provider>
    </ThemeProvider>
);
