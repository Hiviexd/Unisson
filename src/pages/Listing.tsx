import Navbar from "../components/global/Navbar";

import ProfileSelector from "../components/global/listing/ProfileSelector";
import Search from "../components/global/listing/Search";

import "../styles/pages/listing.scss";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";

export default function listing() {
    const [user, setUser] = useState({});

    const testUser = {
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
    }, []);

    return (
        <>
            <Navbar />
            <div className="listing-layout">
                <div className="listing">
                    <Search />
                    <div className="listing-profiles">
                        <ProfileSelector user={user} />
                        <ProfileSelector user={user} />
                        <ProfileSelector user={user} />
                        <ProfileSelector user={user} />
                        <ProfileSelector user={user} />
                    </div>
                </div>
            </div>
        </>
    );
}
