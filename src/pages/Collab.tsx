import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/global/Navbar";
import NotificationsSidebar from "../components/global/NotificationsSidebar";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import CollabDescription from "../components/collab/CollabDescription";
import CollabUserSelector from "../components/collab/CollabUserSelector";

import { Typography } from "@mui/material";
import { LocalOffer } from "@mui/icons-material";

import "./../styles/pages/Collab.scss";

export default function Collab() {
    const { id } = useParams();
    const [collab, setCollab] = useState<any>(null);
    const [users, setUsers] = useState<any>(null);

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
                <ErrorPage text="This collab doesn't exist..." />
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
                            return <CollabUserSelector user={user} key={user._id} />;
                        })}
                    </div>
                    <div className="collab-body">
                        <CollabDescription desc={collab.description} />
                    </div>
                </div>
            </div>
        </>
    );
}
