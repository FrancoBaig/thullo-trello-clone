import React, { useState, useEffect } from "react";

// Redux
import { updateTask } from "../../features/User/userSlice";
import { useDispatch } from "react-redux";

// MUI
import useMediaQuery from "@mui/material/useMediaQuery";
import DialogActions from "@mui/material/DialogActions";
import ArticleIcon from "@mui/icons-material/Article";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import InputBase from "@mui/material/InputBase";
import CardMedia from "@mui/material/CardMedia";
import EditIcon from "@mui/icons-material/Edit";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

// Components
import UnsplashModal from "../UnsplashModal";
import LabelModal from "../Label/LabelModal";

const Input = styled(InputBase)(({ theme }) => ({
    backgroundColor: "#fafbfc",
    padding: "1rem 1.5rem",
    border: `1px solid #dfe1e6`,
    fontSize: "1.4rem",
    borderRadius: theme.shape.borderRadius,
}));

function CardDetails({ onClose, open, task, column }) {
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const [editingTitle, setEditingTitle] = useState(false);
    const [openCard, setOpenCard] = useState(task);
    const [urlCover, setUrlCover] = useState("");
    const [inputDescription, setInputDescription] = useState(
        openCard.description
    );
    const [inputName, setInputName] = useState(openCard.content);
    const matches = useMediaQuery("(min-width:500px)");

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
        <Dialog
            onClose={onClose}
            open={open}
            fullScreen={!matches}
            sx={{ padding: { xs: "4rem", sm: "0" } }}
        >
            {!matches ? (
                <DialogActions>
                    <Stack>
                        <IconButton onClick={onClose}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </DialogActions>
            ) : (
                ""
            )}
            <Grid
                container
                spacing={2}
                sx={{
                    padding: { xs: "3rem", sm: "2rem" },
                    minWidth: { sm: "50rem" },
                }}
            >
                {openCard.url_cover !== null ? (
                    <Grid item xs={12} sx={{ pt: 0 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={openCard.url_cover}
                            alt="green iguana"
                            sx={{ borderRadius: 1, pt: 0 }}
                        />
                    </Grid>
                ) : (
                    ""
                )}

                <Grid item xs={6} sm={8}>
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
                </Grid>

                <Grid item xs={6} sm={4}>
                    <Stack spacing={1}>
                        <LabelModal task={openCard} />
                        <UnsplashModal setUrlCover={setUrlCover} />
                    </Stack>
                </Grid>
            </Grid>
        </Dialog>
    );
}

export default CardDetails;
