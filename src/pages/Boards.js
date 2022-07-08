import React, { useState } from "react";
import Navbar from "../components/Navbar";
import BoardCard from "../components/Board/BoardCard";
import CreateBoardModal from "../components/Board/CreateBoardModal";

// Redux
import { useSelector } from "react-redux";

// Router
import { useNavigate } from "react-router-dom";

// MUI
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

function Boards() {
    const boards = useSelector((state) => state.user.data);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
    };

    const handleRedirectToBoard = (idBoard) => {
        if (boards[idBoard] === undefined) return;

        navigate(`/${idBoard}`, { replace: true });
    };

    return (
        <Box sx={{ backgroundColor: "#f8f9fd" }}>
            <Navbar />
            <Container maxWidth="lg" sx={{ mt: "4rem" }}>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ mb: "4rem" }}
                >
                    <Typography variant="h3">All Boards</Typography>
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={() => handleClickOpen()}
                    >
                        Add
                    </Button>
                </Stack>
                <Grid container spacing={3}>
                    {Object.keys(boards).map((key, index) => (
                        <Grid
                            item
                            xs={3}
                            key={index}
                            onClick={() =>
                                handleRedirectToBoard(boards[key].id)
                            }
                        >
                            <BoardCard {...boards[key]} />
                        </Grid>
                    ))}
                </Grid>
                {open ? (
                    <CreateBoardModal onClose={handleClose} open={open} />
                ) : (
                    ""
                )}
            </Container>
        </Box>
    );
}

export default Boards;
