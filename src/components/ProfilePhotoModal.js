import React, { useState } from "react";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { changePhoto } from "../features/User/userSlice";

// MUI
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

const Input = styled("input")({
    display: "none",
});

function ProfilePhotoModal({ open, setOpen }) {
    const dispatch = useDispatch();
    const [file, setFile] = useState("");
    const [image, setImage] = useState("");
    const [errorSize, setErrorSize] = useState(false);
    const state = useSelector((state) => state.user);
    const userName = state.user.name;

    const handleFile = (e) => {
        const file = e.target.files[0];
        setFile("");
        setImage("");
        setErrorSize(false);

        if (file.size > 100000) {
            setErrorSize(true);
        } else {
            setFile(file);
            previewFiles(file);
        }
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
                    {errorSize ? (
                        <Typography variant="h5" color="error" sx={{ mb: 1 }}>
                            Image too big
                        </Typography>
                    ) : (
                        ""
                    )}
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
                            disabled={image === "" || errorSize}
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
