import React from "react";

import Comments from "./Comments";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import LockIcon from "@mui/icons-material/Lock";
import ImageIcon from "@mui/icons-material/Image";
import AddIcon from "@mui/icons-material/Add";
import GroupIcon from "@mui/icons-material/Group";
import LabelIcon from "@mui/icons-material/Label";
import ArticleIcon from "@mui/icons-material/Article";
import EditIcon from "@mui/icons-material/Edit";

import Grid from "@mui/material/Grid";

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
    return (
        <Dialog onClose={onClose} open={open}>
            <Grid container spacing={2} sx={{ padding: "2rem" }}>
                <Grid item xs={12}>
                    <img
                        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHdvcmt8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60"
                        alt="photo"
                        width="100%"
                    />
                </Grid>
                <Grid item xs={8}>
                    <Typography variant="h1">{task.content}</Typography>
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
                                >
                                    Edit
                                </Button>
                            </Box>
                            {task.description === "" ? (
                                <Input placeholder="description..." />
                            ) : (
                                <Typography variant="h3">
                                    {task.description}
                                </Typography>
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
                        <OptionButton
                            variant="contained"
                            color="secondary"
                            fullWidth
                            startIcon={<ImageIcon />}
                        >
                            Cover
                        </OptionButton>
                    </Stack>
                </Grid>
            </Grid>
        </Dialog>
    );
}

export default CardDetails;
