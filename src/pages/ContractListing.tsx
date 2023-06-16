import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../providers/AuthContext";
import user from "../utils/user";

import Navbar from "../components/global/Navbar";
import NotificationsSidebar from "../components/global/NotificationsSidebar";
import LoadingPage from "./LoadingPage";
import ErrorPage from "./ErrorPage";
import ContractCard from "../components/contract/ContractCard";

import { Pagination, Typography } from "@mui/material";
import { ContentPasteSearch } from "@mui/icons-material";

import "../styles/pages/ContractListing.scss";

export default function ProviderRequest() {
    const [contracts, setContracts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { login } = useContext(AuthContext);

    function getMessages() {
        setLoading(true);
        fetch(
            `/api/contracts/listing?type=${
                !user.isProvider(login) ? "sent" : "received"
            }&page=${page}`,
            {
                method: "GET",
                headers: {
                    authorization: login.accountToken,
                },
            }
        )
            .then((r) => r.json())
            .then((d) => {
                setContracts(d.data.contracts);
                setTotalPages(d.data.totalPages);
                setLoading(false);
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

    if (contracts === null)
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
            <div className="contracts-layout">
                <div className="contracts-page">
                    <div className="contracts-header">
                        <ContentPasteSearch className="icon" />
                        <Typography color="text.secondary" variant="h5" component="div">
                            Votre contrats
                        </Typography>
                    </div>
                    {contracts.length === 0 ? (
                        <ErrorPage text="Pas de demandes..." />
                    ) : (
                        <div className="contracts-body">
                            {contracts.map((contract: any) => (
                                <ContractCard
                                    contract={contract}
                                    type={!user.isProvider(login) ? "sent" : "received"}
                                    key={contract._id}
                                />
                            ))}
                        </div>
                    )}
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
