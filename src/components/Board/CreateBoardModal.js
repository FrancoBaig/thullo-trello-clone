import React, { useState } from "react";
import UnsplashModal from "../UnsplashModal";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { createNewBoard } from "../../features/User/userSlice";

// MUI
import PublicIcon from "@mui/icons-material/Public";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import InputBase from "@mui/material/InputBase";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

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
    justifyContent: "flex-start",
    paddingLeft: "3rem",
    gap: "1rem",
    "&:hover": {
        color: theme.palette.primary.contrastText,
    },
    "& .MuiSvgIcon-fontSizeMedium": {
        fontSize: "1.4rem",
    },
}));

function CreateBoardModal({ onClose, open }) {
    const user = useSelector((state) => state.user.user);
    const [boardName, setBoardName] = useState("");
    const [urlCover, setUrlCover] = useState(
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHdvcmt8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60"
    );
    const [isPrivate, setIsPrivate] = useState(true);
    const dispatch = useDispatch();
    const [noInput, setNoInput] = useState(false);

    const handleCreateBoard = () => {
        if (boardName === "") {
            setNoInput(true);
            setTimeout(() => {
                setNoInput(false);
            }, 3000);
            return;
        }

        const boardData = {
            title: boardName,
            description: "",
            image_url: urlCover,
            isPrivate: isPrivate,
        };

        const data = {
            data: boardData,
            token: user.token,
        };

        dispatch(createNewBoard(data));

        setBoardName("");
        onClose();
    };

    return (
        <Dialog onClose={onClose} open={open}>
            <Stack spacing={2} sx={{ padding: "2rem" }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={urlCover}
                    alt="green iguana"
                    sx={{ borderRadius: 1 }}
                />
                <Input
                    placeholder="Add board title"
                    value={boardName}
                    onChange={({ target }) => setBoardName(target.value)}
                    required
                    id="BoardName"
                    error={noInput}
                />
                {noInput ? (
                    <Typography
                        variant="body2"
                        color="error"
                        sx={{ mb: 1, fontSize: "1.2rem" }}
                    >
                        name is required
                    </Typography>
                ) : (
                    ""
                )}
                <Stack direction={{ xs: "column", sm: "row" }} spacing={3}>
                    <Box sx={{ width: "50%" }}>
                        <UnsplashModal setUrlCover={setUrlCover} />
                    </Box>
                    <OptionButton
                        variant="contained"
                        color="secondary"
                        startIcon={isPrivate ? <LockIcon /> : <PublicIcon />}
                        onClick={() => setIsPrivate(!isPrivate)}
                    >
                        {isPrivate ? "Private" : "Public"}
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
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => handleCreateBoard()}
                    >
                        Create
                    </Button>
                </Stack>
            </Stack>
        </Dialog>
    );
}

export default CreateBoardModal;
