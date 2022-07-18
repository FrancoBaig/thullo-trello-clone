import React, { useState } from "react";

// MUI
import Typography from "@mui/material/Typography";
import LabelIcon from "@mui/icons-material/Label";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";

// Redux
import { insertLabel } from "../../features/User/userSlice";
import { useDispatch, useSelector } from "react-redux";

const LabelButton = styled(Button)(({ theme }) => ({
    boxShadow: "none",
    padding: "1 2rem",
    fontSize: "1.4rem",
    textTransform: "capitalize",
    justifyContent: "flex-start",
    paddingLeft: "3rem",
    gap: "1rem",
    "&:hover": {
        color: theme.palette.primary.contrastText,
    },
    "& .MuiSvgIcon-fontSizeMedium": {
        fontSize: "1.4rem",
    },
}));

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

const colors = {
    red: "#EB5757",
    green: "#219653",
    yellow: "#F2C94C",
    orange: "#F2994A",
    purple: "#9B51E0",
    blue: "#2F80ED",
};

function LabelModal({ task }) {
    const dispatch = useDispatch();
    const actualBoard = useSelector((state) => state.user.actualBoard);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [input, setInput] = useState("");
    const [selected, setSelected] = useState("green");

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNewLabel = () => {
        if (input === "") return;
        const data = { task: task, text: input, color: selected };
        dispatch(insertLabel(data));
        setInput("");
        setSelected("");
        handleClose();
    };
    return (
        <div>
            <LabelButton
                variant="contained"
                color="secondary"
                startIcon={<LabelIcon />}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                fullWidth
                onClick={handleClick}
            >
                Label
            </LabelButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <Stack spacing={1} sx={{ padding: "2rem" }}>
                    <Typography variant="h1">Label</Typography>
                    <Typography variant="h4" sx={{ color: "#828282" }}>
                        Select a name and a color
                    </Typography>
                    <Stack
                        spacing={1}
                        sx={{
                            position: "relative",
                            width: "35ch",
                            height: "40%",
                        }}
                    >
                        <InputSearch
                            placeholder="Label..."
                            onChange={({ target }) => setInput(target.value)}
                            fullWidth
                            required
                        />
                        <Grid container justifyContent="center" spacing={1}>
                            {Object.keys(colors).map((key, ind) => (
                                <Grid item key={ind} xs={4}>
                                    <Box
                                        sx={{
                                            height: "50px",
                                            backgroundColor: colors[key],
                                            borderRadius: 1,
                                            color: "transparent",
                                            cursor: "pointer",
                                            border:
                                                key === selected
                                                    ? "2px solid black"
                                                    : "",
                                        }}
                                        onClick={() => setSelected(key)}
                                    ></Box>
                                </Grid>
                            ))}
                        </Grid>
                        <Button
                            variant="contained"
                            type="submit"
                            onClick={() => handleNewLabel()}
                        >
                            Add
                        </Button>
                    </Stack>
                </Stack>
            </Menu>
        </div>
    );
}

export default LabelModal;
