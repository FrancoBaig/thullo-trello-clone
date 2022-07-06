import React from "react";
import BoardNav from "./BoardNav";
import DragAndDrop from "./DragAndDrop";
import Box from "@mui/material/Box";

// Redux
import { useDispatch, useSelector } from "react-redux";

// Router
import { useParams, useNavigate } from "react-router-dom";

function Board() {
    return (
        <Box sx={{ m: 3 }}>
            <BoardNav />
            <DragAndDrop />
        </Box>
    );
}

export default Board;
