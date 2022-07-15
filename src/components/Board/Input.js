import React from "react";

import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputBase from "@mui/material/InputBase";

const CustomInput = styled(InputBase)(({ theme }) => ({
    backgroundColor: "#fafbfc",
    padding: "1rem 1.5rem",
    border: `1px solid #dfe1e6`,
    fontSize: "1.4rem",

    borderRadius: theme.shape.borderRadius,
}));

function Input({ input, setInput, handleOnClick }) {
    return (
        <Stack direction="row" spacing={1}>
            <CustomInput
                placeholder="title..."
                value={input}
                onChange={({ target }) => setInput(target.value)}
            />

            <Button
                variant="contained"
                color="success"
                size="small"
                sx={{
                    padding: "1rem",
                }}
                onClick={() => handleOnClick()}
            >
                Save
            </Button>
        </Stack>
    );
}

export default Input;
