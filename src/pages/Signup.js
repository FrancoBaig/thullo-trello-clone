import React, { useState, useEffect } from "react";
import Logo from "../assets/img/Logo.svg";

// MUI
import LoadingButton from "@mui/lab/LoadingButton";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputBase from "@mui/material/InputBase";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

// Redux
import { loginUser, signUpUser } from "../features/User/userSlice";
import { setLoginError } from "../features/User/helperSlice";
import { useDispatch, useSelector } from "react-redux";

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
    const user = useSelector((state) => state.user.user);
    const helper = useSelector((state) => state.helper);
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (helper.loading.login) return;
        if (user.email === "") return;

        setEmail("");
        setName("");
        setPassword("");
        navigate("/", { replace: true });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [helper.loading.login, user]);

    useEffect(() => {
        if (!helper.success.signup) return;

        dispatch(setLoginError(""));
        setIsLogin(true);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [helper.success.signup]);

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
        }
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
                        {helper.error.login !== "" ? (
                            <Box>
                                <Typography
                                    variant="body1"
                                    color="error"
                                    sx={{ fontSize: "1.2rem", pl: ".3rem" }}
                                >
                                    {helper.error.login}
                                </Typography>
                            </Box>
                        ) : (
                            ""
                        )}
                        <LoadingButton
                            loading={helper.loading.login}
                            variant="contained"
                            fullWidth
                            type="submit"
                        >
                            {!isLogin ? "Sign up" : "Log in"}
                        </LoadingButton>
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
