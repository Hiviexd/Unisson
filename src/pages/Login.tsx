import { VisibilityOff, Visibility, Error } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField, ThemeProvider } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState, useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import Navbar from "../components/global/Navbar";
import theme from "../themes/login";
import "../styles/pages/Login.scss";

export default function Login() {
    const [signup, setSignUp] = useState(window.location.pathname.includes("signup"));
    const [loading, setLoading] = useState(false);
    const loginContext = useContext(AuthContext);
    const { login, logout } = useContext(AuthContext);
    const snackbar = useSnackbar();
    const [showPassword, setShowPassword] = useState(false);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [data, setData] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        phone: "",
    });
    const navigate = useNavigate();

    function goTo(path: string) {
        navigate(path);
    }

    function switchFormType() {
        const defaultData = {
            email: "",
            username: "",
            phone: "",
            password: "",
            confirmPassword: "",
        };

        setData(defaultData);
        setSignUp(!signup);
    }

    function handleClickShowPassword() {
        setShowPassword(!showPassword);
    }

    function loginUser() {
        setLoading(true);
        fetch("/api/users/login", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
            }),
        })
            .then((r) => r.json())
            .then((data) => {
                setLoading(false);

                if (data.status != 200)
                    return snackbar.enqueueSnackbar(data.message, {
                        variant: "error",
                    });

                loginContext.setLogin(data.data);
                goTo("/listing");
            });
    }

    function registerUser() {
        setLoading(true);
        fetch("/api/users/register", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                email: data.email,
                username: data.username.toString(),
                password: data.password.toString(),
                phone: data.phone,
            }),
        })
            .then((r) => r.json())
            .then((data) => {
                setLoading(false);
                if (data.status != 200)
                    return snackbar.enqueueSnackbar(data.message, {
                        variant: "error",
                    });

                loginContext.setLogin(data.data);
                goTo("/listing");
            });
    }

    function LogInOptions() {
        return (
            <>
                <div className="title">Se connecter</div>
                <TextField
                    type="text"
                    label="E-mail"
                    variant="outlined"
                    defaultValue={data.email}
                    onInput={(ev: any) => {
                        data.email = ev.target.value;
                        setData(data);
                    }}
                />
                <TextField
                    type={showPassword ? "text" : "password"}
                    label="Mot de passe"
                    variant="outlined"
                    onInput={(ev: any) => {
                        data.password = ev.target.value;
                        setData(data);
                    }}
                    defaultValue={data.password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <Button variant="contained" onClick={loginUser}>
                    Se connecter
                </Button>
                <p className="switch-type">
                    Vous n'avez pas de compte?{" "}
                    <span className="switch-link" onClick={switchFormType}>
                        Inscrivez-vous!
                    </span>
                </p>
            </>
        );
    }

    function SignUpOptions() {
        return (
            <>
                <div className="title">S'inscrire</div>
                <div
                    className={
                        passwordMatch ? "password-match-alert" : "password-match-alert visible"
                    }>
                    <Error sx={{ mr: 1 }} /> <p>Les mots de passe ne correspondent pas!</p>
                </div>
                <ThemeProvider theme={theme}>
                    <TextField
                        type="text"
                        label="E-mail"
                        variant="outlined"
                        defaultValue={data.email}
                        onInput={(ev: any) => {
                            data.email = ev.target.value;
                            setData(data);
                        }}
                    />
                    <TextField
                        type="text"
                        label="Nom d'utilisateur"
                        variant="outlined"
                        defaultValue={data.username}
                        onInput={(ev: any) => {
                            data.username = ev.target.value;
                            setData(data);
                        }}
                    />
                    <TextField
                        type={showPassword ? "text" : "password"}
                        label="Mot de passe"
                        variant="outlined"
                        onInput={(ev: any) => {
                            data.password = ev.target.value;
                            setData(data);
                        }}
                        defaultValue={data.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        type={showPassword ? "text" : "password"}
                        label="Confirmer mot de passe"
                        variant="outlined"
                        defaultValue={data.confirmPassword}
                        onInput={(ev: any) => {
                            data.confirmPassword = ev.target.value;
                            setData(data);
                        }}
                        onBlur={() => {
                            setPasswordMatch(data.confirmPassword == data.password);
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        type="number"
                        label="Numéro de téléphone"
                        variant="outlined"
                        defaultValue={data.phone}
                        onInput={(ev: any) => {
                            data.phone = ev.target.value;
                            setData(data);
                        }}
                    />
                </ThemeProvider>
                <Button variant="contained" onClick={registerUser}>
                    S'inscrire
                </Button>
                <p className="switch-type" onClick={switchFormType}>
                    Vous avez déjà un compte?{" "}
                    <span className="switch-link" onClick={switchFormType}>
                        Connectez-vous!
                    </span>
                </p>
            </>
        );
    }

    return (
        <>
            <Navbar />
            {!login.authenticated ? (
                <div className="log__in__layout">
                    <div className={loading ? "form loading" : "form"}>
                        {signup ? <SignUpOptions /> : <LogInOptions />}
                    </div>
                </div>
            ) : (
                <Navigate to="/" />
            )}
        </>
    );
}
