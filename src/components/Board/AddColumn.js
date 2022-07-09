import React, { useState } from "react";

// MUI
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";

// Redux
import { useDispatch } from "react-redux";
import { addColumn } from "../../features/User/userSlice";

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

const Input = styled(InputBase)(({ theme }) => ({
    backgroundColor: "#fafbfc",
    padding: "1rem 1.5rem",
    border: `1px solid #dfe1e6`,
    fontSize: "1.4rem",

    borderRadius: theme.shape.borderRadius,
}));

function AddColumn() {
    const [open, setOpen] = useState(false);
    const [columnName, setColumnName] = useState("");
    const dispatch = useDispatch();

    const handleNewColumn = () => {
        if (columnName === "") return;

        dispatch(addColumn(columnName));

        // reset
        setOpen(false);
        setColumnName("");
    };

    return (
        <Box>
            {open ? (
                <>
                    <Input
                        placeholder="description..."
                        value={columnName}
                        onChange={({ target }) => setColumnName(target.value)}
                    />
                    <Box>
                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                            sx={{
                                mt: "1rem",
                            }}
                            onClick={() => {
                                handleNewColumn();
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                </>
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
