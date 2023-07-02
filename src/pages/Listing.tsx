import Navbar from "../components/global/Navbar";
import NotificationsSidebar from "../components/global/NotificationsSidebar";

import ProfileSelector from "../components/listing/ProfileSelector";
import CollabSelector from "../components/collab/CollabSelector";
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
    const [listingType, setListingType] = useState("services");

    useEffect(() => {
        fetch(`/api/users/listing/get?page=${page}`)
            .then((r) => r.json())
            .then((d) => {
                setUsers(d.data.users);
                setTotalPages(d.data.totalPages);
            });
    }, []);

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
                    <Search
                        setUsers={setUsers}
                        setTotalPages={setTotalPages}
                        type={listingType}
                        setType={setListingType}
                    />
                    {users.length == 0 ? (
                        <ErrorPage text="Pas de résultats..." />
                    ) : (
                        <div className="listing-profiles">
                            {users.map((user) => {
                                return listingType === "services" ? (
                                    <ProfileSelector user={user} key={user._id} />
                                ) : (
                                    <CollabSelector collab={user} key={user._id} />
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
