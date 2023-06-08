import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";

import AuthProvider from "./providers/AuthContext";
import NotificationsProvider from "./providers/NotificationsContext";
import { SnackbarProvider } from "notistack";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Listing from "./pages/Listing";
import Upload from "./pages/Upload";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import Collab from "./pages/Collab";
import Settings from "./pages/Settings";

import main from "./themes/main";
import "./styles/index.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <NotificationsProvider>
        <SnackbarProvider maxSnack={3} preventDuplicate>
            <AuthProvider>
                <BrowserRouter>
                    <ThemeProvider theme={main}>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Login />} />
                            <Route path="/listing" element={<Listing />} />
                            <Route path="/upload" element={<Upload />} />
                            <Route path="/profile/:id" element={<Profile />} />
                            <Route path="/admin" element={<Admin />} />
                            <Route path="/collab/:id" element={<Collab />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="*" element={<Home />} />
                        </Routes>
                    </ThemeProvider>
                </BrowserRouter>
            </AuthProvider>
        </SnackbarProvider>
    </NotificationsProvider>
);
