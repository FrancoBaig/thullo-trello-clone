import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// pages
import App from "./App";
import Signup from "./pages/Signup";

// Redux
import { Provider } from "react-redux";
import { store } from "./app/store";

// React router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Theme
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<App />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </ThemeProvider>
);
