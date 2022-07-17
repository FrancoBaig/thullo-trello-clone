import React, { useState } from "react";

// MUI
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { searchUsersByEmailService } from "../../services/data";
import { assignBoardToUser } from "../../features/User/userSlice";

import ProfilePhoto from "../ProfilePhoto";

const InputSearch = styled(InputBase)(({ theme }) => ({
    color: theme.palette.text.secondary,
    height: "4rem",
    fontSize: 10,
    fontWeight: 500,
    borderRadius: 8,
    border: "1px solid #FFFFFF",
    paddingLeft: "1rem",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
}));

const CustomIconButton = styled(IconButton)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    borderRadius: 8,
    color: theme.palette.primary.contrastText,
    "&:hover": {
        backgroundColor: "#2059a5",
    },
}));

function CustomAddButton({ size = "medium" }) {
    const actualBoard = useSelector((store) => store.user.actualBoard);
    const dispatch = useDispatch();
    const [input, setInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    const openMenu = Boolean(anchorEl);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleRequest = async () => {
        const results = await searchUsersByEmailService(input);
        console.log("results", results);

        setSearchResults(results);
        setInput("");
    };

    const handleNewMember = (user) => {
        let already = false;

        for (let i of actualBoard.members) {
            if (i.userId === user.userId) {
                already = true;
            }
        }

        if (!already) {
            user = {
                ...user,
                boardId: actualBoard.id,
            };

            dispatch(assignBoardToUser(user));
        }

        handleMenuClose();
    };
    return (
        <>
            <CustomIconButton
                component="span"
                id="basic-button"
                aria-controls={openMenu ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openMenu ? "true" : undefined}
                onClick={handleMenuClick}
            >
                <AddIcon fontSize={size} />
            </CustomIconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={openMenu}
                onClose={handleMenuClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <Stack spacing={1} sx={{ padding: 1 }}>
                    <Typography variant="h3">Members</Typography>
                    <Typography variant="h4" sx={{ color: "#828282" }}>
                        Assign members to this board
                    </Typography>
                    <FormControl
                        sx={{
                            position: "relative",
                            width: "65ch",
                            height: "60%",
                        }}
                    >
                        <InputSearch
                            placeholder="email..."
                            onChange={({ target }) => setInput(target.value)}
                        />
                        <Button
                            variant="contained"
                            disabled={input === ""}
                            sx={{
                                position: "absolute",
                                right: 4,
                                top: 4,

                                textTransform: "capitalize",
                            }}
                            onClick={() => handleRequest()}
                        >
                            Search
                        </Button>
                    </FormControl>
                    {searchResults.length > 0 ? (
                        <Paper sx={{ p: 1 }}>
                            {searchResults.map((user, index) => (
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                    key={index}
                                    sx={{
                                        cursor: "pointer",
                                        mt: ".5rem",
                                        mb: ".5rem",
                                        padding: ".5rem",
                                        borderRadius: 1,
                                        "&:hover": {
                                            boxShadow:
                                                "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
                                        },
                                    }}
                                    onClick={() => {
                                        handleNewMember(user);
                                    }}
                                >
                                    <ProfilePhoto
                                        upploadedImage={user.imgUrl}
                                    />
                                    <Typography
                                        variant="h3"
                                        sx={{ fontWeight: 500 }}
                                    >
                                        {user.name}
                                    </Typography>
                                </Stack>
                            ))}
                        </Paper>
                    ) : (
                        ""
                    )}
                </Stack>
            </Menu>
        </>
    );
}

export default CustomAddButton;
