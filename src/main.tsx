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
import Collab from "./pages/Collab";
import YourCollabs from "./pages/YourCollabs";
import Settings from "./pages/Settings";

// admin
import ProviderRequests from "./pages/ProviderRequests";
import Reports from "./pages/Reports";
import AdminUserListing from "./pages/AdminUserListing";

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
                            <Route path="/requests" element={<ProviderRequests />} />
                            <Route path="/reports" element={<Reports />} />
                            <Route path="/admin/users" element={<AdminUserListing />} />
                            <Route path="/collab/:id" element={<Collab />} />
                            <Route path="/yourCollabs" element={<YourCollabs />} />
                            <Route path="/settings" element={<Settings />} />
                            <Route path="*" element={<Home />} />
                        </Routes>
                    </ThemeProvider>
                </BrowserRouter>
            </AuthProvider>
        </SnackbarProvider>
    </NotificationsProvider>
);
