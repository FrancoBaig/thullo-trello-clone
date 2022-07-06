import React from "react";
import BoardNav from "./BoardNav";
import DragAndDrop from "./DragAndDrop";
import Box from "@mui/material/Box";

function Board() {
    return (
        <Box sx={{ m: 3 }}>
            <BoardNav />
            <DragAndDrop />
        </Box>
    );
}

export default Board;
