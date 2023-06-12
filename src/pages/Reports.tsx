import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthContext";

import Navbar from "../components/global/Navbar";
import NotificationsSidebar from "../components/global/NotificationsSidebar";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import MessageCard from "../components/admin/MessageCard";
import AdminReport from "../components/dialogs/AdminReport";
import AdminProviderRequest from "../components/dialogs/AdminProviderRequest";

import { Pagination, Typography } from "@mui/material";
import { Report } from "@mui/icons-material";

import "../styles/pages/Admin.scss";

export default function ProviderRequest() {
    const [messages, setMessages] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { login } = useContext(AuthContext);

    function getMessages() {
        fetch(`/api/admin/messages/listing/get?page=${page}&type=report`, {
            method: "GET",
            headers: {
                authorization: login.accountToken,
            },
        })
            .then((r) => r.json())
            .then((d) => {
                setMessages(d.data.messages);
                setTotalPages(d.data.totalPages);
            });
    }

    function handlePageChange(event: any, value: any) {
        setPage(value);
        getMessages();
    }

    useEffect(() => {
        setPage(1);
        getMessages();
    }, []);

    if (messages === null)
        return (
            <>
                <Navbar />
                <NotificationsSidebar />
                <LoadingPage />
            </>
        );

    if (messages === undefined)
        return (
            <>
                <Navbar />
                <NotificationsSidebar />
                <ErrorPage text="Pas de messages..." />
            </>
        );

    return (
        <>
            <Navbar />
            <NotificationsSidebar />
            <div className="admin-layout">
                <div className="admin-page">
                    <div className="admin-header">
                        <Report className="icon" />
                        <Typography color="text.secondary" variant="h5" component="div">
                            Signalements
                        </Typography>
                    </div>
                    <div className="admin-body">
                        {messages.map((message: any) => (
                            <AdminReport report={message} key={message._id} />
                        ))}
                    </div>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        color="primary"
                        size="small"
                    />
                </div>
            </div>
        </>
    );
}
