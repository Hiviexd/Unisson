import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";

import Navbar from "../components/global/Navbar";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import Info from "../components/profile/Info";
import Description from "../components/profile/Description";
import ReviewListing from "../components/profile/ReviewListing";
import Gallery from "../components/profile/Gallery";

import "./../styles/pages/Profile.scss";
export default function Profile() {
    const id = useParams<{ id: string }>().id;

    const [user, setUser] = useState<any>(null);
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetch(`/api/users/${id}`)
            .then((res) => res.json())
            .then((d) => {
                setUser(d.data);
            });
    }, [id]);

    if (user === null)
        return (
            <>
                <Navbar />
                <LoadingPage />
            </>
        );

    if (user === undefined)
        return (
            <>
                <Navbar />
                <ErrorPage text="We looked hard, but we can't find this user sadly..." />
            </>
        );

    return (
        <>
            <Navbar />
            <div className="profile-layout">
                <div className="profile">
                    <div className="profile-header">
                        <Info user={user} />
                    </div>
                    <div className="profile-body">
                        <div className="profile-body-pagination">
                            <div
                                className={`profile-body-pagination-button ${
                                    page === 1 ? "active" : ""
                                }`}
                                onClick={() => setPage(1)}>
                                Info
                            </div>
                            <div
                                className={`profile-body-pagination-button ${
                                    page === 2 ? "active" : ""
                                }`}
                                onClick={() => setPage(2)}>
                                Gallery
                            </div>
                            <div
                                className={`profile-body-pagination-button ${
                                    page === 3 ? "active" : ""
                                }`}
                                onClick={() => setPage(3)}>
                                Reviews
                            </div>
                        </div>
                        {page === 1 && <Description desc={user?.description} />}
                        {page === 2 && <Gallery userId={user?._id} />}
                        {page === 3 && <ReviewListing userId={user?._id} />}
                    </div>
                </div>
            </div>
        </>
    );
}
