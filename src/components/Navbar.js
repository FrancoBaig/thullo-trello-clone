import React, { useEffect, useState } from "react";
import Logo from "../assets/img/Logo.svg";

import ProfilePhoto from "./ProfilePhoto";
import ProfilePhotoModal from "./ProfilePhotoModal";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { changeActualBoard } from "../features/User/userSlice";

// Router
import { useParams, useNavigate } from "react-router-dom";

// MUI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";

const BoardButton = styled(Button)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    fontSize: 12,
    color: "#828282",
    boxShadow: "none",
    marginLeft: 20,
    textTransform: "capitalize",
    "&:hover": {
        backgroundColor: theme.palette.secondary.main,
    },
}));

const InputSearch = styled(InputBase)(({ theme }) => ({
    color: theme.palette.text.secondary,
    fontSize: 10,
    fontWeight: 500,
    borderRadius: 8,
    border: "1px solid #FFFFFF",
    paddingLeft: "1rem",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
}));

function Navbar() {
    const dispatch = useDispatch();
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [open, setOpen] = useState(false);
    const state = useSelector((state) => state.user);
    const userImg = state.user.img_id;
    const userName = state.user.name;
    const { boardId } = useParams();

    useEffect(() => {
        let board = state.data[boardId];
        if (board === undefined) return;
        dispatch(changeActualBoard(board));
    }, [boardId]);

    let navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "#FFFFFF",
                border: "none",
                boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.05)",
            }}
        >
            <Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Toolbar>
                        <IconButton
                            onClick={() => navigate("/", { replace: true })}
                        >
                            <img src={Logo} alt="pag-logo"></img>
                        </IconButton>
                        {boardId !== undefined ? (
                            <>
                                <Typography
                                    variant="h1"
                                    sx={{
                                        ml: 4,
                                        mr: 2,
                                        color: "#333333",
                                        fontSize: {
                                            lg: "1.5rem",
                                        },
                                    }}
                                >
                                    {state.actualBoard.title}
                                </Typography>
                                <Divider
                                    orientation="vertical"
                                    variant="middle"
                                    flexItem
                                />
                                <BoardButton
                                    variant="contained"
                                    startIcon={<MenuIcon fontSize="large" />}
                                    onClick={() =>
                                        navigate("/", { replace: true })
                                    }
                                >
                                    All board
                                </BoardButton>
                            </>
                        ) : (
                            ""
                        )}
                    </Toolbar>
                    <Toolbar sx={{ gap: 2 }}>
                        <FormControl
                            sx={{
                                position: "relative",
                                width: "65ch",
                                height: "60%",
                            }}
                        >
                            <InputSearch
                                placeholder="Keyword..."
                                sx={{ height: "100%" }}
                            />
                            <Button
                                variant="contained"
                                sx={{
                                    position: "absolute",
                                    right: 4,
                                    top: 4,
                                    height: "75%",
                                    textTransform: "capitalize",
                                }}
                            >
                                Search
                            </Button>
                        </FormControl>

                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            {userImg ? (
                                <ProfilePhoto
                                    upploadedImage={userImg}
                                    handleClickOpen={handleClickOpen}
                                />
                            ) : (
                                <Avatar
                                    variant="square"
                                    sx={{
                                        mr: 1,
                                        borderRadius: 1,
                                        cursor: "pointer",
                                    }}
                                    src={userImg}
                                    onClick={() => handleClickOpen()}
                                />
                            )}

                            <ProfilePhotoModal open={open} setOpen={setOpen} />

                            <Typography
                                variant="body2"
                                sx={{ color: "#333333" }}
                            >
                                {userName}
                            </Typography>
                            <IconButton>
                                <ExpandMoreIcon />
                            </IconButton>
                        </Box>
                    </Toolbar>
                </Box>
            </Box>
        </AppBar>
    );
}

export default Navbar;
