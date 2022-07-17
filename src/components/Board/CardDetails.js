import React, { useState, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { updateTask } from "../../features/User/userSlice";

// MUI
import Comments from "./Comments";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

import GroupIcon from "@mui/icons-material/Group";
import ArticleIcon from "@mui/icons-material/Article";
import EditIcon from "@mui/icons-material/Edit";
import CardMedia from "@mui/material/CardMedia";

import Grid from "@mui/material/Grid";

import UnsplashModal from "../UnsplashModal";
import LabelModal from "../Label/LabelModal";

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
    paddingLeft: "3rem",
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
    const [editingTitle, setEditingTitle] = useState(false);
    const [openCard, setOpenCard] = useState(task);
    const [urlCover, setUrlCover] = useState("");
    const [inputDescription, setInputDescription] = useState(
        openCard.description
    );
    const [inputName, setInputName] = useState(openCard.content);

    useEffect(() => {
        handleNewCover();
    }, [urlCover]);

    const handleEdit = () => {
        let newTask = {};
        const idColumn = column.id;

        if (editingTitle) {
            newTask = {
                ...openCard,
                content: inputName,
            };

            dispatch(updateTask(newTask, idColumn, "content"));
        } else {
            newTask = {
                ...openCard,
                description: inputDescription,
            };

            dispatch(updateTask(newTask, idColumn, "description"));
        }

        setOpenCard(newTask);
        setEditing(false);
        setEditingTitle(false);
        setInputDescription("");
        setInputName("");
    };

    const handleNewCover = () => {
        if (urlCover === "") return;
        const idColumn = column.id;
        const newTask = {
            ...openCard,
            url_cover: urlCover,
        };

        dispatch(updateTask(newTask, idColumn, "cover"));
        setOpenCard(newTask);
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
                        In list <span>{column.title}</span>
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
                        <LabelModal task={openCard} />
                        <UnsplashModal setUrlCover={setUrlCover} />
                    </Stack>
                </Grid>
            </Grid>
        </Dialog>
    );
}

export default CardDetails;
