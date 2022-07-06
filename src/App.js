import React from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";

// MUI
import Box from "@mui/material/Box";

// Components
import Navbar from "./components/Navbar";
import Board from "./components/Board/Board";

function App() {
    return (
        <Box>
            <Navbar />
            <Board />
        </Box>
    );
}

export default App;
