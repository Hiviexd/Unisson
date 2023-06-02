import { useState, useEffect } from "react";

import Navbar from "../components/global/Navbar";
import NotificationsSidebar from "../components/global/NotificationsSidebar";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";

import { Pagination } from "@mui/material";

//import '../styles/pages/Admin.scss';

export default function Admin() {
    const [messages, setMessages] = useState(null);
    const [tab, setTab] = useState("request");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    function getMessages(type: string) {
        fetch(`/api/admin/messages/listing/get?page=${page}&type=${type}`)
            .then((r) => r.json())
            .then((d) => {
                setMessages(d.data.messages);
                setTotalPages(d.data.totalPages);
            });
    }

    function handlePageChange(event: any, value: any) {
        setPage(value);
        getMessages(tab);
    }

    useEffect(() => {
        setPage(1);
        getMessages(tab);
    }, [tab]);

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
                <ErrorPage text="No messages..." />
            </>
        );

    return (
        <>
            <Navbar />
            <NotificationsSidebar />
            <div className="admin-page">
                <div className="admin-layout">
                    <div className="admin-header">
                        <div
                            className={`admin-header-button ${
                                tab === "request" ? "active" : ""
                            }`}
                            onClick={() => {
                                setTab("request");
                                getMessages("request");
                            }}>
                            Requests
                        </div>
                        <div
                            className={`admin-header-button ${
                                tab === "report" ? "active" : ""
                            }`}
                            onClick={() => {
                                setTab("report");
                                getMessages("report");
                            }}>
                            Reports
                        </div>
                    </div>
                    <div className="admin-body">
                        {messages.map((message: any) => (
                            <div className="admin-body-message">
                                <div className="admin-body-message-header">
                                    <div className="admin-body-message-header-title">
                                        {message.username}
                                    </div>
                                    <div className="admin-body-message-header-date">
                                        {message.date}
                                    </div>
                                </div>
                                <div className="admin-body-message-content">
                                    {message.content}
                                </div>
                            </div>
                        ))}
                    </div>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePageChange}
                        variant="outlined"
                        shape="rounded"
                        className="admin-pagination"
                    />
                </div>
            </div>
        </>
    );
}
