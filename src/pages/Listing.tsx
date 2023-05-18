import Navbar from "../components/global/Navbar";

import ProfileSelector from "../components/global/listing/ProfileSelector";

import "../styles/pages/listing.scss";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";

export default function listing() {
    /*const [user, setUser] = useState<any>(null);*/

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

    /*useEffect(() => {
        setUser(testUser);
    }, []);*/

    return (
        <>
            <Navbar />
            <div className="listing-layout">
                <div className="listing">
                    <div className="listing-search">
                        <div className="listing-search-input">
                            <input type="text" placeholder="Search here " />
                            <div className="filters">
                                <label>
                                    <input type="checkbox" name="Photographe" />
                                    Photographe{" "}
                                </label>
                                <label>
                                    <input
                                        type="checkbox"
                                        name="Espace de fete "
                                    />
                                    Espace de fete{" "}
                                </label>
                                <label>
                                    <input type="checkbox" name="Band" />
                                    Band{" "}
                                </label>
                                <label>
                                    <input type="checkbox" name="Traiteur" />
                                    Traiteur{" "}
                                </label>
                            </div>
                        </div>
                        <Button className="filter-button" variant="contained">
                            Filtrer
                        </Button>
                    </div>
                    <div className="listing-profiles">
                        <ProfileSelector user={testUser} />
                        <ProfileSelector user={testUser} />
                        <ProfileSelector user={testUser} />
                        <ProfileSelector user={testUser} />
                        <ProfileSelector user={testUser} />
                    </div>
                </div>
            </div>
        </>
    );
}
