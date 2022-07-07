import React, { useState, useEffect } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../features/User/userSlice";

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

import CardDetails from "./CardDetails";

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

function Column({ column, tasks }) {
    const dispatch = useDispatch();
    const state = useSelector((state) => state.user.data);

    const [addCard, setAddCard] = useState(false);
    const [newCardInput, setNewCardInput] = useState("");
    const [open, setOpen] = useState(false);
    const [task, setTask] = useState({});
    const [editingCol, setEditingCol] = useState("");

    // Column menu
    const [anchorEl, setAnchorEl] = useState(null);

    const openMenu = Boolean(anchorEl);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(anchorEl);
        console.log(openMenu);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleRenameColumn = () => {
        console.log("rename column");
        console.log("column", column);

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

        const idTask = `task-${new Date().getTime()}`;

        const newCard = {
            5: {
                id: idTask,
                content: newCardInput,
            },
        };

        const payload = { newCard, column };
        dispatch(addTask(payload));

        setAddCard(false);
        setNewCardInput("");
    };

    return (
        <Box sx={{ width: "20%", height: "75vh" }}>
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
            >
                <Typography variant="h4">{column.title}</Typography>
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
                    <MenuItem onClick={handleRenameColumn}>Rename</MenuItem>
                    <Divider />
                    <MenuItem onClick={handleMenuClose}>
                        Delete this list
                    </MenuItem>
                </Menu>
            </Stack>
            <Droppable droppableId={column.id}>
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
                                        ? "#bdbdbd"
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
                                                <Typography variant="h3">
                                                    {task.content}
                                                </Typography>
                                                <Stack
                                                    direction="row"
                                                    spacing={1}
                                                >
                                                    <Chip
                                                        label="Chip Filled"
                                                        size="small"
                                                    />
                                                    <Chip
                                                        label="Chip Filled"
                                                        size="small"
                                                    />
                                                </Stack>
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
