import React, { useState } from "react";
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
import Divider from "@mui/material/Divider";

// Redux
import { useDispatch } from "react-redux";
import { loginUser, signUpUser } from "../features/User/userSlice";

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
    const dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (isLogin) {
            const dataLogin = {
                email,
                password,
            };

            dispatch(loginUser(dataLogin));
        } else {
            const dataSignUp = {
                email,
                password,
                name,
            };

            dispatch(signUpUser(dataSignUp));
            dispatch(loginUser({ email, password }));
        }

        setEmail("");
        setName("");
        setPassword("");
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
                        <Typography variant="h1" component="h3">
                            {!isLogin
                                ? "Sign up for your account"
                                : "Sign in to your account "}
                        </Typography>
                        <Input
                            placeholder="Email"
                            fullWidth
                            required
                            type="email"
                            onChange={({ target }) => setEmail(target.value)}
                        />
                        {!isLogin ? (
                            <Input
                                placeholder="Name"
                                fullWidth
                                required
                                type="text"
                                onChange={({ target }) => setName(target.value)}
                            />
                        ) : (
                            ""
                        )}
                        <Input
                            placeholder="Password"
                            type="password"
                            fullWidth
                            required
                            onChange={({ target }) => setPassword(target.value)}
                        />
                        <Button variant="contained" fullWidth type="submit">
                            {!isLogin ? "Sign up" : "Log in"}
                        </Button>
                    </Stack>
                </form>
                <Stack spacing={1} sx={{ mt: 2 }} justifyContent="center">
                    <Divider />
                    <Typography variant="h4">
                        {!isLogin
                            ? "Have an account?"
                            : "Don't have an account?"}{" "}
                        <span
                            style={{ color: "#2f80ed", cursor: "pointer" }}
                            onClick={() => setIsLogin(!isLogin)}
                        >
                            {!isLogin ? "Log in" : "Sign up"}
                        </span>
                    </Typography>
                </Stack>
            </CustomPaper>
        </Container>
    );
}

export default Signup;
