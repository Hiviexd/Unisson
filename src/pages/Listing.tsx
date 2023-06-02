import Navbar from "../components/global/Navbar";
import NotificationsSidebar from "../components/global/NotificationsSidebar";

import ProfileSelector from "../components/global/listing/ProfileSelector";
import Search from "../components/global/listing/Search";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";

import "../styles/pages/listing.scss";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";

export default function listing() {
    const [users, setUsers] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    /*const testUser = {
        _id: "43f836617c",
        username: "Achraf Maalel Photographie",
        email: "johndoe@gmail.com",
        bio: "Contact me to schedule your session and let's create something beautiful together!",
        phone: 97123456,
        permissions: ["provider", "user"],
        serviceType: "espace",
        rating: 3.5,
        location: "Tunis",
    };

    useEffect(() => {
        setUser(testUser);
    }, []);*/

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
                    <Search />
                    {users.length == 0 ? (
                        <ErrorPage text="There's no results for your search..." />
                    ) : (
                        <div className="listing-profiles">
                            {users.map((user) => {
                                return <ProfileSelector user={user} />;
                            })}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
