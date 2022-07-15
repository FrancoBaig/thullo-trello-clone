import React, { useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { changePhoto } from "../features/User/userSlice";

import Dialog from "@mui/material/Dialog";
import Stack from "@mui/material/Stack";
import CardMedia from "@mui/material/CardMedia";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Button from "@mui/material/Button";
import { alpha, styled } from "@mui/material/styles";

const Input = styled("input")({
    display: "none",
});

function ProfilePhotoModal({ open, setOpen }) {
    const dispatch = useDispatch();
    const [file, setFile] = useState("");
    const [image, setImage] = useState("");
    const state = useSelector((state) => state.user);
    const userName = state.user.name;

    const handleFile = (e) => {
        const file = e.target.files[0];
        setFile(file);
        previewFiles(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file) return;
        const data = {
            image: image,
            token: state.user.token,
        };
        dispatch(changePhoto(data));
        handleClose();
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
    return (
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

                <form onSubmit={(e) => handleSubmit(e)}>
                    <label htmlFor="contained-button-file">
                        <Input
                            accept="image/*"
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={(e) => handleFile(e)}
                            required
                        />
                        <Button
                            variant="contained"
                            component="span"
                            startIcon={<PhotoCamera />}
                            fullWidth
                        >
                            Upload
                        </Button>
                    </label>
                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ width: "100%", mt: "1rem" }}
                    >
                        <Button onClick={() => handleClose()} fullWidth>
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            fullWidth
                            type="submit"
                            onClick={(e) => handleSubmit(e)}
                            disabled={image == ""}
                        >
                            Send
                        </Button>
                    </Stack>
                </form>
            </Stack>
        </Dialog>
    );
}

export default ProfilePhotoModal;
