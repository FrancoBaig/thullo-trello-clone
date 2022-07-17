import React, { useState } from "react";

// components
import TogglePrivate from "../TogglePrivate";
import CustomAddButton from "../CustomAddButton";
import ProfilePhoto from "../../ProfilePhoto";

// MUI
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import LockIcon from "@mui/icons-material/Lock";
import { styled } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import PublicIcon from "@mui/icons-material/Public";

function AddMember() {
    return (
        <Stack direction="row" spacing={2}>
            <TogglePrivate />

            <Stack direction="row" spacing={1}>
                <Avatar variant="square" sx={{ borderRadius: 1 }}>
                    N
                </Avatar>
            </Stack>

            <CustomAddButton size={"large"} />
        </Stack>
    );
}

export default AddMember;
