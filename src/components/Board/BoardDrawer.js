import React, { useState, Fragment } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";

// MUI
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import PersonPinIcon from "@mui/icons-material/PersonPin";
import FeedIcon from "@mui/icons-material/Feed";

function BoardDrawer({ state, setState, store }) {
    console.log("store from Drawer", store);

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
                    <Typography variant="caption">Description</Typography>
                </Stack>

                <Typography variant="h3">
                    Ideas are created and share here through a card. Here you
                    can describe what you'd like to accomplish. For example you
                    can follow three simple questions to create the card related
                    to your idea: * Why ? (Why do you wish to do it ?) * What ?
                    (What it is it, what are the goals, who is concerned) * How
                    ? (How do you think you can do it ? What are the required
                    steps ?) After creation, you can move your card to the todo
                    list.
                </Typography>

                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={1}
                    sx={{ color: "#BDBDBD" }}
                >
                    <FeedIcon />
                    <Typography variant="caption">Team</Typography>
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
