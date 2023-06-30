import Navbar from "../components/global/Navbar";
import NotificationsSidebar from "../components/global/NotificationsSidebar";
import HomeSlideshow from "../components/home/HomeSlideshow";

import "../styles/pages/Home.scss";

export default function Home() {
    return (
        <div className="home">
            <Navbar />
            <NotificationsSidebar />
            <div className="home-content">
                <HomeSlideshow />
            </div>
        </div>
    );
}
