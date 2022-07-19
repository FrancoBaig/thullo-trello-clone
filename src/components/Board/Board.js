import React from "react";
import BoardNav from "./BoardNav";
import DragAndDrop from "./DragAndDrop";
import Box from "@mui/material/Box";
import BoardDrawer from "./BoardDrawer";

function Board() {
    return (
        <Box sx={{ m: 3, overflowX: "scroll" }}>
            <BoardNav />
            <DragAndDrop />
            <BoardDrawer />
        </Box>
    );
}

export default Board;
