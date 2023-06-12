import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../providers/AuthContext";
import user from "../utils/user";

import Navbar from "../components/global/Navbar";
import NotificationsSidebar from "../components/global/NotificationsSidebar";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import Info from "../components/profile/Info";
import Description from "../components/profile/Description";
import ReviewListing from "../components/profile/ReviewListing";
import Gallery from "../components/profile/Gallery";
import BecomeProvider from "../components/profile/BecomeProvider";

import "./../styles/pages/Profile.scss";
export default function Profile() {
    const id = useParams<{ id: string }>().id;

    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [page, setPage] = useState(1);
    const { login } = useContext(AuthContext);

    useEffect(() => {
        fetch(`/api/users/${id}`)
            .then((res) => res.json())
            .then((d) => {
                setSelectedUser(d.data);
            });
    }, [id]);

    if (selectedUser === null)
        return (
            <>
                <Navbar />
                <NotificationsSidebar />
                <LoadingPage />
            </>
        );

    if (selectedUser === undefined)
        return (
            <>
                <Navbar />
                <NotificationsSidebar />
                <ErrorPage text="Utilisateur pas trouvé..." />
            </>
        );

    return (
        <>
            <Navbar />
            <NotificationsSidebar />
            <div className="profile-layout">
                <div className="profile">
                    <Info user={selectedUser} />
                    <div className="profile-body">
                        {login._id === selectedUser._id && !user.isProvider(login) ? (
                            <BecomeProvider />
                        ) : (
                            <>
                                <Description desc={selectedUser?.description} />
                                <Gallery userId={selectedUser?._id} loggedInUser={login} />
                                <ReviewListing userId={selectedUser?._id} />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
