import React, { useState } from "react";

// Redux
import { createNewColumn } from "../../features/User/userSlice";
import { useDispatch, useSelector } from "react-redux";

// Components
import Input from "./Input";

// MUI
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const AddColumnButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.light.main,
    color: theme.palette.light.contrastText,
    textTransform: "capitalize",
    marginTop: "1.5rem",
    justifyContent: "space-between",
    paddingRight: "1rem",
    paddingLeft: "1rem",
    height: "fit-content",
    "&:hover": {
        backgroundColor: theme.palette.light.main,
    },
}));

function AddColumn() {
    const [open, setOpen] = useState(false);
    const [columnName, setColumnName] = useState("");
    const actualBoard = useSelector((state) => state.user.actualBoard);
    const dispatch = useDispatch();

    const handleNewColumn = () => {
        if (columnName === "") return;

        const data = {
            title: columnName,
            Board_boardId: actualBoard.id,
        };

        dispatch(createNewColumn(data));

        // reset
        setOpen(false);
        setColumnName("");
    };

    return (
        <Box sx={{ minWidth: "25rem", maxWidth: "30rem" }}>
            {open ? (
                <Input
                    input={columnName}
                    setInput={setColumnName}
                    handleOnClick={handleNewColumn}
                />
            ) : (
                <AddColumnButton
                    endIcon={<AddIcon />}
                    onClick={() => setOpen(true)}
                >
                    Add a column
                </AddColumnButton>
            )}
        </Box>
    );
}

export default AddColumn;
