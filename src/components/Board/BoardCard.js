import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Typography";
import { deepOrange, deepPurple } from "@mui/material/colors";

function BoardCard({ id, title, image_url }) {
    return (
        <Card sx={{ maxWidth: 345, padding: "1rem", cursor: "pointer" }}>
            <CardMedia
                component="img"
                height="140"
                image={image_url}
                alt={title}
                sx={{ borderRadius: 1 }}
            />

            <Typography
                gutterBottom
                variant="h3"
                component="div"
                sx={{ fontWeight: 500, mt: "1rem" }}
            >
                {title}
            </Typography>
        </Card>
    );
}

export default BoardCard;
