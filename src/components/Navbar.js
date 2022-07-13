import React, { useEffect, useState } from "react";
import Logo from "../assets/img/Logo.svg";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { changeActualBoard, changePhoto } from "../features/User/userSlice";

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
import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

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

const Input = styled("input")({
    display: "none",
});

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
    const state = useSelector((state) => state.user);
    const userImg = state.user.img_url;
    const userName = state.user.name;
    const { boardId } = useParams();
    const [open, setOpen] = useState(true);
    const [file, setFile] = useState("");
    const [image, setImage] = useState("");

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

    const handleClose = (value) => {
        setOpen(false);
    };

    const previewFiles = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImage(reader.result);
        };
    };

    const handleFile = (e) => {
        const file = e.target.files[0];
        setFile(file);
        previewFiles(file);
        console.log("image", image);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("new");
        console.log("file", file);
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
                            <Dialog onClose={handleClose} open={open}>
                                <Stack spacing={2} sx={{ padding: "2rem" }}>
                                    {image !== "" ? (
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={image}
                                            alt={userName}
                                            sx={{ borderRadius: 1 }}
                                        />
                                    ) : (
                                        ""
                                    )}
                                    <Stack
                                        direction={{ xs: "column", sm: "row" }}
                                        spacing={3}
                                    ></Stack>
                                    <Stack
                                        direction="row"
                                        spacing={3}
                                        justifyContent="flex-end"
                                    >
                                        <form onSubmit={(e) => handleSubmit(e)}>
                                            <label htmlFor="contained-button-file">
                                                <Input
                                                    accept="image/*"
                                                    id="contained-button-file"
                                                    multiple
                                                    type="file"
                                                    onChange={(e) =>
                                                        handleFile(e)
                                                    }
                                                />
                                                <Button
                                                    variant="contained"
                                                    component="span"
                                                    startIcon={<PhotoCamera />}
                                                >
                                                    Upload
                                                </Button>
                                            </label>
                                            <Button
                                                variant="contained"
                                                component="span"
                                                type="submit"
                                            >
                                                Send
                                            </Button>
                                        </form>
                                    </Stack>
                                </Stack>
                            </Dialog>

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
