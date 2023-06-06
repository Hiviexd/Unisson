import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/global/Navbar";
import NotificationsSidebar from "../components/global/NotificationsSidebar";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import Description from "../components/profile/Description";
import ProfileSelector from "../components/global/listing/ProfileSelector";

import { Typography } from "@mui/material";

//import "./../styles/pages/Collab.scss";

export default function Collab() {
    const { id } = useParams();
    const [collab, setCollab] = useState<any>(null);
    const [users, setUsers] = useState<any>(null);

    useEffect(() => {
        fetch(`/api/collabs/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setCollab(data.data);
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
                        <Typography variant="h4" component="div">
                            {collab.name}
                        </Typography>
                        <div className="collab-header-users">
                            {users.map((user) => {
                                return <ProfileSelector user={user} key={user._id} />;
                            })}
                        </div>
                    </div>
                    <div className="collab-body">
                        <Description desc={collab.description} />
                    </div>
                </div>
            </div>
        </>
    );
}
