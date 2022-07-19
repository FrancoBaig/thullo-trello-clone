import React from "react";

// MUI
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";

function BoardCard({ id, title, image_url }) {
    return (
        <Card
            sx={{
                minWidth: 220,
                padding: "1rem",
                cursor: "pointer",
            }}
        >
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
