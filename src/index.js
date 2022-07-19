import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// pages
import App from "./App";
import Signup from "./pages/Signup";
import Boards from "./pages/Boards";

// Redux
import { Provider } from "react-redux";
import { store } from "./app/store";

// React router
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

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
                    <Route element={<PrivateRoute />}>
                        <Route path="/" exact element={<Boards />} />
                        <Route path="/:boardId" element={<App />} />
                    </Route>
                    <Route path="/login" element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    </ThemeProvider>
);
