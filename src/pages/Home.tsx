import "../styles/pages/Home.scss";
import Navbar from "../components/global/Navbar";
import HomeMain from "../components/global/home/HomeMain";
import HomeContaine from "../components/global/home/HomeContaine";
import HomeDesc from "../components/global/home/HomeDesc";
import HomeInfo from "../components/global/home/HomeInfo";
import Last from "../components/global/home/Last" ;

export default function Home() {
    return (
        <div className="home">
            <Navbar />
            <div className="home-content">
                <HomeMain />
                <div className="home-info">
                  <HomeContaine />
                </div>
                <div className="home-description">
                    <HomeDesc />
                </div>
                <div className="home-footer">
                   <HomeInfo />
                </div>
                <div className="home-Last">
                   <Last />
                </div>
            </div>
        </div>
    );
}
