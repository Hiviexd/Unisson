import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom"
import moment from "moment";

import Navbar from "../components/global/Navbar";
import ErrorPage from "./ErrorPage";
import LoadingPage from "./LoadingPage";
import Info from "../components/profile/Info";
import Description from "../components/profile/Description";;

import "./../styles/pages/Profile.scss";
;

export default function Profile() {
    const id = useParams<{ id: string }>().id;

    const [user, setUser] = useState<any>(null);

    const testUser = {
        username: "Achraf Maalel Photographie",
        email: "johndoe@gmail.com",
        bio: "Contact me to schedule your session and let's create something beautiful together!",
        description:
            "ed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
        phone: 97123456,
        permissions: ["provider", "user"],
        serviceType: "photographe",
        rating: 3.5,
    };

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
                        <Description desc={user?.bio} />
                    </div>
                </div>
            </div>
        </>
    );
}
