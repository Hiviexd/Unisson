import "../styles/pages/Home.scss";
import Navbar from "../components/global/Navbar";
import HomeMain from "../components/global/home/HomeMain";

export default function Home() {
    return (
        <div className="home">
            <Navbar />
            <div className="home-content">
                <HomeMain />
                <div className="home-info">
                    chwaya info
                </div>
                <div className="home-description">
                    chwaya description
                </div>
                <div className="home-footer">
                    footer
                </div>
            </div>
        </div>
    );
}
