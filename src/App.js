import React from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";

// MUI
import Box from "@mui/material/Box";

// Components
import Navbar from "./components/Navbar";

function App() {
    return (
        <Box>
            <Navbar />
        </Box>
    );
}

export default App;
