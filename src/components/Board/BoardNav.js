import React, { useState, useEffect } from "react";

// Redux
import { getColumns } from "../../features/User/userSlice";
import { useDispatch, useSelector } from "react-redux";

// React Router
import { useParams } from "react-router-dom";

// Components
import AddMember from "./members/AddMember";
import BoardDrawer from "./BoardDrawer";

// MUI
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { styled } from "@mui/material/styles";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

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
    const loading = useSelector((store) => store.helper.loading.board);

    const dispatch = useDispatch();
    const boardId = useParams();

    useEffect(() => {
        dispatch(getColumns(boardId.boardId));
    }, [boardId, dispatch]);

    return (
        <>
            {loading ? (
                <Skeleton variant="rectangular" height={45} />
            ) : (
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
                    <BoardDrawer
                        state={state}
                        setState={setState}
                        store={store}
                    />
                </Box>
            )}
        </>
    );
}

export default BoardNav;
