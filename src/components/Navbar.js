import React, { useEffect, useState } from "react";
import LogoSmall from "../assets/img/LogoSmall.svg";
import Logo from "../assets/img/Logo.svg";

// Components
import ProfilePhotoModal from "./ProfilePhotoModal";
import ProfilePhoto from "./ProfilePhoto";

// Redux
import { changeActualBoard } from "../features/User/userSlice";
import { useDispatch, useSelector } from "react-redux";

// Router
import { useParams, useNavigate } from "react-router-dom";

// MUI
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Avatar from "@mui/material/Avatar";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

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

function Navbar() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const state = useSelector((state) => state.user);
    const userImg = state.user.img_id;
    const userName = state.user.name;
    const { boardId } = useParams();
    const media = useMediaQuery("(min-width:600px)");

    useEffect(() => {
        let board = state.data[boardId];
        if (board === undefined) return;
        dispatch(changeActualBoard(board));
    }, [boardId]);

    let navigate = useNavigate();

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
                            <img
                                src={media ? Logo : LogoSmall}
                                alt="pag-logo"
                            ></img>
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
                                    startIcon={<MenuIcon size="small" />}
                                    onClick={() =>
                                        navigate("/", { replace: true })
                                    }
                                    sx={{
                                        fontSize: {
                                            xs: "1.4rem",
                                            sm: "1.6rem",
                                        },
                                    }}
                                >
                                    All boards
                                </BoardButton>
                            </>
                        ) : (
                            ""
                        )}
                    </Toolbar>
                    <Toolbar sx={{ gap: 2 }}>
                        {/* V2: search public boards
                        
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
                         */}

                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
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
                                variant="body1"
                                sx={{
                                    color: "#333333",
                                    ml: "1rem",
                                    fontWeight: "500",
                                    fontSize: "1.1rem",
                                    display: { xs: "none", sm: "unset" },
                                }}
                            >
                                {userName}
                            </Typography>
                        </Box>
                    </Toolbar>
                </Box>
            </Box>
        </AppBar>
    );
}

export default Navbar;
