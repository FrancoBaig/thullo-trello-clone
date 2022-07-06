import React from "react";

// MUI
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";

import LockIcon from "@mui/icons-material/Lock";
import ImageIcon from "@mui/icons-material/Image";
import AddIcon from "@mui/icons-material/Add";

const Input = styled(InputBase)(({ theme }) => ({
    backgroundColor: "#fafbfc",
    padding: "1rem 1.5rem",
    border: `1px solid #dfe1e6`,
    fontSize: "1.4rem",

    borderRadius: theme.shape.borderRadius,
}));

const OptionButton = styled(Button)(({ theme }) => ({
    boxShadow: "none",
    padding: "1 2rem",
    width: "50%",
    fontSize: "1.4rem",
    textTransform: "capitalize",
    "&:hover": {
        color: theme.palette.primary.contrastText,
    },
    "& .MuiSvgIcon-fontSizeMedium": {
        fontSize: "1.4rem",
    },
}));

function CreateBoardModal({ onClose, open }) {
    return (
        <Dialog onClose={onClose} open={open}>
            <Stack spacing={2} sx={{ padding: "2rem" }}>
                <img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHdvcmt8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60"
                    alt="photo"
                />
                <Input placeholder="Add board title"></Input>
                <Stack direction="row" spacing={3}>
                    <OptionButton
                        variant="contained"
                        color="secondary"
                        startIcon={<ImageIcon />}
                    >
                        Cover
                    </OptionButton>
                    <OptionButton
                        variant="contained"
                        color="secondary"
                        startIcon={<LockIcon />}
                    >
                        Private
                    </OptionButton>
                </Stack>
                <Stack direction="row" spacing={3} justifyContent="flex-end">
                    <Button
                        color="secondary"
                        sx={{ color: "#999999" }}
                        onClick={() => onClose()}
                    >
                        Cancel
                    </Button>
                    <Button variant="contained" startIcon={<AddIcon />}>
                        Create
                    </Button>
                </Stack>
            </Stack>
        </Dialog>
    );
}

export default CreateBoardModal;
