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
	const [signup, setSignUp] = useState(
		window.location.pathname.includes("signup")
	);
	const [loading, setLoading] = useState(false);
	const loginContext = useContext(AuthContext);
	const { login, logout } = useContext(AuthContext);
	const snackbar = useSnackbar();
	const [showPassword, setShowPassword] = useState(false);
	const [passwordMatch, setPasswordMatch] = useState(true);
	const [data, setData] = useState({
        email:"",
		username: "",
		password: "",
		confirmPassword: "",
        phone:"",
	});
	const navigate = useNavigate();

	function goTo(path: string) {
		navigate(path);
	}

	function switchFormType() {
		const defaultData = {
            email:"",
			username: "",
            phone:"",
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
				<div className="title">Log-In</div>
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
					label="Password"
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
					Log-in
				</Button>
				<p className="switch-type">
					Are you new here?{" "}
					<span className="switch-link" onClick={switchFormType}>
						Create an account!
					</span>
				</p>
			</>
		);
	}

	function SignUpOptions() {
		return (
			<>
				<div className="title">Sign-Up</div>
				<div
					className={
						passwordMatch
							? "password-match-alert"
							: "password-match-alert visible"
					}>
					<Error></Error>
					<p>Passwords must match</p>
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
                        label="Username"
                        variant="outlined"
                        defaultValue={data.username}
                        onInput={(ev: any) => {
                            data.username = ev.target.value;
                            setData(data);
                        }}
                    />
                    <TextField
                        type={showPassword ? "text" : "password"}
                        label="Password"
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
                        label="Confirm Password"
                        variant="outlined"
                        defaultValue={data.confirmPassword}
                        onInput={(ev: any) => {
                            data.confirmPassword = ev.target.value;
                            setData(data);
                            //setPasswordMatch(ev.target.value == data.password);
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
                        label="Phone Number"
                        variant="outlined"
                        defaultValue={data.phone}
                        onInput={(ev: any) => {
                            data.phone = ev.target.value;
                            setData(data);
                        }}
                    />
                </ThemeProvider>
				<Button variant="contained" onClick={registerUser}>
					Sign-Up
				</Button>
				<p className="switch-type" onClick={switchFormType}>
					Already have an account?{" "}
					<span className="switch-link" onClick={switchFormType}>
						Log-In here!
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
			</div>)
            : <Navigate to="/" />}
		</>
	);
}
