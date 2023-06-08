import "../styles/pages/Home.scss";
import Navbar from "../components/global/Navbar";
import NotificationsSidebar from "../components/global/NotificationsSidebar";
import HomeMain from "../components/home/HomeMain";
import HomeContaine from "../components/home/HomeContaine";
import HomeDesc from "../components/home/HomeDesc";
import HomeInfo from "../components/home/HomeInfo";
import Last from "../components/home/Last";

export default function Home() {
    return (
        <div className="home">
            <Navbar />
            <NotificationsSidebar />
            <div className="home-content">
                <HomeMain />
                <div className="home-info">
                    <HomeContaine />
                </div>
                <div className="home-description">
                    <HomeDesc />
                </div>
                {/* <div className="home-footer">
                   <HomeInfo />
    </div> */}
                <div className="home-Last">
                    <Last />
                </div>
            </div>
        </div>
    );
}
