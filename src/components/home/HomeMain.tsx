import "../../styles/components/home/HomeMain.scss";
import events from "../../assets/events.jpg";
import moment from "../../assets/Moment.png";
import hereux from "../../assets/hereux.jpg";
import { Button } from "@mui/material";
export default function HomeMain() {
    return (
        <div className="main">
            <div>
                <h3 className="aa">welcome to ARAG </h3>
                <h1 className="main-title">
                    Discover the specialized service <br /> that will revolutionize <br /> your
                    experience.{" "}
                </h1>
                <h3 className="bb">
                    Be the first to get best real before they hit the mass market !<br /> Not
                    foreclose deal with one simpla search !
                </h3>
                <button>Get Started</button>
                <Button size="small">Get Started</Button>
            </div>
            <div className="main-image">
                <img src={hereux} alt="hereux" />
            </div>
        </div>
    );
}
