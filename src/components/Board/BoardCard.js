import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Typography";
import { deepOrange, deepPurple } from "@mui/material/colors";

function BoardCard({ id, title, image_url }) {
    return (
        <Card sx={{ maxWidth: 345, padding: "1rem" }}>
            <CardMedia
                component="img"
                height="140"
                image={image_url}
                alt={title}
                sx={{ borderRadius: 1 }}
            />
            <CardContent>
                <Typography gutterBottom variant="h3" component="div">
                    {title}
                </Typography>
            </CardContent>
            <Stack direction="row" spacing={2}>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
            </Stack>
        </Card>
    );
}

export default BoardCard;
