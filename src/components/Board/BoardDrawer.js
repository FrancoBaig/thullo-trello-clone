import React, { useState, Fragment } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { changeDescription } from "../../features/User/userSlice";

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
    const paSaber = useSelector((state) => state);
    const [editing, setEditing] = useState(false);
    const [input, setInput] = useState("");

    const handleUpdateDescription = () => {
        const newBoard = {
            ...actualBoard,
            description: input,
        };

        dispatch(changeDescription(newBoard));

        setEditing(!editing);
        setInput("");
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
            <Stack sx={{ width: "30rem", padding: "2rem" }} spacing={2}>
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
                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <img
                                width="30rem"
                                height="30rem"
                                src="https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60"
                                alt="1"
                            />
                            <Typography variant="h6">Daniel Jensen</Typography>
                        </Stack>
                        {/* si es admin display otro botón */}
                        <Button variant="outlined" color="error" size="small">
                            Remove
                        </Button>
                    </Stack>

                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Stack direction="row" alignItems="center" spacing={1}>
                            <img
                                width="30rem"
                                height="30rem"
                                src="https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8d29ya3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=400&q=60"
                                alt="1"
                            />
                            <Typography variant="h6">Daniel Jensen</Typography>
                        </Stack>
                        {/* si es admin display otro botón */}
                        <Button variant="outlined" color="error" size="small">
                            Remove
                        </Button>
                    </Stack>
                </Stack>
            </Stack>
        </Drawer>
    );
}

export default BoardDrawer;
