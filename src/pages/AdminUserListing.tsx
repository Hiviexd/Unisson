import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthContext";

import Navbar from "../components/global/Navbar";
import NotificationsSidebar from "../components/global/NotificationsSidebar";
import AdminUserSelector from "../components/admin/AdminUserSelector";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";

import { IconButton, TextField, Typography, Pagination } from "@mui/material";
import { PeopleAlt, Search } from "@mui/icons-material";

import "../styles/pages/AdminUserListing.scss";

export default function AdminUserListing() {
    const { login } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(null);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        fetch(`/api/users/listing/get/all?page=1`, {
            method: "GET",
            headers: {
                authorization: login.accountToken,
            },
        })
            .then((r) => r.json())
            .then((d) => {
                setUsers(d.data.users);
                setTotalPages(d.data.totalPages);
                setLoading(false);
            });
    }, []);

    function refreshListing() {
        setLoading(true);
        fetch(`/api/users/listing/get/all?page=${page}`, {
            method: "GET",
            headers: {
                authorization: login.accountToken,
            },
        })
            .then((r) => r.json())
            .then((d) => {
                setUsers(d.data.users);
                setTotalPages(d.data.totalPages);
                setLoading(false);
            });
    }

    function handlePageChange(event: any, value: number) {
        setPage(value);
        refreshListing();
    }

    const handleSearch = (e: any) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = (e: any) => {
        e.preventDefault();
        setLoading(true);
        fetch(`/api/users/listing/get/all?page=1&search=${search}`, {
            method: "GET",
            headers: {
                authorization: login.accountToken,
            },
        })
            .then((r) => r.json())
            .then((d) => {
                setUsers(d.data.users);
                setTotalPages(d.data.totalPages);
                setLoading(false);
            });
    };

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
            <div className="admin-user-layout">
                <div className="admin-user-page">
                    <div className="admin-user-header">
                        <PeopleAlt className="icon" />
                        <Typography color="text.secondary" variant="h5" component="div">
                            Tous les utilisateurs
                        </Typography>
                    </div>
                    <div className="admin-user-body">
                        <div className="search-bar">
                            <TextField
                                className="search-bar-input"
                                label="Rechercher un utilisateur"
                                variant="outlined"
                                onChange={handleSearch}
                            />
                            <IconButton onClick={handleSearchSubmit}>
                                <Search />
                            </IconButton>
                        </div>
                        {users.length == 0 ? (
                            <ErrorPage text="Pas de résultats..." />
                        ) : (
                            <div className="listing-profiles">
                                {loading && <LoadingPage />}
                                {!loading &&
                                    users.map((user) => {
                                        return <AdminUserSelector user={user} key={user._id} />;
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
