import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthContext";

import Navbar from "../components/global/Navbar";
import NotificationsSidebar from "../components/global/NotificationsSidebar";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import CollabSelector from "../components/collab/CollabSelector";
import CollabCreate from "../components/dialogs/collab/CollabCreate";

import { IconButton, TextField, Typography, Pagination } from "@mui/material";
import { Groups } from "@mui/icons-material";

import "../styles/pages/YourCollabs.scss";

export default function YourCollabs() {
    const { login } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [collabs, setCollabs] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetch(`/api/collabs/listing/yourCollabs?page=1`, {
            method: "GET",
            headers: {
                authorization: login.accountToken,
            },
        })
            .then((r) => r.json())
            .then((d) => {
                setCollabs(d.data.collabs);
                setTotalPages(d.data.totalPages);
                setLoading(false);
            });
    }, []);

    function refreshListing() {
        setLoading(true);
        fetch(`/api/collabs/listing/yourCollabs?page=${page}`, {
            method: "GET",
            headers: {
                authorization: login.accountToken,
            },
        })
            .then((r) => r.json())
            .then((d) => {
                setCollabs(d.data.collabs);
                setTotalPages(d.data.totalPages);
                setLoading(false);
            });
    }

    function handlePageChange(event: any, value: number) {
        setPage(value);
        refreshListing();
    }

    if (collabs === null)
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
            <div className="your-collabs-layout">
                <div className="your-collabs-page">
                    <div className="your-collabs-header">
                        <Groups className="icon" />
                        <Typography color="text.secondary" variant="h5" component="div">
                            Votre Collaborations
                        </Typography>
                    </div>
                    <div className="your-collabs-body">
                        <CollabCreate collabs={collabs} setCollabs={setCollabs} />
                        {collabs.length == 0 ? (
                            <ErrorPage text="Pas de résultats..." />
                        ) : (
                            <div className="listing-profiles">
                                {loading && <LoadingPage />}
                                {!loading &&
                                    collabs.map((collab) => {
                                        return <CollabSelector collab={collab} key={collab._id} />;
                                    })}
                            </div>
                        )}
                        <div className="profile-body-reviews-pagination">
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={handlePageChange}
                                color="primary"
                                size="small"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
