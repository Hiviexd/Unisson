import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthContext";

import Navbar from "../components/global/Navbar";
import NotificationsSidebar from "../components/global/NotificationsSidebar";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import MessageCard from "../components/admin/MessageCard";
import AdminReport from "../components/dialogs/AdminReport";
import AdminProviderRequest from "../components/dialogs/AdminProviderRequest";

import { Pagination } from "@mui/material";
import { ContentPasteGo, Report } from "@mui/icons-material";

import "../styles/pages/Admin.scss";

export default function Admin() {
    const [messages, setMessages] = useState(null);
    const [tab, setTab] = useState("request");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { login } = useContext(AuthContext);

    function getMessages(type: string) {
        fetch(`/api/admin/messages/listing/get?page=${page}&type=${type}`, {
            method: "GET",
            headers: {
                authorization: login.accountToken,
            },
        })
            .then((r) => r.json())
            .then((d) => {
                setMessages(d.data.messages);
                console.log(d.data.messages);
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
                <ErrorPage text="No messages..." />
            </>
        );

    return (
        <>
            <Navbar />
            <NotificationsSidebar />
            <div className="admin-layout">
                <div className="admin-page">
                    <div className="admin-pagination">
                        <div
                            className={`admin-pagination-button ${
                                tab === "request" ? "active" : ""
                            }`}
                            onClick={() => {
                                setTab("request");
                                getMessages("request");
                            }}>
                            <ContentPasteGo className="icon" />
                            <span>Demandes Fournisseur</span>
                        </div>
                        <div
                            className={`admin-pagination-button ${
                                tab === "report" ? "active" : ""
                            }`}
                            onClick={() => {
                                setTab("report");
                                getMessages("report");
                            }}>
                            <Report className="icon" />
                            Problèmes
                        </div>
                    </div>
                    <div className="admin-body">
                        {messages.map((message: any) => (
                            <>
                                {tab === "request" ? (
                                    <AdminProviderRequest request={message} key={message._id} />
                                ) : (
                                    <AdminReport report={message} key={message._id} />
                                )}
                            </>
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
