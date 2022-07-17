import React, { useState, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { getColumns } from "../../features/User/userSlice";

// Compoennts
import BoardDrawer from "./BoardDrawer";
import AddMember from "./members/AddMember";

import { useParams } from "react-router-dom";

// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

const OptionButton = styled(Button)(({ theme }) => ({
    boxShadow: "none",
    padding: "0 2rem",
    "&:hover": {
        color: theme.palette.primary.contrastText,
    },
    "& .MuiSvgIcon-fontSizeMedium": {
        fontSize: "1.4rem",
    },
}));

function BoardNav() {
    const [state, setState] = useState(false);
    const store = useSelector((store) => store.user.data);

    const dispatch = useDispatch();
    const boardId = useParams();

    useEffect(() => {
        dispatch(getColumns(boardId.boardId));
    }, [boardId]);

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <AddMember />
            <OptionButton
                variant="contained"
                color="secondary"
                startIcon={<MoreHorizIcon />}
                sx={{
                    "& .MuiSvgIcon-fontSizeMedium": {
                        fontSize: "2rem",
                    },
                }}
                onClick={() => setState(true)}
            >
                Show Menu
            </OptionButton>
            <BoardDrawer state={state} setState={setState} store={store} />
        </Box>
    );
}

export default BoardNav;
