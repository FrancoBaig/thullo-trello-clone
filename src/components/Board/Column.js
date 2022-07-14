import React, { useState, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
    addTask,
    updateActualBoard,
    deleteColumn,
} from "../../features/User/userSlice";

// DND
import { Droppable, Draggable } from "react-beautiful-dnd";

// MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Chip from "@mui/material/Chip";
import CustomAddButton from "./CustomAddButton";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import AddIcon from "@mui/icons-material/Add";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";

import CardDetails from "./CardDetails";
import Label from "../Label/Label";

const Card = styled(Paper)(({ theme }) => ({
    padding: "1.5rem",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
}));

const AddCardButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.light.main,
    color: theme.palette.light.contrastText,
    textTransform: "capitalize",
    marginTop: "1.5rem",
    justifyContent: "space-between",
    paddingRight: "1rem",
    paddingLeft: "1rem",
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

function Column({ column, tasks }) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.user.data);
    const actualBoard = useSelector((state) => state.user.actualBoard);

    const [addCard, setAddCard] = useState(false);
    const [newCardInput, setNewCardInput] = useState("");
    const [open, setOpen] = useState(false);
    const [task, setTask] = useState({});
    const [editingCol, setEditingCol] = useState(false);
    const [input, setInput] = useState("");

    // Column menu
    const [anchorEl, setAnchorEl] = useState(null);

    const openMenu = Boolean(anchorEl);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleRenameColumn = () => {
        const newColumn = {
            ...column,
            title: input,
        };

        const newBoard = {
            ...actualBoard,
            columns: {
                ...actualBoard.columns,
                [column.id]: newColumn,
            },
        };

        dispatch(updateActualBoard(newBoard));

        setInput("");
        setEditingCol(false);
        handleMenuClose();
    };

    //
    const handleClickOpen = (taskId) => {
        let element = tasks.find((task) => task.id === taskId);
        setTask(element);
        setOpen(true);
    };

    const handleClose = (value) => {
        setTask({});
        setOpen(false);
    };

    const handleNewCard = (e) => {
        e.preventDefault();
        if (newCardInput === "") return;

        const payload = { newCardInput, column };
        dispatch(addTask(payload));

        setAddCard(false);
        setNewCardInput("");
    };

    const handleColumnDelete = () => {
        dispatch(deleteColumn(column));
        handleMenuClose();
    };

    return (
        <Box sx={{ width: "20%", height: "75vh" }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                {editingCol ? (
                    <>
                        <Input
                            placeholder="description..."
                            value={input}
                            onChange={({ target }) => setInput(target.value)}
                        />

                        <Box>
                            <Button
                                variant="contained"
                                color="success"
                                size="small"
                                sx={{
                                    mt: "1rem",
                                }}
                                onClick={() => handleRenameColumn()}
                            >
                                Save
                            </Button>
                        </Box>
                    </>
                ) : (
                    <Typography variant="h4">{column.title}</Typography>
                )}
                <IconButton
                    id="basic-button"
                    aria-controls={openMenu ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMenu ? "true" : undefined}
                    onClick={handleMenuClick}
                >
                    <MoreHorizIcon />
                </IconButton>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={openMenu}
                    onClose={handleMenuClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    <MenuItem onClick={() => setEditingCol(true)}>
                        Rename
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => handleColumnDelete()}>
                        Delete this list
                    </MenuItem>
                </Menu>
            </Stack>
            <Droppable droppableId={column.id.toString()}>
                {(droppableProvided, droppableSnapshot) => (
                    <div
                        ref={droppableProvided.innerRef}
                        {...droppableProvided.droppableProps}
                    >
                        <Stack
                            direction="column"
                            spacing={2}
                            sx={{
                                borderRadius: "12px",
                                backgroundColor:
                                    droppableSnapshot.isDraggingOver
                                        ? "#e2e8f6"
                                        : "",
                            }}
                        >
                            {tasks.map((task, index) => (
                                <Draggable
                                    key={task.id}
                                    draggableId={`${task.id}`}
                                    index={index}
                                >
                                    {(draggableProvided, draggableSnapshot) => (
                                        <Card
                                            sx={{
                                                boxShadow:
                                                    draggableSnapshot.isDragging
                                                        ? "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px"
                                                        : "0px 4px 12px rgba(0, 0, 0, 0.05)",
                                            }}
                                            ref={draggableProvided.innerRef}
                                            {...draggableProvided.draggableProps}
                                            {...draggableProvided.dragHandleProps}
                                            onClick={() =>
                                                handleClickOpen(task.id)
                                            }
                                        >
                                            <Stack spacing={2}>
                                                {task.url_cover == undefined ? (
                                                    ""
                                                ) : (
                                                    <CardMedia
                                                        component="img"
                                                        height="100"
                                                        image={task.url_cover}
                                                        alt="green iguana"
                                                        sx={{ borderRadius: 1 }}
                                                    />
                                                )}

                                                <Typography variant="h3">
                                                    {task.content}
                                                </Typography>
                                                <Grid container spacing={1}>
                                                    {task.labels.map(
                                                        (label) => (
                                                            <Grid item>
                                                                <Label
                                                                    text={
                                                                        label.text
                                                                    }
                                                                    color={
                                                                        label.color
                                                                    }
                                                                />
                                                            </Grid>
                                                        )
                                                    )}
                                                </Grid>
                                                <Stack
                                                    direction="row"
                                                    justifyContent="space-between"
                                                    alignItems="center"
                                                >
                                                    <CustomAddButton />
                                                </Stack>
                                            </Stack>
                                            {draggableProvided.placeholder}
                                        </Card>
                                    )}
                                </Draggable>
                            ))}
                            {droppableProvided.placeholder}
                        </Stack>
                    </div>
                )}
            </Droppable>
            {addCard ? (
                <Card>
                    <form onSubmit={handleNewCard}>
                        <InputBase
                            placeholder="Enter a title for this card..."
                            value={newCardInput}
                            onChange={({ target }) => {
                                setNewCardInput(target.value);
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="success"
                            size="small"
                            onClick={(e) => handleNewCard(e)}
                        >
                            Save
                        </Button>
                    </form>
                </Card>
            ) : (
                ""
            )}
            <AddCardButton
                fullWidth
                endIcon={<AddIcon />}
                onClick={() => setAddCard(true)}
            >
                Add a card
            </AddCardButton>
            {open ? (
                <CardDetails
                    column={column.title}
                    task={task}
                    onClose={handleClose}
                    open={open}
                />
            ) : (
                ""
            )}
        </Box>
    );
}

export default Column;
