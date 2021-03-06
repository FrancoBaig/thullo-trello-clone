import React, { useState } from "react";

// MUI
import ImageListItem from "@mui/material/ImageListItem";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import ImageIcon from "@mui/icons-material/Image";
import ImageList from "@mui/material/ImageList";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";

import SkeletonGrid from "./Skeleton";
import useUnsplash from "../services/unsplash";

const CoverButton = styled(Button)(({ theme }) => ({
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

function UnsplashModal({ setUrlCover }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [input, setInput] = useState("");

    const { data, loading, getData } = useUnsplash(
        `search/photos?page=1&per_page=12&query=office&client_id=${process.env.REACT_APP_ACCESS_KEY}`
    );

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleRequest = () => {
        getData(
            `search/photos?page=1&per_page=12&query=${input}&client_id=${process.env.REACT_APP_ACCESS_KEY}`
        );
        setInput("");
    };

    const handleSelectImage = (url) => {
        setUrlCover(url);
        setAnchorEl(null);
    };

    return (
        <div>
            <CoverButton
                variant="contained"
                color="secondary"
                startIcon={<ImageIcon />}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                fullWidth
                onClick={handleClick}
            >
                Cover
            </CoverButton>
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
                    <Typography variant="h1">Photo Search</Typography>
                    <Typography variant="h4" sx={{ color: "#828282" }}>
                        Search Unsplash for photos
                    </Typography>
                    <FormControl
                        sx={{
                            position: "relative",
                            width: "65ch",
                            height: "60%",
                        }}
                    >
                        <InputSearch
                            placeholder="Keywords..."
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
                    {!loading ? (
                        <ImageList
                            sx={{ width: 330 }}
                            gap={6}
                            cols={4}
                            rowHeight={60}
                            variant="masonry"
                        >
                            {data.map((item) => (
                                <ImageListItem
                                    key={item.id}
                                    onClick={() =>
                                        handleSelectImage(item.urls.small)
                                    }
                                >
                                    <img
                                        src={`${item.urls.thumb}`}
                                        srcSet={`${item.urls.thumb}`}
                                        alt={item.alt_description}
                                        style={{
                                            borderRadius: 4,
                                            cursor: "pointer",
                                            height: "unset",
                                        }}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    ) : (
                        <SkeletonGrid />
                    )}
                </Stack>
            </Menu>
        </div>
    );
}

export default UnsplashModal;
