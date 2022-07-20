import React from "react";
import Chip from "@mui/material/Chip";
import { styled } from "@mui/material/styles";

const CustomChip = styled(Chip)(({ theme }) => ({
    fontFamily: "Noto Sans",
    fontWeight: 500,
    fontSize: "1rem",
    padding: "0 .5rem",
}));

function Label({ text, color }) {
    return <CustomChip label={text} size="small" color={color} />;
}

export default Label;
