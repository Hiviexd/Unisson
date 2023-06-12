import Navbar from "../components/global/Navbar";
import NotificationsSidebar from "../components/global/NotificationsSidebar";

import ProfileSelector from "../components/listing/ProfileSelector";
import Search from "../components/listing/Search";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";

import "../styles/pages/listing.scss";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";

export default function listing() {
    const [users, setUsers] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetch(`/api/users/listing/get?page=${page}`)
            .then((r) => r.json())
            .then((d) => {
                setUsers(d.data.users);
                setTotalPages(d.data.totalPages);
            });
    }, []);

    function refreshListing() {
        fetch(`/api/users/listing/get?page=${page}`)
            .then((r) => r.json())
            .then((d) => {
                setUsers(d.data.users);
                setTotalPages(d.data.totalPages);
            });
    }

    if (users === null)
        return (
            <>
                <Navbar />
                <NotificationsSidebar />
                <LoadingPage />
            </>
        );

    return (
        <>
            <Navbar />
            <NotificationsSidebar />
            <div className="listing-layout">
                <div className="listing">
                    <Search setUsers={setUsers} setTotalPages={setTotalPages} />
                    {users.length == 0 ? (
                        <ErrorPage text="Pas de résultats..." />
                    ) : (
                        <div className="listing-profiles">
                            {users.map((user) => {
                                return <ProfileSelector user={user} key={user._id} />;
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
