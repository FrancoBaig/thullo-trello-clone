import React from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { alpha, styled } from "@mui/material/styles";

const CustomIconButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    borderRadius: 8,
    color: theme.palette.primary.contrastText,
    "&:hover": {
        backgroundColor: "#2059a5",
    },
}));

function CustomAddButton({ size = "medium" }) {
    return (
        <CustomIconButton component="span">
            <AddIcon fontSize={size} />
        </CustomIconButton>
    );
}

export default CustomAddButton;
