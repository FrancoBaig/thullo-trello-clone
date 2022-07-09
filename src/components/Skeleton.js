import React from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

const cant = Array(12).fill("");

function SkeletonGrid() {
    return (
        <Grid container spacing={1} sx={{ width: 330 }}>
            {cant.map((el) => (
                <Grid item xs={3}>
                    <Skeleton variant="rectangular" width={50} height={50} />
                </Grid>
            ))}
        </Grid>
    );
}

export default SkeletonGrid;
