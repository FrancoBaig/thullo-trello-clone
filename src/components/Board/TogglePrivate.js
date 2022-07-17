import React, { useState } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateBoardPrivacity } from "../../features/User/userSlice";

// MUI
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import LockIcon from "@mui/icons-material/Lock";
import { styled } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import PublicIcon from "@mui/icons-material/Public";

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

function TogglePrivate() {
    const actualBoard = useSelector((store) => store.user.actualBoard);
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);

    const openMenu = Boolean(anchorEl);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handlePrivate = () => {
        const data = {
            boardId: actualBoard.id,
            isPrivate: actualBoard.isPrivate,
        };

        dispatch(updateBoardPrivacity(data));
        handleMenuClose();
    };

    return (
        <>
            <OptionButton
                variant="contained"
                color="secondary"
                startIcon={
                    actualBoard.isPrivate ? <LockIcon /> : <PublicIcon />
                }
                id="basic-button"
                aria-controls={openMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
                onClick={handleMenuClick}
            >
                {actualBoard.isPrivate ? "Private" : "Public"}
            </OptionButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <Stack spacing={1} sx={{ padding: 1 }}>
                    <Typography variant="h3">Visibility</Typography>
                    <Typography variant="h4" sx={{ color: "#828282" }}>
                        Choose who can see to this board.
                    </Typography>
                    <OptionButton
                        variant="contained"
                        color="secondary"
                        startIcon={<LockIcon />}
                        sx={{ padding: "1rem 0", fontSize: "1.4rem" }}
                        disabled={actualBoard.isPrivate}
                        onClick={() => handlePrivate()}
                    >
                        Private
                    </OptionButton>
                    <OptionButton
                        variant="contained"
                        color="secondary"
                        startIcon={<PublicIcon />}
                        sx={{ padding: "1rem 0", fontSize: "1.4rem" }}
                        disabled={!actualBoard.isPrivate}
                        onClick={() => handlePrivate()}
                    >
                        Public
                    </OptionButton>
                </Stack>
            </Menu>
        </>
    );
}

export default TogglePrivate;
