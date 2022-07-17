import React, { useState, Fragment } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import {
    updateBoardDescription,
    deleteUserHasBoard,
} from "../../features/User/userSlice";

// MUI
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { alpha, styled } from "@mui/material/styles";

import PersonPinIcon from "@mui/icons-material/PersonPin";
import FeedIcon from "@mui/icons-material/Feed";

import ProfilePhoto from "../ProfilePhoto";

const CustomTextArea = styled(TextareaAutosize)(({ theme }) => ({
    fontFamily: theme.typography.h1.fontFamily,
    fontSize: "1.4rem",
    resize: "vertical",
    padding: ".5rem",
    border: "1px solid #828282",
    borderRadius: 4,
    outline: "none",
}));

function BoardDrawer({ state, setState }) {
    const dispatch = useDispatch();
    const actualBoard = useSelector((state) => state.user.actualBoard);
    const [editing, setEditing] = useState(false);
    const [input, setInput] = useState("");

    const handleUpdateDescription = () => {
        const newBoard = {
            boardId: actualBoard.id,
            description: input,
        };

        dispatch(updateBoardDescription(newBoard));

        setEditing(!editing);
        setInput("");
    };

    const handleRemove = (user) => {
        const data = {
            ...user,
            boardId: actualBoard.id,
        };

        dispatch(deleteUserHasBoard(data));
    };

    return (
        <Drawer
            open={state}
            anchor={"right"}
            onClose={() => setState(false)}
            sx={{
                "& .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop": {
                    backgroundColor: "transparent",
                },
            }}
        >
            <Stack sx={{ width: "33rem", padding: "2rem" }} spacing={2}>
                <Typography variant="h4">Menu</Typography>
                <Divider />

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ color: "#BDBDBD" }}
                >
                    <PersonPinIcon />
                    <Typography variant="body2">Description</Typography>
                </Stack>

                <Box>
                    {editing ? (
                        <>
                            <CustomTextArea
                                aria-label="description"
                                minRows={3}
                                placeholder="description..."
                                value={input}
                                style={{ width: "100%" }}
                                onChange={({ target }) =>
                                    setInput(target.value)
                                }
                            />
                            <Button
                                variant="contained"
                                color="success"
                                size="small"
                                sx={{
                                    mt: "1rem",
                                }}
                                onClick={() => handleUpdateDescription()}
                            >
                                Save
                            </Button>
                        </>
                    ) : (
                        <>
                            <Typography
                                variant="h5"
                                sx={{ whiteSpace: "pre-line" }}
                            >
                                {actualBoard.description}
                            </Typography>
                            <Button
                                variant="outlined"
                                color="secondary"
                                size="small"
                                sx={{
                                    mt: "1rem",
                                    borderColor: "#828282",
                                    color: "#828282",
                                }}
                                onClick={() => {
                                    setInput(actualBoard.description);
                                    setEditing(!editing);
                                }}
                            >
                                Edit
                            </Button>
                        </>
                    )}
                </Box>

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ color: "#BDBDBD" }}
                >
                    <FeedIcon />
                    <Typography variant="body2">Team</Typography>
                </Stack>
                <Stack spacing={1}>
                    {actualBoard.members.map((member) => (
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            key={member.userId}
                        >
                            <Stack
                                direction="row"
                                alignItems="center"
                                spacing={1}
                            >
                                <ProfilePhoto upploadedImage={member.imgUrl} />
                                <Stack>
                                    <Typography variant="h6">
                                        {member.name}
                                    </Typography>
                                    <Typography variant="body1">
                                        {member.email}
                                    </Typography>
                                </Stack>
                            </Stack>
                            <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                onClick={() => handleRemove(member)}
                            >
                                Remove
                            </Button>
                        </Stack>
                    ))}
                </Stack>
            </Stack>
        </Drawer>
    );
}

export default BoardDrawer;
