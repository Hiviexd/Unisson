import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";

import AuthProvider from "./providers/AuthContext";
import { SnackbarProvider } from "notistack";

import Home from "./pages/Home";
import Login from "./pages/Login";

import main from "./themes/main";
import "./styles/index.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <SnackbarProvider maxSnack={3} preventDuplicate>
        <AuthProvider>
            <BrowserRouter>
                <ThemeProvider theme={main}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Login />} />
                        <Route path="*" element={<Home />} />
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </AuthProvider>
    </SnackbarProvider>
);
