import React, { useState, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateActualBoard } from "../../features/User/userSlice";

// MUI
import Comments from "./Comments";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import LockIcon from "@mui/icons-material/Lock";
import ImageIcon from "@mui/icons-material/Image";
import AddIcon from "@mui/icons-material/Add";
import GroupIcon from "@mui/icons-material/Group";
import LabelIcon from "@mui/icons-material/Label";
import ArticleIcon from "@mui/icons-material/Article";
import EditIcon from "@mui/icons-material/Edit";
import CardMedia from "@mui/material/CardMedia";

import Grid from "@mui/material/Grid";

import UnsplashModal from "../UnsplashModal";

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
    fontSize: "1.4rem",
    textTransform: "capitalize",
    justifyContent: "flex-start",
    paddingLeft: "2rem",
    gap: "1rem",
    "&:hover": {
        color: theme.palette.primary.contrastText,
    },
    "& .MuiSvgIcon-fontSizeMedium": {
        fontSize: "1.4rem",
    },
}));

function CardDetails({ onClose, open, task, column }) {
    const dispatch = useDispatch();
    const actualBoard = useSelector((state) => state.user.actualBoard);
    const [editing, setEditing] = useState(false);
    const [inputDescription, setInputDescription] = useState("");
    const [inputName, setInputName] = useState("");
    const [editingTitle, setEditingTitle] = useState(false);
    const [openCard, setOpenCard] = useState(task);

    const handleEdit = () => {
        let newTask = {};

        if (editingTitle) {
            newTask = {
                ...openCard,
                content: inputName,
            };
        } else {
            newTask = {
                ...openCard,
                description: inputDescription,
            };
        }

        const newTasks = actualBoard.tasks.map((el) =>
            el.id === newTask.id ? newTask : el
        );

        const newBoard = {
            ...actualBoard,
            tasks: newTasks,
        };

        dispatch(updateActualBoard(newBoard));
        setOpenCard(newTask);
        setEditing(false);
        setEditingTitle(false);
        setInputDescription("");
        setInputName("");

        console.log("actualBoard", actualBoard);
    };

    return (
        <Dialog onClose={onClose} open={open}>
            <Grid container spacing={2} sx={{ padding: "2rem" }}>
                {openCard.url_cover !== "" ? (
                    <Grid item xs={12}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={openCard.url_cover}
                            alt="green iguana"
                            sx={{ borderRadius: 1 }}
                        />
                    </Grid>
                ) : (
                    ""
                )}

                <Grid item xs={8}>
                    <Stack direction="row" spacing={1}>
                        {editingTitle ? (
                            <>
                                <Input
                                    placeholder="description..."
                                    value={inputName}
                                    onChange={({ target }) =>
                                        setInputName(target.value)
                                    }
                                />
                                <Box>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        size="small"
                                        sx={{
                                            mt: "1rem",
                                        }}
                                        onClick={() => handleEdit()}
                                    >
                                        Save
                                    </Button>
                                </Box>
                            </>
                        ) : (
                            <>
                                <Typography variant="h1">
                                    {openCard.content}
                                </Typography>
                                <IconButton
                                    aria-label="edit"
                                    size="small"
                                    onClick={() => {
                                        setInputName(openCard.description);
                                        setEditingTitle(true);
                                    }}
                                >
                                    <EditIcon />
                                </IconButton>
                            </>
                        )}
                    </Stack>
                    <Typography
                        variant="body1"
                        sx={{
                            "& span": {
                                fontWeight: "bold",
                            },
                        }}
                    >
                        In list <span>{column}</span>
                    </Typography>
                    <Box>
                        <Stack
                            direction="column"
                            spacing={2}
                            sx={{ mt: "2rem" }}
                        >
                            <Box
                                sx={{
                                    color: "#828282",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "1rem",
                                }}
                            >
                                <ArticleIcon />
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    startIcon={<EditIcon />}
                                    size="small"
                                    sx={{
                                        color: "#828282",
                                        borderColor: "#828282",
                                    }}
                                    onClick={() => {
                                        setInputDescription(
                                            openCard.description
                                        );
                                        setEditing(true);
                                    }}
                                >
                                    Edit
                                </Button>
                            </Box>
                            {editing || openCard.description === "" ? (
                                <>
                                    <Input
                                        placeholder="description..."
                                        value={inputDescription}
                                        onChange={({ target }) =>
                                            setInputDescription(target.value)
                                        }
                                    />
                                    <Box>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            size="small"
                                            sx={{
                                                mt: "1rem",
                                            }}
                                            onClick={() => handleEdit()}
                                        >
                                            Save
                                        </Button>
                                    </Box>
                                </>
                            ) : (
                                <>
                                    <Typography variant="h3">
                                        {openCard.description}
                                    </Typography>
                                </>
                            )}
                        </Stack>
                    </Box>

                    <Comments />
                </Grid>

                <Grid item xs={4}>
                    <Stack spacing={1}>
                        <OptionButton
                            variant="contained"
                            color="secondary"
                            fullWidth
                            startIcon={<GroupIcon />}
                        >
                            Members
                        </OptionButton>
                        <OptionButton
                            variant="contained"
                            color="secondary"
                            fullWidth
                            startIcon={<LabelIcon />}
                        >
                            Labels
                        </OptionButton>
                        <UnsplashModal />
                    </Stack>
                </Grid>
            </Grid>
        </Dialog>
    );
}

export default CardDetails;
