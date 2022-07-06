import React from "react";
import Logo from "../assets/img/Logo.svg";

// MUI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

// React router
import { useNavigate } from "react-router-dom";

const CustomPaper = styled(Paper)(({ theme }) => ({
    marginTop: "4rem",
    padding: "4rem",
}));

const Input = styled(InputBase)(({ theme }) => ({
    backgroundColor: "#fafbfc",
    padding: "1rem 1.5rem",
    border: `1px solid #dfe1e6`,
    fontSize: "1.4rem",
    borderRadius: theme.shape.borderRadius,
}));

function Signup() {
    let navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        console.log("Sing up");

        navigate("/", { replace: true });
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ display: "flex", justifyContent: "center", mt: "5rem" }}>
                <img src={Logo} alt="Thullo logo" width="50%" />
            </Box>
            <CustomPaper>
                <form onSubmit={handleSignUp}>
                    <Stack direction="column" spacing={2}>
                        <Typography variant="h3">
                            Sign up for your account
                        </Typography>
                        <Input
                            placeholder="Enter email address"
                            fullWidth
                            required
                            type="email"
                        />
                        <Input
                            placeholder="Enter your email"
                            fullWidth
                            required
                            type="text"
                        />
                        <Input
                            placeholder="Enter a password"
                            type="password"
                            fullWidth
                            required
                        />
                        <Button variant="contained" fullWidth type="submit">
                            Sign up
                        </Button>
                    </Stack>
                </form>
            </CustomPaper>
        </Container>
    );
}

export default Signup;
