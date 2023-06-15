import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import { useSnackbar } from "notistack";

import Navbar from "../components/global/Navbar";
import NotificationsSidebar from "../components/global/NotificationsSidebar";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import CollabDescription from "../components/collab/CollabDescription";
import CollabUserSelector from "../components/collab/CollabUserSelector";

import { Typography, Alert, Button } from "@mui/material";
import { LocalOffer, CheckCircle, DoDisturb } from "@mui/icons-material";

import "./../styles/pages/Collab.scss";

export default function Collab() {
    const { id } = useParams();
    const { login } = useContext(AuthContext);
    const { enqueueSnackbar } = useSnackbar();
    const [collab, setCollab] = useState<any>(null);
    const [users, setUsers] = useState<any>(null);

    const handleInviteResponse = (e: any) => {
        const status = e.target.id;

        fetch(`/api/collabs/${id}/respond`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: login.accountToken,
            },
            body: JSON.stringify({
                status,
            }),
        })
            .then((r) => r.json())
            .then((r) => {
                if (r.status !== 200) {
                    enqueueSnackbar(r.message, {
                        variant: "error",
                    });
                    return;
                }

                enqueueSnackbar(`Invitation ${status === "accepted" ? "acceptée" : "refusée"}!`, {
                    variant: "success",
                });

                setCollab(r.data);
                setUsers(r.data.users);
            });
    };

    useEffect(() => {
        fetch(`/api/collabs/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setCollab(data.data);
                setUsers(data.data.users);
            });
    }, [id]);

    if (collab === null)
        return (
            <>
                <Navbar />
                <NotificationsSidebar />
                <LoadingPage />
            </>
        );

    if (collab === undefined)
        return (
            <>
                <Navbar />
                <NotificationsSidebar />
                <ErrorPage text="Cet collab n'existe pas..." />
            </>
        );

    return (
        <>
            <Navbar />
            <NotificationsSidebar />
            <div className="collab-layout">
                <div className="collab">
                    <div className="collab-header">
                        <LocalOffer className="collab-icon" />
                        <Typography
                            variant="h4"
                            component="div"
                            className="collab-name"
                            margin={"auto"}>
                            {collab.name}
                        </Typography>
                    </div>
                    <div className="collab-users">
                        {users?.map((user) => {
                            return (
                                <CollabUserSelector
                                    user={user}
                                    key={user._id}
                                    hidden={collab.hidden}
                                />
                            );
                        })}
                    </div>
                    <div className="collab-body">
                        {collab.hidden &&
                            collab.users.find((user: any) => user.userId === login._id) && (
                                <div className="collab-actions">
                                    <Alert
                                        variant="filled"
                                        severity="warning"
                                        sx={{ marginBottom: "1em" }}>
                                        cette collaboration est actuellement masquée, elle sera
                                        publique une fois que tous les collaborateurs auront accepté
                                        leur invitation
                                    </Alert>
                                    {collab.users[0].userId !== login._id && (
                                        <div className="collab-action-buttons">
                                            <Button
                                                disabled={
                                                    collab.users.find(
                                                        (user: any) =>
                                                            user.userId === login._id &&
                                                            user.status === "pending"
                                                    ) === undefined
                                                }
                                                variant="contained"
                                                color="success"
                                                id="accepted"
                                                startIcon={<CheckCircle />}
                                                onClick={handleInviteResponse}>
                                                accepter l'invitation
                                            </Button>
                                            <Button
                                                disabled={
                                                    collab.users.find(
                                                        (user: any) =>
                                                            user.userId === login._id &&
                                                            user.status === "pending"
                                                    ) === undefined
                                                }
                                                variant="contained"
                                                color="error"
                                                id="rejected"
                                                startIcon={<DoDisturb />}
                                                onClick={handleInviteResponse}>
                                                rejeter l'invitation
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            )}
                        <CollabDescription desc={collab.description} />
                    </div>
                </div>
            </div>
        </>
    );
}
