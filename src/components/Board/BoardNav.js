import React, { useState } from "react";

import BoardDrawer from "./BoardDrawer";

// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LockIcon from "@mui/icons-material/Lock";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { alpha, styled } from "@mui/material/styles";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CustomAddButton from "./CustomAddButton";

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

    return (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Stack direction="row" spacing={2}>
                <OptionButton
                    variant="contained"
                    color="secondary"
                    startIcon={<LockIcon />}
                >
                    Private
                </OptionButton>

                <Stack direction="row" spacing={1}>
                    <Avatar variant="square" sx={{ borderRadius: 1 }}>
                        N
                    </Avatar>
                </Stack>

                <CustomAddButton size={"large"} />
            </Stack>
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
            <BoardDrawer state={state} setState={setState} />
        </Box>
    );
}

export default BoardNav;
